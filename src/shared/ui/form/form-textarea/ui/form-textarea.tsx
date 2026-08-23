'use client'

import type { ComponentProps } from 'react'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'
import { FormField, useFieldId } from '@/shared/ui/form/form-field'
import { Textarea } from '@/shared/ui/form/textarea'

type FormTextareaProps<TFieldValues extends FieldValues> = Omit<ComponentProps<typeof Textarea>, 'name'> & {
  name: Path<TFieldValues>
  label?: string
}

export const FormTextarea = <TFieldValues extends FieldValues>(props: FormTextareaProps<TFieldValues>) => {
  const { name, label, id, ...rest } = props
  const fieldId = useFieldId(id)
  const errorId = `${fieldId}-error`
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>()
  const message = errors[name]?.message as string | undefined

  return (
    <FormField id={fieldId} errorId={errorId} label={label} error={message}>
      <Textarea
        id={fieldId}
        aria-invalid={!!message}
        aria-describedby={message && errorId}
        {...register(name)}
        {...rest}
      />
    </FormField>
  )
}
