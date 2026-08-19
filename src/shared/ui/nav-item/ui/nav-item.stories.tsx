import type { Meta, StoryObj } from '@storybook/react'
import { NavItem } from './nav-item'

const meta: Meta<typeof NavItem> = {
  title: 'shared/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  args: {
    label: 'Блог',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NavItem>

export const Link: Story = {
  args: {
    href: '/blog',
  },
}

export const Expandable: Story = {
  args: {
    label: 'Категории',
    children: (
      <>
        <NavItem label="React" href="/blog/react" />
        <NavItem label="CSS" href="/blog/css" />
        <NavItem label="TypeScript" href="/blog/typescript" />
      </>
    ),
  },
}

export const Nested: Story = {
  args: {
    label: 'Документация',
    children: (
      <NavItem label="Компоненты">
        <NavItem label="Button" href="/docs/button" />
        <NavItem label="Input" href="/docs/input" />
      </NavItem>
    ),
  },
}

export const Menu: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <NavItem label="Главная" href="/" />
      <NavItem label="Блог" href="/blog" />
      <NavItem label="Категории">
        <NavItem label="React" href="/blog/react" />
        <NavItem label="CSS" href="/blog/css" />
      </NavItem>
      <NavItem label="Настройки" href="/account" />
    </div>
  ),
}
