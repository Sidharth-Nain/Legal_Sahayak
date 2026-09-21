import React, { useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { markGamePlayed, addPoints } from '../progress.js'

export default function Cards() {
  const { t, pick } = useLang()
  const [flipped, setFlipped] = useState([])
  const [shuffled] = useState(() => [...concepts].sort(() => Math.random() - 0.5).slice(0, 6))

  const flip = (id) => {
    if (flipped.includes(id)) return
    const nf = [...flipped, id]
    setFlipped(nf)
    if (nf.length === 1) addPoints(2)
    if (nf.length === shuffled.length) {
      markGamePlayed('cards')
      addPoints(10)
    }
  }

  return (
    <div className="wrap game-shell">
      <div className="game-head">
        <h2>🃏 {pick({ en: 'Card Flip', hi: 'कार्ड पलटें' })}</h2>
        <span className="score-pill">{flipped.length} / {shuffled.length}</span>
      </div>
      <div className="howto">
        <strong>{t('howToPlay')}</strong>
        <ol>
          <li>{pick({ en: 'Look at the situation on the card front.', hi: 'कार्ड के आगे लिखी स्थिति देखें।' })}</li>
          <li>{pick({ en: 'Tap the card to flip it.', hi: 'कार्ड पलटने के लिए दबाएँ।' })}</li>
          <li>{pick({ en: 'Learn the concept and its constitutional reference.', hi: 'अवधारणा और संवैधानिक संदर्भ जानें।' })}</li>
          <li>{pick({ en: 'Flip all cards to finish the deck.', hi: 'पूरा डेक पूरा करने के लिए सभी कार्ड पलटें।' })}</li>
        </ol>
      </div>
      <p className="muted">{t('flipHint')}</p>
      <div className="cards-grid">
        {shuffled.map(c => {
          const isFlipped = flipped.includes(c.id)
          return (
            <button
              key={c.id}
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => flip(c.id)}
              aria-pressed={isFlipped}
              style={{ border: 'none', background: 'transparent', padding: 0 }}
            >
              <div className="flip-inner">
                <div className="flip-face front">
                  <span className="icon" aria-hidden="true">❓</span>
                  <span>“{pick(c.situation)}”</span>
                  <span className="muted" style={{ fontSize: 12 }}>{t('chooseOption')}</span>
                </div>
                <div className="flip-face back">
                  <span className="concept-name">{pick(c.title)}</span>
                  <span className="ref">📜 {pick(c.provisions[0]?.label)}</span>
                  {c.provisions[0]?.part ? <span className="ref">Part {c.provisions[0].part}</span> : null}
                  <Link to={`/learn/${c.id}`} className="situation-ref" onClick={e => e.stopPropagation()}>
                    {t('learnMore')} →
                  </Link>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      {flipped.length === shuffled.length && (
        <div className="game-actions">
          <button className="btn primary" onClick={() => window.location.reload()}>{t('playAgain')}</button>
          <Link to="/play" className="btn ghost">{t('backHome')}</Link>
        </div>
      )}
    </div>
  )
}
