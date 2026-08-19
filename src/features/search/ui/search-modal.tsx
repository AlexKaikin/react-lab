'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/shared/ui/form/input'
import { Modal, useModalStore } from '@/shared/ui/modal'
import { useSearch } from '../model/use-search'
import { SearchResults } from './search-results'

export const SearchModal: React.FC = () => {
  const t = useTranslations('shared.search')
  const closeModal = useModalStore((state) => state.closeModal)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')
  const { results, isLoading } = useSearch(query)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Modal className="w-full max-w-200 rounded-md" animation="slideDown" position="top" aria-label={t('label')}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <h3>{t('label')}</h3>
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
          />
        </div>

        {(isLoading || results !== null) && (
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            onSelect={closeModal}
            className="max-h-80"
          />
        )}
      </div>
    </Modal>
  )
}

export default SearchModal
