'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Button } from '@/shared/ui'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations('shared.error')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full text-center">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-secondary">{t('description')}</p>
      <Button onClick={reset}>{t('retry')}</Button>
    </div>
  )
}
