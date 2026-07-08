import { create } from 'zustand'
import type { Theme } from '../model/types'

type ThemeState = {
  theme: Theme | null
  setTheme: (theme: Theme) => void
}

export const useTheme = create<ThemeState>((set) => ({
  theme: null,

  setTheme: (theme) => {
    set({ theme })
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  },
}))
