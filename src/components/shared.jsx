import React, { useState, useEffect } from 'react'
import { Link, useRoute } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { speak, stopSpeech } from '../speech.js'
import { useAuth } from '../context/AuthContext.jsx'
import { loadProgress } from '../progress.js'
import { getLevelDetails } from '../gamification.js'

export function ChakraIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" />
      <g stroke="currentColor" strokeWidth="1.6">
        <line x1="24" y1="5" x2="24" y2="43" /><line x1="5" y1="24" x2="43" y2="24" />
        <line x1="10.4" y1="10.4" x2="37.6" y2="37.6" /><line x1="37.6" y1="10.4" x2="10.4" y2="37.6" />
        <line x1="16.4" y1="6.4" x2="31.6" y2="41.6" /><line x1="31.6" y1="6.4" x2="16.4" y2="41.6" />
        <line x1="6.4" y1="16.4" x2="41.6" y2="31.6" /><line x1="41.6" y1="16.4" x2="6.4" y2="31.6" />
      </g>
      <circle cx="24" cy="24" r="3.4" fill="currentColor" />
    </svg>
  )
}

export function Watermark() {
  return (
    <svg className="watermark" width="240" height="240" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="none" stroke="#087F6E" strokeWidth="2" />
      <g stroke="#087F6E" strokeWidth="1">
        <line x1="24" y1="5" x2="24" y2="43" /><line x1="5" y1="24" x2="43" y2="24" />
        <line x1="10.4" y1="10.4" x2="37.6" y2="37.6" /><line x1="37.6" y1="10.4" x2="10.4" y2="37.6" />
      </g>
      <circle cx="24" cy="24" r="2.6" fill="#087F6E" />
    </svg>
  )
}

export function Header({ textsize, setTextsize }) {
  const { t, lang, setLang, pick } = useLang()
  const { user, openSignIn, logout } = useAuth()
  const route = useRoute()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [progress, setProgress] = useState(() => loadProgress())

  // Listen to progress updates reactively
  useEffect(() => {
    const handleUpdate = (e) => {
      setProgress(e.detail || loadProgress())
    }
    window.addEventListener('ls-progress-update', handleUpdate)
    return () => window.removeEventListener('ls-progress-update', handleUpdate)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setMenuOpen(false)
    setMobileNavOpen(false)
  }, [route])

  const active = (path) => (route === path || route.startsWith(path + '/') ? 'active' : '')
  const cycle = () => setTextsize(textsize === 'base' ? 'lg' : textsize === 'lg' ? 'xl' : 'base')

  const getInitials = (name) => {
    if (!name) return 'C'
    const parts = name.trim().split(' ')
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase()
  }

  const xp = progress.xp || progress.points || 0
  const lvlInfo = getLevelDetails(xp)

  return (
    <header className="site-header">
      <div className="wrap bar">
        {/* Brand / Logo */}
        <Link to="/" className="brand" aria-label="Legal Sahayak home">
          <div className="brand-icon-wrap" aria-hidden="true">
            <ChakraIcon size={24} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Legal Sahayak</span>
            <span className="brand-subtitle">{pick({ en: 'Civic Academy', hi: 'संवैधानिक साक्षरता' })}</span>
          </div>
        </Link>

        {/* Desktop Main Navigation Tabs */}
        <nav className="main-nav" aria-label="Main Navigation">
          <Link to="/learn" className={active('/learn')}>📖 {t('navLearn')}</Link>
          <Link to="/play" className={active('/play')}>🎮 {t('navPlay')}</Link>
          <Link to="/profile" className={active('/profile')}>🏆 {t('navProfile')}</Link>
          <Link to="/about" className={active('/about')}>ℹ️ {t('navAbout')}</Link>
        </nav>

        {/* Header Tools & Status */}
        <div className="header-tools">
          {/* Accessibility text size switch */}
          <button className="tool-btn" onClick={cycle} title="Text size" aria-label="Change text size">
            {textsize === 'base' ? 'A' : textsize === 'lg' ? 'A+' : 'A++'}
          </button>

          {/* Bilingual Switcher */}
          <button
            className="tool-btn lang-btn"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            aria-label="Change language"
          >
            {lang === 'en' ? '🇮🇳 हिन्दी' : '🌐 English'}
          </button>

          {/* Gamification Progress Pill */}
          <Link to="/profile" className="header-gamify-pill" title={`${pick(lvlInfo.title)} · ${xp} XP`}>
            <span className="header-lvl-tag">Lv.{lvlInfo.level}</span>
            <span className="header-xp-val">{xp.toLocaleString()} XP</span>
          </Link>

          {/* User Auth Menu */}
          {user ? (
            <div className="user-menu-container">
              <button
                className="user-pill-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="User menu"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="user-avatar-img" />
                ) : (
                  <span className="user-avatar-initials">
                    {getInitials(user.displayName)}
                  </span>
                )}
                <span className="user-name-short">{user.displayName || 'Citizen'}</span>
                <span className="user-menu-arrow">▾</span>
              </button>

              {menuOpen && (
                <>
                  <div className="user-menu-backdrop" onClick={() => setMenuOpen(false)} />
                  <div className="user-dropdown-menu">
                    <div className="user-dropdown-header">
                      <strong>{user.displayName || 'Citizen'}</strong>
                      <span className="user-dropdown-email">{user.email || (user.isAnonymous ? t('guest') : '')}</span>
                      <div className="dropdown-lvl-row">
                        <span className="dropdown-lvl-badge">Level {lvlInfo.level}</span>
                        <span className="dropdown-lvl-title">{pick(lvlInfo.title)}</span>
                      </div>
                    </div>
                    <div className="user-dropdown-links">
                      <Link to="/profile" className="user-dropdown-item" onClick={() => setMenuOpen(false)}>
                        👤 {t('navProfile')}
                      </Link>
                      <button
                        className="user-dropdown-item signout-item"
                        onClick={() => { logout(); setMenuOpen(false) }}
                      >
                        🚪 {t('signOut')}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              className="btn primary small auth-header-btn"
              onClick={openSignIn}
              aria-label="Sign In"
            >
              🔑 {t('signIn')}
            </button>
          )}

          {/* Mobile Navigation Toggle Button */}
          <button
            className="tool-btn mobile-menu-toggle-btn"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle mobile menu"
            style={{ display: 'none' }}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div className="mobile-nav-drawer" style={{ background: '#fff', borderBottom: '1px solid var(--line)', padding: '12px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/learn" className={`btn ghost small ${active('/learn')}`} onClick={() => setMobileNavOpen(false)}>
              📖 {t('navLearn')}
            </Link>
            <Link to="/play" className={`btn ghost small ${active('/play')}`} onClick={() => setMobileNavOpen(false)}>
              🎮 {t('navPlay')}
            </Link>
            <Link to="/profile" className={`btn ghost small ${active('/profile')}`} onClick={() => setMobileNavOpen(false)}>
              🏆 {t('navProfile')}
            </Link>
            <Link to="/about" className={`btn ghost small ${active('/about')}`} onClick={() => setMobileNavOpen(false)}>
              ℹ️ {t('navAbout')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const { t, pick } = useLang()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>🇮🇳</span>
            <strong style={{ color: 'var(--ink)' }}>Legal Sahayak</strong>
            <span className="muted" style={{ fontSize: 12 }}>— {pick({ en: 'Civic & Constitutional Education for Young Citizens', hi: 'युवा नागरिकों के लिए संवैधानिक साक्षरता मंच' })}</span>
          </div>

          <div className="footer-links">
            <Link to="/learn">{t('navLearn')}</Link>
            <Link to="/play">{t('navPlay')}</Link>
            <Link to="/profile">{t('navProfile')}</Link>
            <Link to="/about">{t('navAbout')}</Link>
          </div>
        </div>

        <div className="footer-disclaimer-text">
          <p>
            {pick({
              en: 'Official primary sources: Legislative Department, Ministry of Law & Justice (legislative.gov.in) and India Code (indiacode.nic.in). Designed for educational awareness under Article 51A(h) of the Constitution of India.',
              hi: 'आधिकारिक प्राथमिक स्रोत: विधायी विभाग, विधि एवं न्याय मंत्रालय (legislative.gov.in) और इंडिया कोड (indiacode.nic.in)। भारतीय संविधान के अनुच्छेद 51A(h) के तहत शैक्षिक जागरूकता हेतु निर्मित।'
            })}
          </p>
          <p style={{ marginTop: 4, color: 'var(--ink-faint)' }}>
            Smart India Hackathon 2026 · Problem Statement SIH1703 · Team TechGeeks
          </p>
        </div>
      </div>
    </footer>
  )
}

export function ListenButton({ text }) {
  const { t, lang } = useLang()
  const [busy, setBusy] = useState(false)
  const on = () => {
    if (busy) { stopSpeech(); setBusy(false); return }
    setBusy(true)
    speak(text, lang, () => setBusy(false))
  }
  return (
    <button className="listen-btn" onClick={on} title="Read aloud">
      {busy ? `⏹ ${t('stop')}` : `🔊 ${t('listen')}`}
    </button>
  )
}
