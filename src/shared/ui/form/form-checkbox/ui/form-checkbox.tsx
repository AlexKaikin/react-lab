'use client'

import type { ComponentProps } from 'react'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'
import { Checkbox } from '@/shared/ui/form/checkbox'
import { FormField, useFieldId } from '@/shared/ui/form/form-field'

type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<ComponentProps<typeof Checkbox>, 'name'> & {
  name: Path<TFieldValues>
}

export const FormCheckbox = <TFieldValues extends FieldValues>(props: FormCheckboxProps<TFieldValues>) => {
  const { name, id, ...rest } = props
  const fieldId = useFieldId(id)
  const errorId = `${fieldId}-error`
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>()
  const message = errors[name]?.message as string | undefined

  return (
    <FormField errorId={errorId} error={message}>
      <Checkbox
        id={fieldId}
        aria-invalid={!!message}
        aria-describedby={message && errorId}
        {...register(name)}
        {...rest}
      />
    </FormField>
  )
}
