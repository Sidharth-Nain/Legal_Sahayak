// Browser-native text-to-speech (Web Speech API) — zero audio assets.
let current = null

export function speak(text, lang = 'en', onEnd) {
  stopSpeech()
  if (!('speechSynthesis' in window) || !text) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
  u.rate = 0.95
  if (onEnd) {
    u.onend = () => { current = null; onEnd() }
    u.onerror = () => { current = null; onEnd() }
  }
  current = u
  window.speechSynthesis.speak(u)
}

export function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
  current = null
}

export function isSpeaking() {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking
}
