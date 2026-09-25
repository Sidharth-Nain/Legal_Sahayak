import React, { useState, useEffect } from 'react'
import { useLang } from '../i18n.jsx'
import { concepts } from '../content/concepts.js'
import { loadProgress, resetProgress } from '../progress.js'
import { useAuth } from '../context/AuthContext.jsx'
import { GAMIFICATION_CONFIG, getLevelDetails, LEVELS } from '../gamification.js'
import CertificateModal from '../components/CertificateModal.jsx'

export default function Profile() {
  const { t, pick } = useLang()
  const { user, openSignIn, logout, isConfigured } = useAuth()
  const [p, setP] = useState(() => loadProgress())
  const [resetConfirm, setResetConfirm] = useState(false)
  const [showHowXpWorks, setShowHowXpWorks] = useState(false)
  const [showAllLevels, setShowAllLevels] = useState(false)
  const [activeTab, setActiveTab] = useState('badges') // 'badges' | 'certificates' | 'history' | 'levels'
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    const handleUpdate = (e) => {
      setP(e.detail || loadProgress())
    }
    window.addEventListener('ls-progress-update', handleUpdate)
    return () => window.removeEventListener('ls-progress-update', handleUpdate)
  }, [])

  useEffect(() => {
    setP(loadProgress())
  }, [user])

  const xp = p.xp || p.points || 0
  const lvlInfo = getLevelDetails(xp)

  const totalLessons = concepts.length
  const doneLessons = p.conceptsDone?.length || 0
  const lessonPct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0

  const getInitials = (name) => {
    if (!name) return 'C'
    const parts = name.trim().split(' ')
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase()
  }

  // Count unlocked badges
  const unlockedBadgeCount = p.badges?.length || 0
  const totalBadges = GAMIFICATION_CONFIG.BADGES.length

  const AVAILABLE_CERTIFICATES = [
    {
      id: 'cert-constitution-architect',
      icon: '🏛️',
      title: { en: 'Certified Constitutional Architect', hi: 'प्रमाणित संविधान निर्माता' },
      requirement: { en: 'Complete all 3 levels of "Build Your Constitution" game.', hi: '"संविधान निर्माण" खेल के सभी 3 स्तर पूरे करें।' },
      description: {
        en: 'Demonstrated outstanding civic and constitutional acumen by architecting the foundational pillars, tripartite separation of powers, federal devolution, and autonomous watchdogs of the Republic of India.',
        hi: 'भारत के गणराज्य के आधारभूत स्तंभों, तीनों शासन अंगों, संघीय ढांचे और स्वतंत्र संवैधानिक संस्थाओं को सफलतापूर्वक व्यवस्थित कर उत्कृष्ट संवैधानिक ज्ञान प्रदर्शित किया।'
      },
      actionLink: '#/play/build-constitution',
      actionLabel: { en: 'Play Game →', hi: 'खेल खेलें →' },
      isUnlocked: (prog) => (prog.builderLevelsDone?.length >= 3) || prog.certificates?.some(c => c.id === 'cert-constitution-architect')
    },
    {
      id: 'cert-scholar-lvl5',
      icon: '📜',
      title: { en: 'Constitutional Scholar (Level 5)', hi: 'संवैधानिक विद्वान (स्तर 5)' },
      requirement: { en: 'Reach Level 5: Constitution Scout.', hi: 'स्तर 5 (संविधान स्काउट) तक पहुँचें।' },
      description: {
        en: 'Conferred for successfully mastering initial constitutional foundations and reaching Level 5 on Legal Sahayak.',
        hi: 'लीगल सहायक पर प्रारंभिक संवैधानिक आधारशिलाओं को पूर्ण करने और स्तर 5 प्राप्त करने पर प्रदान किया गया।'
      },
      isUnlocked: (prog) => (prog.level >= 5) || prog.certificates?.some(c => c.id === 'cert-scholar-lvl5')
    },
    {
      id: 'cert-fellow-lvl10',
      icon: '⚖️',
      title: { en: 'Senior Constitutional Fellow (Level 10)', hi: 'वरिष्ठ संवैधानिक अध्येता (स्तर 10)' },
      requirement: { en: 'Reach Level 10: Democracy Advocate.', hi: 'स्तर 10 (लोकतंत्र समर्थक) तक पहुँचें।' },
      description: {
        en: 'Conferred for advanced constitutional expertise, civic dedication, and reaching Level 10 on Legal Sahayak.',
        hi: 'लीगल सहायक पर उन्नत संवैधानिक ज्ञान और स्तर 10 तक पहुँचने पर प्रदान किया गया।'
      },
      isUnlocked: (prog) => (prog.level >= 10) || prog.certificates?.some(c => c.id === 'cert-fellow-lvl10')
    },
    {
      id: 'cert-grandmaster-lvl25',
      icon: '👑',
      title: { en: 'Constitutional Grandmaster (Level 25)', hi: 'संवैधानिक महाविद्वान (स्तर 25)' },
      requirement: { en: 'Reach Level 25: Senior Fellow.', hi: 'स्तर 25 (वरिष्ठ अध्येता) तक पहुँचें।' },
      description: {
        en: 'Conferred for exceptional sustained dedication to constitutional scholarship and civil society empowerment.',
        hi: 'संवैधानिक ज्ञान और नागरिक समाज के सशक्तिकरण के प्रति असाधारण समर्पण के लिए प्रदान किया गया।'
      },
      isUnlocked: (prog) => (prog.level >= 25) || prog.certificates?.some(c => c.id === 'cert-grandmaster-lvl25')
    }
  ]

  const unlockedCertCount = AVAILABLE_CERTIFICATES.filter(c => c.isUnlocked(p)).length

  const formatDate = (isoString) => {
    if (!isoString) return ''
    try {
      const d = new Date(isoString)
      const now = new Date()
      const isToday = d.toDateString() === now.toDateString()
      if (isToday) return pick({ en: 'Today', hi: 'आज' })
      const isYesterday = new Date(now - 864e5).toDateString() === d.toDateString()
      if (isYesterday) return pick({ en: 'Yesterday', hi: 'कल' })
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    } catch {
      return ''
    }
  }

  return (
    <div className="wrap profile-page" style={{ paddingBottom: 60 }}>
      {/* Profile Header & Identity Card */}
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
            <div className="avatar-level-chip">
              Lv.{lvlInfo.level}
            </div>
          </div>

          <div className="profile-user-info">
            <div className="profile-name-row">
              <h2>{user?.displayName || (user ? 'Citizen' : pick({ en: 'Student Learner', hi: 'विद्यार्थी नागरिक' }))}</h2>
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

            <div className="profile-title-row">
              <span className="profile-student-title">“{pick(lvlInfo.title)}”</span>
              <span className="profile-level-badge">Level {lvlInfo.level} / 50</span>
            </div>

            <p className="profile-email-sub">
              {user?.email || (user?.isAnonymous ? t('guestNotice') : pick({ en: 'Keep learning to progress through all 50 levels of constitutional mastery.', hi: 'संवैधानिक ज्ञान के सभी 50 स्तरों तक पहुँचने के लिए अध्ययन जारी रखें।' }))}
            </p>

            <div className="profile-actions-row">
              <button className="btn ghost small how-xp-btn" onClick={() => setShowHowXpWorks(true)}>
                💡 {pick({ en: 'How XP Works', hi: 'XP कैसे काम करता है' })}
              </button>
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

      {/* Guest Notice Callout */}
      {(!user || user.isAnonymous) && (
        <div className="profile-banner-callout">
          <span className="banner-icon" aria-hidden="true">💡</span>
          <div className="banner-content">
            <strong>{t('guestNotice')}</strong>
            <p style={{ margin: '4px 0 0', fontSize: 13.5 }}>
              {pick({
                en: 'Your XP, levels, and badges are currently stored in this browser. Create a free account to sync your constitutional achievements across any phone or laptop.',
                hi: 'आपकी XP, स्तर और बैज वर्तमान में इस ब्राउज़र में सुरक्षित हैं। किसी भी फ़ोन या लैपटॉप पर अपनी उपलब्धियाँ सिंक करने के लिए मुफ़्त खाता बनाएँ।'
              })}
            </p>
          </div>
          <button className="btn primary small banner-cta" onClick={openSignIn}>
            {t('signIn')}
          </button>
        </div>
      )}

      {/* Level Progression Dashboard Card */}
      <section className="block gamify-progression-card">
        <div className="progression-head">
          <div className="progression-level-block">
            <span className="progression-kicker">{pick({ en: 'CURRENT RANK', hi: 'वर्तमान स्तर' })}</span>
            <div className="progression-level-num">LEVEL {lvlInfo.level}</div>
            <div className="progression-level-title">“{pick(lvlInfo.title)}”</div>
          </div>
          <div className="progression-xp-counter">
            <span className="big-xp">{xp.toLocaleString()}</span>
            <span className="xp-label">TOTAL XP</span>
          </div>
        </div>

        {/* Progress Bar towards Next Level */}
        <div className="progression-bar-container">
          <div className="progression-bar-labels">
            <span>
              {lvlInfo.isMax ? (
                pick({ en: 'Max Level Reached! 👑', hi: 'सर्वोच्च स्तर प्राप्त! 👑' })
              ) : (
                <>
                  <strong>{lvlInfo.xpInLevel}</strong> / {lvlInfo.stepXp} XP in Level {lvlInfo.level}
                </>
              )}
            </span>
            <span className="needed-tag">
              {lvlInfo.isMax ? (
                'MAX'
              ) : (
                pick({
                  en: `${lvlInfo.xpNeededForNext} XP to Level ${lvlInfo.level + 1}`,
                  hi: `स्तर ${lvlInfo.level + 1} हेतु ${lvlInfo.xpNeededForNext} XP शेष`
                })
              )}
            </span>
          </div>
          <div className="progress-bar lg" style={{ marginTop: 6 }}>
            <div style={{ width: `${lvlInfo.progressPct}%` }} />
          </div>
        </div>

        {/* Quick summary stats pills */}
        <div className="gamify-stats-pills">
          <div className="pill-item">
            <span className="pill-icon">🔥</span>
            <div>
              <div className="pill-val">{p.streak?.count || 0} {pick({ en: 'Days', hi: 'दिन' })}</div>
              <div className="pill-lbl">{pick({ en: 'Current Streak', hi: 'वर्तमान लय' })}</div>
            </div>
          </div>
          <div className="pill-item">
            <span className="pill-icon">⚡</span>
            <div>
              <div className="pill-val">{p.streak?.longest || p.streak?.count || 0} {pick({ en: 'Days', hi: 'दिन' })}</div>
              <div className="pill-lbl">{pick({ en: 'Longest Streak', hi: 'सर्वश्रेष्ठ लय' })}</div>
            </div>
          </div>
          <div className="pill-item">
            <span className="pill-icon">📖</span>
            <div>
              <div className="pill-val">{doneLessons} / {totalLessons}</div>
              <div className="pill-lbl">{pick({ en: 'Lessons Read', hi: 'अध्ययन पाठ' })}</div>
            </div>
          </div>
          <div className="pill-item">
            <span className="pill-icon">🎯</span>
            <div>
              <div className="pill-val">{p.stats?.quiz || 0}</div>
              <div className="pill-lbl">{pick({ en: 'Quizzes Taken', hi: 'क्विज़ पूर्ण' })}</div>
            </div>
          </div>
          <div className="pill-item">
            <span className="pill-icon">🏆</span>
            <div>
              <div className="pill-val">{p.challengesDone || 0}</div>
              <div className="pill-lbl">{pick({ en: 'Challenges Won', hi: 'चुनौतियाँ जीतीं' })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Badges / Certificates / XP History / Level Roadmap */}
      <div className="gamify-tab-bar">
        <button
          className={`gamify-tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          🏅 {pick({ en: `Badges (${unlockedBadgeCount}/${totalBadges})`, hi: `बैज संग्रह (${unlockedBadgeCount}/${totalBadges})` })}
        </button>
        <button
          className={`gamify-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          🎓 {pick({ en: `Certificates (${unlockedCertCount}/${AVAILABLE_CERTIFICATES.length})`, hi: `ई-प्रमाणपत्र (${unlockedCertCount}/${AVAILABLE_CERTIFICATES.length})` })}
        </button>
        <button
          className={`gamify-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📜 {pick({ en: 'XP History', hi: 'XP इतिहास' })}
        </button>
        <button
          className={`gamify-tab-btn ${activeTab === 'levels' ? 'active' : ''}`}
          onClick={() => setActiveTab('levels')}
        >
          🗺️ {pick({ en: '50-Level Journey', hi: '50 स्तर यात्रा' })}
        </button>
      </div>

      {/* TAB 1: BADGES COLLECTION */}
      {activeTab === 'badges' && (
        <section className="block">
          <div className="badges-header-row">
            <div>
              <h3 className="section-title" style={{ margin: 0 }}>
                {pick({ en: 'Constitutional Badges', hi: 'संवैधानिक बैज' })}
              </h3>
              <p className="muted" style={{ fontSize: 13.5, margin: '3px 0 12px' }}>
                {pick({
                  en: 'Unlock all 17 achievement badges by mastering lessons, beating challenges, and building learning streaks.',
                  hi: 'पाठ पूरा करके, चुनौतियों को जीतकर और निरंतर अध्ययन से सभी 17 उपलब्धि बैज अनलॉक करें।'
                })}
              </p>
            </div>
            <span className="score-pill">
              {unlockedBadgeCount} / {totalBadges} {pick({ en: 'Unlocked', hi: 'अनलॉक' })}
            </span>
          </div>

          <div className="badges-container-grid">
            {GAMIFICATION_CONFIG.BADGES.map(badge => {
              const isUnlocked = p.badges?.includes(badge.id)
              const prog = badge.progress ? badge.progress(p) : null
              const unlockedDate = p.badgeUnlockedAt?.[badge.id]

              return (
                <div
                  key={badge.id}
                  className={`badge-card-detailed ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="badge-card-top">
                    <span className="badge-card-icon" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <span className={`rarity-tag ${badge.rarity.toLowerCase()}`}>
                      {badge.rarity}
                    </span>
                  </div>

                  <h4 className="badge-card-name">{pick(badge.name)}</h4>
                  <p className="badge-card-req">{pick(badge.requirement)}</p>

                  <div className="badge-card-footer">
                    <span className="badge-reward-text">+{badge.xpReward} XP</span>
                    {isUnlocked ? (
                      <span className="badge-status-tag unlocked-tag">
                        ✓ {pick({ en: 'UNLOCKED', hi: 'अनलॉक' })} {unlockedDate ? `(${formatDate(unlockedDate)})` : ''}
                      </span>
                    ) : (
                      <span className="badge-status-tag locked-tag">
                        🔒 {pick({ en: 'LOCKED', hi: 'बंद' })}
                      </span>
                    )}
                  </div>

                  {!isUnlocked && prog && (
                    <div className="badge-mini-progress">
                      <div className="badge-mini-progress-bar">
                        <div style={{ width: `${Math.round((prog.current / prog.target) * 100)}%` }} />
                      </div>
                      <span className="badge-mini-progress-txt">{prog.current} / {prog.target}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* TAB: E-CERTIFICATES RECOGNITION */}
      {activeTab === 'certificates' && (
        <section className="block">
          <div className="badges-header-row">
            <div>
              <h3 className="section-title" style={{ margin: 0 }}>
                {pick({ en: 'Constitutional E-Certificates', hi: 'संवैधानिक ई-प्रमाणपत्र' })}
              </h3>
              <p className="muted" style={{ fontSize: 13.5, margin: '3px 0 12px' }}>
                {pick({
                  en: 'Earn official verifiable E-Certificates to showcase on your LinkedIn profile, social media, or academic resume.',
                  hi: 'अपने लिंक्डइन प्रोफाइल, सोशल मीडिया या रिज्यूम पर प्रदर्शित करने के लिए आधिकारिक ई-प्रमाणपत्र अर्जित करें।'
                })}
              </p>
            </div>
            <span className="score-pill">
              {unlockedCertCount} / {AVAILABLE_CERTIFICATES.length} {pick({ en: 'Earned', hi: 'अर्जित' })}
            </span>
          </div>

          <div className="certificates-grid">
            {AVAILABLE_CERTIFICATES.map(cert => {
              const isUnlocked = cert.isUnlocked(p)
              const storedCert = p.certificates?.find(c => c.id === cert.id)

              return (
                <div
                  key={cert.id}
                  className={`profile-cert-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="cert-card-header">
                    <span className="cert-card-icon" aria-hidden="true">{cert.icon}</span>
                    <span className={`cert-status-badge ${isUnlocked ? 'verified' : 'locked'}`}>
                      {isUnlocked
                        ? `✓ ${pick({ en: 'VERIFIED CREDENTIAL', hi: 'सत्यापित प्रमाणपत्र' })}`
                        : `🔒 ${pick({ en: 'LOCKED', hi: 'अनलॉक होना शेष' })}`}
                    </span>
                  </div>

                  <h4 className="cert-card-title">{pick(cert.title)}</h4>
                  <p className="cert-card-desc">{pick(cert.description)}</p>

                  <div className="cert-card-req-row">
                    <span className="req-label">{pick({ en: 'Requirement', hi: 'आवश्यकता' })}:</span>
                    <span className="req-text">{pick(cert.requirement)}</span>
                  </div>

                  <div className="cert-card-footer">
                    {isUnlocked ? (
                      <button
                        className="btn primary small cert-open-btn"
                        onClick={() => setSelectedCert(storedCert || {
                          id: cert.id,
                          title: cert.title,
                          description: cert.description,
                          candidateName: user?.displayName || 'Citizen Scholar',
                          issueDate: new Date().toISOString()
                        })}
                      >
                        🎓 {pick({ en: 'View, Print & Share on LinkedIn', hi: 'देखें, प्रिंट व LinkedIn पर शेयर करें' })}
                      </button>
                    ) : (
                      cert.actionLink ? (
                        <a href={cert.actionLink} className="btn ghost small">
                          🎮 {pick(cert.actionLabel)}
                        </a>
                      ) : (
                        <span className="muted" style={{ fontSize: 13, fontStyle: 'italic' }}>
                          {pick({ en: 'Keep leveling up to unlock!', hi: 'अनलॉक करने के लिए स्तर बढ़ाएं!' })}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* TAB 2: XP HISTORY */}
      {activeTab === 'history' && (
        <section className="block">
          <h3 className="section-title">
            {pick({ en: 'Recent XP Transactions', hi: 'हालिया XP गतिविधियाँ' })}
          </h3>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 14 }}>
            {pick({
              en: 'A transparent record of all points earned from lessons, quizzes, badges, and streaks.',
              hi: 'पाठ, क्विज़, बैज और लय से अर्जित अंकों का पूर्ण पारदर्शी विवरण।'
            })}
          </p>

          {(!p.xpHistory || p.xpHistory.length === 0) ? (
            <div className="card center" style={{ padding: 30 }}>
              <p className="muted">{pick({ en: 'No XP earned yet. Complete a lesson or take a quiz to start earning!', hi: 'अभी कोई XP अर्जित नहीं हुआ है। शुरुआत के लिए कोई पाठ पढ़ें या क्विज़ खेलें!' })}</p>
            </div>
          ) : (
            <div className="xp-history-list">
              {p.xpHistory.map(item => (
                <div key={item.id} className="xp-history-item">
                  <div className="history-left">
                    <span className="history-icon">
                      {item.source === 'lesson' ? '📖' : item.source === 'quiz' ? '🎯' : item.source === 'challenge' ? '🧩' : item.source === 'badge' ? '🏅' : item.source === 'streak' ? '🔥' : '⚡'}
                    </span>
                    <div>
                      <strong className="history-title">{pick(item.title)}</strong>
                      <div className="history-meta">{formatDate(item.date)}</div>
                    </div>
                  </div>
                  <div className="history-amount">
                    +{item.amount} XP
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB 3: 50-LEVEL ROADMAP */}
      {activeTab === 'levels' && (
        <section className="block">
          <div className="roadmap-header">
            <h3 className="section-title" style={{ margin: 0 }}>
              {pick({ en: 'The 50-Level Constitutional Roadmap', hi: '50-स्तरीय संवैधानिक यात्रा' })}
            </h3>
            <span className="muted" style={{ fontSize: 13 }}>
              {pick({ en: 'From Curious Learner to Constitution Master', hi: 'जिज्ञासु शिक्षार्थी से संविधान शिरोमणि तक' })}
            </span>
          </div>

          <div className="levels-roadmap-grid">
            {LEVELS.map(lvl => {
              const isPast = lvlInfo.level > lvl.level
              const isCurrent = lvlInfo.level === lvl.level
              const isFuture = lvlInfo.level < lvl.level

              return (
                <div
                  key={lvl.level}
                  className={`roadmap-card ${isCurrent ? 'current' : isPast ? 'completed' : 'future'}`}
                >
                  <div className="roadmap-lvl-num">
                    {isPast ? '✓ ' : ''}Level {lvl.level}
                  </div>
                  <h4 className="roadmap-lvl-title">{pick(lvl.title)}</h4>
                  <div className="roadmap-lvl-xp">
                    {lvl.minXp.toLocaleString()} XP
                  </div>
                  {isCurrent && (
                    <span className="current-lvl-indicator">
                      👈 {pick({ en: 'YOU ARE HERE', hi: 'आप यहाँ हैं' })}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Reset Progress Section */}
      <section className="block" style={{ marginTop: 30 }}>
        {resetConfirm ? (
          <div className="reset-confirm-box">
            <p>{pick({ en: 'Are you sure you want to reset all your XP, levels, and badges? This cannot be undone.', hi: 'क्या आप अपनी सारी XP, स्तर और बैज रीसेट करना चाहते हैं? इसे वापस नहीं लाया जा सकेगा।' })}</p>
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
            🔄 {pick({ en: 'Reset progress & achievements', hi: 'प्रगति व उपलब्धियाँ रीसेट करें' })}
          </button>
        )}
      </section>

      {/* "How XP Works" Modal */}
      {showHowXpWorks && (
        <div className="modal-backdrop" onClick={() => setShowHowXpWorks(false)}>
          <div className="modal-card how-xp-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head-row">
              <h3>🌟 {pick({ en: 'How XP & Levels Work', hi: 'XP और स्तर कैसे काम करते हैं' })}</h3>
              <button className="modal-close-btn" onClick={() => setShowHowXpWorks(false)}>✕</button>
            </div>

            <div className="how-xp-body">
              <p className="prose">
                {pick({
                  en: 'XP stands for Experience Points. You earn XP by reading lessons, completing quizzes, taking challenges, and maintaining daily learning streaks.',
                  hi: 'XP का अर्थ है अनुभव अंक (Experience Points)। आप पाठ पढ़कर, क्विज़ हल करके, चुनौतियाँ जीतकर और निरंतर अध्ययन से XP अर्जित करते हैं।'
                })}
              </p>

              <h4>📈 {pick({ en: 'Ways to Earn XP', hi: 'XP कमाने के तरीके' })}</h4>
              <div className="how-xp-table-card">
                <div className="how-xp-row">
                  <div><strong>📖 {pick({ en: 'Complete a Lesson', hi: 'पाठ पूरा करना' })}</strong><br/><span className="muted">{pick({ en: 'First-time completion of each concept', hi: 'प्रत्येक अवधारणा का पहली बार अध्ययन' })}</span></div>
                  <span className="badge-xp-reward-tag">+20 XP</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>🔓 {pick({ en: 'Complete a Section', hi: 'विषय खंड पूरा करना' })}</strong><br/><span className="muted">{pick({ en: 'Mastering all lessons in a theme', hi: 'एक विषय के सभी पाठ पूरे करने पर' })}</span></div>
                  <span className="badge-xp-reward-tag">+30 XP</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>🎯 {pick({ en: 'Complete a Quiz', hi: 'प्रश्नोत्तरी पूर्ण करना' })}</strong><br/><span className="muted">{pick({ en: 'Base completion XP', hi: 'आधार पूर्णता अंक' })}</span></div>
                  <span className="badge-xp-reward-tag">+15 XP</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>⭐ {pick({ en: 'Quiz Score Bonus', hi: 'क्विज़ अंक बोनस' })}</strong><br/><span className="muted">{pick({ en: 'Earn bonus XP based on quiz accuracy (100% = +35 XP)', hi: 'सटीकता के आधार पर बोनस अंक (100% = +35 XP)' })}</span></div>
                  <span className="badge-xp-reward-tag">+5 to +35 XP</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>🧩 {pick({ en: 'Constitution Challenge', hi: 'संविधान चुनौती' })}</strong><br/><span className="muted">{pick({ en: 'Timed, high-difficulty situational challenges', hi: 'समय-बद्ध उच्च-कठिनाई वाली चुनौतियाँ' })}</span></div>
                  <span className="badge-xp-reward-tag">+30 to +50 XP</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>🔥 {pick({ en: 'Daily Learning Streak', hi: 'दैनिक अध्ययन लय' })}</strong><br/><span className="muted">{pick({ en: 'Awarded every day you complete at least 1 activity', hi: 'प्रतिदिन न्यूनतम एक गतिविधि पूर्ण करने पर' })}</span></div>
                  <span className="badge-xp-reward-tag">+10 XP / day</span>
                </div>
                <div className="how-xp-row">
                  <div><strong>🏅 {pick({ en: 'Unlock Badges', hi: 'बैज अनलॉक करना' })}</strong><br/><span className="muted">{pick({ en: 'Earn one-time bonus XP for special milestones', hi: 'विशेष उपलब्धियों के लिए एकमुश्त बोनस XP' })}</span></div>
                  <span className="badge-xp-reward-tag">+50 to +1,000 XP</span>
                </div>
              </div>

              <h4>🛡️ {pick({ en: 'Fair Play & Anti-Farming Rules', hi: 'निष्पक्ष अध्ययन और नियम' })}</h4>
              <ul className="how-xp-rules-list">
                <li><strong>{pick({ en: 'Quality over Rapid Clicking:', hi: 'क्लिकबाजी पर गुणवत्ता की प्राथमिकता:' })}</strong> {pick({ en: 'Lessons award XP only on the first completion. Re-opening the same lesson does not award repeated XP.', hi: 'पाठ पहली बार पढ़ने पर ही XP देते हैं। बार-बार खोलने से बार-बार अंक नहीं मिलते।' })}</li>
                <li><strong>{pick({ en: 'Practice Daily Caps:', hi: 'दैनिक अभ्यास सीमा:' })}</strong> {pick({ en: 'To encourage steady learning, repeatable quizzes have a daily scored cap of 5 quizzes per day. You can continue practicing beyond this cap, but no extra XP will be awarded until tomorrow.', hi: 'निरंतर सीखने को प्रोत्साहित करने के लिए प्रतिदिन अधिकतम 5 क्विज़ से XP मिलता है। इसके बाद भी आप अभ्यास कर सकते हैं पर अतिरिक्त XP नहीं मिलेगा।' })}</li>
                <li><strong>{pick({ en: 'One-Time Achievements:', hi: 'एकल उपलब्धि:' })}</strong> {pick({ en: 'Badge rewards and milestone bonuses can only be unlocked once.', hi: 'बैज पुरस्कार और मील के पत्थर बोनस केवल एक बार मिलते हैं।' })}</li>
              </ul>

              <h4>🏆 {pick({ en: '50 Levels of Constitutional Mastery', hi: 'संवैधानिक ज्ञान के 50 स्तर' })}</h4>
              <p className="prose">
                {pick({
                  en: 'As you earn XP, your level advances from Level 1 (Curious Learner) up to Level 50 (Constitution Master). Early levels progress quickly to welcome new students, while higher levels represent long-term dedication and deep constitutional insight.',
                  hi: 'जैसे-जैसे आप XP अर्जित करते हैं, आपका स्तर 1 (जिज्ञासु शिक्षार्थी) से बढ़कर स्तर 50 (संविधान शिरोमणि) तक पहुँचता है। शुरुआती स्तर तेजी से बढ़ते हैं जबकि उच्च स्तर दीर्घकालिक समर्पण और गहन संवैधानिक ज्ञान को दर्शाते हैं।'
                })}
              </p>

              <button className="btn primary full-width" onClick={() => setShowHowXpWorks(false)}>
                {pick({ en: 'Got It, Let’s Learn!', hi: 'समझ गया, आगे बढ़ें!' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  )
}

