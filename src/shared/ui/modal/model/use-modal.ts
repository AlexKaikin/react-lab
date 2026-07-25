'use client'

import { createElement, type FC, type ReactNode } from 'react'
import { create } from 'zustand'
import type { ModalContentProps, OpenModalParams } from './types'

type ModalItem = {
  id: string
  render: () => ReactNode
}

type ModalStore = {
  modalItems: ModalItem[]
  openModal: <P extends ModalContentProps>(params: OpenModalParams<P>) => void
  closeModal: (id: string) => void
}

export const useModal = create<ModalStore>()((set, get) => ({
  modalItems: [],

  openModal: (params) => {
    const id = params.id || Math.random().toString(36).slice(2, 11)

    const render: ModalItem['render'] = () => {
      const Comp = params.component as unknown as FC<ModalContentProps>

      return createElement(Comp, {
        ...('props' in params ? params.props : {}),
        onClose: () => get().closeModal(id),
      })
    }

    set((state) => ({ modalItems: [...state.modalItems, { id, render }] }))
  },

  closeModal: (id) => set((state) => ({ modalItems: state.modalItems.filter((item) => item.id !== id) })),
}))
