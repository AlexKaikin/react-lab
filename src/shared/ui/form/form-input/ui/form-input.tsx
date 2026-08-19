'use client'

import type { ComponentProps } from 'react'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'
import { FormField, useFieldId } from '@/shared/ui/form/form-field'
import { Input, PasswordInput } from '@/shared/ui/form/input'

type FormInputProps<TFieldValues extends FieldValues> = Omit<ComponentProps<typeof Input>, 'name'> & {
  name: Path<TFieldValues>
  label?: string
}

export const FormInput = <TFieldValues extends FieldValues>(props: FormInputProps<TFieldValues>) => {
  const { name, label, id, ...rest } = props
  const fieldId = useFieldId(id)
  const errorId = `${fieldId}-error`
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>()
  const message = errors[name]?.message as string | undefined
  const InputComponent = rest.type === 'password' ? PasswordInput : Input

  return (
    <FormField id={fieldId} errorId={errorId} label={label} error={message}>
      <InputComponent
        id={fieldId}
        aria-invalid={!!message}
        aria-describedby={message && errorId}
        {...register(name)}
        {...rest}
      />
    </FormField>
  )
}
