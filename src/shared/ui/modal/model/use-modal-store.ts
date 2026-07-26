'use client'

import { createElement, type FC, type ReactNode } from 'react'
import { create } from 'zustand'
import type { ModalContentProps, OpenModalParams } from './types'

type ModalStore = {
  modalItems: ReactNode[]
  isClosing: boolean
  openModal: <P extends ModalContentProps>(params: OpenModalParams<P>) => void
  closeModal: () => void
  cleaningModalItems: () => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  modalItems: [],
  isClosing: false,

  openModal: (params) => {
    const Comp = params.component as unknown as FC<ModalContentProps>
    const element = createElement(Comp, { ...('props' in params ? params.props : {}) } as ModalContentProps) // <- создаём сразу, не оборачиваем в функцию

    set((state) => ({ modalItems: [...state.modalItems, element] }))
  },

  closeModal: () => set({ isClosing: true }),
  cleaningModalItems: () => set((state) => ({ modalItems: state.modalItems.slice(0, -1), isClosing: false })),
}))
