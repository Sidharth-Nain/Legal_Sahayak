import React, { useMemo, useState, useEffect } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { quizItems, shuffleOptions } from '../content/quiz.js'
import { concepts } from '../content/concepts.js'
import { recordQuizCompletion } from '../progress.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz({ focusConceptId }) {
  const { t, pick } = useLang()
  const [seed] = useState(() => Math.floor(Math.random() * 1e9))

  // Mode: standard or challenge
  const [isChallenge, setIsChallenge] = useState(() => {
    return new URLSearchParams(window.location.hash.split('?')[1] || '').get('mode') === 'challenge'
  })

  // Timer for Challenge Mode (60 seconds)
  const [timeLeft, setTimeLeft] = useState(60)
  const [startTime] = useState(() => Date.now())

  const session = useMemo(() => {
    if (focusConceptId) {
      const related = concepts.find(c => c.id === focusConceptId)
      let pool = quizItems.filter(q => q.conceptId === focusConceptId)
      if (pool.length < 5 && related) {
        const extra = quizItems.filter(q => related.relatedConceptIds?.includes(q.conceptId) && q.conceptId !== focusConceptId)
        pool = pool.concat(extra.slice(0, 5 - pool.length))
      }
      return shuffle(pool).slice(0, 5).map(shuffleOptions)
    }

    if (isChallenge) {
      // Challenge Mode: Pick 5 questions prioritizing medium/hard difficulty
      const hardPool = quizItems.filter(q => q.difficulty >= 2)
      return shuffle(hardPool).slice(0, 5).map(shuffleOptions)
    }

    // Broad, diverse selection across topics for General Quiz Challenge
    const byConcept = {}
    for (const q of quizItems) {
      if (!byConcept[q.conceptId]) byConcept[q.conceptId] = []
      byConcept[q.conceptId].push(q)
    }
    const conceptKeys = shuffle(Object.keys(byConcept))
    const selected = []
    for (const cid of conceptKeys) {
      if (selected.length >= 8) break
      const qPool = shuffle(byConcept[cid])
      if (qPool.length > 0) selected.push(qPool[0])
    }
    if (selected.length < 8) {
      const remaining = quizItems.filter(q => !selected.includes(q))
      selected.push(...shuffle(remaining).slice(0, 8 - selected.length))
    }
    return shuffle(selected).map(shuffleOptions)
  }, [focusConceptId, isChallenge, seed])

  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)
  const [covered, setCovered] = useState([])
  const [completionResult, setCompletionResult] = useState(null)

  // Countdown timer for Challenge mode
  useEffect(() => {
    if (!isChallenge || done) return
    if (timeLeft <= 0) {
      finishQuiz(correctCount)
      return
    }
    const timer = setInterval(() => {
      setTimeLeft(tl => Math.max(0, tl - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [isChallenge, timeLeft, done, correctCount])

  const q = session[idx]

  const finishQuiz = (finalCorrect) => {
    if (done) return
    setDone(true)
    const elapsed = Math.round((Date.now() - startTime) / 1000)
    const hasHard = session.some(item => item.difficulty === 3)
    const res = recordQuizCompletion({
      score: finalCorrect,
      total: session.length,
      isChallenge,
      isHard: hasHard,
      durationSeconds: elapsed
    })
    setCompletionResult(res)
  }

  const answer = (optionIndex) => {
    if (chosen !== null) return
    setChosen(optionIndex)
    const isRight = optionIndex === q.correctIndex
    const nextCount = isRight ? correctCount + 1 : correctCount
    if (isRight) setCorrectCount(nextCount)
    if (q.conceptId && !covered.includes(q.conceptId)) {
      setCovered(c => [...c, q.conceptId])
    }
  }

  const next = () => {
    if (idx + 1 < session.length) {
      setIdx(i => i + 1)
      setChosen(null)
    } else {
      finishQuiz(correctCount)
    }
  }

  const letters = ['A', 'B', 'C', 'D']

  // Result View
  if (done) {
    const pct = completionResult?.pct ?? Math.round((correctCount / session.length) * 100)
    const xpEarned = completionResult?.xpEarned || 0

    return (
      <div className="wrap quiz-shell">
        <div className="quiz-results-card">
          <div style={{ fontSize: 52, marginBottom: 8 }}>
            {pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '📖'}
          </div>
          <h3>{t('quizDone')}</h3>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 520, margin: '0 auto 16px' }}>
            {pct >= 80
              ? pick({ en: 'Outstanding constitutional insight! You showed a firm grasp of civic principles.', hi: 'असाधारण संवैधानिक समझ! आपने नागरिक सिद्धांतों की मजबूत समझ प्रदर्शित की।' })
              : pct >= 60
              ? pick({ en: 'Good effort! You understand key rights. Keep learning to master higher levels.', hi: 'अच्छा प्रयास! आप मुख्य अधिकारों को समझते हैं। उच्च स्तर तक पहुँचने के लिए सीखते रहें।' })
              : pick({ en: 'Review the lessons and try again to improve your score and earn more XP.', hi: 'अंक सुधारने और अधिक XP पाने के लिए पाठों की पुनरावृत्ति करें।' })}
          </p>

          <div className="quiz-result-score-box">
            <div className="res-stat">
              <span className="res-num">{correctCount} / {session.length}</span>
              <span className="res-lbl">{pick({ en: 'Score', hi: 'सही उत्तर' })}</span>
            </div>
            <div className="res-divider" />
            <div className="res-stat">
              <span className="res-num">{pct}%</span>
              <span className="res-lbl">{pick({ en: 'Accuracy', hi: 'सटीकता' })}</span>
            </div>
            <div className="res-divider" />
            <div className="res-stat highlight">
              <span className="res-num">+{xpEarned} XP</span>
              <span className="res-lbl">{pick({ en: 'XP Awarded', hi: 'अर्जित XP' })}</span>
            </div>
          </div>

          {!completionResult?.isEligible && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '10px 16px', borderRadius: 10, fontSize: 13, marginBottom: 20 }}>
              🛡️ {pick({
                en: "Daily quiz XP cap reached (5 scored quizzes today). You can keep practicing anytime for free, and fresh XP will be available tomorrow!",
                hi: "दैनिक क्विज़ XP सीमा पूर्ण (आज 5 क्विज़)। आप कभी भी नि:शुल्क अभ्यास जारी रख सकते हैं, नया XP कल उपलब्ध होगा!"
              })}
            </div>
          )}

          {covered.length > 0 && (
            <div style={{ marginTop: 24, textAlign: 'left' }}>
              <h4 style={{ fontSize: 16, color: 'var(--ink)', marginBottom: 12 }}>
                🔗 {t('conceptsLearnt')}
              </h4>
              <div className="concepts-grid-modern">
                {covered.map(id => {
                  const c = concepts.find(x => x.id === id)
                  return c ? (
                    <Link key={id} to={`/learn/${id}`} className="concept-card-modern" style={{ padding: 16 }}>
                      <span className="concept-tag-pill" style={{ width: 'fit-content', marginBottom: 6 }}>
                        {c.provisions && c.provisions[0] ? pick(c.provisions[0].label) : 'Article'}
                      </span>
                      <strong style={{ fontSize: 14.5, color: 'var(--ink)' }}>{pick(c.title)}</strong>
                      <p style={{ fontSize: 13, color: 'var(--ink-soft)', fontStyle: 'italic', margin: '4px 0 0' }}>
                        “{pick(c.situation)}”
                      </p>
                    </Link>
                  ) : null
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => window.location.reload()}>
              🔄 {t('playAgain')}
            </button>
            <Link to="/play" className="btn ghost">
              🎮 {t('backHome')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const concept = concepts.find(c => c.id === q.conceptId)
  const opts = pick(q.options) || []

  return (
    <div className="wrap quiz-shell">
      {/* Top Header Bar */}
      <div className="quiz-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/play" className="btn ghost small" style={{ padding: '4px 10px' }}>
            ← {pick({ en: 'Games', hi: 'खेल' })}
          </Link>
          <span className="quiz-mode-pill">
            {isChallenge ? '⚡ Timed Challenge' : '🧠 Situation Practice'}
          </span>
          {isChallenge && (
            <span className={`challenge-timer-pill ${timeLeft <= 15 ? 'warning' : ''}`}>
              ⏱️ {timeLeft}s
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="score-pill">
            {pick({ en: 'Score', hi: 'अंक' })}: {correctCount} / {session.length}
          </span>
        </div>
      </div>

      {/* Mode Switcher Banner */}
      {!focusConceptId && idx === 0 && chosen === null && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--card-soft)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          padding: '10px 16px',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 10
        }}>
          <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
            {isChallenge
              ? pick({ en: '⚡ 60s Challenge Active: Answer quickly to test your reflexes and unlock badges.', hi: '⚡ 60s चुनौती सक्रिय: त्वरित उत्तर दें और विशेष बैज पाएँ।' })
              : pick({ en: '🧠 Standard Practice: Take your time to think through real-world situations.', hi: '🧠 मानक अभ्यास: वास्तविक स्थितियों पर विचारपूर्वक उत्तर दें।' })}
          </span>
          <button
            className="btn ghost small"
            style={{ fontSize: 12.5 }}
            onClick={() => setIsChallenge(!isChallenge)}
          >
            {isChallenge
              ? pick({ en: 'Switch to Untimed Mode', hi: 'सामान्य मोड पर बदलें' })
              : pick({ en: '⚡ Try 60s Challenge Mode', hi: '⚡ 60s चुनौती मोड आजमाएँ' })}
          </button>
        </div>
      )}

      {/* Question Card */}
      <div className="quiz-question-card">
        <div className="quiz-q-progress">
          <span>
            {t('question')} <strong>{idx + 1}</strong> / {session.length}
          </span>
          {q.difficulty && (
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 6,
              background: q.difficulty === 1 ? '#e8f5ee' : q.difficulty === 2 ? '#fef3c7' : '#fee2e2',
              color: q.difficulty === 1 ? '#15803d' : q.difficulty === 2 ? '#b45309' : '#b91c1c'
            }}>
              {q.difficulty === 1
                ? pick({ en: '🟢 Foundational', hi: '🟢 बुनियादी' })
                : q.difficulty === 2
                ? pick({ en: '🟡 Intermediate', hi: '🟡 मध्यम' })
                : pick({ en: '🔴 Advanced', hi: '🔴 कठिन' })}
            </span>
          )}
        </div>

        <span className="quiz-q-context-tag">
          {pick({ en: 'Real-Life Situation', hi: 'वास्तविक स्थिति' })}
        </span>

        <h3 className="quiz-q-text">
          {pick(q.question)}
        </h3>

        {/* Options */}
        <div className="quiz-options-list">
          {opts.map((o, i) => {
            let stateClass = ''
            if (chosen !== null) {
              if (i === q.correctIndex) stateClass = 'correct'
              else if (i === chosen) stateClass = 'wrong'
            }
            return (
              <button
                key={i}
                className={`quiz-option-btn ${stateClass}`}
                onClick={() => answer(i)}
                disabled={chosen !== null}
              >
                <span className="option-letter-badge">{letters[i]}</span>
                <span style={{ flex: 1 }}>{pick(o)}</span>
                {chosen !== null && i === q.correctIndex && <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>}
                {chosen !== null && i === chosen && i !== q.correctIndex && <span style={{ color: 'var(--danger)', fontWeight: 800 }}>✕</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback Rationale Box */}
        {chosen !== null && (
          <div className={`quiz-feedback-box ${chosen === q.correctIndex ? 'ok' : 'no'}`}>
            <div className="feedback-status-line">
              {chosen === q.correctIndex ? `✅ ${t('correct')}` : `❌ ${t('notCorrect')}`}
            </div>
            <p className="feedback-rationale-text">
              {pick(q.learnMore)}
            </p>
            {concept && (
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700 }}>
                📜 {pick(concept.provisions[0]?.label)} · <Link to={`/learn/${concept.id}`} style={{ textDecoration: 'underline' }}>{t('learnMore')} →</Link>
              </div>
            )}
          </div>
        )}

        {/* Next Question CTA */}
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn primary"
            onClick={next}
            disabled={chosen === null}
          >
            {idx + 1 >= session.length
              ? pick({ en: 'See Final Results →', hi: 'परिणाम देखें →' })
              : pick({ en: 'Next Question →', hi: 'अगला प्रश्न →' })}
          </button>
        </div>
      </div>
    </div>
  )
}
