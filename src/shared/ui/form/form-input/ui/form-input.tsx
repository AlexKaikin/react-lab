'use client'

import { useTranslations } from 'next-intl'
import { type ComponentProps, useEffect, useState } from 'react'
import { type FieldValues, type Path, useFormContext } from 'react-hook-form'
import { Collapse } from '@/shared/ui/collapse'
import { FieldError } from '@/shared/ui/form/field-error'
import { Input, PasswordInput } from '@/shared/ui/form/input'

type FormInputProps<TFieldValues extends FieldValues> = Omit<ComponentProps<typeof Input>, 'name'> & {
  name: Path<TFieldValues>
  label?: string
}

export const FormInput = <TFieldValues extends FieldValues>({ name, label, ...rest }: FormInputProps<TFieldValues>) => {
  const t = useTranslations()
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>()
  const messageKey = errors[name]?.message as string | undefined
  const [lastMessageKey, setLastMessageKey] = useState(messageKey)
  const InputComponent = rest.type === 'password' ? PasswordInput : Input

  useEffect(() => {
    if (messageKey) setLastMessageKey(messageKey)
  }, [messageKey])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        {label && <span className="text-secondary text-xs">{label}</span>}
        <InputComponent {...register(name)} {...rest} />
      </div>
      <Collapse isVisible={!!messageKey} gapClassName="pt-2">
        {lastMessageKey && <FieldError message={t(lastMessageKey as Parameters<typeof t>[0])} />}
      </Collapse>
    </div>
  )
}
