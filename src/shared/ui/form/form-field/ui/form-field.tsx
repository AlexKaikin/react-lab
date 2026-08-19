'use client'

import { useTranslations } from 'next-intl'
import { type ReactNode, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { Collapse } from '@/shared/ui/collapse'
import { FieldError } from '@/shared/ui/form/field-error'

type FormFieldProps = {
  children: ReactNode
  id?: string
  errorId?: string
  label?: string
  error?: string
  className?: string
}

export const FormField = ({ children, id, errorId, label, error, className }: FormFieldProps) => {
  const t = useTranslations()
  const [lastError, setLastError] = useState(error)

  useEffect(() => {
    if (error) setLastError(error)
  }, [error])

  return (
    <div className={classNames('flex flex-col', className)}>
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-secondary text-xs">
            {label}
          </label>
        )}
        {children}
      </div>

      <Collapse isVisible={!!error} gapClassName="pt-2">
        {lastError && <FieldError id={errorId} message={t(lastError as Parameters<typeof t>[0])} />}
      </Collapse>
    </div>
  )
}
