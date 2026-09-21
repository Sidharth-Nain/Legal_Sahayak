import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { Watermark } from '../components/shared.jsx'
import { concepts } from '../content/concepts.js'

export default function Home() {
  const { t, pick } = useLang()
  const themes = [
    { id: 'preamble', key: 'themePreamble' },
    { id: 'fundamental-rights', key: 'themeRights' },
    { id: 'duties', key: 'themeDuties' },
  ]
  return (
    <div>
      <div className="hero">
        <div className="wrap">
          <Watermark />
          <h2>{t('heroTitle')}</h2>
          <p className="lede">{t('heroLede')}</p>
          <div className="cta-row">
            <Link to="/learn" className="btn primary big">{t('startLearning')}</Link>
            <Link to="/play" className="btn ghost big">{t('playPractice')}</Link>
          </div>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="section-title">{t('themes')}</div>
          <div className="grid three">
            {themes.map(({ id, key }) => {
              const list = concepts.filter(c => c.theme === id)
              return (
                <Link key={id} to={`/learn/${list[0]?.id || ''}`} className="card concept-card">
                  <span className="tag">{t(key)}</span>
                  <span className="situation">{list[0] ? pick(list[0].situation) : ''}</span>
                  <span className="muted">{list.length} {t('conceptsCount')}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
