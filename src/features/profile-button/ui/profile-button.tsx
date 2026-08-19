'use client'

import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { lazy } from 'react'
import { Button, LinkButton } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'

const AuthModal = lazy(() => import('./auth-modal'))

export const ProfileButton = () => {
  const t = useTranslations()
  const { data: session, status } = useSession()
  const { openModal } = useModalStore()

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
      <div className="flex flex-col gap-1 *:w-full *:px-3 *:py-2">
        {session ? (
          <>
            <LinkButton href="/account" variant="text" color="secondary">
              {t('shared.account.profile.label')}
            </LinkButton>
            {session.user.roles.includes('ADMIN') && (
              <LinkButton href="/admin" variant="text" color="secondary">
                {t('shared.admin.label')}
              </LinkButton>
            )}
            <Button variant="text" color="secondary" onClick={() => signOut()}>
              {t('shared.header.logout')}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="text"
              color="secondary"
              onClick={() => openModal({ component: AuthModal, props: { initialMode: 'login' } })}
            >
              {t('shared.auth.login.label')}
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => openModal({ component: AuthModal, props: { initialMode: 'signup' } })}
            >
              {t('shared.auth.signup.label')}
            </Button>
          </>
        )}
      </div>
    </Dropdown>
  )
}
