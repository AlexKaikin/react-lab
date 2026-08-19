'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/shared/lib/use-debounce'

export type SearchResult = {
  slug: string
  title: string
  category: string
}

const SEARCH_DEBOUNCE_MS = 300

export const useSearch = (query: string) => {
  const locale = useLocale()
  const [results, setResults] = useState<SearchResult[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const trimmedQuery = query.trim()
  const debouncedQuery = useDebounce(trimmedQuery, SEARCH_DEBOUNCE_MS)
  const isLoading = Boolean(trimmedQuery) && (trimmedQuery !== debouncedQuery || isFetching)

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

  return { results, isLoading }
}
