'use client'

import { createElement, type ReactNode } from 'react'
import { create } from 'zustand'
import type { OpenModalParams } from './types'

type ModalItem = {
  id: string
  render: () => ReactNode
}

type ModalStore = {
  modalItems: ModalItem[]
  openModal: (params: OpenModalParams) => void
  closeModal: () => void
}

export const useModal = create<ModalStore>()((set) => ({
  modalItems: [],

  openModal: (params: OpenModalParams) => {
    const id = params.id || Math.random().toString(36).slice(2, 11)

    const render: ModalItem['render'] = () => {
      const Comp = params.component as React.ComponentType<{ onClose: () => void }>

      return createElement(Comp, {
        ...(params.props as Record<string, unknown>),
        onClose: () => set((state) => ({ modalItems: state.modalItems.slice(0, -1) })),
      })
    }

    set((state) => ({ modalItems: [...state.modalItems, { id, render }] }))
  },

  closeModal: () => set((state) => ({ modalItems: state.modalItems.slice(0, -1) })),
}))
