import React, { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { loadProgress, resetProgress } from '../progress.js'
import { useLang as _ } from '../i18n.jsx'

export default function Profile() {
  const { t, pick } = useLang()
  const [p, setP] = useState(loadProgress())
  const total = concepts.length
  const done = p.conceptsDone.length
  const pct = total ? Math.round((done / total) * 100) : 0

  const badgeNames = {
    badgeQuizStar: 'badgeQuizStar',
    badgeWheelMaster: 'badgeWheelMaster',
    badgeCardSharp: 'badgeCardSharp',
    badgeFirstSteps: 'badgeFirstSteps',
  }

  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="hero" style={{ paddingBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,32px)' }}>{t('navProfile')}</h2>
        <p className="lede" style={{ fontSize: 15 }}>
          {pick({ en: 'Your progress is stored on this device only — no account needed.', hi: 'आपकी प्रगति केवल इसी डिवाइस पर सुरक्षित है — खाते की ज़रूरत नहीं।' })}
        </p>
      </div>
      <section className="block">
        <div className="stat-row">
          <div className="stat"><div className="num">{p.points}</div><div className="lbl">{t('points')}</div></div>
          <div className="stat"><div className="num">{done}/{total}</div><div className="lbl">{t('conceptsDone')}</div></div>
          <div className="stat"><div className="num">{p.streak.count}</div><div className="lbl">{t('streak')}</div></div>
        </div>
        <div className="card" style={{ marginTop: 14 }}>
          <strong>{t('conceptsDone')}</strong>
          <div className="progress-bar"><div style={{ width: `${pct}%` }} /></div>
          <p className="muted" style={{ marginTop: 6 }}>{pct}%</p>
        </div>
      </section>
      <section className="block">
        <div className="section-title">{t('badges')}</div>
        <div className="card">
          {p.badges.length === 0 ? (
            <p className="muted">{t('noBadges')}</p>
          ) : (
            p.badges.map(b => <span className="badge-pill" key={b}>🏅 {t(badgeNames[b] || '') || b}</span>)
          )}
        </div>
      </section>
      <section className="block">
        <button className="btn ghost" onClick={() => { resetProgress(); setP(loadProgress()) }}>{t('restart')}</button>
      </section>
    </div>
  )
}
