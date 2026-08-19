import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'shared/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Запомнить меня',
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
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
}

export const LongLabel: Story = {
  args: {
    label: 'Я соглашаюсь с условиями использования сервиса и политикой обработки персональных данных',
  },
}
