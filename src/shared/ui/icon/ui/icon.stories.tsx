import type { Meta, StoryObj } from '@storybook/react'
import { Icon, type IconName } from './icon'

const SHOWCASE_ICONS: IconName[] = [
  'Menu',
  'Search',
  'User',
  'Globe',
  'Sun',
  'Moon',
  'Check',
  'ChevronDown',
  'Eye',
  'EyeOff',
  'LoaderCircle',
  'X',
]

const meta: Meta<typeof Icon> = {
  title: 'shared/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'Search',
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Icon {...args} size={14} />
      <Icon {...args} size={18} />
      <Icon {...args} size={24} />
      <Icon {...args} size={32} />
    </div>
  ),
}

export const Gallery: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      {SHOWCASE_ICONS.map((name) => (
        <div key={name} className="flex w-20 flex-col items-center gap-2 text-secondary text-xs">
          <Icon {...args} name={name} />
          {name}
        </div>
      ))}
    </div>
  ),
}
