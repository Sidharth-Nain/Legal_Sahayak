import React, { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'
import { getLevelDetails } from '../gamification.js'

export default function GamificationOverlays() {
  const { pick } = useLang()
  const [toasts, setToasts] = useState([])
  const [levelUpData, setLevelUpData] = useState(null)
  const [badgeData, setBadgeData] = useState(null)

  // Listen to XP toasts
  useEffect(() => {
    const handleToast = (e) => {
      const { amount, title } = e.detail || {}
      if (!amount) return
      const id = Date.now() + Math.random()
      setToasts(prev => [...prev.slice(-3), { id, amount, title }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3500)
    }

    const handleLevelUp = (e) => {
      setLevelUpData(e.detail)
    }

    const handleBadge = (e) => {
      setBadgeData(e.detail)
    }

    window.addEventListener('ls-gamification-toast', handleToast)
    window.addEventListener('ls-level-up', handleLevelUp)
    window.addEventListener('ls-badge-unlocked', handleBadge)

    return () => {
      window.removeEventListener('ls-gamification-toast', handleToast)
      window.removeEventListener('ls-level-up', handleLevelUp)
      window.removeEventListener('ls-badge-unlocked', handleBadge)
    }
  }, [])

  return (
    <>
      {/* Floating XP Toasts */}
      <div className="xp-toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className="xp-toast">
            <span className="xp-toast-pill">+{t.amount} XP</span>
            <span className="xp-toast-label">{pick(t.title)}</span>
          </div>
        ))}
      </div>

      {/* Level Up Celebration Modal */}
      {levelUpData && (
        <div className="modal-backdrop" onClick={() => setLevelUpData(null)}>
          <div className="modal-card gamify-modal level-up-modal" onClick={e => e.stopPropagation()}>
            <div className="gamify-modal-glow" />
            <div className="gamify-modal-badge-ring">
              <span className="modal-large-emoji">🎉</span>
            </div>
            
            <span className="gamify-kicker">LEVEL UP!</span>
            <h2 className="gamify-title">LEVEL {levelUpData.level}</h2>
            <div className="gamify-level-name">“{pick(levelUpData.title)}”</div>

            {levelUpData.bonusXp > 0 && (
              <div className="gamify-bonus-pill">
                ⭐ +{levelUpData.bonusXp} XP Milestone Reward!
              </div>
            )}

            <p className="gamify-sub">
              {pick({
                en: 'Your dedication to understanding the Indian Constitution has reached a new height!',
                hi: 'भारतीय संविधान को समझने का आपका समर्पण एक नए स्तर पर पहुँच गया है!'
              })}
            </p>

            <button
              className="btn primary gamify-btn"
              onClick={() => setLevelUpData(null)}
              autoFocus
            >
              {pick({ en: 'Continue Learning →', hi: 'सीखना जारी रखें →' })}
            </button>
          </div>
        </div>
      )}

      {/* Badge Unlocked Modal */}
      {badgeData && (
        <div className="modal-backdrop" onClick={() => setBadgeData(null)}>
          <div className="modal-card gamify-modal badge-unlock-modal" onClick={e => e.stopPropagation()}>
            <div className="gamify-modal-glow badge-glow" />
            <div className="gamify-modal-badge-ring">
              <span className="modal-large-emoji">{badgeData.badge?.icon || '🏅'}</span>
            </div>

            <span className="gamify-kicker">BADGE UNLOCKED!</span>
            <h2 className="gamify-title">{pick(badgeData.badge?.name)}</h2>
            <p className="gamify-req">{pick(badgeData.badge?.requirement)}</p>

            <div className="gamify-rarity-row">
              <span className={`rarity-tag ${badgeData.badge?.rarity?.toLowerCase()}`}>
                {badgeData.badge?.rarity}
              </span>
              <span className="badge-xp-reward-tag">
                +{badgeData.xpReward} XP
              </span>
            </div>

            <button
              className="btn primary gamify-btn"
              onClick={() => setBadgeData(null)}
              autoFocus
            >
              {pick({ en: 'Awesome!', hi: 'शानदार!' })}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
