import type { Meta, StoryObj } from '@storybook/react'
import { type LazyExoticComponent, lazy } from 'react'
import type { Animation } from '@/shared/ui/animation'
import { Button } from '@/shared/ui/button'
import type { Position } from '../lib/get-position-class-name'
import type { ModalContentProps } from '../model/types'
import { useModalStore } from '../model/use-modal-store'
import { Modal } from './modal'
import { ModalProvider } from './modal-provider'

const createDemoModal = (position?: Position, animation?: Animation) =>
  lazy(async () => ({
    default: () => (
      <Modal
        aria-label="Демо-диалог"
        position={position}
        animation={animation}
        className="flex w-80 flex-col gap-4 p-8"
      >
        <h3 className="h3">Заголовок диалога</h3>
        <p className="text-secondary">
          Закрывается кликом вне диалога, по Escape и по кнопке. Фокус заперт внутри, скролл страницы заблокирован.
        </p>
        <Button variant="outlined" color="primary">
          Действие
        </Button>
      </Modal>
    ),
  }))

const CENTER_MODAL = createDemoModal()
const BOTTOM_MODAL = createDemoModal('bottom', 'slideUp')
const RIGHT_MODAL = createDemoModal('right', 'slideRight')

type ModalPlaygroundProps = {
  component: LazyExoticComponent<() => React.ReactNode>
}

const ModalPlayground = ({ component }: ModalPlaygroundProps) => {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openModal({ component: component as LazyExoticComponent<React.FC<ModalContentProps>> })}
      >
        Открыть модалку
      </Button>
      <ModalProvider />
    </>
  )
}

const meta: Meta<typeof ModalPlayground> = {
  title: 'shared/Modal',
  component: ModalPlayground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ModalPlayground>

export const Center: Story = {
  args: {
    component: CENTER_MODAL,
  },
}

export const BottomSlideUp: Story = {
  args: {
    component: BOTTOM_MODAL,
  },
}

export const RightDrawer: Story = {
  args: {
    component: RIGHT_MODAL,
  },
}
