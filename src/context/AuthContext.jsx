import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut
} from '../firebase.js'
import { setCurrentUser, syncWithCloud } from '../progress.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('signin') // 'signin' | 'signup'

  // Initialize Auth state
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const profile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Citizen',
            photoURL: firebaseUser.photoURL || null,
            isAnonymous: firebaseUser.isAnonymous
          }
          setUser(profile)
          setCurrentUser(profile)
          await syncWithCloud(profile)
        } else {
          setUser(null)
          setCurrentUser(null)
        }
        setLoading(false)
      })
      return () => unsubscribe()
    } else {
      // Local demo mode: restore any active demo session from localStorage
      try {
        const stored = localStorage.getItem('ls-demo-user')
        if (stored) {
          const demoUser = JSON.parse(stored)
          setUser(demoUser)
          setCurrentUser(demoUser)
        } else {
          setUser(null)
          setCurrentUser(null)
        }
      } catch {
        setUser(null)
        setCurrentUser(null)
      }
      setLoading(false)
    }
  }, [])

  const loginWithEmail = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password)
      return res.user
    } else {
      // Demo mode fallback
      const demoUser = {
        uid: 'demo-' + btoa(email).replace(/=/g, '').slice(0, 12),
        email,
        displayName: email.split('@')[0],
        photoURL: null,
        isAnonymous: false
      }
      localStorage.setItem('ls-demo-user', JSON.stringify(demoUser))
      setUser(demoUser)
      setCurrentUser(demoUser)
      return demoUser
    }
  }

  const signupWithEmail = async (email, password, displayName) => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(res.user, { displayName })
      }
      return res.user
    } else {
      // Demo mode fallback
      const demoUser = {
        uid: 'demo-' + btoa(email).replace(/=/g, '').slice(0, 12),
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: null,
        isAnonymous: false
      }
      localStorage.setItem('ls-demo-user', JSON.stringify(demoUser))
      setUser(demoUser)
      setCurrentUser(demoUser)
      return demoUser
    }
  }

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithPopup(auth, googleProvider)
      return res.user
    } else {
      // Demo mode fallback
      const demoUser = {
        uid: 'demo-google-user',
        email: 'citizen@example.com',
        displayName: 'Demo Citizen',
        photoURL: null,
        isAnonymous: false
      }
      localStorage.setItem('ls-demo-user', JSON.stringify(demoUser))
      setUser(demoUser)
      setCurrentUser(demoUser)
      return demoUser
    }
  }

  const loginAsGuest = async () => {
    if (isFirebaseConfigured && auth) {
      const res = await signInAnonymously(auth)
      return res.user
    } else {
      // Demo mode fallback
      const guestUser = {
        uid: 'demo-guest-' + Date.now().toString(36),
        email: '',
        displayName: 'Guest Citizen',
        photoURL: null,
        isAnonymous: true
      }
      localStorage.setItem('ls-demo-user', JSON.stringify(guestUser))
      setUser(guestUser)
      setCurrentUser(guestUser)
      return guestUser
    }
  }

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth)
    } else {
      localStorage.removeItem('ls-demo-user')
      setUser(null)
      setCurrentUser(null)
    }
  }

  const openSignIn = () => {
    setAuthModalMode('signin')
    setAuthModalOpen(true)
  }

  const openSignUp = () => {
    setAuthModalMode('signup')
    setAuthModalOpen(true)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isFirebaseConfigured,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        loginAsGuest,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openSignIn,
        openSignUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
