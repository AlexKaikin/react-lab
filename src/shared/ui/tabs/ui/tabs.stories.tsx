import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { TButtonSize } from '@/shared/ui/button/model/schema'
import { TabPanel, Tabs } from './tabs'

const ITEMS = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
]

type TabsPlaygroundProps = {
  items: typeof ITEMS
  size?: TButtonSize
  withPanels?: boolean
}

const TabsPlayground = ({ items, size, withPanels }: TabsPlaygroundProps) => {
  const [value, setValue] = useState(items[0].value)

  return (
    <div className="flex flex-col gap-4">
      <Tabs items={items} value={value} onChange={setValue} label="Язык контента" size={size} />

      {withPanels &&
        items.map((item) => (
          <TabPanel key={item.value} value={item.value} activeValue={value} className="paper p-4 text-secondary">
            Содержимое вкладки «{item.label}»
          </TabPanel>
        ))}
    </div>
  )
}

const meta: Meta<typeof TabsPlayground> = {
  title: 'shared/Tabs',
  component: TabsPlayground,
  tags: ['autodocs'],
  args: {
    items: ITEMS,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TabsPlayground>

export const Default: Story = {}

export const WithPanels: Story = {
  args: {
    withPanels: true,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <TabsPlayground {...args} size="small" />
      <TabsPlayground {...args} size="medium" />
      <TabsPlayground {...args} size="large" />
    </div>
  ),
}

export const ManyTabs: Story = {
  args: {
    items: [
      { value: 'all', label: 'Все' },
      { value: 'react', label: 'React' },
      { value: 'css', label: 'CSS' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'tools', label: 'Инструменты' },
    ],
  },
}
