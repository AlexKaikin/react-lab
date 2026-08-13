'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Link } from '@/shared/lib/i18n/navigation'
import { useDebounce } from '@/shared/lib/use-debounce'
import { Input } from '@/shared/ui/form/input'
import { Modal, useModalStore } from '@/shared/ui/modal'
import { Skeleton } from '@/shared/ui/skeleton'

type SearchResult = {
  slug: string
  title: string
  category: string
}

const SEARCH_DEBOUNCE_MS = 300
const SKELETON_ROWS = ['a', 'b', 'c']

export const SearchModal: React.FC = () => {
  const t = useTranslations('shared.search')
  const locale = useLocale()
  const closeModal = useModalStore((state) => state.closeModal)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const trimmedQuery = query.trim()
  const debouncedQuery = useDebounce(trimmedQuery, SEARCH_DEBOUNCE_MS)
  const isLoading = Boolean(trimmedQuery) && (trimmedQuery !== debouncedQuery || isFetching)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!debouncedQuery) {
      setResults(null)
      return
    }

    let cancelled = false
    setIsFetching(true)

    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}&locale=${locale}`)
      .then((response) => response.json())
      .then((data: SearchResult[]) => {
        if (!cancelled) setResults(data)
      })
      .finally(() => {
        if (!cancelled) setIsFetching(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, locale])

  return (
    <Modal
      className="w-[calc(100%-1rem)] max-w-100 rounded-md"
      animation="slideDown"
      position="top"
      aria-label={t('label')}
    >
      <div className="flex flex-col gap-4 p-4">
        <div>{t('label')}</div>
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
        />

        {(isLoading || results !== null) && (
          <ul aria-live="polite" className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {isLoading &&
              SKELETON_ROWS.map((row) => (
                <li key={row} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </li>
              ))}

            {!isLoading && results?.length === 0 && <li className="text-secondary opacity-50">{t('noResults')}</li>}

            {!isLoading &&
              results?.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={closeModal}
                    className="flex flex-col hover:opacity-100 opacity-80 transition-opacity"
                  >
                    <span>{post.title}</span>
                    <span className="text-xs text-secondary opacity-50">{post.category}</span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}

export default SearchModal
