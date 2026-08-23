'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { PostContent } from '@/entities/post/ui'
import { SubscriptionPaywall } from '@/entities/subscription/ui'
import type { Locale } from '@/shared/lib/i18n'

type ProtectedPostContentProps = {
  slug: string
  locale: Locale
  paywallTitle: string
  paywallDescription: string
  paywallActionLabel: string
}

export const ProtectedPostContent = ({
  slug,
  locale,
  paywallTitle,
  paywallDescription,
  paywallActionLabel,
}: ProtectedPostContentProps) => {
  const { data: session } = useSession()
  const [content, setContent] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      setContent(null)
      return
    }

    const abortController = new AbortController()

    const getPostContent = async () => {
      const params = new URLSearchParams({ locale })
      const response = await fetch(`/api/posts/${slug}/content?${params}`, {
        cache: 'no-store',
        signal: abortController.signal,
      })

      if (!response.ok) return

      const data: { content: string } = await response.json()
      setContent(data.content)
    }

    void getPostContent().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return
    })

    return () => abortController.abort()
  }, [locale, session, slug])

  if (content) return <PostContent content={content} />

  return <SubscriptionPaywall title={paywallTitle} description={paywallDescription} actionLabel={paywallActionLabel} />
}
