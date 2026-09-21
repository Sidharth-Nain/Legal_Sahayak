import React, { useMemo, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { quizItems, shuffleOptions } from '../content/quiz.js'
import { concepts } from '../content/concepts.js'
import { addPoints, markGamePlayed, grantBadge } from '../progress.js'

const CATS = [
  { id: 'preamble', label: { en: 'Preamble', hi: 'उद्देशिका' }, color: '#0f6b5c' },
  { id: 'equality', label: { en: 'Equality', hi: 'समानता' }, color: '#b45309' },
  { id: 'freedom', label: { en: 'Freedom', hi: 'स्वतंत्रता' }, color: '#1e5a8a' },
  { id: 'rights', label: { en: 'Rights', hi: 'अधिकार' }, color: '#5b3a8a' },
  { id: 'duties', label: { en: 'Duties', hi: 'कर्तव्य' }, color: '#8a2f4a' },
  { id: 'justice', label: { en: 'Justice', hi: 'न्याय' }, color: '#2f6f3f' },
  { id: 'liberty', label: { en: 'Liberty', hi: 'स्वतंत्रता-स्वातंत्र्य' }, color: '#7a5b10' },
  { id: 'mixed', label: { en: 'Mixed', hi: 'मिश्रित' }, color: '#4a5a6e' },
]

const TAU = Math.PI * 2

export default function Wheel() {
  const { t, pick } = useLang()
  const [angle, setAngle] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null) // category id
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
    const lx = 100 + 62 * Math.cos(mid), ly = 100 + 62 * Math.sin(mid)
    return { d: `M 100 100 L ${x0} ${y0} A 96 96 0 0 1 ${x1} ${y1} Z`, c, lx, ly, i }
  }), [seg])

  const spin = () => {
    if (spinning) return
    setSpinning(true); setResult(null); setQ(null); setChosen(null)
    const catIndex = Math.floor(Math.random() * n)
    // Land the chosen segment under the pointer (top, -90deg)
    const target = 360 * 5 + (360 - (catIndex * 360 / n + 180 / n))
    const start = angle % 360
    const delta = target - start
    const t0 = performance.now()
    const dur = 2600 + Math.random() * 400
    const ease = (x) => 1 - Math.pow(1 - x, 3) // ease-out cubic
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
    if (i === q.correctIndex) { setScore(s => s + 10); addPoints(10) }
  }

  const nextSpin = () => {
    setQ(null); setChosen(null); setResult(null)
    markGamePlayed('wheel')
    if (score >= 30) grantBadge('badgeWheelMaster')
  }

  const qq = q

  return (
    <div className="wrap game-shell">
      <div className="game-head">
        <h2>🎡 {pick({ en: 'Spin Wheel', hi: 'चक्र घुमाएँ' })}</h2>
        <span className="score-pill">{t('score')}: {score}</span>
      </div>
      <div className="howto">
        <strong>{t('howToPlay')}</strong>
        <ol>
          <li>{pick({ en: 'Tap SPIN.', hi: 'घुमाएँ दबाएँ।' })}</li>
          <li>{pick({ en: 'Wait for the wheel to stop.', hi: 'पहिया रुकने दें।' })}</li>
          <li>{pick({ en: 'See the topic selected.', hi: 'चुना गया विषय देखें।' })}</li>
          <li>{pick({ en: 'Answer the question.', hi: 'प्रश्न का उत्तर दें।' })}</li>
          <li>{pick({ en: 'Earn points for a correct answer.', hi: 'सही उत्तर पर अंक पाएँ।' })}</li>
        </ol>
      </div>

      {!qq && (
        <>
          <div className="wheel-row">
            <div className="wheel-wrap">
              <div className="wheel-pointer" />
              <svg viewBox="0 0 200 200" style={{ transform: `rotate(${angle}deg)` }}>
                {paths.map(p => (
                  <g key={p.i}>
                    <path d={p.d} fill={p.c.color} stroke="#fff" strokeWidth="1.5" />
                    <text
                      x={p.lx} y={p.ly}
                      fill="#fff" fontSize="8.5" fontWeight="700"
                      textAnchor="middle" dominantBaseline="middle"
                      transform={`rotate(${(p.i * 360 / n + 180 / n)} ${p.lx} ${p.ly})`}
                    >
                      {pick(p.c.label)}
                    </text>
                  </g>
                ))}
                <circle cx="100" cy="100" r="16" fill="#fff" />
              </svg>
              <button className="wheel-center-btn" onClick={spin} disabled={spinning}>
                {spinning ? '…' : t('spin')}
              </button>
            </div>
            <p className="wheel-result">
              {result
                ? `${t('wheelTopic')}: ${pick(CATS.find(c => c.id === result).label)}`
                : spinning ? '…' : t('wheelHint')}
            </p>
            {result && <button className="btn primary" onClick={startQuestion}>{pick({ en: 'Answer the question →', hi: 'प्रश्न का उत्तर दें →' })}</button>}
          </div>
        </>
      )}

      {qq && (
        <div>
          <p className="muted">
            {t('wheelTopic')}: <strong>{pick(CATS.find(c => c.id === result)?.label)}</strong>
          </p>
          <p className="quiz-q">{pick(qq.question)}</p>
          <div className="options">
            {(pick(qq.options) || []).map((o, i) => {
              let cls = 'option'
              if (chosen !== null) {
                if (i === qq.correctIndex) cls += ' correct'
                else if (i === chosen) cls += ' wrong'
              }
              return (
                <button key={i} className={cls} onClick={() => answer(i)} disabled={chosen !== null}>{pick(o)}</button>
              )
            })}
          </div>
          {chosen !== null && (
            <div className={`feedback ${chosen === qq.correctIndex ? 'ok' : 'no'}`}>
              <strong>{chosen === qq.correctIndex ? `✅ ${t('correct')}` : `❌ ${t('notCorrect')}`}</strong><br />
              {pick(qq.learnMore)}
            </div>
          )}
          <div className="game-actions">
            <button className="btn primary" onClick={nextSpin}>{pick({ en: 'Spin again', hi: 'फिर घुमाएँ' })}</button>
          </div>
        </div>
      )}
    </div>
  )
}
