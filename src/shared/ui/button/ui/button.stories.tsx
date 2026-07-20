import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
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
    shape: {
      control: 'select',
      options: ['square'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    loading: true,
    children: 'Loading',
  },
}

export const Square: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    shape: 'square',
    children: 'S',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    disabled: true,
    children: 'Disabled',
  },
}
