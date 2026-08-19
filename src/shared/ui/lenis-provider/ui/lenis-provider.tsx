'use client'

import { ReactLenis } from 'lenis/react'
import { type ReactNode, useEffect, useState } from 'react'

type LenisProviderProps = {
  children: ReactNode
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    setIsEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!isEnabled) return children

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}
