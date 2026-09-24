// User-specific progress manager with local caching, Gamification engine & Cloud Firestore sync
import { db, doc, getDoc, setDoc, isFirebaseConfigured } from './firebase.js'
import { GAMIFICATION_CONFIG, getLevelDetails } from './gamification.js'

let currentUserId = null
let currentUserProfile = null

export function setCurrentUser(user) {
  if (user) {
    currentUserId = user.uid
    currentUserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'Citizen',
      isAnonymous: Boolean(user.isAnonymous)
    }
  } else {
    currentUserId = null
    currentUserProfile = null
  }
  emitProgressUpdate()
}

export function getCurrentUser() {
  return currentUserProfile
}

function getKey() {
  return currentUserId ? `ls-progress-${currentUserId}` : 'ls-progress-guest'
}

function todayKey() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function blank() {
  return {
    xp: 0,
    points: 0, // kept in sync with xp for backwards compatibility
    level: 1,
    conceptsDone: [],
    topicsDone: [],
    badges: [],
    badgeUnlockedAt: {},
    streak: { last: null, count: 0, longest: 0 },
    stats: { quiz: 0, wheel: 0, cards: 0, challenges: 0, builder: 0 },
    consecutiveQuizPasses: 0,
    challengesDone: 0,
    hardChallengesDone: 0,
    timedChallengesDone: 0,
    builderLevelsDone: [],
    certificates: [],
    dailyActivity: {
      date: todayKey(),
      repeatableXp: 0,
      quizzes: 0,
      wheel: 0,
      cards: 0,
      challenges: 0,
      builder: 0,
      lessonsToday: []
    },
    xpHistory: []
  }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(getKey())
    const p = raw ? { ...blank(), ...JSON.parse(raw) } : blank()
    
    // Ensure points & xp match
    if (!p.xp && p.points) p.xp = p.points
    if (!p.points && p.xp) p.points = p.xp

    // Ensure dailyActivity is for today
    const today = todayKey()
    if (!p.dailyActivity || p.dailyActivity.date !== today) {
      p.dailyActivity = {
        date: today,
        repeatableXp: 0,
        quizzes: 0,
        wheel: 0,
        cards: 0,
        challenges: 0,
        lessonsToday: []
      }
    }

    // Ensure arrays exist
    p.certificates = p.certificates || []
    p.builderLevelsDone = p.builderLevelsDone || []
    p.stats = { quiz: 0, wheel: 0, cards: 0, challenges: 0, builder: 0, ...(p.stats || {}) }

    // Refresh current level
    const lvlInfo = getLevelDetails(p.xp)
    p.level = lvlInfo.level

    return p
  } catch {
    return blank()
  }
}

function emitProgressUpdate() {
  const p = loadProgress()
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ls-progress-update', { detail: p }))
  }
  return p
}

export function emitGamificationToast(detail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ls-gamification-toast', { detail }))
  }
}

export function emitLevelUpModal(detail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ls-level-up', { detail }))
  }
}

export function emitBadgeModal(detail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ls-badge-unlocked', { detail }))
  }
}

let syncTimeout = null
function queueCloudSync(p) {
  if (!isFirebaseConfigured || !db || !currentUserId || currentUserProfile?.isAnonymous) return
  if (syncTimeout) clearTimeout(syncTimeout)
  syncTimeout = setTimeout(async () => {
    try {
      const userRef = doc(db, 'users', currentUserId)
      await setDoc(userRef, {
        progress: p,
        updatedAt: new Date().toISOString(),
        email: currentUserProfile?.email || null,
        displayName: currentUserProfile?.displayName || 'Citizen'
      }, { merge: true })
    } catch (err) {
      console.warn('[Legal Sahayak] Cloud progress sync error:', err)
    }
  }, 400)
}

function save(p) {
  try {
    // Keep points in sync with xp
    p.points = p.xp
    const lvlInfo = getLevelDetails(p.xp)
    p.level = lvlInfo.level
    localStorage.setItem(getKey(), JSON.stringify(p))
  } catch {
    /* ignore storage errors */
  }
  emitProgressUpdate()
  queueCloudSync(p)
}

/**
 * Checks all 17 badges against current progress.
 * Awards badge XP and triggers badge unlock modals.
 */
export function checkBadges(p, context = {}) {
  const newlyUnlocked = []
  const initialBadges = [...(p.badges || [])]

  for (const badge of GAMIFICATION_CONFIG.BADGES) {
    if (!initialBadges.includes(badge.id)) {
      const isMet = badge.check(p, context)
      if (isMet) {
        p.badges.push(badge.id)
        p.badgeUnlockedAt = p.badgeUnlockedAt || {}
        p.badgeUnlockedAt[badge.id] = new Date().toISOString()
        newlyUnlocked.push(badge)
      }
    }
  }

  // Award XP for newly unlocked badges (only once per badge)
  if (newlyUnlocked.length > 0) {
    for (const b of newlyUnlocked) {
      if (b.xpReward > 0) {
        p.xp = (p.xp || 0) + b.xpReward
        p.points = p.xp
        p.xpHistory = p.xpHistory || []
        p.xpHistory.unshift({
          id: `xp-badge-${b.id}-${Date.now()}`,
          amount: b.xpReward,
          source: 'badge',
          title: {
            en: `Badge: ${b.name.en}`,
            hi: `बैज: ${b.name.hi}`
          },
          date: new Date().toISOString()
        })
      }
    }
    // Limit history length to 50
    if (p.xpHistory.length > 50) p.xpHistory = p.xpHistory.slice(0, 50)

    // Notify UI of each newly unlocked badge
    for (const b of newlyUnlocked) {
      emitBadgeModal({
        badge: b,
        xpReward: b.xpReward
      })
    }
  }

  return newlyUnlocked
}

/**
 * Checks if XP increase causes a level-up.
 * Triggers level-up celebration modal and awards milestone XP bonus if applicable.
 */
function handleLevelProgression(p, oldXp, newXp) {
  const oldLvl = getLevelDetails(oldXp).level
  const newLvlDetails = getLevelDetails(newXp)
  const newLvl = newLvlDetails.level

  if (newLvl > oldLvl) {
    p.level = newLvl
    
    // Check if there is a milestone bonus for reaching this level
    const bonus = GAMIFICATION_CONFIG.XP.MILESTONE_LEVEL_BONUS[newLvl] || 0
    if (bonus > 0) {
      p.xp += bonus
      p.points = p.xp
      p.xpHistory.unshift({
        id: `xp-lvl-bonus-${newLvl}-${Date.now()}`,
        amount: bonus,
        source: 'level_milestone',
        title: {
          en: `Milestone Bonus: Level ${newLvl}`,
          hi: `मील का पत्थर बोनस: स्तर ${newLvl}`
        },
        date: new Date().toISOString()
      })
    }

    emitLevelUpModal({
      level: newLvl,
      title: newLvlDetails.title,
      bonusXp: bonus
    })

    // Check Level Up badge
    checkBadges(p)

    // Check Milestone Certificates
    p.certificates = p.certificates || []
    if (newLvl >= 5 && !p.certificates.some(c => c.id === 'cert-scholar-lvl5')) {
      p.certificates.push({
        id: 'cert-scholar-lvl5',
        type: 'level_milestone',
        title: { en: 'Constitutional Scholar (Level 5)', hi: 'संवैधानिक विद्वान (स्तर 5)' },
        description: {
          en: 'Conferred for successfully mastering initial constitutional foundations and reaching Level 5: Constitution Scout on Legal Sahayak.',
          hi: 'लीगल सहायक पर प्रारंभिक संवैधानिक आधारशिलाओं को पूर्ण करने और स्तर 5 (संविधान स्काउट) प्राप्त करने पर प्रदान किया गया।'
        },
        candidateName: currentUserProfile?.displayName || 'Citizen Scholar',
        issueDate: new Date().toISOString()
      })
    }
    if (newLvl >= 10 && !p.certificates.some(c => c.id === 'cert-fellow-lvl10')) {
      p.certificates.push({
        id: 'cert-fellow-lvl10',
        type: 'level_milestone',
        title: { en: 'Senior Constitutional Fellow (Level 10)', hi: 'वरिष्ठ संवैधानिक अध्येता (स्तर 10)' },
        description: {
          en: 'Conferred for advanced constitutional expertise, civic dedication, and reaching Level 10: Democracy Advocate on Legal Sahayak.',
          hi: 'लीगल सहायक पर उन्नत संवैधानिक ज्ञान और स्तर 10 (लोकतंत्र समर्थक) तक पहुँचने पर प्रदान किया गया।'
        },
        candidateName: currentUserProfile?.displayName || 'Citizen Scholar',
        issueDate: new Date().toISOString()
      })
    }
  }
}

/**
 * Updates learning streak based on genuine activity.
 */
export function touchStreak(p) {
  const today = new Date().toDateString()
  if (p.streak.last !== today) {
    const yest = new Date(Date.now() - 864e5).toDateString()
    p.streak.count = p.streak.last === yest ? p.streak.count + 1 : 1
    p.streak.last = today
    p.streak.longest = Math.max(p.streak.longest || 0, p.streak.count)

    // Award daily streak XP
    const streakXp = GAMIFICATION_CONFIG.XP.DAILY_STREAK_ACTIVE
    p.xp += streakXp
    p.points = p.xp
    p.xpHistory = p.xpHistory || []
    p.xpHistory.unshift({
      id: `xp-streak-${Date.now()}`,
      amount: streakXp,
      source: 'streak',
      title: {
        en: `Daily Streak (${p.streak.count} ${p.streak.count === 1 ? 'day' : 'days'})`,
        hi: `दैनिक अध्ययन लय (${p.streak.count} दिन)`
      },
      date: new Date().toISOString()
    })

    emitGamificationToast({
      amount: streakXp,
      title: { en: `🔥 Streak Bonus! (${p.streak.count}d)`, hi: `🔥 दैनिक लय बोनस! (${p.streak.count} दिन)` }
    })
  }
}

/**
 * Core XP awarding function with anti-abuse safeguards.
 */
export function awardXp(amount, source, title, isRepeatable = false) {
  const p = loadProgress()
  const today = todayKey()

  if (!p.dailyActivity || p.dailyActivity.date !== today) {
    p.dailyActivity = {
      date: today,
      repeatableXp: 0,
      quizzes: 0,
      wheel: 0,
      cards: 0,
      challenges: 0,
      lessonsToday: []
    }
  }

  // Anti-abuse check for repeatable activities
  let finalAmount = Math.max(0, Math.floor(amount))
  if (isRepeatable) {
    const currentRepeatable = p.dailyActivity.repeatableXp || 0
    const maxRepeatable = GAMIFICATION_CONFIG.ANTI_FARMING.MAX_DAILY_REPEATABLE_XP
    if (currentRepeatable >= maxRepeatable) {
      finalAmount = 0 // Hit daily farming cap
    } else {
      finalAmount = Math.min(finalAmount, maxRepeatable - currentRepeatable)
      p.dailyActivity.repeatableXp = currentRepeatable + finalAmount
    }
  }

  if (finalAmount > 0) {
    const oldXp = p.xp || 0
    p.xp = oldXp + finalAmount
    p.points = p.xp

    p.xpHistory = p.xpHistory || []
    p.xpHistory.unshift({
      id: `xp-${source}-${Date.now()}-${Math.floor(Math.random()*1e4)}`,
      amount: finalAmount,
      source,
      title: typeof title === 'object' ? title : { en: String(title), hi: String(title) },
      date: new Date().toISOString()
    })
    if (p.xpHistory.length > 50) p.xpHistory = p.xpHistory.slice(0, 50)

    emitGamificationToast({
      amount: finalAmount,
      title: typeof title === 'object' ? title : { en: String(title), hi: String(title) }
    })

    // Check streak & level progression
    touchStreak(p)
    handleLevelProgression(p, oldXp, p.xp)
  }

  checkBadges(p)
  save(p)
  return p
}

/**
 * Records lesson / concept completion with anti-farming.
 * First read = full +20 XP.
 * Completing theme = +30 XP.
 * Completing all 10 concepts = +150 XP.
 * Re-reads = 0 XP.
 */
export function recordLessonCompletion(conceptId, themeId) {
  const p = loadProgress()
  const alreadyDone = (p.conceptsDone || []).includes(conceptId)

  if (!alreadyDone) {
    p.conceptsDone.push(conceptId)
    p.dailyActivity.lessonsToday = p.dailyActivity.lessonsToday || []
    if (!p.dailyActivity.lessonsToday.includes(conceptId)) {
      p.dailyActivity.lessonsToday.push(conceptId)
    }

    save(p)

    // Award first-time lesson XP
    awardXp(
      GAMIFICATION_CONFIG.XP.LESSON_COMPLETE_FIRST,
      'lesson',
      { en: 'Completed New Lesson', hi: 'नया पाठ पूरा किया' },
      false
    )

    // Check theme completion
    import('./content/concepts.js').then(({ concepts }) => {
      const pAfter = loadProgress()
      const themeConcepts = concepts.filter(c => c.theme === themeId)
      const allThemeDone = themeConcepts.length > 0 && themeConcepts.every(c => pAfter.conceptsDone.includes(c.id))
      
      pAfter.topicsDone = pAfter.topicsDone || []
      if (allThemeDone && !pAfter.topicsDone.includes(themeId)) {
        pAfter.topicsDone.push(themeId)
        save(pAfter)
        awardXp(
          GAMIFICATION_CONFIG.XP.TOPIC_COMPLETE,
          'topic',
          { en: 'Completed Topic Section', hi: 'विषय खंड पूरा किया' },
          false
        )
      }

      // Check curriculum completion
      if (pAfter.conceptsDone.length >= concepts.length && !pAfter.topicsDone.includes('all-concepts-done')) {
        pAfter.topicsDone.push('all-concepts-done')
        save(pAfter)
        awardXp(
          GAMIFICATION_CONFIG.XP.CURRICULUM_COMPLETE,
          'curriculum',
          { en: 'Constitution Curriculum Mastered!', hi: 'सम्पूर्ण संविधान पाठ्यक्रम पूर्ण!' },
          false
        )
      }
    }).catch(() => {})

    // Check Quick Learner badge (3 lessons today)
    const lessonsTodayCount = p.dailyActivity.lessonsToday?.length || 1
    checkBadges(p, { lessonsTodayCount })
    save(p)
  }

  return p
}

/**
 * Backward compatibility alias for markConceptDone
 */
export function markConceptDone(id) {
  return recordLessonCompletion(id, null)
}

/**
 * Records quiz completion with score bonuses and anti-farming rules.
 */
export function recordQuizCompletion({ score, total, isChallenge = false, isHard = false, durationSeconds = 0 }) {
  const p = loadProgress()
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const isPassed = pct >= 60

  p.stats.quiz = (p.stats.quiz || 0) + 1
  if (isPassed) {
    p.consecutiveQuizPasses = (p.consecutiveQuizPasses || 0) + 1
  } else {
    p.consecutiveQuizPasses = 0
  }

  if (isChallenge) {
    p.stats.challenges = (p.stats.challenges || 0) + 1
    p.challengesDone = (p.challengesDone || 0) + 1
    if (isHard) p.hardChallengesDone = (p.hardChallengesDone || 0) + 1
    if (durationSeconds > 0 && durationSeconds <= 60) {
      p.timedChallengesDone = (p.timedChallengesDone || 0) + 1
    }
  }

  save(p)

  // Calculate XP
  let xp = GAMIFICATION_CONFIG.XP.QUIZ_BASE_COMPLETE

  // Add score tier bonus
  for (const tier of GAMIFICATION_CONFIG.XP.QUIZ_SCORE_BONUS) {
    if (pct >= tier.minPct) {
      xp += tier.xp
      break
    }
  }

  // Add challenge bonus
  if (isChallenge) {
    xp += isHard ? GAMIFICATION_CONFIG.XP.CHALLENGE_HARD : GAMIFICATION_CONFIG.XP.CHALLENGE_MEDIUM
  }

  // Check anti-farming: max 5 quizzes per day
  const quizzesToday = (p.dailyActivity.quizzes || 0) + 1
  p.dailyActivity.quizzes = quizzesToday
  save(p)

  const isEligible = quizzesToday <= GAMIFICATION_CONFIG.ANTI_FARMING.MAX_DAILY_SCORED_QUIZZES

  if (isEligible) {
    awardXp(
      xp,
      isChallenge ? 'challenge' : 'quiz',
      {
        en: isChallenge ? `Constitution Challenge (${pct}%)` : `Quiz Challenge (${pct}%)`,
        hi: isChallenge ? `संविधान चुनौती (${pct}%)` : `प्रश्नोत्तरी (${pct}%)`
      },
      true // repeatable activity subject to daily cap
    )
  }

  return { pct, xpEarned: isEligible ? xp : 0, isEligible }
}

/**
 * Backward compatibility wrapper for markGamePlayed
 */
export function markGamePlayed(game) {
  const p = loadProgress()
  p.stats[game] = (p.stats[game] || 0) + 1
  touchStreak(p)
  save(p)
  return p
}

/**
 * Awards XP for Spin Wheel correct answer (with anti-farming daily limit)
 */
export function awardWheelXp() {
  const p = loadProgress()
  const spinsToday = (p.dailyActivity.wheel || 0) + 1
  p.dailyActivity.wheel = spinsToday
  save(p)

  if (spinsToday <= GAMIFICATION_CONFIG.ANTI_FARMING.MAX_DAILY_WHEEL_SPINS) {
    awardXp(
      GAMIFICATION_CONFIG.XP.WHEEL_CORRECT_ANSWER,
      'wheel',
      { en: 'Wheel of Rights Correct Answer', hi: 'अधिकार चक्र सही उत्तर' },
      true
    )
  }
}

/**
 * Awards XP for Card Flip deck completion (with anti-farming daily limit)
 */
export function awardCardsXp() {
  const p = loadProgress()
  const decksToday = (p.dailyActivity.cards || 0) + 1
  p.dailyActivity.cards = decksToday
  save(p)

  if (decksToday <= GAMIFICATION_CONFIG.ANTI_FARMING.MAX_DAILY_CARD_DECKS) {
    awardXp(
      GAMIFICATION_CONFIG.XP.CARDS_DECK_COMPLETE,
      'cards',
      { en: 'Card Flip Deck Mastered', hi: 'कार्ड डेक पूर्ण' },
      true
    )
  }
}

/**
 * Manages official E-Certificates
 */
export function awardCertificate(certData) {
  const p = loadProgress()
  p.certificates = p.certificates || []
  const existingIdx = p.certificates.findIndex(c => c.id === certData.id)
  const fullCert = {
    id: certData.id,
    type: certData.type || 'achievement',
    title: certData.title,
    description: certData.description,
    candidateName: certData.candidateName || currentUserProfile?.displayName || 'Citizen Scholar',
    issueDate: certData.issueDate || new Date().toISOString(),
    metadata: certData.metadata || {}
  }
  if (existingIdx === -1) {
    p.certificates.push(fullCert)
    save(p)
  }
  return fullCert
}

/**
 * Records completion of a level in "Build Your Constitution" game.
 */
export function recordBuilderLevelCompletion({ level, score, total, mistakes = 0, durationSeconds = 0 }) {
  const p = loadProgress()
  p.stats.builder = (p.stats.builder || 0) + 1
  p.builderLevelsDone = p.builderLevelsDone || []
  if (!p.builderLevelsDone.includes(level)) {
    p.builderLevelsDone.push(level)
  }

  // Calculate XP
  const baseLvlXp = 40 + (level * 15) // L1: 55, L2: 70, L3: 85
  const accuracyBonus = mistakes === 0 ? 30 : mistakes <= 2 ? 15 : 5
  const totalXp = baseLvlXp + accuracyBonus

  awardXp(
    totalXp,
    'builder',
    {
      en: `Build Your Constitution (Level ${level} Complete)`,
      hi: `संविधान निर्माण (स्तर ${level} पूर्ण)`
    },
    false
  )

  let certificateAwarded = null
  // When completing Level 3 or all 3 levels, award the Master Constitutional Architect Certificate!
  if (level === 3 || p.builderLevelsDone.length >= 3) {
    certificateAwarded = awardCertificate({
      id: 'cert-constitution-architect',
      type: 'architect',
      title: {
        en: 'Certified Constitutional Architect',
        hi: 'प्रमाणित संविधान निर्माता'
      },
      description: {
        en: 'Demonstrated outstanding civic and constitutional acumen by architecting the foundational pillars, tripartite separation of powers, federal devolution, and autonomous watchdogs of the Republic of India.',
        hi: 'भारत के गणराज्य के आधारभूत स्तंभों, तीनों शासन अंगों, संघीय ढांचे और स्वतंत्र संवैधानिक संस्थाओं को सफलतापूर्वक व्यवस्थित कर उत्कृष्ट संवैधानिक ज्ञान प्रदर्शित किया।'
      },
      candidateName: currentUserProfile?.displayName || 'Citizen Architect',
      issueDate: new Date().toISOString(),
      metadata: { level, score, total, mistakes, durationSeconds }
    })
  }

  save(p)
  return { xpEarned: totalXp, certificateAwarded }
}

/**
 * Backward compatibility: addPoints delegates to awardXp
 */
export function addPoints(n) {
  return awardXp(n, 'legacy', { en: 'Points Earned', hi: 'अंक अर्जित' }, true)
}

/**
 * Backward compatibility: grantBadge unlocks badge if not already unlocked
 */
export function grantBadge(badgeId) {
  const p = loadProgress()
  p.badges = p.badges || []
  if (!p.badges.includes(badgeId)) {
    p.badges.push(badgeId)
    save(p)
  }
  return p
}

export function resetProgress() {
  const b = blank()
  save(b)
  return b
}

export async function syncWithCloud(user) {
  if (!user || user.isAnonymous || !isFirebaseConfigured || !db) return loadProgress()
  try {
    const userRef = doc(db, 'users', user.uid)
    const snap = await getDoc(userRef)
    const local = loadProgress()
    if (snap.exists()) {
      const cloud = snap.data()?.progress || {}
      const mergedXp = Math.max(local.xp || local.points || 0, cloud.xp || cloud.points || 0)

      const merged = {
        xp: mergedXp,
        points: mergedXp,
        level: getLevelDetails(mergedXp).level,
        conceptsDone: Array.from(new Set([...(local.conceptsDone || []), ...(cloud.conceptsDone || [])])),
        topicsDone: Array.from(new Set([...(local.topicsDone || []), ...(cloud.topicsDone || [])])),
        badges: Array.from(new Set([...(local.badges || []), ...(cloud.badges || [])])),
        streak: {
          last: cloud.streak?.last || local.streak?.last || null,
          count: Math.max(local.streak?.count || 0, cloud.streak?.count || 0),
          longest: Math.max(local.streak?.longest || 0, cloud.streak?.longest || 0)
        },
        stats: {
          quiz: Math.max(local.stats?.quiz || 0, cloud.stats?.quiz || 0),
          wheel: Math.max(local.stats?.wheel || 0, cloud.stats?.wheel || 0),
          cards: Math.max(local.stats?.cards || 0, cloud.stats?.cards || 0),
          challenges: Math.max(local.stats?.challenges || 0, cloud.stats?.challenges || 0)
        },
        challengesDone: Math.max(local.challengesDone || 0, cloud.challengesDone || 0),
        hardChallengesDone: Math.max(local.hardChallengesDone || 0, cloud.hardChallengesDone || 0),
        timedChallengesDone: Math.max(local.timedChallengesDone || 0, cloud.timedChallengesDone || 0),
        consecutiveQuizPasses: Math.max(local.consecutiveQuizPasses || 0, cloud.consecutiveQuizPasses || 0),
        dailyActivity: local.dailyActivity,
        xpHistory: local.xpHistory?.length ? local.xpHistory : (cloud.xpHistory || [])
      }

      localStorage.setItem(`ls-progress-${user.uid}`, JSON.stringify(merged))
      emitProgressUpdate()
      queueCloudSync(merged)
      return merged
    } else {
      queueCloudSync(local)
      return local
    }
  } catch (err) {
    console.warn('[Legal Sahayak] Error fetching cloud progress:', err)
    return loadProgress()
  }
}
