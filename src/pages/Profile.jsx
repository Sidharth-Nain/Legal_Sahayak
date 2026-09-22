import React, { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { loadProgress, resetProgress } from '../progress.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { t, pick } = useLang()
  const { user, openSignIn, logout, isConfigured } = useAuth()
  const [p, setP] = useState(() => loadProgress())
  const [resetConfirm, setResetConfirm] = useState(false)

  useEffect(() => {
    const handleUpdate = (e) => {
      setP(e.detail || loadProgress())
    }
    window.addEventListener('ls-progress-update', handleUpdate)
    return () => window.removeEventListener('ls-progress-update', handleUpdate)
  }, [])

  // Update whenever user context changes
  useEffect(() => {
    setP(loadProgress())
  }, [user])

  const total = concepts.length
  const done = p.conceptsDone?.length || 0
  const pct = total ? Math.round((done / total) * 100) : 0

  const badgeNames = {
    badgeQuizStar: 'badgeQuizStar',
    badgeWheelMaster: 'badgeWheelMaster',
    badgeCardSharp: 'badgeCardSharp',
    badgeFirstSteps: 'badgeFirstSteps',
  }

  const getInitials = (name) => {
    if (!name) return 'C'
    const parts = name.trim().split(' ')
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase()
  }

  return (
    <div className="wrap profile-page" style={{ paddingBottom: 50 }}>
      {/* Profile Header & Account Card */}
      <div className="profile-hero">
        <div className="profile-user-card">
          <div className="profile-avatar-box">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitials(user?.displayName)}
              </div>
            )}
          </div>

          <div className="profile-user-info">
            <div className="profile-name-row">
              <h2>{user?.displayName || (user ? 'Citizen' : pick({ en: 'Guest Citizen', hi: 'अतिथि नागरिक' }))}</h2>
              {user && !user.isAnonymous ? (
                <span className="profile-sync-tag cloud">
                  {isConfigured ? '☁️ ' + t('cloudSynced') : '📱 Local Account'}
                </span>
              ) : (
                <span className="profile-sync-tag guest">
                  👤 {t('guest')}
                </span>
              )}
            </div>

            <p className="profile-email-sub">
              {user?.email || (user?.isAnonymous ? t('guestNotice') : pick({ en: 'Sign in to access your personal dashboard from any device.', hi: 'किसी भी उपकरण से अपने डैशबोर्ड तक पहुँचने के लिए साइन इन करें।' }))}
            </p>

            <div className="profile-actions-row">
              {user ? (
                <>
                  {user.isAnonymous && (
                    <button className="btn primary small" onClick={openSignIn}>
                      ✨ {t('signIn')} / {t('signUp')}
                    </button>
                  )}
                  <button className="btn ghost small" onClick={logout}>
                    🚪 {t('signOut')}
                  </button>
                </>
              ) : (
                <button className="btn primary small" onClick={openSignIn}>
                  🔑 {t('signIn')} / {t('signUp')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guest or Not Configured Notice */}
      {(!user || user.isAnonymous) && (
        <div className="profile-banner-callout">
          <span className="banner-icon" aria-hidden="true">💡</span>
          <div className="banner-content">
            <strong>{t('guestNotice')}</strong>
            <p style={{ margin: '4px 0 0', fontSize: 13.5 }}>
              {pick({
                en: 'Your progress is currently saved in this browser only. Creating a free account links your quiz points, streak, and badges to you.',
                hi: 'आपकी प्रगति वर्तमान में केवल इस ब्राउज़र में सुरक्षित है। खाता बनाने से आपके अंक, लय और बैज आपके साथ जुड़ जाते हैं।'
              })}
            </p>
          </div>
          <button className="btn primary small banner-cta" onClick={openSignIn}>
            {t('signIn')}
          </button>
        </div>
      )}

      {/* Stats Section */}
      <section className="block">
        <h3 className="section-title">{pick({ en: 'Your Learning Stats', hi: 'आपके अध्ययन आँकड़े' })}</h3>
        <div className="stat-row">
          <div className="stat">
            <div className="num">{p.points || 0}</div>
            <div className="lbl">{t('points')}</div>
          </div>
          <div className="stat">
            <div className="num">{done}/{total}</div>
            <div className="lbl">{t('conceptsDone')}</div>
          </div>
          <div className="stat">
            <div className="num">{p.streak?.count || 0}</div>
            <div className="lbl">{t('streak')}</div>
          </div>
        </div>

        {/* Learning Progress Bar */}
        <div className="card" style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{t('conceptsDone')}</strong>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
          </div>
          <div className="progress-bar" style={{ marginTop: 10 }}>
            <div style={{ width: `${pct}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 8, fontSize: 13 }}>
            {done} {pick({ en: 'of', hi: 'में से' })} {total} {t('conceptsCount')} {pick({ en: 'mastered so far', hi: 'अब तक पूर्ण' })}
          </p>
        </div>
      </section>

      {/* Badges Section */}
      <section className="block">
        <div className="section-title">{t('badges')}</div>
        <div className="card">
          {(!p.badges || p.badges.length === 0) ? (
            <p className="muted">{t('noBadges')}</p>
          ) : (
            <div className="badge-grid">
              {p.badges.map(b => (
                <span className="badge-pill" key={b}>
                  🏅 {t(badgeNames[b] || '') || b}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reset Progress Confirmation Section */}
      <section className="block" style={{ marginTop: 20 }}>
        {resetConfirm ? (
          <div className="reset-confirm-box">
            <p>{pick({ en: 'Are you sure you want to reset all your progress and badges?', hi: 'क्या आप अपनी सारी प्रगति और बैज रीसेट करना चाहते हैं?' })}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button
                className="btn danger small"
                onClick={() => {
                  resetProgress()
                  setP(loadProgress())
                  setResetConfirm(false)
                }}
              >
                {pick({ en: 'Yes, Reset', hi: 'हाँ, रीसेट करें' })}
              </button>
              <button className="btn ghost small" onClick={() => setResetConfirm(false)}>
                {pick({ en: 'Cancel', hi: 'रद्द करें' })}
              </button>
            </div>
          </div>
        ) : (
          <button className="btn ghost small" onClick={() => setResetConfirm(true)}>
            🔄 {t('restart')} ({pick({ en: 'Reset progress', hi: 'प्रगति रीसेट करें' })})
          </button>
        )}
      </section>
    </div>
  )
}
