import type { ComponentProps, FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { Icon } from '@/shared/ui/icon'
import { getButtonStyle } from '../lib'
import type { TButton } from '../model/schema'

export const Button: FC<TButton<ComponentProps<'button'>>> = (props) => {
  const { children, size, variant, color, className, loading, type, shape, ...rest } = props
  const disabled = props.disabled || loading

  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={classNames(
        ...getButtonStyle({ size, variant, color, shape }),
        disabled && 'opacity-50 disabled:pointer-events-none',
        'hover:opacity-100 transition-[color,opacity]',
        className,
      )}
      {...rest}
    >
      {children}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="LoaderCircle" className="animate-spin" />
        </div>
      )}
    </button>
  )
}
