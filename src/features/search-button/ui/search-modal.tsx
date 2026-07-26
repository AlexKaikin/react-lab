'use client'

import { useTranslations } from 'next-intl'
import { Modal } from '@/shared/ui/modal'

export const SearchModal: React.FC = () => {
  const t = useTranslations('shared.search')

  return (
    <Modal
      className="top-2 flex flex-col bg-secondary w-70 rounded-md p-8 items-center"
      animation="slideDown"
      position="top"
      aria-label={t('label')}
    >
      Search
    </Modal>
  )
}

export default SearchModal
