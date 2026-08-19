import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    className: 'h-12 w-full',
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {}

export const Circle: Story = {
  args: {
    className: 'size-12 rounded-full',
  },
}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="paper flex w-80 flex-col gap-4 p-4">
      <Skeleton className="h-40 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  ),
}
