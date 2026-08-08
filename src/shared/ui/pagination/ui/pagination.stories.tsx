import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './pagination'

const meta: Meta<typeof Pagination> = {
  title: 'shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    basePath: '/blog',
    label: 'Pagination',
    prevLabel: 'Previous page',
    nextLabel: 'Next page',
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
}
