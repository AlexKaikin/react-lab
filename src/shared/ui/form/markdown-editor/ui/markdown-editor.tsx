'use client'

import dynamic from 'next/dynamic'
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form'
import { useTheme } from '@/shared/lib/theme'
import { FormField, useFieldId } from '@/shared/ui/form/form-field'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownEditorProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  label?: string
  id?: string
}

export const MarkdownEditor = <TFieldValues extends FieldValues>(props: MarkdownEditorProps<TFieldValues>) => {
  const { name, label, id } = props
  const fieldId = useFieldId(id)
  const errorId = `${fieldId}-error`
  const theme = useTheme((state) => state.theme)
  const { control } = useFormContext<TFieldValues>()
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })
  const message = error?.message

  return (
    <FormField id={fieldId} errorId={errorId} label={label} error={message}>
      <div data-color-mode={theme ?? 'dark'}>
        <MDEditor
          value={field.value ?? ''}
          onChange={(value) => field.onChange(value ?? '')}
          height={320}
          textareaProps={{ id: fieldId, 'aria-invalid': !!message, 'aria-describedby': message && errorId }}
        />
      </div>
    </FormField>
  )
}
