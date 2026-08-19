import type { Meta, StoryObj } from '@storybook/react'
import { FieldError } from './field-error'

const meta: Meta<typeof FieldError> = {
  title: 'shared/Form/FieldError',
  component: FieldError,
  tags: ['autodocs'],
  args: {
    message: 'Invalid email',
  },
}

export default meta
type Story = StoryObj<typeof FieldError>

export const Default: Story = {}

export const LongMessage: Story = {
  args: {
    message: 'Пароль должен содержать минимум 8 символов, заглавную букву и цифру',
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
}
