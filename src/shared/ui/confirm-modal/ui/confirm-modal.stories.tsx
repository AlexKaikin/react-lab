import type { Meta, StoryObj } from '@storybook/react'
import { lazy, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { ModalProvider, useModalStore } from '@/shared/ui/modal'

const ConfirmModal = lazy(() => import('./confirm-modal'))

const ConfirmPlayground = () => {
  const openModal = useModalStore((state) => state.openModal)
  const [confirmedCount, setConfirmedCount] = useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <Button
        variant="contained"
        color="error"
        onClick={() => openModal({ component: ConfirmModal, props: { cb: () => setConfirmedCount((n) => n + 1) } })}
      >
        Удалить
      </Button>

      <span className="text-secondary text-sm">Подтверждений: {confirmedCount}</span>
      <ModalProvider />
    </div>
  )
}

const meta: Meta<typeof ConfirmPlayground> = {
  title: 'shared/ConfirmModal',
  component: ConfirmPlayground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmPlayground>

export const Playground: Story = {}
