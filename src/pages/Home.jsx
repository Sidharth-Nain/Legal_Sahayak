import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'

export function ChakraSymbol({ size = 180, opacity = 0.05 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="none" style={{ opacity }}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" />
      <g stroke="currentColor" strokeWidth="1.2">
        <line x1="24" y1="2" x2="24" y2="46" /><line x1="2" y1="24" x2="46" y2="24" />
        <line x1="8.4" y1="8.4" x2="39.6" y2="39.6" /><line x1="39.6" y1="8.4" x2="8.4" y2="39.6" />
        <line x1="15.2" y1="3.8" x2="32.8" y2="44.2" /><line x1="32.8" y1="3.8" x2="15.2" y2="44.2" />
        <line x1="3.8" y1="15.2" x2="44.2" y2="32.8" /><line x1="44.2" y1="15.2" x2="3.8" y2="32.8" />
        <line x1="4.8" y1="10.8" x2="43.2" y2="37.2" /><line x1="37.2" y1="4.8" x2="10.8" y2="43.2" />
        <line x1="10.8" y1="4.8" x2="37.2" y2="43.2" /><line x1="43.2" y1="10.8" x2="4.8" y2="37.2" />
      </g>
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
    </svg>
  )
}

export default function Home() {
  const { t, pick } = useLang()

  const themes = [
    {
      id: 'preamble',
      key: 'themePreamble',
      icon: '📜',
      themeClass: 'preamble-theme',
      title: { en: 'Preamble & Sovereign Values', hi: 'उद्देशिका व संप्रभु मूल्य' },
      situation: { en: 'Who does the Constitution actually belong to?', hi: 'संविधान असल में किसका है?' }
    },
    {
      id: 'fundamental-rights',
      key: 'themeRights',
      icon: '⚖️',
      themeClass: 'rights-theme',
      title: { en: 'Fundamental Rights (Part III)', hi: 'मूल अधिकार (भाग III)' },
      situation: { en: 'Can the law treat people differently based on status or religion?', hi: 'क्या कानून स्थिति या धर्म के आधार पर लोगों से अलग व्यवहार कर सकता है?' }
    },
    {
      id: 'duties',
      key: 'themeDuties',
      icon: '🤝',
      themeClass: 'duties-theme',
      title: { en: 'Fundamental Duties (Part IV-A)', hi: 'मूल कर्तव्य (भाग IV-क)' },
      situation: { en: 'What civic responsibilities does every citizen share for the nation?', hi: 'प्रत्येक नागरिक की देश के प्रति क्या नैतिक और नागरिक जिम्मेदारियां हैं?' }
    }
  ]

  return (
    <div className="home-page-container">
      {/* ===================================================================
          HERO SECTION (Left Headline + Right Educational Visual Composition)
          =================================================================== */}
      <section className="home-hero-section">
        <div className="wrap">
          <div className="home-hero-grid">
            {/* Left Content */}
            <div className="hero-left-content">
              <div className="hero-civic-badge">
                <span className="badge-flag" aria-hidden="true">🇮🇳</span>
                <span>{pick({ en: 'Interactive Constitutional Education for Young Citizens', hi: 'युवा नागरिकों के लिए इंटरैक्टिव संवैधानिक साक्षरता' })}</span>
              </div>

              <h1 className="hero-headline">
                {pick({
                  en: <>Understand the Constitution through real life — <span className="highlight-gradient">not memorising Articles.</span></>,
                  hi: <>वास्तविक जीवन के उदाहरणों से समझें संविधान — <span className="highlight-gradient">बिना रटे या उलझे।</span></>
                })}
              </h1>

              <p className="hero-lede-text">
                {pick({
                  en: 'Everyday situations explained simply. Discover how fundamental rights, constitutional values, and democratic organs protect you every single day.',
                  hi: 'रोजमर्रा की स्थितियों के सरल उत्तर। जानें कि मूल अधिकार, संवैधानिक संस्थाएं और नागरिक कर्तव्य आपके दैनिक जीवन को कैसे सशक्त बनाते हैं।'
                })}
              </p>

              <div className="hero-cta-group">
                <Link to="/learn" className="btn primary big">
                  📖 {t('startLearning')} →
                </Link>
                <Link to="/play" className="btn ghost big">
                  🎮 {t('playPractice')}
                </Link>
              </div>

              {/* Trust Metric Strip */}
              <div className="hero-trust-row">
                <div className="hero-trust-item">
                  <span className="trust-icon">✓</span>
                  <span>{pick({ en: '10 Core Concepts', hi: '10 आधारभूत अवधारणाएं' })}</span>
                </div>
                <div className="hero-trust-item">
                  <span className="trust-icon">✓</span>
                  <span>{pick({ en: '4 Interactive Games', hi: '4 इंटरैक्टिव खेल' })}</span>
                </div>
                <div className="hero-trust-item">
                  <span className="trust-icon">✓</span>
                  <span>{pick({ en: '50-Level Student Journey', hi: '50-स्तरीय छात्र यात्रा' })}</span>
                </div>
                <div className="hero-trust-item">
                  <span className="trust-icon">✓</span>
                  <span>{pick({ en: 'Official Govt Sources', hi: 'सत्यापित सरकारी स्रोत' })}</span>
                </div>
              </div>
            </div>

            {/* Right Educational Illustration Composition */}
            <div className="hero-right-visual" aria-hidden="true">
              <div className="hero-visual-card-composition">
                {/* Background Rotating Chakra Geometry */}
                <div className="hero-chakra-watermark">
                  <ChakraSymbol size={320} opacity={0.06} />
                </div>

                {/* Central Stylized Constitution Book Card */}
                <div className="hero-constitution-center-card">
                  <div className="center-card-emblem">🏛️</div>
                  <div className="center-card-preamble">THE CONSTITUTION OF INDIA</div>
                  <h3 className="center-card-title">“We, the People”</h3>
                  <p className="center-card-desc">
                    {pick({
                      en: 'Justice, Liberty, Equality & Fraternity guaranteed to all citizens.',
                      hi: 'समस्त नागरिकों के लिए सामाजिक, आर्थिक और राजनीतिक न्याय की गारंटी।'
                    })}
                  </p>
                  <span className="center-card-badge">✨ Article 14 to 51A</span>
                </div>

                {/* Floating Props showing Gamification & Interactivity */}
                <div className="hero-float-prop prop-top-right">
                  <span className="prop-icon">⚡</span>
                  <div className="prop-text">
                    <strong>+50 XP Earned!</strong>
                    <span>Quiz Complete</span>
                  </div>
                </div>

                <div className="hero-float-prop prop-bottom-left">
                  <span className="prop-icon">🎖️</span>
                  <div className="prop-text">
                    <strong>Level Up: Level 4</strong>
                    <span>Civic Explorer</span>
                  </div>
                </div>

                <div className="hero-float-prop prop-bottom-right">
                  <span className="prop-icon">❓</span>
                  <div className="prop-text">
                    <strong>“Can police stop you?”</strong>
                    <span>→ Article 22 Right</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CORE USP SECTION: Situation -> Idea -> Constitution
          =================================================================== */}
      <section className="usp-flow-section" style={{ background: '#FFFFFF', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="section-header-centered">
            <span className="section-kicker">HOW LEGAL SAHAYAK WORKS</span>
            <h2 className="section-main-heading">
              {pick({
                en: 'Connect real life to the Constitution in 3 simple steps',
                hi: 'वास्तविक जीवन को संविधान से जोड़ें मात्र 3 सरल चरणों में'
              })}
            </h2>
            <p className="section-lede-sub">
              {pick({
                en: 'We skip dry legal jargon. You start with questions from real life and uncover the constitutional protection behind them.',
                hi: 'कठिन कानूनी भाषा की जगह दैनिक जीवन के सवाल। जानें कि संविधान आपको कैसे सुरक्षा और अधिकार देता है।'
              })}
            </p>
          </div>

          <div className="usp-flow-container">
            {/* Step 1: Real-Life Question */}
            <div className="usp-step-card step-1">
              <div className="usp-step-num">STEP 1 · REAL SITUATION</div>
              <div className="usp-step-icon">❓</div>
              <h3 className="usp-step-title">{pick({ en: 'Everyday Question', hi: 'दैनिक स्थिति' })}</h3>
              <p className="usp-step-desc">
                {pick({
                  en: '“Can a shop or school refuse to serve someone simply because of their background or caste?”',
                  hi: '“क्या कोई दुकान या स्कूल किसी नागरिक को उसकी जाति या धर्म के आधार पर प्रवेश देने से मना कर सकता है?”'
                })}
              </p>
            </div>

            <div className="usp-arrow" aria-hidden="true">→</div>

            {/* Step 2: Constitutional Idea */}
            <div className="usp-step-card step-2">
              <div className="usp-step-num">STEP 2 · CORE IDEA</div>
              <div className="usp-step-icon">⚖️</div>
              <h3 className="usp-step-title">{pick({ en: 'Democratic Value', hi: 'लोकतांत्रिक मूल्य' })}</h3>
              <p className="usp-step-desc">
                {pick({
                  en: 'Equality & Non-Discrimination: Every citizen has equal dignity and access to public places in the Republic of India.',
                  hi: 'समानता व भेदभाव निषेध: भारत के गणराज्य में प्रत्येक नागरिक को समान सम्मान और सार्वजनिक स्थानों पर समान अधिकार प्राप्त है।'
                })}
              </p>
            </div>

            <div className="usp-arrow" aria-hidden="true">→</div>

            {/* Step 3: The Constitution's Guarantee */}
            <div className="usp-step-card step-3">
              <div className="usp-step-num">STEP 3 · THE CONSTITUTION</div>
              <div className="usp-step-icon">📜</div>
              <h3 className="usp-step-title">{pick({ en: 'Article 15 & Part III', hi: 'अनुच्छेद 15 व भाग III' })}</h3>
              <p className="usp-step-desc">
                {pick({
                  en: 'Directly enforceable in the Supreme Court under Article 32 as a Fundamental Right.',
                  hi: 'अनुच्छेद 32 के तहत सर्वोच्च न्यायालय में प्रवर्तनीय मूल अधिकार।'
                })}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/learn/fr-non-discrimination" className="btn ghost small">
              🔍 {pick({ en: 'Try this example in the lesson →', hi: 'इस उदाहरण को पाठ में देखें →' })}
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CURRICULUM THEMES PREVIEW
          =================================================================== */}
      <section className="home-themes-section">
        <div className="wrap">
          <div className="section-header-centered">
            <span className="section-kicker">CURRICULUM JOURNEY</span>
            <h2 className="section-main-heading">{t('themes')}</h2>
            <p className="section-lede-sub">
              {pick({
                en: 'Explore the key constitutional pillars of the Republic of India.',
                hi: 'भारतीय गणराज्य के मुख्य संवैधानिक स्तंभों का अध्ययन करें।'
              })}
            </p>
          </div>

          <div className="theme-card-row">
            {themes.map(({ id, icon, themeClass, title, situation }) => {
              const list = concepts.filter(c => c.theme === id)
              return (
                <Link key={id} to={`/learn/${list[0]?.id || ''}`} className="theme-card-hero">
                  <div>
                    <div className="theme-card-top">
                      <div className={`theme-icon-box ${themeClass}`}>
                        {icon}
                      </div>
                      <span className="theme-concept-count">
                        {list.length} {t('conceptsCount')}
                      </span>
                    </div>

                    <h3 className="theme-card-title">{pick(title)}</h3>
                    <p className="theme-card-situation">“{pick(situation)}”</p>
                  </div>

                  <div className="theme-card-footer">
                    <span>{t('learnMore')}</span>
                    <span>→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          GAMES & E-CERTIFICATE HIGHLIGHT CALLOUT
          =================================================================== */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="wrap">
          <div style={{
            background: 'linear-gradient(135deg, #17263D 0%, #0F1D30 100%)',
            borderRadius: '20px',
            padding: '36px 40px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: 580 }}>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: '#F59E0B', textTransform: 'uppercase' }}>
                GAMIFIED PRACTICE & VERIFIABLE CREDENTIALS
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, margin: '8px 0 10px', color: '#FFFFFF' }}>
                {pick({
                  en: 'Earn XP, unlock 17 badges, and claim your E-Certificate for LinkedIn',
                  hi: 'XP अर्जित करें, 17 बैज अनलॉक करें और लिंक्डइन हेतु ई-प्रमाणपत्र पाएं'
                })}
              </h3>
              <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                {pick({
                  en: 'Play “Build Your Constitution”, the Quiz Challenge, Rights Wheel, and Card Flip. Share your achievements with educators and peers.',
                  hi: '“संविधान निर्माण”, प्रश्नोत्तरी, अधिकार चक्र और कार्ड पलटें खेलें। अपनी उपलब्धियों को मित्रों व शिक्षकों के साथ साझा करें।'
                })}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/play" className="btn primary big" style={{ background: 'var(--accent)', color: '#fff' }}>
                🎮 {pick({ en: 'Explore Game Hub', hi: 'गेम हब देखें' })} →
              </Link>
              <Link to="/profile" className="btn ghost big" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                🏆 {pick({ en: 'View Certificates', hi: 'प्रमाणपत्र देखें' })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
