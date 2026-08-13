'use client'

import { createPortal } from 'react-dom'
import { useToastStore } from '../model/use-toast-store'
import { Toast } from './toast'

export const ToastProvider = () => {
  const toastItems = useToastStore((state) => state.toastItems)

  if (toastItems.length === 0) return null

  return createPortal(
    <div aria-live="polite" className="fixed right-4 bottom-4 z-toast flex w-full max-w-sm flex-col gap-2">
      {toastItems.map((item) => (
        <Toast key={item.id} {...item} />
      ))}
    </div>,
    document.body,
  )
}
