'use client'

import { type ReactNode, useEffect } from 'react'
import { THEMES } from '../model/constants'
import type { Theme } from '../model/types'
import { useTheme } from '../model/use-theme'

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    const theme = localStorage.getItem('theme') as Theme
    if (theme && THEMES.includes(theme)) setTheme(theme)
  }, [setTheme])

  return (
    <>
      <script
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
