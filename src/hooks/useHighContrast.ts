import { useEffect, useState } from 'react'

export function useHighContrast() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem('sorowork-high-contrast') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    try {
      localStorage.setItem('sorowork-high-contrast', String(enabled))
    } catch {}
  }, [enabled])

  return { enabled, toggle: () => setEnabled((v) => !v) }
}
