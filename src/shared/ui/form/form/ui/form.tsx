'use client'

import type { ComponentProps, ReactNode } from 'react'
import { type FieldValues, FormProvider, type UseFormReturn } from 'react-hook-form'
import { classNames } from '@/shared/lib/class-names'

type FormProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>
  onSubmit: ComponentProps<'form'>['onSubmit']
  children: ReactNode
  className?: string
}

export const Form = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<TFieldValues>) => (
  <FormProvider {...form}>
    <form onSubmit={onSubmit} className={classNames('flex flex-col', className)}>
      {children}
    </form>
  </FormProvider>
)
