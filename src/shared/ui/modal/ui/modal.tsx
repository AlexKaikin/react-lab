'use client'

import type { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { classNames } from '@/shared/lib/class-names'
import type { Animation } from '@/shared/ui/animation'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { getPositionClassName, type Position } from '../lib/get-position-class-name'
import { useModal } from '../model/use-modal'

export type ModalProps = {
  'aria-label': string
  children: ReactNode
  position?: Position
  animation?: Animation
  className?: string
}

export const Modal: FC<ModalProps> = (props) => {
  const { position, animation, children, className, ...restProps } = props
  const { dialogRef, handleClose, handleTransitionEnd, animating } = useModal({ animation })
  const { isAnimating, animationClassName } = animating

  return createPortal(
    <>
      <div
        role="presentation"
        tabIndex={-1}
        className={`fixed inset-0 z-overlay transition-[background-color,backdrop-filter] duration-300 ${isAnimating ? 'bg-black/0 backdrop-blur-none' : 'bg-black/10 backdrop-blur-md'}`}
      />
      {/* biome-ignore lint/a11y/noStaticElementInteractions: клик закрывает по клику вне диалога, keyboard-эквивалент — Escape (глобальный листенер) и кнопка X */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: то же самое — клавиатурным пользователям не нужен фокус на самом фоне */}
      <div
        className={classNames('fixed inset-0 z-modal flex', getPositionClassName(position))}
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={classNames(
            'paper scrollbar relative m-2 max-h-[calc(100vh-1rem)] overflow-y-auto',
            animationClassName,
            className,
          )}
          onTransitionEnd={handleTransitionEnd}
          {...restProps}
        >
          <div className="absolute top-0 right-0">
            <Button onClick={handleClose}>
              <Icon name="X" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.body,
  )
}
