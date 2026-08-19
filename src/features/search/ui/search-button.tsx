'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModalStore } from '@/shared/ui/modal'

const SearchModal = lazy(() => import('./search-modal'))

export const SearchButton = () => {
  const { openModal } = useModalStore()

  return (
    <Button shape="square" onClick={() => openModal({ component: SearchModal })}>
      <Icon name="Search" />
    </Button>
  )
}
