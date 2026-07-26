'use client'

import { useModalStore } from '../model/use-modal-store'

export const ModalProvider = () => {
  const { modalItems } = useModalStore()
  return modalItems[modalItems.length - 1] ?? null
}
