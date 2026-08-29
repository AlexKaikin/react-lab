'use client'

import { create } from 'zustand'

type SubscriptionRefreshStore = {
  version: number
  refresh: () => void
}

export const useSubscriptionRefreshStore = create<SubscriptionRefreshStore>()((set) => ({
  version: 0,
  refresh: () => set((state) => ({ version: state.version + 1 })),
}))
