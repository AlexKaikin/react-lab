'use client'

import { useTranslations } from 'next-intl'
import type { ComponentProps } from 'react'
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form'
import { Collapse } from '@/shared/ui/collapse'
import { FieldError } from '@/shared/ui/form/field-error'
import { Select } from '@/shared/ui/form/select'

type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<typeof Select>,
  'name' | 'value' | 'onChange'
> & {
  name: Path<TFieldValues>
}

export const FormSelect = <TFieldValues extends FieldValues>({ name, ...rest }: FormSelectProps<TFieldValues>) => {
  const t = useTranslations()
  const { control } = useFormContext<TFieldValues>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="flex flex-col">
      <Select {...rest} name={field.name} value={field.value ?? ''} onChange={field.onChange} />
      <Collapse isVisible={!!error} gapClassName="pt-2">
        {error?.message && <FieldError message={t(error.message as Parameters<typeof t>[0])} />}
      </Collapse>
    </div>
  )
}
