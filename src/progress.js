// On-device progress (MVP: no login). localStorage-backed.
const KEY = 'ls-progress-v1'

function blank() {
  return { points: 0, conceptsDone: [], badges: [], streak: { last: null, count: 0 }, stats: { quiz: 0, wheel: 0, cards: 0 } }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...blank(), ...JSON.parse(raw) } : blank()
  } catch {
    return blank()
  }
}

function save(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* ignore */ }
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
  save(blank())
}
