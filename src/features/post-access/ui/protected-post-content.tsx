'use client'

import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PostContent } from '@/entities/post/ui'
import { SubscriptionPaywall } from '@/entities/subscription/ui'
import type { Locale } from '@/shared/lib/i18n'
import { Button } from '@/shared/ui/button'
import { ProtectedPostContentSkeleton } from './protected-post-content-skeleton'

type ProtectedPostContentProps = {
  slug: string
  locale: Locale
  paywallTitle: string
  paywallDescription: string
  paywallActionLabel: string
}

type AccessState =
  | { status: 'checking' }
  | { status: 'allowed'; content: string }
  | { status: 'denied' }
  | { status: 'error' }

const isPostContentResponse = (value: unknown): value is { content: string } =>
  typeof value === 'object' && value !== null && 'content' in value && typeof value.content === 'string'

export const ProtectedPostContent = ({
  slug,
  locale,
  paywallTitle,
  paywallDescription,
  paywallActionLabel,
}: ProtectedPostContentProps) => {
  const t = useTranslations('subscription.paywall')
  const { data: session, status: sessionStatus } = useSession()
  const [accessState, setAccessState] = useState<AccessState>({ status: 'checking' })
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadPostContent = useCallback(async () => {
    abortControllerRef.current?.abort()
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    setAccessState({ status: 'checking' })

    try {
      const params = new URLSearchParams({ locale })
      const response = await fetch(`/api/posts/${slug}/content?${params}`, {
        cache: 'no-store',
        signal: abortController.signal,
      })

      if (response.status === 401 || response.status === 403) {
        setAccessState({ status: 'denied' })
        return
      }

      if (!response.ok) throw new Error(`Failed to load protected post content: ${response.status}`)

      const data: unknown = await response.json()
      if (!isPostContentResponse(data)) throw new Error('Invalid protected post content response')

      setAccessState({ status: 'allowed', content: data.content })
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setAccessState({ status: 'error' })
    } finally {
      if (abortControllerRef.current === abortController) abortControllerRef.current = null
    }
  }, [locale, slug])

  useEffect(() => {
    if (sessionStatus === 'loading') {
      abortControllerRef.current?.abort()
      setAccessState({ status: 'checking' })
      return
    }

    if (!session) {
      abortControllerRef.current?.abort()
      setAccessState({ status: 'denied' })
      return
    }

    void loadPostContent()

    return () => abortControllerRef.current?.abort()
  }, [loadPostContent, session, sessionStatus])

  if (accessState.status === 'checking') return <ProtectedPostContentSkeleton label={t('loading')} />

  if (accessState.status === 'allowed') return <PostContent content={accessState.content} />

  if (accessState.status === 'error') {
    return (
      <div role="alert" className="flex flex-col items-center gap-4 py-8 text-center">
        <p className="text-secondary">{t('error')}</p>
        <Button variant="text" color="primary" onClick={() => void loadPostContent()}>
          {t('retry')}
        </Button>
      </div>
    )
  }

  return <SubscriptionPaywall title={paywallTitle} description={paywallDescription} actionLabel={paywallActionLabel} />
}
