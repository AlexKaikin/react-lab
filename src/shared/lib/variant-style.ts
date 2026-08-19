export type TSize = 'small' | 'medium' | 'large'
export type TVariant = 'text' | 'contained' | 'outlined'
export type TColor = 'primary' | 'secondary' | 'info' | 'error' | 'warning' | 'success'

export const OUTLINED_BORDER_STYLE = 'border border-current/20'

export const TEXT_SIZE_STYLE: Record<TSize, string> = {
  small: 'text-[14px]',
  medium: 'text-[16px]',
  large: 'text-[18px]',
}

export const VARIANT_COLOR_STYLE: Record<TVariant, Record<TColor, string>> = {
  contained: {
    primary: 'bg-semantic-primary text-semantic-primary-foreground',
    secondary: 'bg-semantic-secondary text-semantic-secondary-foreground',
    info: 'bg-semantic-info text-white',
    error: 'bg-semantic-error text-white',
    warning: 'bg-semantic-warning text-white',
    success: 'bg-semantic-success text-white',
  },
  outlined: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    info: 'text-semantic-info',
    error: 'text-semantic-error',
    warning: 'text-semantic-warning',
    success: 'text-semantic-success',
  },
  text: {
    primary: 'text-primary',
    secondary: 'text-secondary',
    info: 'text-semantic-info',
    error: 'text-semantic-error',
    warning: 'text-semantic-warning',
    success: 'text-semantic-success',
  },
}
