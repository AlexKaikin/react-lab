import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'

type InputProps = ComponentProps<'input'> & {
  endSlot?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, endSlot, ...rest }, ref) => {
  const input = (
    <input
      ref={ref}
      className={classNames(
        'w-full h-12 rounded-md border border-secondary bg-primary/20 px-4 text-base text-primary outline-none backdrop-blur-sm transition-colors placeholder:text-secondary focus:border-semantic-primary focus:ring-2 focus:ring-semantic-primary/30',
        !!endSlot && 'pr-12',
        className,
      )}
      {...rest}
    />
  )

  if (!endSlot) return input

  return (
    <div className="relative">
      {input}
      <div className="-translate-y-1/2 absolute top-1/2 right-1">{endSlot}</div>
    </div>
  )
})

Input.displayName = 'Input'
