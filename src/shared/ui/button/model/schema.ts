import type { TColor, TSize, TVariant } from '@/shared/lib/variant-style'

export type TButtonSize = TSize
export type TButtonVariant = TVariant
export type TButtonColor = TColor
export type TButtonShape = 'square'

export type TButton<T> = T & {
  variant?: TButtonVariant
  size?: TButtonSize
  color?: TButtonColor
  loading?: boolean
  shape?: TButtonShape
}
