'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { lazy, useEffect, useState } from 'react'
import type { SubscriptionPlan } from '@/entities/subscription'
import { Button, LinkButton } from '@/shared/ui/button'
import { Divider } from '@/shared/ui/divider'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'

const AuthModal = lazy(() => import('./auth-modal'))

export const ProfileButton = () => {
  const t = useTranslations()
  const { data: session, status } = useSession()
  const { openModal } = useModalStore()
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null)

  useEffect(() => {
    if (!session) {
      setSubscriptionPlan(null)
      return
    }

    const abortController = new AbortController()

    const getSubscriptionPlan = async () => {
      const response = await fetch('/api/subscription/current', { cache: 'no-store', signal: abortController.signal })

      if (!response.ok) return

      const { plan }: { plan: SubscriptionPlan | null } = await response.json()
      setSubscriptionPlan(plan)
    }

    void getSubscriptionPlan().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return
    })

    return () => abortController.abort()
  }, [session])

  if (status === 'loading') {
    return <div className="size-12 rounded-full bg-secondary animate-pulse -mr-3" aria-hidden="true" />
  }

  return (
    <Dropdown
      trigger={(triggerProps) => (
        <Button shape="square" {...triggerProps} className="-mr-3">
          <Icon name="User" />
        </Button>
      )}
    >
      <div className="flex flex-col gap-1">
        {session ? (
          <>
            <div className="flex flex-col gap-2 p-2">
              {subscriptionPlan && (
                <span className="absolute top-0 right-0 rounded-bl-md bg-semantic-info/15 px-2 py-1 text-xs font-medium text-semantic-info uppercase">
                  {subscriptionPlan}
                </span>
              )}
              <span>{session.user.firstName}</span>
              <span className="text-secondary text-xs">{session.user.email}</span>
            </div>
            <Divider />
            <LinkButton href="/account" variant="text" color="secondary" className="p-2">
              {t('shared.account.profile.label')}
            </LinkButton>
            {session.user.roles.includes('ADMIN') && (
              <LinkButton href="/admin" variant="text" color="secondary" className="p-2">
                {t('shared.admin.label')}
              </LinkButton>
            )}
            <Divider />
            <Button variant="text" color="secondary" onClick={() => signOut()} className="p-2">
              {t('shared.header.logout')}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="text"
              color="secondary"
              onClick={() => openModal({ component: AuthModal, props: { initialMode: 'login' } })}
              className="p-2"
            >
              {t('shared.auth.login.label')}
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => openModal({ component: AuthModal, props: { initialMode: 'signup' } })}
              className="p-2"
            >
              {t('shared.auth.signup.label')}
            </Button>
          </>
        )}
      </div>
    </Dropdown>
  )
}
