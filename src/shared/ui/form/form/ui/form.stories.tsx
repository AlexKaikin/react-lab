import type { Meta, StoryObj } from '@storybook/react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { FormCheckbox } from '@/shared/ui/form/form-checkbox'
import { FormInput } from '@/shared/ui/form/form-input'
import { FormSelect } from '@/shared/ui/form/form-select'
import { Form } from './form'

type LoginValues = {
  email: string
  password: string
  role: string
  agree: boolean
}

const ROLE_OPTIONS = [
  { value: 'reader', label: 'Читатель' },
  { value: 'author', label: 'Автор' },
]

type LoginFormProps = {
  withErrors?: boolean
}

const ERRORS: FieldErrors<LoginValues> = {
  email: { type: 'manual', message: 'shared.auth.validation.invalidEmail' },
  password: { type: 'manual', message: 'shared.auth.validation.passwordTooShort' },
  agree: { type: 'manual', message: 'shared.auth.validation.agreeRequired' },
}

const LoginForm = ({ withErrors }: LoginFormProps) => {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '', role: '', agree: false },
    errors: withErrors ? ERRORS : undefined,
  })

  return (
    <Form form={form} onSubmit={form.handleSubmit(() => {})} className="w-80 gap-4">
      <FormInput<LoginValues> name="email" label="Email" placeholder="user@example.com" />
      <FormInput<LoginValues> name="password" label="Пароль" type="password" placeholder="••••••••" />
      <FormSelect<LoginValues> name="role" options={ROLE_OPTIONS} placeholder="Выберите роль" />
      <FormCheckbox<LoginValues> name="agree" label="Я соглашаюсь с условиями" />

      <Button type="submit" variant="contained" color="primary">
        Отправить
      </Button>
    </Form>
  )
}

const meta: Meta<typeof LoginForm> = {
  title: 'shared/Form/Form',
  component: LoginForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}

export const WithErrors: Story = {
  args: {
    withErrors: true,
  },
}
