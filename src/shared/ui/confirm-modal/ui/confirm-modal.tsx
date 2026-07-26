'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { Modal, type ModalContentProps, useModalStore } from '@/shared/ui/modal'

type ConfirmModalProps = ModalContentProps & {
  cb: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ cb, ...restProps }) => {
  const t = useTranslations('shared.confirm')
  const closeModal = useModalStore((state) => state.closeModal)

  const handleConfirm = () => {
    cb()
    closeModal()
  }

  return (
    <Modal
      aria-label={t('label')}
      className="flex flex-col bg-secondary w-70 rounded-md p-8 items-center"
      {...restProps}
    >
      {t('question')}
      <Button onClick={handleConfirm}>{t('yes')}</Button>
    </Modal>
  )
}

export default ConfirmModal
