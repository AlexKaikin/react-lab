import { useCallback, useEffect, useRef } from 'react'
import { type Animation, useAnimation } from '@/shared/ui/animation'
import { useModalStore } from '@/shared/ui/modal/model/use-modal-store'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type Props = {
  animation?: Animation
}

export const useModal = ({ animation }: Props) => {
  const isClosingRef = useRef(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { isAnimating, setIsAnimating, animationClassName } = useAnimation(animation)
  const shouldClose = useModalStore((state) => state.isClosing)
  const cleaningModalItems = useModalStore((state) => state.cleaningModalItems)

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsAnimating(true)
  }, [setIsAnimating])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === e.currentTarget && isClosingRef.current) {
        cleaningModalItems()
      }
    },
    [cleaningModalItems],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    if (shouldClose) handleClose()
  }, [shouldClose, handleClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    requestAnimationFrame(() => setIsAnimating(false))

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [handleKeyDown, setIsAnimating])

  return {
    dialogRef,
    handleClose,
    handleTransitionEnd,
    animating: { isAnimating, animationClassName },
  }
}
