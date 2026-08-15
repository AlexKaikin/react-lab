'use client'

import { type ReactNode, useEffect } from 'react'
import { THEME, THEMES, type Theme, useTheme } from '@/shared/lib/theme'

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme
    setTheme(THEMES.includes(stored) ? stored : THEME.DARK)
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
