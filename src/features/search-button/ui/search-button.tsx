'use client'

import { lazy } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { useModal } from '@/shared/ui/modal'

const SearchModal = lazy(() => import('./search-modal'))

export const SearchButton = () => {
  const { openModal } = useModal()

  return (
    <Button shape="square" onClick={() => openModal({ id: 'search', component: SearchModal })}>
      <Icon name="Search" />
    </Button>
  )
}
