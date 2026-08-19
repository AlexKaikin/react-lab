import type { Meta, StoryObj } from '@storybook/react'
import { PasswordInput } from './password-input'

const meta: Meta<typeof PasswordInput> = {
  title: 'shared/Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Password',
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
type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: 'super-secret',
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'super-secret',
    disabled: true,
  },
}
