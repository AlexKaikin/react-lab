'use client'

import { cloneElement, type FC, isValidElement, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { classNames } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Animation } from './animation'
import { Position } from './position'

export type ModalProps = {
  children: ReactNode
  onClose: () => void
  position?: Position
  animation?: Animation
  className?: string
}

export const Modal: FC<ModalProps> = (props) => {
  const { position, animation, children, onClose, className } = props
  const [isAnimating, setIsAnimating] = useState(true)
  const isClosingRef = useRef(false)

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsAnimating(true)
  }, [])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target === e.currentTarget && isClosingRef.current) {
        onClose()
      }
    },
    [onClose],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    },
    [handleClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => setIsAnimating(false))

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const childrenWithClose = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ onClose?: () => void }>, {
        onClose: handleClose,
      })
    : children

  return createPortal(
    <>
      <div
        role="presentation"
        tabIndex={-1}
        className={`fixed inset-0 z-40 transition-colors duration-300 ${isAnimating ? 'bg-black/0' : 'bg-black/50'}`}
      />
      <Position
        position={position}
        className="fixed inset-0 z-50 flex"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') handleClose()
        }}
      >
        <Animation animation={animation} isAnimating={isAnimating} onTransitionEnd={handleTransitionEnd}>
          <div role="dialog" aria-modal="true" className={classNames('relative', className)}>
            <div className="absolute top-0 right-0 z-60">
              <Button onClick={handleClose}>
                <Icon name="X" />
              </Button>
            </div>
            {childrenWithClose}
          </div>
        </Animation>
      </Position>
    </>,
    document.body,
  )
}
