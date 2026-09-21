import React, { useMemo, useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { quizItems } from '../content/quiz.js'
import { concepts } from '../content/concepts.js'
import { addPoints, markGamePlayed, grantBadge } from '../progress.js'

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
  const session = useMemo(() => {
    let pool = quizItems
    if (focusConceptId) {
      const related = concepts.find(c => c.id === focusConceptId)
      pool = pool.filter(q => q.conceptId === focusConceptId)
      if (pool.length < 3 && related) {
        const extra = quizItems.filter(q => related.relatedConceptIds?.includes(q.conceptId) && q.conceptId !== focusConceptId)
        pool = pool.concat(extra.slice(0, 3 - pool.length))
      }
    }
    // adaptive-ish ordering: start medium, then mix easier/harder
    const sorted = [...pool].sort((a, b) => Math.abs(a.difficulty - 2) - Math.abs(b.difficulty - 2))
    return shuffle(sorted).slice(0, 8)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusConceptId, seed])

  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [covered, setCovered] = useState([])

  const q = session[idx]

  if (!q && !done) { setDone(true) }

  const answer = (i) => {
    if (chosen !== null) return
    setChosen(i)
    const concept = concepts.find(c => c.id === q.conceptId)
    if (i === q.correctIndex) {
      setScore(s => s + 10)
      addPoints(10)
    }
    if (concept && !covered.includes(concept.id)) setCovered(cs => [...cs, concept.id])
  }

  const next = () => {
    setChosen(null)
    if (idx + 1 >= session.length) {
      setDone(true)
      markGamePlayed('quiz')
      if (score >= 40) grantBadge('badgeQuizStar')
    } else {
      setIdx(i => i + 1)
    }
  }

  const gameHead = (
    <div className="game-head">
      <h2>🧠 {t('navPlay')} — {pick({ en: 'Quiz Challenge', hi: 'प्रश्नोत्तरी चुनौती' })}</h2>
      <span className="score-pill">{t('score')}: {score}</span>
    </div>
  )

  if (done) {
    return (
      <div className="wrap game-shell">
        {gameHead}
        <div className="card center" style={{ padding: 30 }}>
          <h3 style={{ fontSize: 22 }}>{t('quizDone')}</h3>
          <p className="score-pill" style={{ display: 'inline-block', margin: '14px 0' }}>{t('score')}: {score}</p>
          {covered.length > 0 && (
            <>
              <p className="section-title" style={{ marginTop: 10 }}>{t('conceptsLearnt')}</p>
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
          <div className="game-actions" style={{ justifyContent: 'center' }}>
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
      <div className="howto">
        <strong>{t('howToPlay')}</strong>
        <ol>
          <li>{pick({ en: 'Read the situation-based question.', hi: 'स्थिति आधारित प्रश्न पढ़ें।' })}</li>
          <li>{pick({ en: 'Tap one option.', hi: 'कोई एक विकल्प दबाएँ।' })}</li>
          <li>{pick({ en: 'Read the feedback — you learn right away.', hi: 'प्रतिक्रिया पढ़ें — आप तुरंत सीखते हैं।' })}</li>
          <li>{pick({ en: 'Earn 10 points for each correct answer.', hi: 'हर सही उत्तर पर 10 अंक पाएँ।' })}</li>
        </ol>
      </div>
      <p className="muted">{t('question')} {idx + 1} / {session.length}</p>
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
