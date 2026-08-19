import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Dropdown } from './dropdown'

const MenuDropdown = () => (
  <Dropdown
    trigger={(triggerProps) => (
      <Button shape="square" {...triggerProps}>
        <Icon name="User" />
      </Button>
    )}
  >
    <div className="flex flex-col gap-1 *:w-full *:px-3 *:py-2">
      <Button variant="text" color="secondary">
        Профиль
      </Button>
      <Button variant="text" color="secondary">
        Настройки
      </Button>
      <Button variant="text" color="secondary">
        Выйти
      </Button>
    </div>
  </Dropdown>
)

const meta: Meta<typeof MenuDropdown> = {
  title: 'shared/Dropdown',
  component: MenuDropdown,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuDropdown>

export const Default: Story = {}

export const NearRightEdge: Story = {
  render: () => (
    <div className="flex justify-end">
      <MenuDropdown />
    </div>
  ),
}

export const ClosesFromChildren: Story = {
  render: () => (
    <Dropdown
      trigger={(triggerProps) => (
        <Button variant="outlined" color="primary" {...triggerProps}>
          Открыть
        </Button>
      )}
    >
      {({ close }) => (
        <div className="flex flex-col gap-2">
          <span className="text-secondary text-sm">Панель получает close() через render-функцию</span>
          <Button variant="contained" color="primary" size="small" onClick={close}>
            Закрыть
          </Button>
        </div>
      )}
    </Dropdown>
  ),
}
