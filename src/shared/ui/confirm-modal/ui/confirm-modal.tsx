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
    <Modal aria-label={t('label')} className="flex w-70 flex-col gap-4 items-center p-8" {...restProps}>
      <h3>{t('question')}</h3>
      <Button variant="outlined" onClick={handleConfirm}>
        {t('yes')}
      </Button>
    </Modal>
  )
}

export default ConfirmModal
