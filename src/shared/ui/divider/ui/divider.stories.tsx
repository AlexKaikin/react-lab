import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'shared/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
    textAlign: {
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {}

export const WithText: Story = {
  args: {
    children: 'или',
  },
}

export const TextAlign: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <Divider {...args} textAlign="left">
        left
      </Divider>
      <Divider {...args} textAlign="center">
        center
      </Divider>
      <Divider {...args} textAlign="right">
        right
      </Divider>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-40 items-center gap-6">
      <span>слева</span>
      <Divider {...args} />
      <span>справа</span>
    </div>
  ),
}

export const VerticalWithText: Story = {
  args: {
    orientation: 'vertical',
    children: 'или',
  },
  render: (args) => (
    <div className="flex h-40 items-center gap-6">
      <span>слева</span>
      <Divider {...args} />
      <span>справа</span>
    </div>
  ),
}
