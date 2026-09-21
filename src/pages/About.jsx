import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'

export default function About() {
  const { t } = useLang()
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="hero" style={{ paddingBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,32px)' }}>{t('navAbout')}</h2>
        <p className="lede" style={{ fontSize: 15 }}>{t('aboutAccuracy')}</p>
      </div>
      <section className="block">
        <div className="section-title">{t('aboutSources')}</div>
        <div className="grid two">
          <div className="card">
            <span className="tag">1</span>
            <h4>Legislative Department, Ministry of Law & Justice</h4>
            <p><a href="https://legislative.gov.in/constitution-of-india/" target="_blank" rel="noopener noreferrer">legislative.gov.in ↗</a> — official Constitution of India publications (primary source for all provision texts).</p>
          </div>
          <div className="card">
            <span className="tag">2</span>
            <h4>India Code</h4>
            <p><a href="https://www.indiacode.nic.in/" target="_blank" rel="noopener noreferrer">indiacode.nic.in ↗</a> — official Government of India legal information source.</p>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="section-title">{t('disclaimer')}</div>
        <div className="card">
          <p>{t('aboutAccuracy')}</p>
          <p className="muted" style={{ marginTop: 8 }}>{t('sourcesNote')}</p>
          <p className="muted" style={{ marginTop: 8 }}>
            Smart India Hackathon 2026 · Problem Statement SIH1703 · Team TechGeeks ·{' '}
            <Link to="/learn">{t('navLearn')}</Link> · <Link to="/play">{t('navPlay')}</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
