import { type RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event?.target as Node
      const refArray = Array.isArray(refs) ? refs : [refs]

      const isInside = refArray.some((ref) => {
        const el = ref?.current
        return el?.contains(target)
      })

      if (!isInside) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
