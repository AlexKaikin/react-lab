import {
  OUTLINED_BORDER_STYLE,
  type TColor,
  TEXT_SIZE_STYLE,
  type TSize,
  type TVariant,
  VARIANT_COLOR_STYLE,
} from '@/shared/lib/variant-style'

const TAG_SIZE_STYLE: Record<TSize, string> = {
  small: 'h-6 px-2',
  medium: 'h-8 px-3',
  large: 'h-10 px-4',
}

type TGetTagStyle = {
  variant?: TVariant
  size?: TSize
  color?: TColor
}

export const getTagStyle = ({ variant = 'outlined', size = 'small', color = 'secondary' }: TGetTagStyle) => {
  const styles: string[] = [
    'inline-flex shrink-0 items-center justify-center gap-1 rounded-full transition-[opacity,background-color] duration-150',
    TAG_SIZE_STYLE[size],
    TEXT_SIZE_STYLE[size],
    VARIANT_COLOR_STYLE[variant][color],
  ]

  if (variant === 'outlined') styles.push(OUTLINED_BORDER_STYLE)

  if (variant === 'contained') styles.push('hover:opacity-90 active:opacity-80')
  if (variant === 'outlined') styles.push('hover:bg-current/10 active:bg-current/15')
  if (variant === 'text') styles.push('hover:opacity-70 active:opacity-50')

  return styles
}
