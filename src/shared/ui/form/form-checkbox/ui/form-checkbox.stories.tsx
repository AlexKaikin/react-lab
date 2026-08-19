import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
import { type FieldError, FormProvider, useForm } from 'react-hook-form'
import { FormCheckbox } from './form-checkbox'

type Values = {
  agree: boolean
}

type FormCheckboxPlaygroundProps = {
  label: string
  defaultChecked?: boolean
  error?: string
}

const FormCheckboxPlayground = ({ label, defaultChecked = false, error }: FormCheckboxPlaygroundProps) => {
  const errors = useMemo(
    () => (error ? { agree: { type: 'manual', message: error } as FieldError } : undefined),
    [error],
  )
  const form = useForm<Values>({
    defaultValues: { agree: defaultChecked },
    errors,
  })

  return (
    <FormProvider {...form}>
      <div className="w-80">
        <FormCheckbox<Values> name="agree" label={label} />
      </div>
    </FormProvider>
  )
}

const meta: Meta<typeof FormCheckboxPlayground> = {
  title: 'shared/Form/FormCheckbox',
  component: FormCheckboxPlayground,
  tags: ['autodocs'],
  args: {
    label: 'Я соглашаюсь с условиями использования',
  },
}

export default meta
type Story = StoryObj<typeof FormCheckboxPlayground>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithError: Story = {
  args: {
    error: 'shared.auth.validation.agreeRequired',
  },
}
