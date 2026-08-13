'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form'
import { useTheme } from '@/features/theme'
import { Collapse } from '@/shared/ui/collapse'
import { FieldError } from '@/shared/ui/form/field-error'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownEditorProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
}

export const MarkdownEditor = <TFieldValues extends FieldValues>({ name }: MarkdownEditorProps<TFieldValues>) => {
  const t = useTranslations()
  const theme = useTheme((state) => state.theme)
  const { control } = useFormContext<TFieldValues>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="flex flex-col" data-color-mode={theme ?? 'dark'}>
      <MDEditor value={field.value ?? ''} onChange={(value) => field.onChange(value ?? '')} height={320} />
      <Collapse isVisible={!!error} gapClassName="pt-2">
        {error?.message && <FieldError message={t(error.message as Parameters<typeof t>[0])} />}
      </Collapse>
    </div>
  )
}
