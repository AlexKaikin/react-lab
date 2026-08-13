'use client'

import { create } from 'zustand'
import type { AddToastParams, ToastItem } from './types'

const DEFAULT_AUTO_CLOSE_MS = 5000

type ToastStore = {
  toastItems: ToastItem[]
  addToast: (params: AddToastParams) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>()((set) => ({
  toastItems: [],

  addToast: ({ message, variant, autoClose = DEFAULT_AUTO_CLOSE_MS }) => {
    const id = crypto.randomUUID()
    set((state) => ({ toastItems: [...state.toastItems, { id, message, variant, autoClose }] }))
  },

  removeToast: (id) => set((state) => ({ toastItems: state.toastItems.filter((item) => item.id !== id) })),
}))
