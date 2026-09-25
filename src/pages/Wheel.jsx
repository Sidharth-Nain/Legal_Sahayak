import React, { useMemo, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { quizItems, shuffleOptions } from '../content/quiz.js'
import { concepts } from '../content/concepts.js'
import { awardWheelXp, markGamePlayed, grantBadge } from '../progress.js'

const CATS = [
  { id: 'preamble', label: { en: 'Preamble', hi: 'उद्देशिका' }, color: '#087F6E' },
  { id: 'equality', label: { en: 'Equality', hi: 'समानता' }, color: '#E67A17' },
  { id: 'freedom', label: { en: 'Freedom', hi: 'स्वतंत्रता' }, color: '#1D6AE5' },
  { id: 'rights', label: { en: 'Rights', hi: 'अधिकार' }, color: '#7C3AED' },
  { id: 'duties', label: { en: 'Duties', hi: 'कर्तव्य' }, color: '#BE185D' },
  { id: 'justice', label: { en: 'Justice', hi: 'न्याय' }, color: '#059669' },
  { id: 'liberty', label: { en: 'Liberty', hi: 'स्वातंत्र्य' }, color: '#B45309' },
  { id: 'mixed', label: { en: 'Mixed', hi: 'मिश्रित' }, color: '#17263D' },
]

const TAU = Math.PI * 2

export default function Wheel() {
  const { t, pick } = useLang()
  const [angle, setAngle] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [q, setQ] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const spinTimer = useRef(null)

  const n = CATS.length
  const seg = TAU / n

  const paths = useMemo(() => CATS.map((c, i) => {
    const a0 = i * seg - TAU / 4
    const a1 = a0 + seg
    const x0 = 100 + 96 * Math.cos(a0), y0 = 100 + 96 * Math.sin(a0)
    const x1 = 100 + 96 * Math.cos(a1), y1 = 100 + 96 * Math.sin(a1)
    const mid = a0 + seg / 2
    const lx = 100 + 64 * Math.cos(mid), ly = 100 + 64 * Math.sin(mid)
    return { d: `M 100 100 L ${x0} ${y0} A 96 96 0 0 1 ${x1} ${y1} Z`, c, lx, ly, i }
  }), [seg])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setQ(null)
    setChosen(null)
    const catIndex = Math.floor(Math.random() * n)
    const target = 360 * 5 + (360 - (catIndex * 360 / n + 180 / n))
    const start = angle % 360
    const delta = target - start
    const t0 = performance.now()
    const dur = 2600 + Math.random() * 400
    const ease = (x) => 1 - Math.pow(1 - x, 3)

    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      setAngle(start + delta * ease(p))
      if (p < 1) requestAnimationFrame(step)
      else {
        setSpinning(false)
        setResult(CATS[catIndex].id)
      }
    }
    requestAnimationFrame(step)
    spinTimer.current = catIndex
  }

  const startQuestion = () => {
    const cat = result
    let pool = quizItems.filter(qi => {
      const c = concepts.find(x => x.id === qi.conceptId)
      return c && (c.wheelCategories || []).includes(cat)
    })
    if (!pool.length) pool = quizItems
    const rawQ = pool[Math.floor(Math.random() * pool.length)]
    setQ(shuffleOptions(rawQ))
  }

  const answer = (i) => {
    if (chosen !== null) return
    setChosen(i)
    if (i === q.correctIndex) {
      setScore(s => s + 10)
      awardWheelXp()
    }
  }

  const nextSpin = () => {
    setQ(null)
    setChosen(null)
    setResult(null)
    markGamePlayed('wheel')
    if (score >= 30) grantBadge('badgeWheelMaster')
  }

  const activeCategory = CATS.find(c => c.id === result)
  const letters = ['A', 'B', 'C', 'D']

  return (
    <div className="wrap wheel-shell">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Link to="/play" className="btn ghost small" style={{ padding: '4px 10px' }}>
          ← {pick({ en: 'Games', hi: 'खेल' })}
        </Link>
        <span className="score-pill">
          ⭐ {pick({ en: 'Score', hi: 'अंक' })}: {score} pts
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: 'var(--ink)' }}>
          🎡 {pick({ en: 'Spin the Constitution Wheel', hi: 'संविधान चक्र घुमाएँ' })}
        </h2>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>
          {pick({
            en: 'Spin to select a constitutional topic. Answer correctly to earn points and XP!',
            hi: 'संवैधानिक विषय चुनने के लिए पहिया घुमाएं। अंक और XP पाने के लिए सही उत्तर दें!'
          })}
        </p>
      </div>

      {/* Wheel Board */}
      <div className="wheel-row">
        <div className="wheel-wrap">
          <div className="wheel-pointer" />
          <svg viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.15))' }}>
            <circle cx="100" cy="100" r="99" fill="#ffffff" stroke="var(--line-strong)" strokeWidth="3" />
            <g style={{ transformOrigin: '100px 100px', transform: `rotate(${angle}deg)` }}>
              {paths.map(p => (
                <path key={p.c.id} d={p.d} fill={p.c.color} stroke="#ffffff" strokeWidth="2" />
              ))}
              {paths.map(p => (
                <text
                  key={p.c.id}
                  x={p.lx}
                  y={p.ly}
                  fill="#ffffff"
                  fontSize="7.5"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)', letterSpacing: '0.3px' }}
                >
                  {pick(p.c.label)}
                </text>
              ))}
            </g>
          </svg>
          <button
            className="wheel-center-btn"
            onClick={spin}
            disabled={spinning || q !== null}
            aria-label="Spin the wheel"
          >
            {spinning ? '…' : pick({ en: 'SPIN', hi: 'घुमाएँ' })}
          </button>
        </div>

        {/* Selected Result Banner */}
        {result && !q && activeCategory && (
          <div style={{
            background: '#ffffff',
            border: `2px solid ${activeCategory.color}`,
            borderRadius: 14,
            padding: '16px 24px',
            boxShadow: 'var(--shadow)',
            marginTop: 10,
            animation: 'slideFeedback 0.25s ease-out'
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: activeCategory.color }}>
              {pick({ en: 'TOPIC SELECTED', hi: 'चयनित विषय' })}
            </span>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '4px 0 12px' }}>
              🎯 {pick(activeCategory.label)}
            </div>
            <button className="btn primary" onClick={startQuestion}>
              {pick({ en: 'Answer Topic Question →', hi: 'प्रश्न का उत्तर दें →' })}
            </button>
          </div>
        )}
      </div>

      {/* Question Card when Active */}
      {q && (
        <div className="quiz-question-card" style={{ marginTop: 24, textAlign: 'left' }}>
          <span className="quiz-q-context-tag">
            🎡 {activeCategory ? pick(activeCategory.label) : 'Topic'} Question
          </span>
          <h3 className="quiz-q-text">{pick(q.question)}</h3>

          <div className="quiz-options-list">
            {(pick(q.options) || []).map((o, i) => {
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

          {chosen !== null && (
            <div className={`quiz-feedback-box ${chosen === q.correctIndex ? 'ok' : 'no'}`}>
              <div className="feedback-status-line">
                {chosen === q.correctIndex
                  ? `✅ ${pick({ en: 'Correct! (+10 XP)', hi: 'बिल्कुल सही! (+10 XP)' })}`
                  : `❌ ${pick({ en: 'Not quite!', hi: 'यह सही नहीं है!' })}`}
              </div>
              <p className="feedback-rationale-text">{pick(q.learnMore)}</p>
            </div>
          )}

          {chosen !== null && (
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn primary" onClick={nextSpin}>
                🔄 {pick({ en: 'Spin Again →', hi: 'पुनः चक्र घुमाएँ →' })}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
