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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!q && !done) {
    finishQuiz(correctCount)
  }

  const answer = (i) => {
    if (chosen !== null) return
    setChosen(i)
    const isCorrect = i === q.correctIndex
    const newCorrect = isCorrect ? correctCount + 1 : correctCount
    if (isCorrect) setCorrectCount(newCorrect)

    const concept = concepts.find(c => c.id === q.conceptId)
    if (concept && !covered.includes(concept.id)) setCovered(cs => [...cs, concept.id])
  }

  const next = () => {
    setChosen(null)
    if (idx + 1 >= session.length) {
      finishQuiz(correctCount)
    } else {
      setIdx(i => i + 1)
    }
  }

  const gameHead = (
    <div className="game-head">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h2>
          {isChallenge ? '⚡ ' : '🧠 '}
          {pick({
            en: isChallenge ? 'Constitution Challenge' : 'Quiz Challenge',
            hi: isChallenge ? 'संविधान चुनौती' : 'प्रश्नोत्तरी चुनौती'
          })}
        </h2>
        {isChallenge && (
          <span className={`challenge-timer-pill ${timeLeft <= 15 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="score-pill">
          {pick({ en: 'Correct', hi: 'सही' })}: {correctCount} / {session.length}
        </span>
      </div>
    </div>
  )

  if (done) {
    const pct = completionResult?.pct ?? Math.round((correctCount / session.length) * 100)
    const xpEarned = completionResult?.xpEarned || 0

    return (
      <div className="wrap game-shell">
        {gameHead}
        <div className="card center" style={{ padding: '34px 24px' }}>
          <div className="quiz-done-icon">
            {pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '📖'}
          </div>
          <h3 style={{ fontSize: 24, margin: '8px 0 4px' }}>{t('quizDone')}</h3>
          <p className="muted" style={{ fontSize: 14 }}>
            {pct >= 80
              ? pick({ en: 'Outstanding constitutional insight!', hi: 'असाधारण संवैधानिक समझ!' })
              : pct >= 60
              ? pick({ en: 'Good effort! Keep learning and practicing.', hi: 'अच्छा प्रयास! सीखते और अभ्यास करते रहें।' })
              : pick({ en: 'Review the lessons and try again to improve your score.', hi: 'अंक सुधारने के लिए पाठों की पुनरावृत्ति करें।' })}
          </p>

          <div className="quiz-result-score-box">
            <div className="res-stat">
              <span className="res-num">{correctCount} / {session.length}</span>
              <span className="res-lbl">{pick({ en: 'Correct Answers', hi: 'सही उत्तर' })}</span>
            </div>
            <div className="res-divider" />
            <div className="res-stat">
              <span className="res-num">{pct}%</span>
              <span className="res-lbl">{pick({ en: 'Accuracy', hi: 'सटीकता' })}</span>
            </div>
            <div className="res-divider" />
            <div className="res-stat highlight">
              <span className="res-num">+{xpEarned} XP</span>
              <span className="res-lbl">{pick({ en: 'XP Earned', hi: 'XP अर्जित' })}</span>
            </div>
          </div>

          {!completionResult?.isEligible && (
            <div className="quiz-cap-notice">
              🛡️ {pick({
                en: "Daily quiz XP cap reached (5 quizzes). You can keep practicing to learn and improve, but no further XP will be awarded until tomorrow.",
                hi: "दैनिक क्विज़ XP सीमा पूर्ण (5 क्विज़)। आप सीखने और अभ्यास जारी रख सकते हैं, पर अतिरिक्त XP कल मिलेगा।"
              })}
            </div>
          )}

          {covered.length > 0 && (
            <>
              <p className="section-title" style={{ marginTop: 20 }}>{t('conceptsLearnt')}</p>
              <div className="grid two" style={{ textAlign: 'left' }}>
                {covered.map(id => {
                  const c = concepts.find(x => x.id === id)
                  return c ? (
                    <Link key={id} to={`/learn/${id}`} className="card concept-card">
                      <span className="situation">“{pick(c.situation)}”</span>
                      <span className="muted">{pick(c.title)}</span>
                    </Link>
                  ) : null
                })}
              </div>
            </>
          )}

          <div className="game-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <button className="btn primary" onClick={() => window.location.reload()}>{t('playAgain')}</button>
            <Link to="/play" className="btn ghost">{t('backHome')}</Link>
          </div>
        </div>
      </div>
    )
  }

  const concept = concepts.find(c => c.id === q.conceptId)
  const opts = pick(q.options) || []

  return (
    <div className="wrap game-shell">
      {gameHead}

      {/* Mode Switcher Banner (if not focus concept) */}
      {!focusConceptId && idx === 0 && chosen === null && (
        <div className="quiz-mode-banner">
          <span className="mode-desc">
            {isChallenge
              ? pick({ en: '⚡ Challenge Mode: 60-second timer active! Answer fast for Speed Learner badge.', hi: '⚡ चुनौती मोड: 60 सेकंड टाइमर सक्रिय! त्वरित उत्तर देकर बैज पाएँ।' })
              : pick({ en: '🧠 Practice Mode: Untimed, thoughtful situation-based quiz.', hi: '🧠 अभ्यास मोड: समय-मुक्त विचारशील स्थिति-आधारित क्विज़।' })}
          </span>
          <button
            className="btn ghost small"
            style={{ fontSize: 12.5 }}
            onClick={() => setIsChallenge(!isChallenge)}
          >
            {isChallenge
              ? pick({ en: 'Switch to Standard Quiz', hi: 'सामान्य क्विज़ पर बदलें' })
              : pick({ en: '⚡ Try 60s Challenge Mode', hi: '⚡ 60s चुनौती मोड आजमाएँ' })}
          </button>
        </div>
      )}

      <p className="muted" style={{ marginTop: 8 }}>
        {t('question')} {idx + 1} / {session.length}
        {q.difficulty && (
          <span className="difficulty-tag" style={{ marginLeft: 10 }}>
            {q.difficulty === 1
              ? pick({ en: '🟢 Foundational', hi: '🟢 बुनियादी' })
              : q.difficulty === 2
              ? pick({ en: '🟡 Intermediate', hi: '🟡 मध्यम' })
              : pick({ en: '🔴 Advanced', hi: '🔴 उन्नत' })}
          </span>
        )}
      </p>

      <p className="quiz-q">{pick(q.question)}</p>

      <div className="options">
        {opts.map((o, i) => {
          let cls = 'option'
          if (chosen !== null) {
            if (i === q.correctIndex) cls += ' correct'
            else if (i === chosen) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => answer(i)} disabled={chosen !== null}>
              {pick(o)}
            </button>
          )
        })}
      </div>

      {chosen !== null && (
        <div className={`feedback ${chosen === q.correctIndex ? 'ok' : 'no'}`}>
          <strong>{chosen === q.correctIndex ? `✅ ${t('correct')}` : `❌ ${t('notCorrect')}`}</strong>
          <br />
          {pick(q.learnMore)}
          {concept && (
            <span className="ref">
              📜 {pick(concept.provisions[0]?.label)}
              {concept.provisions[0]?.part ? ` · Part ${concept.provisions[0].part}` : ''} · <Link to={`/learn/${concept.id}`}>{t('learnMore')} →</Link>
            </span>
          )}
        </div>
      )}

      <div className="game-actions">
        <button className="btn primary" onClick={next} disabled={chosen === null}>
          {idx + 1 >= session.length ? t('seeResult') : t('next')}
        </button>
      </div>
    </div>
  )
}
