'use client'

import { useEffect, useRef, useState } from 'react'

const HIDE_AFTER_SCROLL_Y = 64
const MIN_SCROLL_DELTA = 8

export const useHeaderVisibility = <T extends HTMLElement>() => {
  const [isHidden, setIsHidden] = useState(false)
  const headerRef = useRef<T>(null)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollYRef.current

      if (Math.abs(delta) < MIN_SCROLL_DELTA) return

      lastScrollYRef.current = scrollY

      const isScrollingDown = delta > 0
      setIsHidden(isScrollingDown && scrollY > HIDE_AFTER_SCROLL_Y)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const showOnFocus = () => setIsHidden(false)

    header.addEventListener('focusin', showOnFocus)

    return () => header.removeEventListener('focusin', showOnFocus)
  }, [])

  return { isHidden, headerRef }
}
