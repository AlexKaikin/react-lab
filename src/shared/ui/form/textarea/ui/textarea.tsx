'use client'

import type { ChangeEvent, ComponentProps } from 'react'
import { useLayoutEffect, useRef } from 'react'
import { classNames } from '@/shared/lib/class-names'

type TextareaProps = ComponentProps<'textarea'> & {
  autoResize?: boolean
}

const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  const currentHeight = textarea.offsetHeight

  textarea.style.height = 'auto'
  const nextHeight = textarea.scrollHeight

  textarea.style.height = `${currentHeight}px`
  void textarea.offsetHeight
  textarea.style.height = `${nextHeight}px`
}

export const Textarea = ({ autoResize = false, className, onChange, ref, value, ...rest }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    if (autoResize && textareaRef.current) {
      resizeTextarea(textareaRef.current)
    }
  }, [autoResize])

  const handleRef = (element: HTMLTextAreaElement | null) => {
    textareaRef.current = element

    if (typeof ref === 'function') {
      ref(element)
    } else if (ref) {
      ref.current = element
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      resizeTextarea(event.currentTarget)
    }

    onChange?.(event)
  }

  return (
    <textarea
      ref={handleRef}
      value={value}
      data-lenis-prevent
      className={classNames(
        'scrollbar min-h-32 w-full rounded-md border border-secondary bg-primary/20 px-4 py-3 text-base text-primary outline-none backdrop-blur-sm placeholder:text-secondary enabled:hover:bg-secondary focus:border-semantic-primary focus:ring-2 focus:ring-semantic-primary/30 aria-invalid:border-semantic-error aria-invalid:ring-2 aria-invalid:ring-semantic-error/30 aria-invalid:focus:border-semantic-error aria-invalid:focus:ring-semantic-error/30',
        autoResize
          ? 'resize-none transition-[height,border-color,box-shadow,background-color] duration-200 ease-out'
          : 'resize-y transition-colors',
        className,
      )}
      onChange={handleChange}
      {...rest}
    />
  )
}
