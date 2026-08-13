'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { LinkButton } from '@/shared/ui'
import { Modal, useModalStore } from '@/shared/ui/modal'

const menu = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
] as const

export const MenuModal: React.FC = () => {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const t = useTranslations('shared.menu')
  const closeModal = useModalStore((state) => state.closeModal)

  useEffect(() => {
    if (prevPathname.current !== pathname) closeModal()
    prevPathname.current = pathname
  }, [pathname, closeModal])

  return (
    <Modal
      className="my-2 mx-2 self-stretch w-70 rounded-md p-4"
      animation="slideLeft"
      position="left"
      aria-label={t('label')}
    >
      <div className="flex flex-col">
        {menu.map((item) => (
          <LinkButton key={item.key} href={item.href} className="w-fit">
            {t(item.key)}
          </LinkButton>
        ))}
      </div>
    </Modal>
  )
}

export default MenuModal
