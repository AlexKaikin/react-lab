'use client'

import { useTranslations } from 'next-intl'
import { Modal, type ModalContentProps } from '@/shared/ui/modal'

export type SearchModalProps = ModalContentProps

export const SearchModal: React.FC<SearchModalProps> = (props) => {
  const t = useTranslations('shared.search')

  return (
    <Modal
      className="top-2 flex flex-col bg-secondary w-70 rounded-md p-8 items-center"
      animation="slideDown"
      position="top"
      aria-label={t('label')}
      {...props}
    >
      Search
    </Modal>
  )
}

export default SearchModal
