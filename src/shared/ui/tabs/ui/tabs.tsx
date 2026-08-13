'use client'

import type { KeyboardEvent } from 'react'
import { classNames } from '@/shared/lib/class-names'
import type { TButtonSize } from '@/shared/ui/button/model/schema'

const tabId = (value: string) => `tab-${value}`
const panelId = (value: string) => `tabpanel-${value}`

const TRACK_SIZE_STYLE: Record<TButtonSize, string> = {
  small: 'h-10',
  medium: 'h-12',
  large: 'h-14',
}

const TAB_SIZE_STYLE: Record<TButtonSize, string> = {
  small: 'h-8 px-3 text-[14px]',
  medium: 'h-10 px-4 text-[16px]',
  large: 'h-12 px-6 text-[18px]',
}

type TabItem = {
  value: string
  label: string
}

type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  label: string
  size?: TButtonSize
  className?: string
}

export const Tabs = ({ items, value, onChange, label, size = 'medium', className }: TabsProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()

    const nextIndex = e.key === 'ArrowRight' ? (index + 1) % items.length : (index - 1 + items.length) % items.length
    const nextItem = items[nextIndex]

    onChange(nextItem.value)
    document.getElementById(tabId(nextItem.value))?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className={classNames(
        'inline-flex w-fit items-center gap-1 rounded-md border border-secondary bg-primary/20 backdrop-blur-sm p-1',
        TRACK_SIZE_STYLE[size],
        className,
      )}
    >
      {items.map((item, index) => {
        const selected = item.value === value

        return (
          <button
            key={item.value}
            id={tabId(item.value)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId(item.value)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={classNames(
              'cursor-pointer rounded-md transition-colors',
              TAB_SIZE_STYLE[size],
              selected ? 'bg-primary text-primary' : 'text-secondary hover:text-primary',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

type TabPanelProps = {
  value: string
  activeValue: string
  children: React.ReactNode
  className?: string
}

export const TabPanel = ({ value, activeValue, children, className }: TabPanelProps) => (
  <div
    role="tabpanel"
    id={panelId(value)}
    aria-labelledby={tabId(value)}
    hidden={value !== activeValue}
    className={className}
  >
    {children}
  </div>
)
