import { useEffect, useState } from 'react'

// Minimal hash router (keeps the bundle tiny; works from any static host).
export function useRoute() {
  const get = () => window.location.hash.replace(/^#/, '') || '/'
  const [route, setRoute] = useState(get)
  useEffect(() => {
    const onChange = () => setRoute(get())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigate(to) {
  window.location.hash = to
  window.scrollTo(0, 0)
}

export function Link({ to, children, className }) {
  return (
    <a href={`#${to}`} className={className}>{children}</a>
  )
}
