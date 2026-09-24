import React, { useState, useEffect, useRef } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { BUILDER_LEVELS } from '../content/constitutionBuilderData.js'
import { recordBuilderLevelCompletion, loadProgress } from '../progress.js'
import CertificateModal from '../components/CertificateModal.jsx'

// Sound synthesizers using Web Audio API (zero external assets required)
function playTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    if (type === 'correct') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(523.25, now) // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08) // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.18) // G5
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.start(now)
      osc.stop(now + 0.35)
    } else if (type === 'incorrect') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'complete') {
      // Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator()
        const noteGain = ctx.createGain()
        noteOsc.connect(noteGain)
        noteGain.connect(ctx.destination)
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1)
        noteGain.gain.setValueAtTime(0.15, now + idx * 0.1)
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4)
        noteOsc.start(now + idx * 0.1)
        noteOsc.stop(now + idx * 0.1 + 0.4)
      })
    }
  } catch {
    /* AudioContext not supported or blocked */
  }
}

export default function BuildConstitution() {
  const { pick } = useLang()

  // Game state
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [levelMistakes, setLevelMistakes] = useState(0)
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [draggedCardId, setDraggedCardId] = useState(null)
  const [dragOverPillarId, setDragOverPillarId] = useState(null)

  // Map of placed card ids: { cardId: pillarId }
  const [placements, setPlacements] = useState({})

  // Feedback explanation banner
  const [feedback, setFeedback] = useState(null) // { isCorrect: boolean, text: string, title: string }

  // Timer
  const [timeLeft, setTimeLeft] = useState(BUILDER_LEVELS[0].targetTimeSeconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [totalSecondsSpent, setTotalSecondsSpent] = useState(0)

  // Modals
  const [showLevelSummary, setShowLevelSummary] = useState(false)
  const [levelSummaryData, setLevelSummaryData] = useState(null)
  const [showGrandResults, setShowGrandResults] = useState(false)
  const [activeCertificate, setActiveCertificate] = useState(null)

  const currentLevel = BUILDER_LEVELS[currentLevelIdx]
  const totalCardsInLevel = currentLevel.cards.length
  const placedCount = Object.keys(placements).length
  const progressPct = Math.round((placedCount / totalCardsInLevel) * 100)

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Shuffled unplaced cards for current level
  const [cardsPool, setCardsPool] = useState([])

  // Initialize level
  useEffect(() => {
    initLevel(currentLevelIdx)
  }, [currentLevelIdx])

  const initLevel = (lvlIdx) => {
    const lvl = BUILDER_LEVELS[lvlIdx]
    setPlacements({})
    setSelectedCardId(null)
    setFeedback(null)
    setLevelMistakes(0)
    setTimeLeft(lvl.targetTimeSeconds)
    setIsTimerRunning(true)
    setShowLevelSummary(false)

    // Shuffle cards
    const shuffled = [...lvl.cards].sort(() => Math.random() - 0.5)
    setCardsPool(shuffled)
  }

  // Timer Countdown
  useEffect(() => {
    if (!isTimerRunning) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
      setTotalSecondsSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerRunning])

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Handle Card Dropping / Placement into a Pillar
  const handlePlaceCard = (cardId, targetPillarId) => {
    if (!cardId || !targetPillarId) return

    const card = currentLevel.cards.find(c => c.id === cardId)
    const pillar = currentLevel.pillars.find(p => p.id === targetPillarId)
    if (!card || !pillar) return

    // Check if card is already placed
    if (placements[cardId]) return

    const isCorrect = card.correctPillarId === targetPillarId

    if (isCorrect) {
      if (soundEnabled) playTone('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const streakBonus = Math.min(newStreak * 5, 25)
      const pointsWon = 50 + streakBonus
      setScore(prev => prev + pointsWon)

      // Add to placed cards
      const nextPlacements = { ...placements, [cardId]: targetPillarId }
      setPlacements(nextPlacements)
      setSelectedCardId(null)

      // Set positive explanation feedback
      setFeedback({
        isCorrect: true,
        title: `${pick({ en: 'Correct Placement!', hi: 'बिल्कुल सही!' })} (+${pointsWon} pts)`,
        text: pick(card.explanation),
        cardTitle: pick(card.title)
      })

      // Check if all cards in level are placed
      if (Object.keys(nextPlacements).length === totalCardsInLevel) {
        handleLevelComplete(nextPlacements)
      }
    } else {
      if (soundEnabled) playTone('incorrect')
      setStreak(0)
      setMistakes(prev => prev + 1)
      setLevelMistakes(prev => prev + 1)
      setScore(prev => Math.max(0, prev - 15))

      // Trigger error vibration / animation on card
      setSelectedCardId(cardId)

      // Set helpful hint explanation
      setFeedback({
        isCorrect: false,
        title: pick({ en: 'Not quite! Think carefully...', hi: 'यह सही नहीं है! ध्यान से सोचें...' }),
        text: pick(card.wrongHint),
        cardTitle: pick(card.title)
      })
    }
  }

  // When all cards in a level are successfully placed
  const handleLevelComplete = (finalPlacements) => {
    setIsTimerRunning(false)
    if (soundEnabled) playTone('complete')

    const timeSpent = currentLevel.targetTimeSeconds - timeLeft
    const accuracy = Math.max(0, Math.round(((totalCardsInLevel) / (totalCardsInLevel + levelMistakes)) * 100))
    const stars = levelMistakes === 0 ? 3 : levelMistakes <= 2 ? 2 : 1

    // Record in progress system
    const result = recordBuilderLevelCompletion({
      level: currentLevel.level,
      score,
      total: totalCardsInLevel,
      mistakes: levelMistakes,
      durationSeconds: timeSpent
    })

    const summary = {
      level: currentLevel.level,
      levelTitle: pick(currentLevel.title),
      stars,
      accuracy,
      timeSpent,
      mistakes: levelMistakes,
      xpEarned: result.xpEarned,
      certificateAwarded: result.certificateAwarded,
      isFinalLevel: currentLevelIdx === BUILDER_LEVELS.length - 1
    }

    setLevelSummaryData(summary)
    setShowLevelSummary(true)

    if (result.certificateAwarded) {
      setActiveCertificate(result.certificateAwarded)
    }
  }

  // Go to next level or grand completion
  const handleNextLevel = () => {
    setShowLevelSummary(false)
    if (currentLevelIdx < BUILDER_LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1)
    } else {
      setShowGrandResults(true)
    }
  }

  // Restart current level
  const handleRestartLevel = () => {
    initLevel(currentLevelIdx)
  }

  // Restart entire game from Level 1
  const handleRestartGame = () => {
    setScore(0)
    setStreak(0)
    setMistakes(0)
    setTotalSecondsSpent(0)
    setCurrentLevelIdx(0)
    setShowGrandResults(false)
    setShowLevelSummary(false)
    initLevel(0)
  }

  // HTML5 Drag and Drop Handlers
  const onDragStart = (e, cardId) => {
    e.dataTransfer.setData('text/plain', cardId)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedCardId(cardId)
    setSelectedCardId(cardId)
  }

  const onDragOver = (e, pillarId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dragOverPillarId !== pillarId) {
      setDragOverPillarId(pillarId)
    }
  }

  const onDragLeave = (e, pillarId) => {
    if (dragOverPillarId === pillarId) {
      setDragOverPillarId(null)
    }
  }

  const onDrop = (e, pillarId) => {
    e.preventDefault()
    setDragOverPillarId(null)
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId
    setDraggedCardId(null)
    if (cardId) {
      handlePlaceCard(cardId, pillarId)
    }
  }

  // Click / Tap card selection for mobile & trackpads
  const handleCardClick = (cardId) => {
    if (placements[cardId]) return // already placed
    if (selectedCardId === cardId) {
      setSelectedCardId(null) // deselect
    } else {
      setSelectedCardId(cardId)
    }
  }

  // Click / Tap pillar to place selected card
  const handlePillarClick = (pillarId) => {
    if (selectedCardId) {
      handlePlaceCard(selectedCardId, pillarId)
    }
  }

  // Filter unplaced cards
  const unplacedCards = cardsPool.filter(c => !placements[c.id])

  return (
    <div className="wrap builder-game-page">
      {/* Top Header & Navigation */}
      <div className="builder-header-nav">
        <Link to="/play" className="back-link">
          ← {pick({ en: 'Back to Games', hi: 'खेलों पर लौटें' })}
        </Link>
        <div className="builder-tools">
          <button
            className="tool-btn sound-toggle-btn"
            onClick={() => setSoundEnabled(prev => !prev)}
            title="Toggle sound effects"
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
          </button>
          <button
            className="tool-btn reset-level-btn"
            onClick={handleRestartLevel}
            title="Restart current level"
          >
            🔄 {pick({ en: 'Restart Level', hi: 'पुनः आरंभ करें' })}
          </button>
        </div>
      </div>

      {/* Game HUD Bar */}
      <div className="builder-hud-card">
        {/* Level Indicator */}
        <div className="hud-level-info">
          <span className="hud-kicker">
            LEVEL {currentLevel.level} / {BUILDER_LEVELS.length}
          </span>
          <h2 className="hud-title">{pick(currentLevel.title)}</h2>
          <p className="hud-sub">{pick(currentLevel.subtitle)}</p>
        </div>

        {/* Score & Multiplier */}
        <div className="hud-stats-group">
          <div className="hud-stat-box score-box">
            <span className="stat-label">{pick({ en: 'SCORE', hi: 'अंक' })}</span>
            <span className="stat-value">{score}</span>
          </div>

          <div className={`hud-stat-box streak-box ${streak >= 3 ? 'streak-active' : ''}`}>
            <span className="stat-label">{pick({ en: 'STREAK', hi: 'क्रम' })}</span>
            <span className="stat-value">
              {streak > 0 ? `🔥 ${streak}x` : '—'}
            </span>
          </div>

          <div className={`hud-stat-box timer-box ${timeLeft <= 30 ? 'timer-warning' : ''}`}>
            <span className="stat-label">{pick({ en: 'TIMER', hi: 'समय' })}</span>
            <span className="stat-value">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="builder-progress-section">
        <div className="progress-labels">
          <span>
            {pick({ en: 'Constitution Assembled', hi: 'संविधान ढांचा निर्मित' })}: <strong>{placedCount} / {totalCardsInLevel}</strong>
          </span>
          <span className="progress-pct-badge">{progressPct}%</span>
        </div>
        <div className="builder-progress-track">
          <div
            className="builder-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Educational Feedback Banner */}
      {feedback && (
        <div className={`builder-feedback-banner ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-icon" aria-hidden="true">
            {feedback.isCorrect ? '✅' : '💡'}
          </div>
          <div className="feedback-body">
            <div className="feedback-header">
              <strong className="feedback-title">{feedback.title}</strong>
              {feedback.cardTitle && (
                <span className="feedback-card-pill">{feedback.cardTitle}</span>
              )}
            </div>
            <p className="feedback-text">{feedback.text}</p>
          </div>
          <button
            className="feedback-dismiss-btn"
            onClick={() => setFeedback(null)}
            aria-label="Dismiss feedback"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tap-to-Place Instruction Bar for Mobile/Touch */}
      {selectedCardId && (
        <div className="builder-selected-indicator">
          <span className="pulse-dot" />
          <span>
            {pick({
              en: 'Card selected! Tap the correct pillar above to place it.',
              hi: 'कार्ड चयनित! इसे रखने के लिए ऊपर सही स्तंभ पर टैप करें।'
            })}
          </span>
          <button
            className="btn ghost small"
            style={{ padding: '2px 8px', fontSize: 12, marginLeft: 'auto' }}
            onClick={() => setSelectedCardId(null)}
          >
            {pick({ en: 'Cancel', hi: 'रद्द' })}
          </button>
        </div>
      )}

      {/* The Pillars Architecture Board */}
      <div className="builder-pillars-grid">
        {currentLevel.pillars.map(pillar => {
          const placedInPillar = currentLevel.cards.filter(c => placements[c.id] === pillar.id)
          const isFull = placedInPillar.length >= pillar.capacity
          const isOver = dragOverPillarId === pillar.id
          const canAcceptTap = Boolean(selectedCardId && !isFull)

          return (
            <div
              key={pillar.id}
              className={`pillar-dropzone ${isOver ? 'drag-over' : ''} ${isFull ? 'pillar-full' : ''} ${canAcceptTap ? 'ready-to-tap' : ''}`}
              style={{ '--pillar-color': pillar.color }}
              onDragOver={e => onDragOver(e, pillar.id)}
              onDragLeave={e => onDragLeave(e, pillar.id)}
              onDrop={e => onDrop(e, pillar.id)}
              onClick={() => handlePillarClick(pillar.id)}
              role="button"
              tabIndex={0}
              aria-label={`Pillar: ${pick(pillar.title)}`}
            >
              <div className="pillar-header">
                <div className="pillar-icon-badge">{pillar.icon}</div>
                <div className="pillar-titles">
                  <h3 className="pillar-title">{pick(pillar.title)}</h3>
                  <span className="pillar-sub">{pick(pillar.subtitle)}</span>
                </div>
                <div className="pillar-capacity-tag">
                  {placedInPillar.length} / {pillar.capacity}
                </div>
              </div>

              {/* Slot Target Area */}
              <div className="pillar-slots">
                {placedInPillar.length === 0 ? (
                  <div className="pillar-empty-slot">
                    <span className="slot-instruction">
                      {selectedCardId
                        ? pick({ en: '👉 Tap here to place card', hi: '👉 कार्ड रखने के लिए यहाँ टैप करें' })
                        : pick({ en: 'Drop or tap cards here', hi: 'कार्ड यहाँ खींचें या टैप करें' })}
                    </span>
                  </div>
                ) : (
                  placedInPillar.map(card => (
                    <div key={card.id} className="pillar-locked-card">
                      <div className="locked-card-top">
                        <span className="locked-card-tag">{pick(card.tag)}</span>
                        <span className="locked-check">✓</span>
                      </div>
                      <div className="locked-card-title">{pick(card.title)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Draggable Cards Deck Pool */}
      <section className="builder-deck-section">
        <div className="deck-header-row">
          <div>
            <h3 className="deck-title">
              {pick({ en: 'Constitutional Elements Deck', hi: 'संवैधानिक तत्व कार्ड' })}
            </h3>
            <p className="deck-hint">
              {pick({
                en: 'Drag each element to its constitutional pillar, or tap a card and tap its target pillar.',
                hi: 'प्रत्येक तत्व को उसके सही संवैधानिक स्तंभ में खींचें, या कार्ड पर टैप कर उसके स्तंभ पर टैप करें।'
              })}
            </p>
          </div>
          <span className="deck-remaining-pill">
            {unplacedCards.length} {pick({ en: 'unplaced', hi: 'शेष' })}
          </span>
        </div>

        {unplacedCards.length === 0 ? (
          <div className="deck-empty-state">
            <span className="empty-emoji">🎉</span>
            <h4>{pick({ en: 'All elements placed in this level!', hi: 'इस स्तर के सभी तत्व सही स्थान पर हैं!' })}</h4>
          </div>
        ) : (
          <div className="builder-cards-pool">
            {unplacedCards.map(card => {
              const isSelected = selectedCardId === card.id
              const isDragging = draggedCardId === card.id

              return (
                <div
                  key={card.id}
                  className={`builder-card ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
                  draggable
                  onDragStart={e => onDragStart(e, card.id)}
                  onClick={() => handleCardClick(card.id)}
                  tabIndex={0}
                  role="button"
                >
                  <div className="card-top-row">
                    <span className="card-tag">{pick(card.tag)}</span>
                    <span className="card-drag-handle" title="Drag element">⠿</span>
                  </div>

                  <div className="card-main-title">{pick(card.title)}</div>

                  <div className="card-bottom-hint">
                    {isSelected ? (
                      <span className="tap-hint active">
                        {pick({ en: '✓ Selected (Tap Pillar)', hi: '✓ चयनित (स्तंभ चुनें)' })}
                      </span>
                    ) : (
                      <span className="tap-hint">
                        {pick({ en: 'Drag or Tap', hi: 'खींचें या टैप करें' })}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Mid-Game Level Summary Modal */}
      {showLevelSummary && levelSummaryData && (
        <div className="modal-backdrop">
          <div className="modal-card level-summary-modal">
            <div className="summary-trophy-ring">
              <span className="trophy-emoji">🏆</span>
            </div>

            <span className="summary-kicker">LEVEL {levelSummaryData.level} COMPLETED!</span>
            <h2 className="summary-title">{levelSummaryData.levelTitle}</h2>

            {/* Stars Rating */}
            <div className="summary-stars-row">
              <span className={`star-item ${levelSummaryData.stars >= 1 ? 'active' : ''}`}>⭐</span>
              <span className={`star-item ${levelSummaryData.stars >= 2 ? 'active' : ''}`}>⭐</span>
              <span className={`star-item ${levelSummaryData.stars >= 3 ? 'active' : ''}`}>⭐</span>
            </div>

            {/* Stats Grid */}
            <div className="summary-stats-grid">
              <div className="summary-stat-box">
                <span className="summary-stat-num">{levelSummaryData.accuracy}%</span>
                <span className="summary-stat-lbl">{pick({ en: 'Accuracy', hi: 'सटीकता' })}</span>
              </div>
              <div className="summary-stat-box">
                <span className="summary-stat-num">{formatTime(levelSummaryData.timeSpent)}</span>
                <span className="summary-stat-lbl">{pick({ en: 'Time Taken', hi: 'समय' })}</span>
              </div>
              <div className="summary-stat-box highlight">
                <span className="summary-stat-num">+{levelSummaryData.xpEarned} XP</span>
                <span className="summary-stat-lbl">{pick({ en: 'XP Earned', hi: 'अर्जित XP' })}</span>
              </div>
            </div>

            {/* Certificate Unlocked Callout */}
            {levelSummaryData.certificateAwarded && (
              <div className="cert-unlocked-callout">
                <span className="callout-icon">🎓</span>
                <div className="callout-text">
                  <strong>{pick({ en: 'Official E-Certificate Unlocked!', hi: 'आधिकारिक ई-प्रमाणपत्र प्राप्त!' })}</strong>
                  <p>
                    {pick({
                      en: 'You have earned the prestigious "Certified Constitutional Architect" award for your LinkedIn profile!',
                      hi: 'आपने अपने लिंक्डइन प्रोफाइल के लिए "प्रमाणित संविधान निर्माता" प्रमाणपत्र अर्जित कर लिया है!'
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="summary-actions">
              {levelSummaryData.certificateAwarded && (
                <button
                  className="btn primary cert-claim-btn"
                  onClick={() => setActiveCertificate(levelSummaryData.certificateAwarded)}
                >
                  🎓 {pick({ en: 'View & Share Certificate', hi: 'प्रमाणपत्र देखें व शेयर करें' })}
                </button>
              )}

              <button
                className="btn primary next-level-btn"
                onClick={handleNextLevel}
                autoFocus
              >
                {levelSummaryData.isFinalLevel
                  ? pick({ en: 'View Grand Results 🎉', hi: 'अंतिम परिणाम देखें 🎉' })
                  : pick({ en: `Next: Level ${levelSummaryData.level + 1} →`, hi: `अगला: स्तर ${levelSummaryData.level + 1} →` })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grand Completion Screen */}
      {showGrandResults && (
        <div className="modal-backdrop">
          <div className="modal-card grand-completion-modal">
            <div className="grand-badge-glow" />
            <div className="grand-seal-ring">
              <span className="seal-emoji">🇮🇳</span>
            </div>

            <span className="grand-kicker">CONSTITUTION COMPLETED!</span>
            <h1 className="grand-title">
              {pick({ en: 'Master Constitutional Architect', hi: 'प्रधान संविधान निर्माता' })}
            </h1>

            <p className="grand-desc">
              {pick({
                en: 'Congratulations! You have successfully assembled the foundational values, tripartite governance organs, and constitutional watchdogs of the Republic of India.',
                hi: 'बधाई हो! आपने भारतीय गणराज्य के आधारभूत मूल्यों, तीनों शासन अंगों और संवैधानिक संस्थाओं को सफलतापूर्वक पूर्ण कर लिया है।'
              })}
            </p>

            <div className="grand-score-banner">
              <div className="grand-score-item">
                <span className="grand-val">{score}</span>
                <span className="grand-lbl">{pick({ en: 'FINAL SCORE', hi: 'कुल अंक' })}</span>
              </div>
              <div className="grand-score-divider" />
              <div className="grand-score-item highlight">
                <span className="grand-val">26 / 26</span>
                <span className="grand-lbl">{pick({ en: 'CARDS PLACED', hi: 'स्थापित कार्ड' })}</span>
              </div>
              <div className="grand-score-divider" />
              <div className="grand-score-item">
                <span className="grand-val">{formatTime(totalSecondsSpent)}</span>
                <span className="grand-lbl">{pick({ en: 'TOTAL TIME', hi: 'कुल समय' })}</span>
              </div>
            </div>

            <div className="grand-cert-cta-card">
              <div className="cta-left">
                <span className="cta-icon">📜</span>
                <div>
                  <strong>{pick({ en: 'Your Verified E-Certificate is Ready', hi: 'आपका सत्यापित ई-प्रमाणपत्र तैयार है' })}</strong>
                  <p>{pick({ en: 'Post your verified achievement on LinkedIn or download as a PDF.', hi: 'अपनी उपलब्धि को लिंक्डइन पर पोस्ट करें या PDF डाउनलोड करें।' })}</p>
                </div>
              </div>
              <button
                className="btn primary"
                onClick={() => {
                  const p = loadProgress()
                  const cert = p.certificates?.find(c => c.id === 'cert-constitution-architect') || {
                    id: 'cert-constitution-architect',
                    title: { en: 'Certified Constitutional Architect', hi: 'प्रमाणित संविधान निर्माता' }
                  }
                  setActiveCertificate(cert)
                }}
              >
                🎓 {pick({ en: 'Claim & Share', hi: 'प्राप्त करें व शेयर करें' })}
              </button>
            </div>

            <div className="grand-actions-row">
              <button className="btn ghost" onClick={handleRestartGame}>
                🔄 {pick({ en: 'Play Again', hi: 'पुनः खेलें' })}
              </button>
              <Link to="/profile" className="btn ghost">
                👤 {pick({ en: 'Go to Profile', hi: 'प्रोफ़ाइल देखें' })}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Official Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  )
}
