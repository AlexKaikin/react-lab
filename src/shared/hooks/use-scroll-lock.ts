'use client'

import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

let locksCount = 0
let initialOverflow = ''

export const useScrollLock = (isLocked: boolean) => {
  const lenis = useLenis()

  useEffect(() => {
    if (!isLocked) return

    if (locksCount === 0) {
      initialOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    }

    locksCount += 1

    return () => {
      locksCount -= 1

      if (locksCount === 0) {
        document.body.style.overflow = initialOverflow
        lenis?.start()
      }
    }
  }, [isLocked, lenis])
}
