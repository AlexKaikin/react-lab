'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Modal, type ModalContentProps } from '@/shared/ui/modal'

type ConfirmModalProps = ModalContentProps & {
  cb: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ cb, ...restProps }) => {
  const t = useTranslations('shared.confirm')
  const [shouldClose, setShouldClose] = useState(false)

  const handleConfirm = () => {
    cb()
    setShouldClose(true)
  }

  return (
    <Modal
      aria-label={t('label')}
      className="flex flex-col bg-secondary w-70 rounded-md p-8 items-center"
      shouldClose={shouldClose}
      {...restProps}
    >
      {t('question')}
      <Button onClick={handleConfirm}>{t('yes')}</Button>
    </Modal>
  )
}

export default ConfirmModal
