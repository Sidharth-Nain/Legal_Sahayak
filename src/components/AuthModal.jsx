import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../i18n.jsx'

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginAsGuest,
    isConfigured
  } = useAuth()
  const { t } = useLang()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!authModalOpen) return null

  const handleClose = () => {
    if (loading) return
    setError('')
    setAuthModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (authModalMode === 'signup') {
        if (!email || !password) {
          throw new Error('Please fill in email and password.')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.')
        }
        await signupWithEmail(email, password, name.trim())
      } else {
        if (!email || !password) {
          throw new Error('Please fill in email and password.')
        }
        await loginWithEmail(email, password)
      }
      handleClose()
    } catch (err) {
      console.error(err)
      let msg = err.message || 'Authentication failed.'
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = 'Invalid email or password.'
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please sign in instead.'
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.'
      } else if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup was closed.'
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      handleClose()
    } catch (err) {
      console.error(err)
      let msg = err.message || 'Google sign in failed.'
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup was closed.'
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not authorized in Firebase Console.'
      }
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = async () => {
    setError('')
    setLoading(true)
    try {
      await loginAsGuest()
      handleClose()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Guest sign in failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="auth-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="auth-card">
        <button
          className="auth-close-btn"
          onClick={handleClose}
          aria-label="Close"
          disabled={loading}
        >
          ✕
        </button>

        <div className="auth-header">
          <span className="auth-icon" aria-hidden="true">🏛️</span>
          <h3 id="auth-modal-title">
            {authModalMode === 'signin' ? t('signIn') : t('signUp')}
          </h3>
          <p className="auth-subtitle">{t('authSubtitle')}</p>
        </div>

        {!isConfigured && (
          <div className="auth-notice-banner">
            <span aria-hidden="true">ℹ️</span>
            <div>
              <strong>Local Mode Active</strong>
              <p>{t('demoNotice')}</p>
            </div>
          </div>
        )}

        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={authModalMode === 'signin'}
            className={`auth-tab ${authModalMode === 'signin' ? 'active' : ''}`}
            onClick={() => { setAuthModalMode('signin'); setError('') }}
          >
            {t('signIn')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authModalMode === 'signup'}
            className={`auth-tab ${authModalMode === 'signup' ? 'active' : ''}`}
            onClick={() => { setAuthModalMode('signup'); setError('') }}
          >
            {t('signUp')}
          </button>
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        <button
          type="button"
          className="auth-btn google-btn"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {t('continueGoogle')}
        </button>

        <div className="auth-divider">
          <span>{t('orWithEmail')}</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {authModalMode === 'signup' && (
            <div className="auth-field">
              <label htmlFor="auth-name">{t('name')}</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                disabled={loading}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">{t('email')}</label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">{t('password')}</label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? '…' : authModalMode === 'signin' ? t('signIn') : t('signUp')}
          </button>
        </form>

        <div className="auth-footer-actions">
          <button
            type="button"
            className="auth-guest-btn"
            onClick={handleGuest}
            disabled={loading}
          >
            {t('continueGuest')} →
          </button>
        </div>
      </div>
    </div>
  )
}
