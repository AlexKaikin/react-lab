'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Modal, type ModalContentProps, useModalStore } from '@/shared/ui/modal'
import { ForgotPasswordForm } from './forgot-password-form'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

type Mode = 'login' | 'signup' | 'forgot-password'

const MODE_LABEL_KEY = {
  login: 'shared.auth.login.label',
  signup: 'shared.auth.signup.label',
  'forgot-password': 'shared.auth.forgotPassword.label',
} as const

type AuthModalProps = ModalContentProps & {
  initialMode?: Mode
}

export const AuthModal = ({ initialMode = 'login' }: AuthModalProps) => {
  const t = useTranslations()
  const closeModal = useModalStore((state) => state.closeModal)
  const [mode, setMode] = useState<Mode>(initialMode)

  return (
    <Modal
      className="m-2 w-[calc(100%-1rem)] max-w-100"
      animation="slideDown"
      position="center"
      aria-label={t(MODE_LABEL_KEY[mode])}
    >
      <div className="flex flex-col gap-6 p-8">
        <h2>{t(MODE_LABEL_KEY[mode])}</h2>

        {mode === 'login' && <LoginForm onSuccess={closeModal} />}
        {mode === 'signup' && <SignupForm onSuccess={() => setMode('login')} />}
        {mode === 'forgot-password' && <ForgotPasswordForm />}

        {mode !== 'forgot-password' ? (
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              variant="text"
              color="secondary"
              className="w-fit text-sm underline"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? t('shared.auth.switchToSignup') : t('shared.auth.switchToLogin')}
            </Button>
            <Button
              type="button"
              variant="text"
              color="secondary"
              className="w-fit text-sm underline"
              onClick={() => setMode('forgot-password')}
            >
              {t('shared.auth.forgotPassword.link')}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="text"
            color="secondary"
            className="w-fit text-sm underline"
            onClick={() => setMode('login')}
          >
            {t('shared.auth.forgotPassword.backToLogin')}
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default AuthModal
