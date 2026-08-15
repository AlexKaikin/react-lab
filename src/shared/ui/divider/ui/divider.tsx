import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'

type DividerOrientation = 'horizontal' | 'vertical'
type DividerColor = 'primary' | 'secondary'
type DividerTextAlign = 'left' | 'center' | 'right'

type DividerProps = {
  orientation?: DividerOrientation
  color?: DividerColor
  textAlign?: DividerTextAlign
  children?: ReactNode
  className?: string
}

const COLOR_STYLE: Record<DividerColor, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
}

const SHORT_LINE_SIZE = 'basis-3 grow-0'

export const Divider = ({
  orientation = 'horizontal',
  color = 'secondary',
  textAlign = 'center',
  children,
  className,
}: DividerProps) => {
  const isVertical = orientation === 'vertical'
  const lineClassName = classNames(isVertical ? 'border-l' : 'border-t', COLOR_STYLE[color])

  if (!children) {
    return <div className={classNames(lineClassName, isVertical ? 'h-full' : 'w-full', className)} />
  }

  return (
    <div
      className={classNames(
        'flex items-center',
        isVertical ? 'h-full flex-col' : 'w-full',
        color === 'primary' ? 'text-primary' : 'text-secondary',
        className,
      )}
    >
      <div className={classNames(lineClassName, textAlign === 'left' ? SHORT_LINE_SIZE : 'flex-1')} />
      <span className={classNames('shrink-0 whitespace-nowrap text-sm uppercase', isVertical ? 'py-3' : 'px-3')}>
        {children}
      </span>
      <div className={classNames(lineClassName, textAlign === 'right' ? SHORT_LINE_SIZE : 'flex-1')} />
    </div>
  )
}
