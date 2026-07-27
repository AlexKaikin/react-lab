'use client'

import Script from 'next/script'
import { type ReactNode, useEffect } from 'react'
import { THEME, THEMES } from '../model/constants'
import type { Theme } from '../model/types'
import { useTheme } from '../model/use-theme'

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme
    setTheme(THEMES.includes(stored) ? stored : THEME.DARK)
  }, [setTheme])

  return (
    <>
      <Script
        id="theme-init"
        strategy="beforeInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ignore
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          try {
            const theme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
          } catch(e) {}
        })();
      `,
        }}
      />
      {children}
    </>
  )
}
