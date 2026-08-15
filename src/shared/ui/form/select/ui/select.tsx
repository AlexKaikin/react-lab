'use client'

import type { KeyboardEvent } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'

export type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  name?: string
  className?: string
}

type SelectListboxProps = {
  listboxId: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  close: () => void
}

const optionId = (listboxId: string, value: string) => `${listboxId}-${value}`

const SelectListbox = ({ listboxId, options, value, onChange, close }: SelectListboxProps) => {
  const [activeValue, setActiveValue] = useState(value || options[0]?.value)
  const listboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listboxRef.current?.focus()
  }, [])

  const moveActive = (delta: number) => {
    const currentIndex = options.findIndex((option) => option.value === activeValue)
    const nextIndex = Math.min(Math.max(currentIndex + delta, 0), options.length - 1)
    setActiveValue(options[nextIndex]?.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveActive(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveActive(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveValue(options[0]?.value)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveValue(options[options.length - 1]?.value)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (activeValue) onChange(activeValue)
      close()
    }
  }

  return (
    <div
      ref={listboxRef}
      role="listbox"
      tabIndex={0}
      aria-activedescendant={activeValue ? optionId(listboxId, activeValue) : undefined}
      className="flex max-h-64 flex-col gap-1 overflow-y-auto outline-none"
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const selected = option.value === value
        const active = option.value === activeValue

        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents: клавиатурная навигация обрабатывается на role="listbox" выше (roving через aria-activedescendant)
          <div
            key={option.value}
            id={optionId(listboxId, option.value)}
            role="option"
            aria-selected={selected}
            tabIndex={-1}
            className={classNames(
              'cursor-pointer rounded-md px-3 py-2 text-sm transition-colors',
              active ? 'bg-primary' : 'hover:bg-primary/50',
              selected && 'font-medium',
            )}
            onMouseEnter={() => setActiveValue(option.value)}
            onClick={() => {
              onChange(option.value)
              close()
            }}
          >
            {option.label}
          </div>
        )
      })}
    </div>
  )
}

export const Select = ({ options, value, onChange, placeholder, id, name, className }: SelectProps) => {
  const listboxId = useId()
  const selectedOption = options.find((option) => option.value === value)

  return (
    <Dropdown
      panelRole="listbox"
      matchTriggerWidth
      trigger={(triggerProps) => (
        <button
          type="button"
          id={id}
          name={name}
          className={classNames(
            'flex h-12 w-full items-center justify-between gap-2 rounded-md border border-secondary bg-primary/20 px-4 text-base text-primary outline-none backdrop-blur-sm transition-colors focus:border-semantic-primary focus:ring-2 focus:ring-semantic-primary/30',
            className,
          )}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              triggerProps.onClick()
            }
          }}
          {...triggerProps}
        >
          <span className={classNames('truncate', !selectedOption && 'text-secondary')}>
            {selectedOption?.label ?? placeholder}
          </span>
          <Icon name="ChevronDown" size={18} className="shrink-0 text-secondary" />
        </button>
      )}
    >
      {({ close }) => (
        <SelectListbox listboxId={listboxId} options={options} value={value} onChange={onChange} close={close} />
      )}
    </Dropdown>
  )
}
