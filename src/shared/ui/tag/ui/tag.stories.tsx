import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './tag'

const meta: Meta<typeof Tag> = {
  title: 'shared/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'error', 'warning', 'success'],
    },
  },
  args: {
    children: 'react',
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
}

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Tag {...args} size="small">
        small
      </Tag>
      <Tag {...args} size="medium">
        medium
      </Tag>
      <Tag {...args} size="large">
        large
      </Tag>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(['primary', 'secondary', 'info', 'error', 'warning', 'success'] as const).map((color) => (
        <Tag {...args} key={color} color={color}>
          {color}
        </Tag>
      ))}
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    href: '/blog',
  },
}
