import { Modal, type ModalProps } from '@/shared/ui/modal'

export type SearchModalProps = ModalProps

export const SearchModal: React.FC<SearchModalProps> = (props) => {
  return (
    <Modal className="flex flex-col bg-secondary w-70 rounded-md p-8 items-center" {...props}>
      Search
    </Modal>
  )
}

export default SearchModal
