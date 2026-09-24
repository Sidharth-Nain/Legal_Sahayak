import React, { useEffect, useState } from 'react'
import { LangProvider } from './i18n.jsx'
import { useRoute } from './router.jsx'
import { Header, Footer } from './components/shared.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Concept from './pages/Concept.jsx'
import Play from './pages/Play.jsx'
import Quiz from './pages/Quiz.jsx'
import Wheel from './pages/Wheel.jsx'
import Cards from './pages/Cards.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AuthModal from './components/AuthModal.jsx'
import GamificationOverlays from './components/GamificationOverlays.jsx'

export default function App() {
  const route = useRoute()
  const [textsize, setTextsize] = useState(() => localStorage.getItem('ls-textsize') || 'base')
  useEffect(() => {
    document.documentElement.dataset.textsize = textsize
    localStorage.setItem('ls-textsize', textsize)
  }, [textsize])

  let page
  if (route === '/' || route === '') page = <Home />
  else if (route === '/learn') page = <Learn />
  else if (route.startsWith('/learn/')) page = <Concept conceptId={route.slice('/learn/'.length)} />
  else if (route === '/play') page = <Play />
  else if (route === '/play/quiz') page = <Quiz focusConceptId={new URLSearchParams(window.location.hash.split('?')[1] || '').get('c') || ''} />
  else if (route === '/play/spin-wheel') page = <Wheel />
  else if (route === '/play/cards') page = <Cards />
  else if (route === '/about') page = <About />
  else if (route === '/profile') page = <Profile />
  else page = <Home />

  return (
    <LangProvider>
      <AuthProvider>
        <Header textsize={textsize} setTextsize={setTextsize} />
        <main>{page}</main>
        <Footer />
        <AuthModal />
        <GamificationOverlays />
      </AuthProvider>
    </LangProvider>
  )
}
