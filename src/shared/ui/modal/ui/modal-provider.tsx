'use client'

import { useModal } from '../model/use-modal'

export const ModalProvider = () => {
  const { modalItems } = useModal()
  const current = modalItems[modalItems.length - 1]

  if (!current) return null

  return current.render()
}
