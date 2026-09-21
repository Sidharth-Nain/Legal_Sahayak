import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'

export default function Learn() {
  const { t, pick } = useLang()
  const themes = [
    { id: 'preamble', key: 'themePreamble' },
    { id: 'fundamental-rights', key: 'themeRights' },
    { id: 'duties', key: 'themeDuties' },
  ]
  return (
    <div className="wrap">
      <div className="hero" style={{ paddingBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,32px)' }}>{t('navLearn')}</h2>
        <p className="lede" style={{ fontSize: 15 }}>{t('gamesLede')}</p>
      </div>
      {themes.map(({ id, key }) => {
        const list = concepts.filter(c => c.theme === id)
        if (!list.length) return null
        return (
          <section className="block" key={id}>
            <div className="section-title">{t(key)}</div>
            <div className="grid two">
              {list.map(c => (
                <Link key={c.id} to={`/learn/${c.id}`} className="card concept-card">
                  <span className="tag">{t(key)}</span>
                  <span className="situation">“{pick(c.situation)}”</span>
                  <span className="muted">{pick(c.title)}</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
