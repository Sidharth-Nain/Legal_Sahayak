import React, { useState } from 'react'
import { Link, useRoute } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { speak, stopSpeech } from '../speech.js'

export function ChakraIcon({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="3" />
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
      <circle cx="24" cy="24" r="21" fill="none" stroke="#1e2a3a" strokeWidth="2" />
      <g stroke="#1e2a3a" strokeWidth="1">
        <line x1="24" y1="5" x2="24" y2="43" /><line x1="5" y1="24" x2="43" y2="24" />
        <line x1="10.4" y1="10.4" x2="37.6" y2="37.6" /><line x1="37.6" y1="10.4" x2="10.4" y2="37.6" />
      </g>
      <circle cx="24" cy="24" r="2.6" fill="#1e2a3a" />
    </svg>
  )
}

export function Header({ textsize, setTextsize }) {
  const { t, lang, setLang } = useLang()
  const route = useRoute()
  const active = (path) => (route === path || route.startsWith(path + '/') ? 'active' : '')
  const cycle = () => setTextsize(textsize === 'base' ? 'lg' : textsize === 'lg' ? 'xl' : 'base')
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link to="/" className="brand" aria-label="Legal Sahayak home">
          <ChakraIcon />
          <h1>Legal Sahayak</h1>
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link to="/learn" className={active('/learn')}>{t('navLearn')}</Link>
          <Link to="/play" className={active('/play')}>{t('navPlay')}</Link>
          <Link to="/about" className={active('/about')}>{t('navAbout')}</Link>
          <Link to="/profile" className={active('/profile')}>{t('navProfile')}</Link>
        </nav>
        <div className="header-tools">
          <button className="tool-btn" onClick={cycle} title="Text size" aria-label="Change text size">
            {textsize === 'base' ? 'A' : textsize === 'lg' ? 'A+' : 'A++'}
          </button>
          <button
            className="tool-btn lang-btn"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            aria-label="Change language"
          >
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          Official sources:{' '}
          <a href="https://legislative.gov.in/constitution-of-india/" target="_blank" rel="noopener noreferrer">legislative.gov.in</a>
          {' · '}
          <a href="https://www.indiacode.nic.in/" target="_blank" rel="noopener noreferrer">indiacode.nic.in</a>
          {' · '}<Link to="/about">{t('navAbout')}</Link>
        </p>
        <p className="disclaimer">{t('disclaimer')}</p>
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
    <button className="listen-btn" onClick={on}>
      {busy ? t('stop') : t('listen')}
    </button>
  )
}
