'use client'

import { useTranslations } from 'next-intl'
import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { useScrollLock } from '@/shared/hooks/use-scroll-lock'
import { classNames } from '@/shared/lib/class-names'
import { useRouter } from '@/shared/lib/i18n/navigation'
import { Input } from '@/shared/ui/form/input'
import { Icon } from '@/shared/ui/icon'
import { useSearch } from '../model/use-search'
import { optionId, SearchResults } from './search-results'

type SearchFieldProps = {
  className?: string
}

export const SearchField = ({ className }: SearchFieldProps) => {
  const t = useTranslations('shared.search')
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string>()

  const { results, isLoading } = useSearch(query)
  const isPanelVisible = isOpen && (isLoading || results !== null)

  useScrollLock(isPanelVisible)

  useEffect(() => {
    setActiveSlug(results?.[0]?.slug)
  }, [results])

  useEffect(() => {
    if (!isPanelVisible) return

    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return
      setIsOpen(false)
    }

    const handleScroll = () => setIsOpen(false)

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPanelVisible])

  const close = () => {
    setQuery('')
    setIsOpen(false)
  }

  const moveActive = (step: number) => {
    if (!results?.length) return

    const currentIndex = results.findIndex((post) => post.slug === activeSlug)
    const nextIndex = Math.min(Math.max(currentIndex + step, 0), results.length - 1)
    setActiveSlug(results[nextIndex].slug)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      moveActive(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveActive(-1)
    } else if (e.key === 'Enter' && activeSlug) {
      e.preventDefault()
      router.push(`/blog/${activeSlug}`)
      close()
    }
  }

  return (
    <div ref={rootRef} className={classNames('relative', className)}>
      <div className={isOpen ? 'relative z-modal' : undefined}>
        <Input
          type="search"
          role="combobox"
          value={query}
          aria-label={t('label')}
          aria-expanded={isPanelVisible}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={isPanelVisible && activeSlug ? optionId(listboxId, activeSlug) : undefined}
          placeholder={t('placeholder')}
          startSlot={<Icon name="Search" size={18} className="text-secondary" />}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {isPanelVisible && (
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            onSelect={close}
            listboxId={listboxId}
            activeSlug={activeSlug}
            onActivate={setActiveSlug}
            className="paper absolute inset-x-0 top-full z-modal mt-2 max-h-80 p-2"
          />
        )}
      </div>
    </div>
  )
}
