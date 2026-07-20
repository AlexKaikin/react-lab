import type { TButtonColor, TButtonShape, TButtonSize, TButtonVariant } from '../model/schema'

const TEXT_SIZE_STYLE = {
  small: 'text-[14px]',
  medium: 'text-[16px]',
  large: 'text-[18px]',
}

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

const VARIANT_COLOR_STYLE: Record<TButtonVariant, Record<TButtonColor, string>> = {
  contained: {
    primary: 'bg-semantic-primary text-white',
    secondary: 'bg-semantic-secondary text-white',
    info: 'bg-semantic-info text-white',
    error: 'bg-semantic-error text-white',
    warning: 'bg-semantic-warning text-white',
    success: 'bg-semantic-success text-white',
  },
  outlined: {
    primary: 'border border-semantic-primary text-semantic-primary',
    secondary: 'border border-semantic-secondary text-semantic-secondary',
    info: 'border border-semantic-info text-semantic-info',
    error: 'border border-semantic-error text-semantic-error',
    warning: 'border border-semantic-warning text-semantic-warning',
    success: 'border border-semantic-success text-semantic-success',
  },
  text: {
    primary: 'text-semantic-primary',
    secondary: 'text-semantic-secondary',
    info: 'text-semantic-info',
    error: 'text-semantic-error',
    warning: 'text-semantic-warning',
    success: 'text-semantic-success',
  },
}

type TGetButtonStyle = {
  variant?: TButtonVariant
  size?: TButtonSize
  color?: TButtonColor
  shape?: TButtonShape
}

export const getButtonStyle = ({ variant = 'contained', size = 'medium', color, shape }: TGetButtonStyle) => {
  const styles: string[] = [
    'inline-flex items-center justify-center gap-2 relative cursor-pointer rounded-md transition-colors opacity-80',
  ]

  if (shape === 'square') styles.push(SQUARE_SIZE_STYLE[size])
  if (['contained', 'outlined'].includes(variant) && !shape) styles.push(BUTTON_SIZE_STYLE[size])
  if (color) styles.push(VARIANT_COLOR_STYLE[variant][color])

  styles.push(TEXT_SIZE_STYLE[size])

  return styles
}
