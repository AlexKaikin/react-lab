import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'widgets/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Article' }],
  },
}

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Dashboard' }],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'MacBook Pro' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
}
