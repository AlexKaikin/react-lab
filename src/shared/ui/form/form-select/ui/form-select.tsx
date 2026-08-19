'use client'

import type { ComponentProps } from 'react'
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form'
import { FormField, useFieldId } from '@/shared/ui/form/form-field'
import { Select } from '@/shared/ui/form/select'

type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<typeof Select>,
  'name' | 'value' | 'onChange'
> & {
  name: Path<TFieldValues>
  label?: string
}

export const FormSelect = <TFieldValues extends FieldValues>(props: FormSelectProps<TFieldValues>) => {
  const { name, label, id, ...rest } = props
  const fieldId = useFieldId(id)
  const errorId = `${fieldId}-error`
  const { control } = useFormContext<TFieldValues>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })
  const message = error?.message

  return (
    <FormField id={fieldId} errorId={errorId} label={label} error={message}>
      <Select
        {...rest}
        id={fieldId}
        aria-invalid={!!message}
        aria-describedby={message && errorId}
        name={field.name}
        value={field.value ?? ''}
        onChange={field.onChange}
      />
    </FormField>
  )
}
