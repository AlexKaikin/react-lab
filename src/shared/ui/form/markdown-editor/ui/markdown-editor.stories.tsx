import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
import { type FieldError, FormProvider, useForm } from 'react-hook-form'
import { MarkdownEditor } from './markdown-editor'

type Values = {
  content: string
}

const SAMPLE = `# Заголовок

Обычный абзац с **жирным** и *курсивом*.

- первый пункт
- второй пункт

\`\`\`ts
const answer = 42
\`\`\`
`

type MarkdownEditorPlaygroundProps = {
  defaultValue?: string
  error?: string
}

const MarkdownEditorPlayground = ({ defaultValue = '', error }: MarkdownEditorPlaygroundProps) => {
  const errors = useMemo(
    () => (error ? { content: { type: 'manual', message: error } as FieldError } : undefined),
    [error],
  )
  const form = useForm<Values>({
    defaultValues: { content: defaultValue },
    errors,
  })

  return (
    <FormProvider {...form}>
      <MarkdownEditor<Values> name="content" />
    </FormProvider>
  )
}

const meta: Meta<typeof MarkdownEditorPlayground> = {
  title: 'shared/Form/MarkdownEditor',
  component: MarkdownEditorPlayground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MarkdownEditorPlayground>

export const Empty: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: SAMPLE,
  },
}

export const WithError: Story = {
  args: {
    error: 'shared.admin.posts.validation.contentRequired',
  },
}
