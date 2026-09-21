import React, { useMemo, useRef, useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { quizItems } from '../content/quiz.js'
import { addPoints, markGamePlayed } from '../progress.js'

// 100-cell board (1..100). Special cells use constitutional themes.
// Ladders lift you (protections); snakes pull you back (violations).
const SPECIAL = {
  4:  { type: 'ladder', to: 25, label: { en: 'Right to Education lifts you up', hi: 'शिक्षा का अधिकार ऊपर ले जाता है' } },
  13: { type: 'snake',  to: 5,  label: { en: 'Discrimination pulls you down', hi: 'भेदभाव नीचे खींचता है' } },
  22: { type: 'ladder', to: 41, label: { en: 'Constitutional remedy lifts you up', hi: 'संवैधानिक उपचार ऊपर ले जाता है' } },
  28: { type: 'bonus',  label: { en: 'You helped a neighbour verify a rumour. +5', hi: 'आपने पड़ोसी को अफवाह जाँचने में मदद की। +5' } },
  36: { type: 'snake',  to: 14, label: { en: 'Untouchability practice pulls you down', hi: 'अस्पृश्यता का आचरण नीचे खींचता है' } },
  47: { type: 'q' },
  55: { type: 'ladder', to: 76, label: { en: 'Equality before law lifts you up', hi: 'विधि के समक्ष समानता ऊपर ले जाती है' } },
  62: { type: 'q' },
  70: { type: 'bonus', label: { en: 'You voted! Civic bonus +5', hi: 'आपने मतदान किया! नागरिक बोनस +5' } },
  74: { type: 'snake', to: 39, label: { en: 'Censorship of honest speech pulls you down', hi: 'ईमानदार वाणी पर रोक नीचे खींचती है' } },
  87: { type: 'q' },
  93: { type: 'snake', to: 68, label: { en: 'Ignoring duties pulls you down', hi: 'कर्तव्यों की अवहेलना नीचे खींचती है' } },
  98: { type: 'snake', to: 79, label: { en: 'Misusing freedom pulls you down', hi: 'स्वतंत्रता का दुरुपयोग नीचे खींचता है' } },
}

const PLAYERS = [
  { id: 0, name: { en: 'You', hi: 'आप' } },
  { id: 1, name: { en: 'Friend', hi: 'मित्र' } },
]

export default function SnakeLadder() {
  const { t, pick } = useLang()
  const [pos, setPos] = useState([1, 1])
  const [turn, setTurn] = useState(0)
  const [rolling, setRolling] = useState(false)
  const [log, setLog] = useState([])
  const [pendingQ, setPendingQ] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [winner, setWinner] = useState(null)
  const [roll, setRoll] = useState(null)
  const bonusApplied = useRef(false)

  const qPool = useMemo(() => quizItems, [])

  const addLog = (line) => setLog(l => [line, ...l].slice(0, 30))

  const rollDice = () => {
    if (rolling || winner !== null || pendingQ) return
    setRolling(true); bonusApplied.current = false
    const d = 1 + Math.floor(Math.random() * 6)
    setTimeout(() => {
      setRolling(false); setRoll(d)
      movePlayer(turn, d)
    }, 450)
  }

  const movePlayer = (p, d) => {
    let np = pos[p] + d
    if (np > 100) np = pos[p]
    setPos(prev => { const n = [...prev]; n[p] = np; return n })
    addLog(`${pick(PLAYERS[p].name)} ${d} — ${np}`)
    const sp = SPECIAL[np]
    if (sp) {
      if (sp.type === 'ladder') { setTimeout(() => applyJump(p, np, sp, 'ladder'), 500); return }
      if (sp.type === 'snake') { setTimeout(() => applyJump(p, np, sp, 'snake'), 500); return }
      if (sp.type === 'bonus') { setTimeout(() => { addPoints(5); addLog(pick(sp.label)); endTurn() }, 500); return }
      if (sp.type === 'q') { setTimeout(() => askQuestion(p, np), 500); return }
    }
    if (np === 100) { setWinner(p); markGamePlayed('snl'); addLog(`🏆 ${pick(PLAYERS[p].name)} ${t('winner')}`); return }
    endTurn()
  }

  const applyJump = (p, from, sp, kind) => {
    setPos(prev => { const n = [...prev]; n[p] = sp.to; return n })
    addLog(`${kind === 'ladder' ? '🪜' : '🐍'} ${pick(sp.label)} (${from} → ${sp.to})`)
    if (sp.to >= 100) { setWinner(p); markGamePlayed('snl'); return }
    endTurn()
  }

  const askQuestion = (p, cell) => {
    const q = qPool[Math.floor(Math.random() * qPool.length)]
    setPendingQ({ q, p, cell })
    setChosen(null)
  }

  const answerQ = (i) => {
    if (chosen !== null) return
    setChosen(i)
    const { q, p } = pendingQ
    if (i === q.correctIndex) {
      addPoints(10)
      addLog(`✅ ${pick(PLAYERS[p].name)}: ${t('correct')} (+${t('points')})`)
    } else {
      // wrong answer: step back 1 cell (gentle penalty)
      setPos(prev => { const n = [...prev]; n[p] = Math.max(1, n[p] - 1); return n })
      addLog(`❌ ${pick(PLAYERS[p].name)}: ${t('notCorrect')} −1`)
    }
  }

  const afterQuestion = () => {
    setPendingQ(null)
    endTurn()
  }

  const endTurn = () => setTurn(tc => (tc === 0 ? 1 : 0))

  const cellType = (n) => {
    const sp = SPECIAL[n]
    if (!sp) return n === 1 ? 'start' : n === 100 ? 'end' : ''
    return sp.type === 'q' ? 'q' : sp.type === 'bonus' ? 'bonus' : sp.type === 'snake' || sp.type === 'ladder' ? 'setback' : ''
  }

  const rows = []
  for (let r = 0; r < 10; r++) {
    const rowCells = []
    for (let c = 0; c < 10; c++) {
      const n = r % 2 === 0 ? r * 10 + c + 1 : r * 10 + (10 - c)
      rowCells.push(n)
    }
    rows.push(rowCells.reverse().length ? rowCells : rowCells)
  }
  // boustrophedon display: bottom row 1..10 left→right, going up
  const boardRows = []
  for (let r = 9; r >= 0; r--) {
    const cells = []
    for (let c = 0; c < 10; c++) {
      const base = r * 10
      const n = r % 2 === 0 ? base + c + 1 : base + (10 - c)
      cells.push(n)
    }
    if (r % 2 === 1) cells.reverse()
    boardRows.push(cells)
  }

  return (
    <div className="wrap game-shell">
      <div className="game-head">
        <h2>🐍 {pick({ en: 'Constitution Snake & Ladder', hi: 'संविधान साँप और सीढ़ी' })}</h2>
      </div>
      <div className="howto">
        <strong>{t('howToPlay')}</strong>
        <ol>
          <li>{pick({ en: 'Roll the dice on your turn.', hi: 'अपनी बारी में पासा फेंकें।' })}</li>
          <li>{pick({ en: 'Move forward by the number rolled.', hi: 'उतने कदम आगे बढ़ें।' })}</li>
          <li>{pick({ en: 'Ladders (protections) lift you up; snakes (violations) pull you down.', hi: 'सीढ़ियाँ (संरक्षण) ऊपर ले जाती हैं; साँप (उल्लंघन) नीचे खींचते हैं।' })}</li>
          <li>{pick({ en: 'Question cells: answer correctly to avoid going back.', hi: 'प्रश्न कोठरियाँ: सही उत्तर दें वरना पीछे जाना पड़ेगा।' })}</li>
          <li>{pick({ en: 'First to reach 100 wins.', hi: 'जो पहले 100 तक पहुँचे वह जीतता है।' })}</li>
        </ol>
      </div>

      <div className="snl-layout">
        <div className="snl-board" role="grid" aria-label="Board">
          {boardRows.map((cells, ri) => (
            <div className="snl-row" key={ri}>
              {cells.map(n => {
                const type = cellType(n)
                return (
                  <div key={n} className={`snl-cell ${type}`}>
                    <span className="n">{n}</span>
                    {pos[0] === n && <span className="token p1" title={pick(PLAYERS[0].name)} />}
                    {pos[1] === n && <span className="token p2" title={pick(PLAYERS[1].name)} />}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="snl-side">
          <div className="snl-status">
            {winner !== null ? (
              <p className="turn">🏆 {pick(PLAYERS[winner].name)} {t('winner')}</p>
            ) : pendingQ ? (
              <>
                <p className="turn">{t('question')}</p>
                <p style={{ fontWeight: 600, margin: '8px 0' }}>{pick(pendingQ.q.question)}</p>
                {(pick(pendingQ.q.options) || []).map((o, i) => {
                  let cls = 'option'
                  if (chosen !== null) {
                    if (i === pendingQ.q.correctIndex) cls += ' correct'
                    else if (i === chosen) cls += ' wrong'
                  }
                  return (
                    <button key={i} className={cls} style={{ width: '100%', marginBottom: 8 }} onClick={() => answerQ(i)} disabled={chosen !== null}>
                      {pick(o)}
                    </button>
                  )
                })}
                {chosen !== null && (
                  <div className={`feedback ${chosen === pendingQ.q.correctIndex ? 'ok' : 'no'}`} style={{ maxWidth: 'none' }}>
                    {pick(pendingQ.q.learnMore)}
                  </div>
                )}
                <div className="game-actions">
                  <button className="btn primary" onClick={afterQuestion} disabled={chosen === null}>{t('next')}</button>
                </div>
              </>
            ) : (
              <>
                <p className="turn">{t('turn')}: {pick(PLAYERS[turn].name)} {roll != null && !rolling ? `— 🎲 ${roll}` : rolling ? '…' : ''}</p>
                <button className="btn primary dice-btn" onClick={rollDice} disabled={rolling || winner !== null}>
                  {rolling ? '…' : t('diceRoll')}
                </button>
              </>
            )}
          </div>
          <div className="snl-status">
            <strong style={{ fontSize: 13.5 }}>{pick({ en: 'Game log', hi: 'खेल विवरण' })}</strong>
            <div className="log">
              {log.length === 0 ? <span className="muted">—</span> : log.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
          <p className="legend">
            <span className="chip" style={{ background: 'var(--ok-soft)' }} /> {pick({ en: 'Civic bonus', hi: 'नागरिक बोनस' })} ·
            <span className="chip" style={{ background: '#eef6f4' }} /> {pick({ en: 'Question', hi: 'प्रश्न' })} ·
            <span className="chip" style={{ background: 'var(--danger-soft)' }} /> {pick({ en: 'Snake / setback', hi: 'साँप / बाधा' })}
          </p>
          <div className="game-actions">
            <button className="btn ghost" onClick={() => window.location.reload()}>{t('restart')}</button>
            <Link to="/play" className="btn ghost">{t('backHome')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
