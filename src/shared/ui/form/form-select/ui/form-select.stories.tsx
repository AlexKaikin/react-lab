import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
import { type FieldError, FormProvider, useForm } from 'react-hook-form'
import type { SelectOption } from '@/shared/ui/form/select'
import { FormSelect } from './form-select'

type Values = {
  category: string
}

const OPTIONS: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
  { value: 'typescript', label: 'TypeScript' },
]

type FormSelectPlaygroundProps = {
  options: SelectOption[]
  placeholder?: string
  defaultValue?: string
  error?: string
}

const FormSelectPlayground = ({ options, placeholder, defaultValue = '', error }: FormSelectPlaygroundProps) => {
  const errors = useMemo(
    () => (error ? { category: { type: 'manual', message: error } as FieldError } : undefined),
    [error],
  )
  const form = useForm<Values>({
    defaultValues: { category: defaultValue },
    errors,
  })

  return (
    <FormProvider {...form}>
      <div className="w-80">
        <FormSelect<Values> name="category" options={options} placeholder={placeholder} />
      </div>
    </FormProvider>
  )
}

const meta: Meta<typeof FormSelectPlayground> = {
  title: 'shared/Form/FormSelect',
  component: FormSelectPlayground,
  tags: ['autodocs'],
  args: {
    options: OPTIONS,
    placeholder: 'Выберите категорию',
  },
}

export default meta
type Story = StoryObj<typeof FormSelectPlayground>

export const Empty: Story = {}

export const Preselected: Story = {
  args: {
    defaultValue: 'react',
  },
}

export const WithError: Story = {
  args: {
    error: 'shared.admin.posts.validation.categoryRequired',
  },
}
