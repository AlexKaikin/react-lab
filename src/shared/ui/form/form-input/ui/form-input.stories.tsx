import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
import { type FieldError, FormProvider, useForm } from 'react-hook-form'
import { FormInput } from './form-input'

type Values = {
  email: string
}

type FormInputPlaygroundProps = {
  label?: string
  placeholder?: string
  type?: string
  defaultValue?: string
  error?: string
}

const FormInputPlayground = ({ label, placeholder, type, defaultValue = '', error }: FormInputPlaygroundProps) => {
  const errors = useMemo(
    () => (error ? { email: { type: 'manual', message: error } as FieldError } : undefined),
    [error],
  )
  const form = useForm<Values>({
    defaultValues: { email: defaultValue },
    errors,
  })

  return (
    <FormProvider {...form}>
      <div className="w-80">
        <FormInput<Values> name="email" label={label} placeholder={placeholder} type={type} />
      </div>
    </FormProvider>
  )
}

const meta: Meta<typeof FormInputPlayground> = {
  title: 'shared/Form/FormInput',
  component: FormInputPlayground,
  tags: ['autodocs'],
  args: {
    placeholder: 'user@example.com',
  },
}

export default meta
type Story = StoryObj<typeof FormInputPlayground>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'shared.auth.validation.invalidEmail',
  },
}

export const Password: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: '••••••••',
  },
}
