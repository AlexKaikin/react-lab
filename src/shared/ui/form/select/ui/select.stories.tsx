import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select, type SelectOption } from './select'

const OPTIONS: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'angular', label: 'Angular' },
]

type SelectPlaygroundProps = {
  options: SelectOption[]
  placeholder?: string
  initialValue?: string
}

const SelectPlayground = ({ options, placeholder, initialValue = '' }: SelectPlaygroundProps) => {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="flex w-80 flex-col gap-4">
      <Select options={options} value={value} onChange={setValue} placeholder={placeholder} />
      <span className="text-secondary text-xs">value: {value || '—'}</span>
    </div>
  )
}

const meta: Meta<typeof SelectPlayground> = {
  title: 'shared/Form/Select',
  component: SelectPlayground,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    placeholder: 'Выберите фреймворк',
  },
}

export default meta
type Story = StoryObj<typeof SelectPlayground>

export const Empty: Story = {}

export const Preselected: Story = {
  args: {
    initialValue: 'react',
  },
}

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, index) => ({
      value: `option-${index}`,
      label: `Вариант ${index + 1}`,
    })),
  },
}
