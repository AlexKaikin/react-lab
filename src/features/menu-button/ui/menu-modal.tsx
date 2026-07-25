'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { LinkButton } from '@/shared/ui'
import { Modal, type ModalContentProps } from '@/shared/ui/modal'

export type MenuModalProps = ModalContentProps

const menu = [
  { key: 'home', href: '/' },
  { key: 'blog', href: '/blog' },
] as const

export const MenuModal: React.FC<MenuModalProps> = (props) => {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const [shouldClose, setShouldClose] = useState(false)
  const t = useTranslations('shared.menu')

  useEffect(() => {
    if (prevPathname.current !== pathname) setShouldClose(true)
    prevPathname.current = pathname
  }, [pathname])

  return (
    <Modal
      className="left-2 flex flex-col bg-secondary w-70 h-full rounded-md p-8 items-center"
      animation="slideLeft"
      position="left"
      shouldClose={shouldClose}
      aria-label={t('label')}
      {...props}
    >
      {menu.map((item) => (
        <LinkButton key={item.key} href={item.href}>
          {t(item.key)}
        </LinkButton>
      ))}
    </Modal>
  )
}

export default MenuModal
