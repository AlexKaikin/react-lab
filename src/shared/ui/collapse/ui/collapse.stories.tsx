import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Collapse } from './collapse'

const CollapsePlayground = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex w-80 flex-col">
      <Button variant="outlined" color="primary" onClick={() => setIsVisible((value) => !value)}>
        {isVisible ? 'Свернуть' : 'Развернуть'}
      </Button>

      <Collapse isVisible={isVisible} gapClassName="pt-4">
        <div className="paper p-4 text-secondary">
          Содержимое разворачивается через grid-template-rows, поэтому анимация работает на любой высоте контента —
          фиксированные max-height не нужны.
        </div>
      </Collapse>
    </div>
  )
}

const meta: Meta<typeof CollapsePlayground> = {
  title: 'shared/Collapse',
  component: CollapsePlayground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CollapsePlayground>

export const Playground: Story = {}
