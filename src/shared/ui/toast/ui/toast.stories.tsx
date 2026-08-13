import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/shared/ui/button'
import { useToastStore } from '../model/use-toast-store'
import { ToastProvider } from './toast-provider'

const ToastPlayground = () => {
  const addToast = useToastStore((state) => state.addToast)

  return (
    <div className="flex flex-col gap-2">
      <Button variant="contained" color="info" onClick={() => addToast({ variant: 'info', message: 'Info message' })}>
        Info
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={() => addToast({ variant: 'success', message: 'Success message' })}
      >
        Success
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => addToast({ variant: 'warning', message: 'Warning message' })}
      >
        Warning
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => addToast({ variant: 'error', message: 'Error message' })}
      >
        Error
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => addToast({ variant: 'success', message: 'Persistent — closed manually only', autoClose: false })}
      >
        Persistent (autoClose: false)
      </Button>
      <ToastProvider />
    </div>
  )
}

const meta: Meta<typeof ToastPlayground> = {
  title: 'shared/Toast',
  component: ToastPlayground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastPlayground>

export const Playground: Story = {}
