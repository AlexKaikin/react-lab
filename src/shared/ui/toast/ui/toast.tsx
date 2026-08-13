'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { Button } from '@/shared/ui/button'
import { Collapse } from '@/shared/ui/collapse'
import { Icon, type IconName } from '@/shared/ui/icon'
import type { ToastItem, ToastVariant } from '../model/types'
import { useToastStore } from '../model/use-toast-store'

const EXIT_DURATION_MS = 250

const VARIANT_ICON: Record<ToastVariant, IconName> = {
  info: 'Info',
  success: 'CircleCheck',
  warning: 'TriangleAlert',
  error: 'CircleX',
}

const VARIANT_COLOR_CLASS_NAME: Record<ToastVariant, string> = {
  info: 'text-semantic-info',
  success: 'text-semantic-success',
  warning: 'text-semantic-warning',
  error: 'text-semantic-error',
}

export const Toast = ({ id, message, variant, autoClose }: ToastItem) => {
  const t = useTranslations()
  const removeToast = useToastStore((state) => state.removeToast)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (isVisible) return

    const timer = setTimeout(() => removeToast(id), EXIT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [isVisible, id, removeToast])

  useEffect(() => {
    if (autoClose === false) return

    const timer = setTimeout(() => setIsVisible(false), autoClose)
    return () => clearTimeout(timer)
  }, [autoClose])

  return (
    <Collapse isVisible={isVisible} gapClassName="pt-2">
      <div role={variant === 'error' ? 'alert' : 'status'} className="paper flex w-full items-center gap-2 px-4 py-3">
        <Icon name={VARIANT_ICON[variant]} className={classNames('shrink-0', VARIANT_COLOR_CLASS_NAME[variant])} />
        <p className="flex-1 text-sm">{message}</p>
        <Button
          variant="text"
          color="secondary"
          className="shrink-0"
          onClick={() => setIsVisible(false)}
          aria-label={t('shared.toast.close')}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </Collapse>
  )
}
