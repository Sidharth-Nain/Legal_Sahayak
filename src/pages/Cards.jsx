import React, { useState } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { markGamePlayed, awardCardsXp } from '../progress.js'

export default function Cards() {
  const { t, pick } = useLang()
  const [flipped, setFlipped] = useState([])
  const [deck, setDeck] = useState(() => [...concepts].sort(() => Math.random() - 0.5).slice(0, 6))

  const handleFlip = (id) => {
    if (flipped.includes(id)) return
    const nf = [...flipped, id]
    setFlipped(nf)
    if (nf.length === deck.length) {
      markGamePlayed('cards')
      awardCardsXp()
    }
  }

  const handleShuffleNewDeck = () => {
    setDeck([...concepts].sort(() => Math.random() - 0.5).slice(0, 6))
    setFlipped([])
  }

  const isCompleted = flipped.length === deck.length

  return (
    <div className="wrap game-shell" style={{ maxWidth: 1040, paddingBottom: 60 }}>
      {/* Top Header & Navigation */}
      <div className="builder-header-nav" style={{ marginBottom: 18 }}>
        <Link to="/play" className="back-link">
          ← {pick({ en: 'Back to Games Hub', hi: 'खेलों पर लौटें' })}
        </Link>
        <button
          className="tool-btn reset-level-btn"
          onClick={handleShuffleNewDeck}
          title="Shuffle new deck"
        >
          🔄 {pick({ en: 'Shuffle New Deck', hi: 'नया डेक लाएँ' })}
        </button>
      </div>

      {/* Game HUD Bar */}
      <div className="quiz-hud-bar" style={{ marginBottom: 20 }}>
        <div>
          <span className="quiz-hud-kicker">
            🃏 {pick({ en: 'COLLECTIBLE CARD FLIP', hi: 'संवैधानिक कार्ड पलटें' })}
          </span>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '4px 0 2px' }}>
            {pick({ en: 'Real-Life Situation to Constitutional Provision', hi: 'वास्तविक जीवन स्थिति से संवैधानिक प्रावधान' })}
          </h2>
          <p className="muted" style={{ fontSize: 13.5, margin: 0 }}>
            {pick({
              en: 'Tap each card to reveal the constitutional principle and article that governs the real-world dilemma.',
              hi: 'वास्तविक जीवन की स्थिति के पीछे के संवैधानिक सिद्धांत और अनुच्छेद को जानने के लिए कार्ड पलटें।'
            })}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <span className="quiz-hud-kicker">{pick({ en: 'CARDS FLIPPED', hi: 'पलटे गए कार्ड' })}</span>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)' }}>
              {flipped.length} / {deck.length}
            </div>
          </div>
          <span className="badge-xp-reward-tag" style={{ padding: '6px 12px', fontSize: 13 }}>
            +40 XP
          </span>
        </div>
      </div>

      {/* Progress Strip */}
      <div style={{ marginBottom: 24 }}>
        <div className="progress-bar" style={{ height: 8 }}>
          <div style={{ width: `${Math.round((flipped.length / deck.length) * 100)}%` }} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {deck.map((c, idx) => {
          const isFlipped = flipped.includes(c.id)
          return (
            <button
              key={c.id}
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(c.id)}
              aria-pressed={isFlipped}
            >
              <div className="flip-inner">
                {/* Front: Real-World Situation Card */}
                <div className="flip-face front">
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span className="tag" style={{ fontSize: 11, padding: '2px 8px' }}>
                      CARD {idx + 1}
                    </span>
                    <span style={{ fontSize: 18 }}>⚖️</span>
                  </div>

                  <span className="icon" aria-hidden="true" style={{ fontSize: 32, marginBottom: 8 }}>
                    ❓
                  </span>

                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.45, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    “{pick(c.situation)}”
                  </span>

                  <div style={{ marginTop: 12, width: '100%', paddingTop: 10, borderTop: '1px dashed var(--line)' }}>
                    <span className="tap-hint" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      ↻ {pick({ en: 'Tap to Reveal Article', hi: 'अनुच्छेद देखने के लिए टैप करें' })}
                    </span>
                  </div>
                </div>

                {/* Back: Constitutional Idea & Article */}
                <div className="flip-face back">
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span className="tag ok" style={{ fontSize: 11, padding: '2px 8px' }}>
                      ✓ {pick({ en: 'REVEALED', hi: 'प्रकट' })}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent)' }}>
                      +10 XP
                    </span>
                  </div>

                  <span className="concept-name" style={{ fontSize: 17, fontWeight: 800, color: 'var(--accent-deep)', margin: '4px 0' }}>
                    {pick(c.title)}
                  </span>

                  <span className="ref" style={{ background: '#ffffff', border: '1.5px solid var(--accent-border)', padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 800, color: 'var(--accent-deep)', margin: '6px 0' }}>
                    📜 {pick(c.provisions[0]?.label)}
                  </span>

                  {c.provisions[0]?.part && (
                    <span className="muted" style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Part {c.provisions[0].part} • Indian Constitution
                    </span>
                  )}

                  <Link
                    to={`/learn/${c.id}`}
                    className="situation-ref"
                    onClick={e => e.stopPropagation()}
                    style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: 'rgba(8,127,110,0.1)', borderRadius: 6 }}
                  >
                    {pick({ en: 'Full Concept Deep Dive', hi: 'विस्तृत अध्ययन' })} →
                  </Link>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div
          className="card"
          style={{
            marginTop: 32,
            background: 'linear-gradient(135deg, #f0fdf4 0%, var(--card) 100%)',
            border: '2px solid var(--ok)',
            textAlign: 'center',
            padding: '28px 24px'
          }}
        >
          <span style={{ fontSize: 40, display: 'block', marginBottom: 8 }}>🎉</span>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px' }}>
            {pick({ en: 'All 6 Cards Completed!', hi: 'सभी 6 कार्ड पूर्ण!' })}
          </h3>
          <p className="muted" style={{ maxWidth: 540, margin: '0 auto 18px', fontSize: 14.5 }}>
            {pick({
              en: 'Great job! You connected all real-life civic dilemmas to their constitutional provisions and earned +40 XP.',
              hi: 'बहुत बढ़िया! आपने सभी वास्तविक नागरिक स्थितियों को उनके संवैधानिक अनुच्छेदों से जोड़ लिया और +40 XP अर्जित किए।'
            })}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={handleShuffleNewDeck}>
              🔄 {pick({ en: 'Shuffle Another Deck', hi: 'दूसरा डेक खेलें' })}
            </button>
            <Link to="/play" className="btn ghost">
              🎮 {pick({ en: 'Explore More Games', hi: 'अन्य खेल देखें' })}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

