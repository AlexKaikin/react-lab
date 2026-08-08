import { type ComponentProps, forwardRef } from 'react'
import { classNames } from '@/shared/lib/class-names'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className, ...rest }, ref) => (
  <input
    ref={ref}
    className={classNames(
      'w-full rounded-md bg-primary px-4 py-2 outline-none focus:ring-2 focus:ring-semantic-primary',
      className,
    )}
    {...rest}
  />
))

Input.displayName = 'Input'
