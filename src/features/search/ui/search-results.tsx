'use client'

import { useTranslations } from 'next-intl'
import { classNames } from '@/shared/lib/class-names'
import { Link } from '@/shared/lib/i18n/navigation'
import { Skeleton } from '@/shared/ui/skeleton'
import { highlightMatch } from '../lib/highlight-match'
import type { SearchResult } from '../model/use-search'

const SKELETON_ROWS = ['a', 'b', 'c']

type SearchResultsProps = {
  results: SearchResult[] | null
  isLoading: boolean
  query: string
  onSelect: () => void
  className?: string
  listboxId?: string
  activeSlug?: string
  onActivate?: (slug: string) => void
}

export const optionId = (listboxId: string, slug: string) => `${listboxId}-${slug}`

export const SearchResults = ({
  results,
  isLoading,
  query,
  onSelect,
  className,
  listboxId,
  activeSlug,
  onActivate,
}: SearchResultsProps) => {
  const t = useTranslations('shared.search')

  const listProps = listboxId
    ? { id: listboxId, role: 'listbox' as const, 'aria-label': t('label') }
    : { 'aria-live': 'polite' as const }

  const getItemProps = (slug: string) =>
    listboxId ? { id: optionId(listboxId, slug), role: 'option' as const, 'aria-selected': slug === activeSlug } : {}

  return (
    <ul {...listProps} data-lenis-prevent className={classNames('flex flex-col gap-1 overflow-y-auto', className)}>
      {isLoading &&
        SKELETON_ROWS.map((row) => (
          <li key={row} className="flex flex-col gap-1 p-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </li>
        ))}

      {!isLoading && results?.length === 0 && <li className="p-2 text-secondary opacity-50">{t('noResults')}</li>}

      {!isLoading &&
        results?.map((post) => (
          <li key={post.slug} {...getItemProps(post.slug)} onMouseEnter={() => onActivate?.(post.slug)}>
            <Link
              href={`/blog/${post.slug}`}
              tabIndex={listboxId ? -1 : undefined}
              onClick={onSelect}
              className={classNames(
                'flex flex-col gap-0.5 rounded-md p-2 opacity-80 transition-[opacity,background-color] hover:bg-secondary hover:opacity-100',
                post.slug === activeSlug && 'bg-secondary opacity-100',
              )}
            >
              <span>{highlightMatch(post.title, query)}</span>
              <span className="text-xs text-secondary opacity-50">{post.category}</span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
