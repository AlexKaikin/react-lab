import { Button } from '@/shared/ui/button'
import { Modal, type ModalProps } from '@/shared/ui/modal'

type ConfirmModalProps = ModalProps & {
  cb: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ cb, onClose }) => {
  return (
    <Modal className="flex flex-col bg-secondary w-70 rounded-md p-8 items-center" onClose={onClose}>
      Уверены?
      <Button onClick={cb}>Да</Button>
    </Modal>
  )
}
