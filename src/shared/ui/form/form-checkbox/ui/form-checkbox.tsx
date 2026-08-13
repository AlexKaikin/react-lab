'use client'

import { useTranslations } from 'next-intl'
import { type ComponentProps, useEffect, useState } from 'react'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'
import { Collapse } from '@/shared/ui/collapse'
import { Checkbox } from '@/shared/ui/form/checkbox'
import { FieldError } from '@/shared/ui/form/field-error'

type FormCheckboxProps<TFieldValues extends FieldValues> = Omit<ComponentProps<typeof Checkbox>, 'name'> & {
  name: Path<TFieldValues>
}

export const FormCheckbox = <TFieldValues extends FieldValues>({ name, ...rest }: FormCheckboxProps<TFieldValues>) => {
  const t = useTranslations()
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>()
  const messageKey = errors[name]?.message as string | undefined
  const [lastMessageKey, setLastMessageKey] = useState(messageKey)

  useEffect(() => {
    if (messageKey) setLastMessageKey(messageKey)
  }, [messageKey])

  return (
    <div className="flex flex-col">
      <Checkbox {...register(name)} {...rest} />
      <Collapse isVisible={!!messageKey} gapClassName="pt-2">
        {lastMessageKey && <FieldError message={t(lastMessageKey as Parameters<typeof t>[0])} />}
      </Collapse>
    </div>
  )
}
