import { OUTLINED_BORDER_STYLE, TEXT_SIZE_STYLE, VARIANT_COLOR_STYLE } from '@/shared/lib/variant-style'
import type { TButtonColor, TButtonShape, TButtonSize, TButtonVariant } from '../model/schema'

const BUTTON_SIZE_STYLE = {
  small: 'h-10 px-2',
  medium: 'h-12 px-4',
  large: 'h-14 px-8',
}

const SQUARE_SIZE_STYLE = {
  small: 'size-10',
  medium: 'size-12',
  large: 'size-14',
}

type TGetButtonStyle = {
  variant?: TButtonVariant
  size?: TButtonSize
  color?: TButtonColor
  shape?: TButtonShape
}

export const getButtonStyle = ({ variant = 'contained', size = 'medium', color, shape }: TGetButtonStyle) => {
  const styles: string[] = [
    'inline-flex items-center justify-center gap-2 relative cursor-pointer rounded-md transition-[opacity,background-color] duration-150',
  ]

  if (variant === 'outlined') styles.push(OUTLINED_BORDER_STYLE)
  if (shape === 'square') styles.push(SQUARE_SIZE_STYLE[size])
  if (['contained', 'outlined'].includes(variant) && !shape) styles.push(BUTTON_SIZE_STYLE[size])
  if (color) styles.push(VARIANT_COLOR_STYLE[variant][color])

  if (variant === 'contained') styles.push('hover:opacity-90 active:opacity-80')
  if (variant === 'outlined') styles.push('hover:bg-current/10 active:bg-current/15')
  if (variant === 'text') styles.push('hover:opacity-70 active:opacity-50')

  styles.push(TEXT_SIZE_STYLE[size])

  return styles
}
