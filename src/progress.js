// User-specific progress manager with local caching & Cloud Firestore sync
import { db, doc, getDoc, setDoc, isFirebaseConfigured } from './firebase.js'

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
  // Notify listeners that user / progress scope changed
  emitProgressUpdate()
}

export function getCurrentUser() {
  return currentUserProfile
}

function getKey() {
  return currentUserId ? `ls-progress-${currentUserId}` : 'ls-progress-guest'
}

function blank() {
  return {
    points: 0,
    conceptsDone: [],
    badges: [],
    streak: { last: null, count: 0 },
    stats: { quiz: 0, wheel: 0, cards: 0 }
  }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(getKey())
    return raw ? { ...blank(), ...JSON.parse(raw) } : blank()
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
    localStorage.setItem(getKey(), JSON.stringify(p))
  } catch {
    /* ignore storage errors */
  }
  emitProgressUpdate()
  queueCloudSync(p)
}

export async function syncWithCloud(user) {
  if (!user || user.isAnonymous || !isFirebaseConfigured || !db) return loadProgress()
  try {
    const userRef = doc(db, 'users', user.uid)
    const snap = await getDoc(userRef)
    const local = loadProgress()
    if (snap.exists()) {
      const cloud = snap.data()?.progress || {}
      // Merge cloud and local data: take maximums and unions
      const merged = {
        points: Math.max(local.points || 0, cloud.points || 0),
        conceptsDone: Array.from(new Set([...(local.conceptsDone || []), ...(cloud.conceptsDone || [])])),
        badges: Array.from(new Set([...(local.badges || []), ...(cloud.badges || [])])),
        streak: {
          last: cloud.streak?.last || local.streak?.last || null,
          count: Math.max(local.streak?.count || 0, cloud.streak?.count || 0)
        },
        stats: {
          quiz: Math.max(local.stats?.quiz || 0, cloud.stats?.quiz || 0),
          wheel: Math.max(local.stats?.wheel || 0, cloud.stats?.wheel || 0),
          cards: Math.max(local.stats?.cards || 0, cloud.stats?.cards || 0)
        }
      }
      localStorage.setItem(`ls-progress-${user.uid}`, JSON.stringify(merged))
      emitProgressUpdate()
      queueCloudSync(merged)
      return merged
    } else {
      // First cloud login for this user: push their current local progress to cloud
      queueCloudSync(local)
      return local
    }
  } catch (err) {
    console.warn('[Legal Sahayak] Error fetching cloud progress:', err)
    return loadProgress()
  }
}

export function addPoints(n) {
  const p = loadProgress()
  p.points += n
  save(p)
  return p
}

export function markConceptDone(id) {
  const p = loadProgress()
  if (!p.conceptsDone.includes(id)) p.conceptsDone.push(id)
  save(p)
  return p
}

export function markGamePlayed(game) {
  const p = loadProgress()
  p.stats[game] = (p.stats[game] || 0) + 1
  // streak: bump once per day
  const today = new Date().toDateString()
  if (p.streak.last !== today) {
    const yest = new Date(Date.now() - 864e5).toDateString()
    p.streak.count = p.streak.last === yest ? p.streak.count + 1 : 1
    p.streak.last = today
  }
  save(p)
  return p
}

export function grantBadge(badge) {
  const p = loadProgress()
  if (!p.badges.includes(badge)) {
    p.badges.push(badge)
    save(p)
  }
  return p
}

export function resetProgress() {
  const b = blank()
  save(b)
  return b
}
