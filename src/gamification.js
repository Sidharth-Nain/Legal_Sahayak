// ============================================================================
// Legal Sahayak Gamification Engine & Central Configuration
// ============================================================================

export const GAMIFICATION_CONFIG = {
  // Activity XP values
  XP: {
    LESSON_COMPLETE_FIRST: 20,       // First completion of a lesson
    LESSON_REPEAT: 0,                // Re-reading a lesson gives 0 XP to prevent farming
    TOPIC_COMPLETE: 30,              // Completing all concepts in a theme/topic
    CURRICULUM_COMPLETE: 150,        // Completing all 10 concepts
    QUIZ_BASE_COMPLETE: 15,          // Base XP for finishing a quiz
    QUIZ_SCORE_BONUS: [
      { minPct: 100, xp: 35 },
      { minPct: 90, xp: 25 },
      { minPct: 80, xp: 20 },
      { minPct: 70, xp: 15 },
      { minPct: 60, xp: 10 },
      { minPct: 50, xp: 5 },
    ],
    CHALLENGE_MEDIUM: 30,            // Timed challenge (e.g. 5 questions under 75s)
    CHALLENGE_HARD: 50,              // Hard timed challenge (under 60s)
    WHEEL_CORRECT_ANSWER: 10,        // Per correct spin answer
    CARDS_DECK_COMPLETE: 15,         // Completing a 6-card flip deck
    DAILY_STREAK_ACTIVE: 10,         // Daily bonus for completing at least 1 activity
    MILESTONE_LEVEL_BONUS: {         // Milestone level-up bonus XP
      5: 50,
      10: 100,
      20: 200,
      30: 300,
      40: 400,
      50: 500,
    }
  },

  // Anti-Farming & Daily Caps
  ANTI_FARMING: {
    MAX_DAILY_REPEATABLE_XP: 250,    // Total XP cap per day from repeatable quiz/games
    MAX_DAILY_SCORED_QUIZZES: 5,     // Only first 5 quizzes per day award XP
    MAX_DAILY_WHEEL_SPINS: 3,        // Only first 3 wheel correct answers award XP (30 XP)
    MAX_DAILY_CARD_DECKS: 1,         // Only 1 deck completion awards XP per day (15 XP)
    MAX_DAILY_CHALLENGES: 2,         // Max 2 challenges award XP per day
    MIN_LESSON_READ_SECONDS: 4,      // Must spend at least 4s on a lesson to register completion
  },

  // 17 Selected Badges (Exact names and requirements)
  BADGES: [
    {
      id: 'badgeFirstStep',
      icon: '🌱',
      name: { en: 'First Step', hi: 'पहला कदम' },
      requirement: { en: 'Complete your first lesson.', hi: 'अपना पहला पाठ पूरा करें।' },
      rarity: 'COMMON',
      xpReward: 50,
      check: (p) => (p.conceptsDone?.length || 0) >= 1
    },
    {
      id: 'badgeBookworm',
      icon: '📖',
      name: { en: 'Bookworm', hi: 'किताबी कीड़ा' },
      requirement: { en: 'Complete 5 lessons.', hi: '5 पाठ पूरे करें।' },
      rarity: 'UNCOMMON',
      xpReward: 100,
      check: (p) => (p.conceptsDone?.length || 0) >= 5,
      progress: (p) => ({ current: Math.min(5, p.conceptsDone?.length || 0), target: 5 })
    },
    {
      id: 'badgeQuickLearner',
      icon: '🧠',
      name: { en: 'Quick Learner', hi: 'तेज शिक्षार्थी' },
      requirement: { en: 'Complete 3 lessons in one day.', hi: 'एक दिन में 3 पाठ पूरे करें।' },
      rarity: 'UNCOMMON',
      xpReward: 120,
      check: (p, ctx) => (ctx?.lessonsTodayCount || 0) >= 3
    },
    {
      id: 'badgeFirstHit',
      icon: '🎯',
      name: { en: 'First Hit', hi: 'पहला सटीक' },
      requirement: { en: 'Complete your first quiz.', hi: 'अपनी पहली प्रश्नोत्तरी पूरी करें।' },
      rarity: 'COMMON',
      xpReward: 50,
      check: (p) => (p.stats?.quiz || 0) >= 1
    },
    {
      id: 'badgeGettingStarted',
      icon: '🔓',
      name: { en: 'Getting Started', hi: 'शुरुआत' },
      requirement: { en: 'Unlock your first topic.', hi: 'अपना पहला विषय अनलॉक करें।' },
      rarity: 'COMMON',
      xpReward: 60,
      check: (p) => (p.topicsDone?.length || 0) >= 1 || (p.conceptsDone?.length || 0) >= 1
    },
    {
      id: 'badgeLevelUp',
      icon: '🚀',
      name: { en: 'Level Up!', hi: 'स्तर वृद्धि!' },
      requirement: { en: 'Reach Level 2.', hi: 'स्तर 2 तक पहुँचें।' },
      rarity: 'COMMON',
      xpReward: 50,
      check: (p) => (p.level || 1) >= 2
    },
    {
      id: 'badgeConstitutionExplorer',
      icon: '🇮🇳',
      name: { en: 'Constitution Explorer', hi: 'संविधान अन्वेषक' },
      requirement: { en: 'Explore all major sections of the Constitution learning content.', hi: 'संविधान के सभी मुख्य भाग देखें।' },
      rarity: 'RARE',
      xpReward: 250,
      check: (p) => (p.conceptsDone?.length || 0) >= 10,
      progress: (p) => ({ current: Math.min(10, p.conceptsDone?.length || 0), target: 10 })
    },
    {
      id: 'badgeConstitutionSolver',
      icon: '🧩',
      name: { en: 'Constitution Solver', hi: 'संविधान समाधानकर्ता' },
      requirement: { en: 'Complete a difficult Constitution challenge.', hi: 'एक कठिन संविधान चुनौती पूरी करें।' },
      rarity: 'RARE',
      xpReward: 200,
      check: (p) => (p.hardChallengesDone || 0) >= 1
    },
    {
      id: 'badgeSpeedLearner',
      icon: '⚡',
      name: { en: 'Speed Learner', hi: 'त्वरित शिक्षार्थी' },
      requirement: { en: 'Finish a challenge within the required time limit.', hi: 'समय सीमा में चुनौती पूरी करें।' },
      rarity: 'RARE',
      xpReward: 200,
      check: (p) => (p.timedChallengesDone || 0) >= 1
    },
    {
      id: 'badgeChallengeAccepted',
      icon: '🏆',
      name: { en: 'Challenge Accepted', hi: 'चुनौती स्वीकार' },
      requirement: { en: 'Complete 5 challenges.', hi: '5 चुनौतियाँ पूरी करें।' },
      rarity: 'RARE',
      xpReward: 250,
      check: (p) => (p.challengesDone || 0) >= 5,
      progress: (p) => ({ current: Math.min(5, p.challengesDone || 0), target: 5 })
    },
    {
      id: 'badgeUnstoppable',
      icon: '💥',
      name: { en: 'Unstoppable', hi: 'अजेय' },
      requirement: { en: 'Complete 3 quizzes without failing.', hi: 'लगातार 3 क्विज़ बिना असफल हुए पूरे करें।' },
      rarity: 'UNCOMMON',
      xpReward: 150,
      check: (p) => (p.consecutiveQuizPasses || 0) >= 3,
      progress: (p) => ({ current: Math.min(3, p.consecutiveQuizPasses || 0), target: 3 })
    },
    {
      id: 'badge7DayStreak',
      icon: '🔥',
      name: { en: '7-Day Streak', hi: '7-दिवसीय लय' },
      requirement: { en: 'Learn for 7 consecutive days.', hi: 'लगातार 7 दिन सीखें।' },
      rarity: 'UNCOMMON',
      xpReward: 150,
      check: (p) => (p.streak?.count || 0) >= 7 || (p.streak?.longest || 0) >= 7,
      progress: (p) => ({ current: Math.min(7, p.streak?.count || 0), target: 7 })
    },
    {
      id: 'badge21DayStreak',
      icon: '🔥',
      name: { en: '21-Day Streak', hi: '21-दिवसीय लय' },
      requirement: { en: 'Learn for 21 consecutive days.', hi: 'लगातार 21 दिन सीखें।' },
      rarity: 'RARE',
      xpReward: 300,
      check: (p) => (p.streak?.count || 0) >= 21 || (p.streak?.longest || 0) >= 21,
      progress: (p) => ({ current: Math.min(21, p.streak?.count || 0), target: 21 })
    },
    {
      id: 'badge45DayStreak',
      icon: '⚡',
      name: { en: '45-Day Streak', hi: '45-दिवसीय लय' },
      requirement: { en: 'Maintain a 45-day learning streak.', hi: '45 दिनों की निरंतर अध्ययन लय बनाए रखें।' },
      rarity: 'EPIC',
      xpReward: 500,
      check: (p) => (p.streak?.count || 0) >= 45 || (p.streak?.longest || 0) >= 45,
      progress: (p) => ({ current: Math.min(45, p.streak?.count || 0), target: 45 })
    },
    {
      id: 'badge90DayLegend',
      icon: '🏅',
      name: { en: '90-Day Legend', hi: '90-दिवसीय महागाथा' },
      requirement: { en: 'Maintain a 90-day learning streak.', hi: '90 दिनों की निरंतर अध्ययन लय बनाए रखें।' },
      rarity: 'LEGENDARY',
      xpReward: 1000,
      check: (p) => (p.streak?.count || 0) >= 90 || (p.streak?.longest || 0) >= 90,
      progress: (p) => ({ current: Math.min(90, p.streak?.count || 0), target: 90 })
    },
    {
      id: 'badgeXpHunter',
      icon: '⚡',
      name: { en: 'XP Hunter', hi: 'अंक शिकारी' },
      requirement: { en: 'Earn 1,000 total XP.', hi: 'कुल 1,000 XP अर्जित करें।' },
      rarity: 'UNCOMMON',
      xpReward: 100,
      check: (p) => (p.xp || p.points || 0) >= 1000,
      progress: (p) => ({ current: Math.min(1000, p.xp || p.points || 0), target: 1000 })
    },
    {
      id: 'badgeQuizAddict',
      icon: '🎯',
      name: { en: 'Quiz Addict', hi: 'प्रश्नोत्तरी प्रेमी' },
      requirement: { en: 'Complete 20 quizzes.', hi: '20 क्विज़ पूरे करें।' },
      rarity: 'EPIC',
      xpReward: 400,
      check: (p) => (p.stats?.quiz || 0) >= 20,
      progress: (p) => ({ current: Math.min(20, p.stats?.quiz || 0), target: 20 })
    },
  ],

  // 50 Student Levels with Titles
  LEVEL_TITLES: [
    { en: 'Curious Learner', hi: 'जिज्ञासु शिक्षार्थी' },             // 1
    { en: 'First Step', hi: 'पहला कदम' },                             // 2
    { en: 'Knowledge Seeker', hi: 'ज्ञान खोजी' },                     // 3
    { en: 'Civic Explorer', hi: 'नागरिक अन्वेषक' },                   // 4
    { en: 'Constitution Scout', hi: 'संविधान स्काउट' },               // 5
    { en: 'Rights Enthusiast', hi: 'अधिकार उत्साही' },                 // 6
    { en: 'Young Citizen', hi: 'युवा नागरिक' },                       // 7
    { en: 'Preamble Apprentice', hi: 'उद्देशिका अध्येता' },           // 8
    { en: 'Law Observer', hi: 'विधि दृष्टा' },                         // 9
    { en: 'Civic Pioneer', hi: 'नागरिक पथप्रदर्शक' },                 // 10
    { en: 'Justice Disciple', hi: 'न्याय साधक' },                     // 11
    { en: 'Knowledge Explorer', hi: 'ज्ञान अन्वेषक' },                 // 12
    { en: 'Duty Advocate', hi: 'कर्तव्य पैरोकार' },                   // 13
    { en: 'Liberty Thinker', hi: 'स्वातंत्र्य चिंतक' },               // 14
    { en: 'Republic Scholar', hi: 'गणराज्य अध्येता' },                 // 15
    { en: 'Equality Champion', hi: 'समानता सेनानी' },                 // 16
    { en: 'Freedom Defender', hi: 'स्वतंत्रता संरक्षक' },             // 17
    { en: 'Constitutional Reader', hi: 'संवैधानिक पाठक' },             // 18
    { en: 'Legal Investigator', hi: 'विधिक अन्वेषी' },                 // 19
    { en: 'Samvidhan Explorer', hi: 'संविधान खोजी' },                 // 20
    { en: 'Civic Analyst', hi: 'नागरिक विश्लेषक' },                   // 21
    { en: 'Rights Strategist', hi: 'अधिकार रणनीतिकार' },               // 22
    { en: 'Law Reformer', hi: 'विधि सुधारक' },                         // 23
    { en: 'Insightful Citizen', hi: 'प्रबुद्ध नागरिक' },               // 24
    { en: 'Constitutional Guide', hi: 'संवैधानिक मार्गदर्शक' },       // 25
    { en: 'Justice Guardian', hi: 'न्याय प्रहरी' },                   // 26
    { en: 'Principle Protector', hi: 'सिद्धांत रक्षक' },               // 27
    { en: 'Democracy Fellow', hi: 'लोकतंत्र अध्येता' },               // 28
    { en: 'Legal Insight Scholar', hi: 'विधिक प्रज्ञावान' },           // 29
    { en: 'Samvidhan Acharya', hi: 'संविधान आचार्य' },                 // 30
    { en: 'Civic Luminary', hi: 'नागरिक मनीषी' },                     // 31
    { en: 'Fundamental Rights Mentor', hi: 'मूल अधिकार परामर्शक' },  // 32
    { en: 'Judicial Mind', hi: 'न्यायिक मेधा' },                       // 33
    { en: 'Constitutional Specialist', hi: 'संविधान विशेषज्ञ' },       // 34
    { en: 'Sovereign Scholar', hi: 'संप्रभुता विद्वान' },             // 35
    { en: 'Heritage Guardian', hi: 'संवैधानिक धरोहर रक्षक' },         // 36
    { en: 'Assembly Strategist', hi: 'सम्मेलन नीतिज्ञ' },             // 37
    { en: 'Rule of Law Envoy', hi: 'विधि का शासन दूत' },             // 38
    { en: 'Democratic Visionary', hi: 'लोकतांत्रिक द्रष्टा' },         // 39
    { en: 'Constitution Sage', hi: 'संविधान ऋषि' },                   // 40
    { en: 'Senior Civic Fellow', hi: 'वरिष्ठ नागरिक फेलो' },           // 41
    { en: 'High Rights Arbiter', hi: 'सर्वोच्च अधिकार निर्णायक' },     // 42
    { en: 'Constitutional Vanguard', hi: 'संवैधानिक अग्रदूत' },       // 43
    { en: 'Samvidhan Vidwan', hi: 'संविधान विद्वान' },                 // 44
    { en: 'Master of Remedies', hi: 'संवैधानिक उपचार मर्मज्ञ' },       // 45
    { en: 'Supreme Constitutionalist', hi: 'परम संविधानविद्' },       // 46
    { en: 'Grand Civic Pillar', hi: 'महान नागरिक स्तंभ' },             // 47
    { en: 'Constitutional Luminary', hi: 'संवैधानिक प्रकाशस्तंभ' },   // 48
    { en: 'Republic Grandmaster', hi: 'गणराज्य महागुरु' },             // 49
    { en: 'Constitution Master', hi: 'संविधान शिरोमणि' },             // 50
  ]
}

// Generate the 50 level definitions programmatically based on the progressive quadratic curve
export const LEVELS = (() => {
  const list = []
  let cumulative = 0

  for (let lvl = 1; lvl <= 50; lvl++) {
    // Progressive delta formula: early levels require modest XP, ramping to mastery
    let step
    if (lvl === 1) {
      step = 50
    } else if (lvl <= 5) {
      step = 50 + (lvl - 1) * 25      // 50, 75, 100, 125...
    } else if (lvl <= 15) {
      step = 130 + (lvl - 5) * 35     // 165, 200, 235...
    } else if (lvl <= 30) {
      step = 480 + (lvl - 15) * 60    // 540, 600, 660...
    } else if (lvl <= 45) {
      step = 1380 + (lvl - 30) * 110  // 1490, 1600...
    } else {
      step = 3000 + (lvl - 45) * 160  // 3160, 3320...
    }

    const title = GAMIFICATION_CONFIG.LEVEL_TITLES[lvl - 1] || { en: `Level ${lvl}`, hi: `स्तर ${lvl}` }

    list.push({
      level: lvl,
      minXp: cumulative,
      stepXp: lvl === 50 ? null : step,
      title
    })

    if (lvl < 50) cumulative += step
  }
  return list
})()

/**
 * Calculates current level details from total XP.
 * Returns { level, title, currentLevelMinXp, nextLevelMinXp, xpInLevel, xpNeededForNext, progressPct }
 */
export function getLevelDetails(totalXp = 0) {
  const xp = Math.max(0, Math.floor(Number(totalXp) || 0))
  let currentLevelObj = LEVELS[0]

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      currentLevelObj = LEVELS[i]
      break
    }
  }

  const lvl = currentLevelObj.level
  const isMax = lvl >= 50
  const nextLevelObj = isMax ? null : LEVELS[lvl]

  const currentLevelMinXp = currentLevelObj.minXp
  const nextLevelMinXp = nextLevelObj ? nextLevelObj.minXp : currentLevelMinXp
  const stepXp = currentLevelObj.stepXp || 1

  const xpInLevel = xp - currentLevelMinXp
  const xpNeededForNext = isMax ? 0 : Math.max(0, nextLevelMinXp - xp)
  const progressPct = isMax ? 100 : Math.min(100, Math.max(0, Math.round((xpInLevel / stepXp) * 100)))

  return {
    level: lvl,
    title: currentLevelObj.title,
    currentLevelMinXp,
    nextLevelMinXp,
    xpInLevel,
    xpNeededForNext,
    stepXp,
    progressPct,
    isMax
  }
}
