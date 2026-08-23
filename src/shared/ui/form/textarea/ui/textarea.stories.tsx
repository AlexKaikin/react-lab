import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'shared/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Расскажите о себе',
    rows: 4,
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
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: 'Разрабатываю интерфейсы и изучаю React.',
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Разрабатываю интерфейсы и изучаю React.',
    disabled: true,
  },
}

export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue: 'Это поле плавно меняет высоту по мере ввода текста.',
  },
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Значение с ошибкой',
  },
}
