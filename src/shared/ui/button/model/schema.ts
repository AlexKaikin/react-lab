export type TButtonSize = 'small' | 'medium' | 'large'
export type TButtonVariant = 'text' | 'contained' | 'outlined'
export type TButtonColor = 'primary' | 'secondary' | 'info' | 'error' | 'warning' | 'success'
export type TButtonShape = 'square'

export type TButton<T> = T & {
  variant?: TButtonVariant
  size?: TButtonSize
  color?: TButtonColor
  loading?: boolean
  shape?: TButtonShape
}
