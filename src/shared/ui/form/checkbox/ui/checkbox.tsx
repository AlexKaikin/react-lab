import { type ComponentProps, forwardRef, type ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { useFieldId } from '@/shared/ui/form/form-field'
import { Icon } from '@/shared/ui/icon'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, id, ...rest }, ref) => {
  const fieldId = useFieldId(id)

  return (
    <label htmlFor={fieldId} className={classNames('flex cursor-pointer items-start gap-2 text-sm', className)}>
      <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
        <input ref={ref} type="checkbox" id={fieldId} className="peer sr-only" {...rest} />
        <span className="absolute inset-0 rounded-sm border border-secondary bg-primary/20 backdrop-blur-sm transition-colors peer-checked:border-semantic-primary peer-checked:bg-semantic-primary peer-focus-visible:border-semantic-primary peer-focus-visible:ring-2 peer-focus-visible:ring-semantic-primary/30" />
        <Icon
          name="Check"
          size={14}
          className="pointer-events-none relative scale-0 text-semantic-primary-foreground transition-transform peer-checked:scale-100"
        />
      </span>
      <span className="text-secondary">{label}</span>
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
