import React, { useState, useEffect } from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { loadProgress } from '../progress.js'

export default function Learn() {
  const { t, pick } = useLang()
  const [progress, setProgress] = useState(() => loadProgress())

  useEffect(() => {
    const handleUpdate = (e) => setProgress(e.detail || loadProgress())
    window.addEventListener('ls-progress-update', handleUpdate)
    return () => window.removeEventListener('ls-progress-update', handleUpdate)
  }, [])

  const doneConceptIds = progress.conceptsDone || []
  const totalConcepts = concepts.length
  const completedCount = doneConceptIds.length
  const progressPct = totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0

  const categories = [
    {
      id: 'preamble',
      title: { en: 'The Preamble & Sovereign Values', hi: 'उद्देशिका व संप्रभु मूल्य' },
      subtitle: {
        en: 'Founding ideals of India: Justice, Liberty, Equality, and Fraternity for all citizens.',
        hi: 'भारत के आधारभूत आदर्श: सभी नागरिकों के लिए न्याय, स्वतंत्रता, समता और बंधुता।'
      },
      icon: '📜',
      articleRange: 'Preamble',
      tagColor: '#087F6E'
    },
    {
      id: 'fundamental-rights',
      title: { en: 'Part III: Fundamental Rights', hi: 'भाग III: मूल अधिकार' },
      subtitle: {
        en: 'Enforceable guarantees protecting personal liberty, equality, expression, and remedies.',
        hi: 'नागरिकों को प्राप्त कानूनी गारंटियां जो समता, व्यक्तिगत स्वतंत्रता व संवैधानिक उपचार सुनिश्चित करती हैं।'
      },
      icon: '⚖️',
      articleRange: 'Articles 12–35',
      tagColor: '#1D6AE5'
    },
    {
      id: 'duties',
      title: { en: 'Part IV-A: Fundamental Duties', hi: 'भाग IV-क: मूल कर्तव्य' },
      subtitle: {
        en: 'Civic responsibilities of every citizen toward fellow citizens, nature, and the nation.',
        hi: 'राष्ट्र, पर्यावरण और साथी नागरिकों के प्रति प्रत्येक भारतीय के नैतिक व नागरिक दायित्व।'
      },
      icon: '🤝',
      articleRange: 'Article 51A',
      tagColor: '#E67A17'
    }
  ]

  return (
    <div className="wrap learn-page">
      {/* Top Header Card */}
      <div className="learn-hero-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-kicker">CONSTITUTIONAL LEARNING JOURNEY</span>
            <h2>{pick({ en: 'Learn the Constitution', hi: 'संविधान सीखें' })}</h2>
            <p className="learn-subhead">
              {pick({
                en: 'Start with everyday questions from real life. Discover the constitutional ideas and articles that protect you.',
                hi: 'दैनिक जीवन के सवालों से शुरुआत करें। जानें कि कौन से संवैधानिक विचार और अनुच्छेद आपकी रक्षा करते हैं।'
              })}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/play" className="btn ghost small">
              🎮 {pick({ en: 'Practice in Games', hi: 'खेलों में अभ्यास करें' })}
            </Link>
          </div>
        </div>

        {/* Overall Curriculum Progress */}
        <div className="curriculum-progress-strip">
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>
            {pick({ en: 'Overall Curriculum Progress', hi: 'सम्पूर्ण पाठ्यक्रम प्रगति' })}:
          </span>
          <div className="curriculum-progress-track">
            <div className="curriculum-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="curriculum-progress-text">
            {completedCount} / {totalConcepts} {pick({ en: 'Lessons Mastered', hi: 'पाठ पूर्ण' })} ({progressPct}%)
          </span>
        </div>
      </div>

      {/* Category Pillars */}
      {categories.map(cat => {
        const catConcepts = concepts.filter(c => c.theme === cat.id)
        if (!catConcepts.length) return null

        const catDoneCount = catConcepts.filter(c => doneConceptIds.includes(c.id)).length
        const catPct = Math.round((catDoneCount / catConcepts.length) * 100)

        return (
          <section key={cat.id} className="learn-category-section">
            <div className="category-pillar-header">
              <div className="category-title-group">
                <span className="category-pillar-icon" aria-hidden="true">{cat.icon}</span>
                <div>
                  <h3 className="category-pillar-title">{pick(cat.title)}</h3>
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{pick(cat.subtitle)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="category-meta-badge">{cat.articleRange}</span>
                <span className="category-meta-badge" style={{ color: catDoneCount === catConcepts.length ? 'var(--ok)' : 'inherit' }}>
                  {catDoneCount}/{catConcepts.length} {pick({ en: 'done', hi: 'पूर्ण' })}
                </span>
              </div>
            </div>

            {/* Concepts Grid for this Pillar */}
            <div className="concepts-grid-modern">
              {catConcepts.map(c => {
                const isCompleted = doneConceptIds.includes(c.id)
                const articleRef = c.provisions && c.provisions[0] ? pick(c.provisions[0].label) : 'Provision'

                return (
                  <Link key={c.id} to={`/learn/${c.id}`} className="concept-card-modern">
                    {/* Top Row: Tag + Article */}
                    <div>
                      <div className="concept-card-top-row">
                        <span className="concept-tag-pill">{pick({ en: 'Situation Question', hi: 'दैनिक स्थिति' })}</span>
                        <span className="concept-article-pill">{articleRef}</span>
                      </div>

                      {/* Real-Life Question */}
                      <div className="concept-card-situation-box">
                        <span className="situation-prompt-label">REAL-LIFE DILEMMA:</span>
                        <div className="situation-quote-text">
                          “{pick(c.situation)}”
                        </div>
                      </div>

                      {/* Constitutional Idea */}
                      <div className="concept-card-idea-box">
                        <span className="idea-label-icon">💡</span>
                        <span className="idea-title-text">{pick(c.title)}</span>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="concept-card-action-row">
                      {isCompleted ? (
                        <span className="lesson-completion-indicator">✓ {pick({ en: 'COMPLETED (+20 XP)', hi: 'पूर्ण (+20 XP)' })}</span>
                      ) : (
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--accent)' }}>
                          📖 {pick({ en: 'Explore Lesson →', hi: 'पाठ देखें →' })}
                        </span>
                      )}
                      <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
                        {c.explanation?.length || 2} {pick({ en: 'key points', hi: 'मुख्य बिंदु' })}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
