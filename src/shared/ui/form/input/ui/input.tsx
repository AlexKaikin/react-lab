import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'

type InputProps = ComponentProps<'input'> & {
  startSlot?: ReactNode
  endSlot?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, startSlot, endSlot, ...rest } = props

  const input = (
    <input
      ref={ref}
      className={classNames(
        'w-full h-12 rounded-md border border-secondary bg-primary/20 px-4 text-base text-primary outline-none backdrop-blur-sm transition-colors placeholder:text-secondary focus:border-semantic-primary focus:ring-2 focus:ring-semantic-primary/30 aria-invalid:border-semantic-error aria-invalid:ring-2 aria-invalid:ring-semantic-error/30 aria-invalid:focus:border-semantic-error aria-invalid:focus:ring-semantic-error/30',
        !!startSlot && 'pl-12',
        !!endSlot && 'pr-12',
        className,
      )}
      {...rest}
    />
  )

  if (!startSlot && !endSlot) return input

  return (
    <div className="relative">
      {startSlot && (
        <div className="absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center">{startSlot}</div>
      )}
      {input}
      {endSlot && (
        <div className="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center">{endSlot}</div>
      )}
    </div>
  )
})

Input.displayName = 'Input'
