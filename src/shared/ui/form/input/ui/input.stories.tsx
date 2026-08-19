import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'shared/Form/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Email',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: 'user@example.com',
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'user@example.com',
    disabled: true,
  },
}

export const WithEndSlot: Story = {
  args: {
    placeholder: 'Поиск',
    endSlot: (
      <Button shape="square" variant="text" color="secondary" size="small">
        <Icon name="Search" size={18} />
      </Button>
    ),
  },
}
