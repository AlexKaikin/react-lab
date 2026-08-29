'use client'

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { classNames } from '@/shared/lib/class-names'
import { useAnimation } from '@/shared/ui/animation'

type PanelRole = 'menu' | 'listbox'

type DropdownTriggerProps = {
  onClick: () => void
  'aria-expanded': boolean
  'aria-haspopup': PanelRole
}

type DropdownChildrenApi = {
  close: () => void
}

type DropdownProps = {
  trigger: (props: DropdownTriggerProps) => ReactNode
  children: ReactNode | ((api: DropdownChildrenApi) => ReactNode)
  panelRole?: PanelRole
  panelLabel?: string
  className?: string
  matchTriggerWidth?: boolean
}

type Coords = { top: number; left: number; width?: number }

const GAP = 2
const FOCUSABLE_SELECTOR =
  'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

export const Dropdown = ({
  trigger,
  children,
  panelRole = 'menu',
  panelLabel,
  className,
  matchTriggerWidth,
}: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [coords, setCoords] = useState<Coords | null>(null)
  const isClosingRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { setIsAnimating, animationClassName } = useAnimation('scale')

  const focusTrigger = useCallback(() => {
    rootRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
  }, [])

  const handleOpen = useCallback(() => {
    isClosingRef.current = false
    setIsMounted(true)

    requestAnimationFrame(() => {
      setIsAnimating(false)
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus())
    })
  }, [setIsAnimating])

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsAnimating(true)
  }, [setIsAnimating])

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const focusableElements = [...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [])].filter(
      (element) => element.tabIndex >= 0 && element.getClientRects().length > 0,
    )
    if (focusableElements.length === 0) return

    event.preventDefault()

    const activeIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
    const nextIndex =
      activeIndex === -1
        ? 0
        : (activeIndex + (event.shiftKey ? -1 : 1) + focusableElements.length) % focusableElements.length

    focusableElements[nextIndex]?.focus()
  }

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target === e.currentTarget && isClosingRef.current) {
      setIsMounted(false)
      setCoords(null)
    }
  }

  const updateCoords = useCallback(() => {
    if (!panelRef.current || !rootRef.current) return

    const panelRect = panelRef.current.getBoundingClientRect()
    const rootRect = rootRef.current.getBoundingClientRect()

    const fitsBelow = rootRect.bottom + GAP + panelRect.height <= window.innerHeight
    const fitsRight = rootRect.right - panelRect.width >= 0

    setCoords({
      top: fitsBelow ? rootRect.bottom + GAP : rootRect.top - panelRect.height - GAP,
      left: matchTriggerWidth ? rootRect.left : fitsRight ? rootRect.right - panelRect.width : rootRect.left,
      width: matchTriggerWidth ? rootRect.width : undefined,
    })
  }, [matchTriggerWidth])

  useLayoutEffect(() => {
    if (!isMounted) return
    updateCoords()
  }, [isMounted, updateCoords])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = (e: Event) => {
      const isPageScroll = e.target === document

      if (isPageScroll) handleClose()
      else updateCoords()
    }

    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [isMounted, updateCoords, handleClose])

  useEffect(() => {
    if (!isMounted) return

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return
      handleClose()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
        focusTrigger()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMounted, handleClose, focusTrigger])

  const panelA11yProps = panelRole === 'menu' ? { role: 'menu' as const, 'aria-label': panelLabel } : {}

  return (
    <div ref={rootRef} className="relative">
      {trigger({
        onClick: () => (isMounted ? handleClose() : handleOpen()),
        'aria-expanded': isMounted,
        'aria-haspopup': panelRole,
      })}
      {isMounted &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              width: coords?.width,
              visibility: coords ? 'visible' : 'hidden',
            }}
            className="fixed z-modal"
          >
            <div className={animationClassName} onTransitionEnd={handleTransitionEnd}>
              {/* biome-ignore lint/a11y/noStaticElementInteractions: role='menu' задаётся здесь; для 'listbox' роль живёт на реальном интерактивном списке внутри children (иначе получится listbox в listbox) */}
              <div
                {...panelA11yProps}
                className={classNames('paper relative flex min-w-48 flex-col gap-1 overflow-hidden p-3', className)}
                onClick={handleClose}
                onKeyDown={handlePanelKeyDown}
              >
                {typeof children === 'function' ? children({ close: handleClose }) : children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
