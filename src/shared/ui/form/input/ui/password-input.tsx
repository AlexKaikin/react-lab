'use client'

import { useTranslations } from 'next-intl'
import { type ComponentProps, forwardRef, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Input } from './input'

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type' | 'endSlot'>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Input
      ref={ref}
      {...props}
      type={isVisible ? 'text' : 'password'}
      endSlot={
        <Button
          type="button"
          shape="square"
          variant="text"
          color="secondary"
          size="small"
          aria-label={t(isVisible ? 'shared.auth.hidePassword' : 'shared.auth.showPassword')}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          <Icon name={isVisible ? 'EyeOff' : 'Eye'} size={18} />
        </Button>
      }
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
