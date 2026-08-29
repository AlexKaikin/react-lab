'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import { useLocaleSwitch } from '@/shared/lib/i18n/use-locale-switch'
import { THEMES, useTheme } from '@/shared/lib/theme'
import { Button } from '@/shared/ui/button'
import { Divider } from '@/shared/ui/divider'
import { Modal, type ModalContentProps, useModalStore } from '@/shared/ui/modal'
import { NavItem } from '@/shared/ui/nav-item'

export type MenuCategory = {
  id: string
  slug: string
  name: string
}

type MenuModalProps = ModalContentProps & {
  categories: MenuCategory[]
}

export const MenuModal: React.FC<MenuModalProps> = ({ categories }) => {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const t = useTranslations()
  const closeModal = useModalStore((state) => state.closeModal)
  const cleaningModalItems = useModalStore((state) => state.cleaningModalItems)
  const { locale, locales, switchLocale } = useLocaleSwitch()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (prevPathname.current !== pathname) closeModal()
    prevPathname.current = pathname
  }, [pathname, closeModal])

  return (
    <Modal
      className="my-2 mx-2 self-stretch w-70 rounded-md p-4 pt-10"
      animation="slideLeft"
      position="left"
      aria-label={t('shared.menu.label')}
    >
      <div className="flex flex-col gap-1">
        <Divider textAlign="left" className="mb-1">
          <span className="text-xs">{t('shared.menu.label')}</span>
        </Divider>

        <NavItem label={t('shared.menu.home')} href="/" />

        <NavItem label={t('shared.menu.blog')} href="/blog">
          {categories.map((category) => (
            <NavItem key={category.id} label={category.name} href={`/blog/category/${category.slug}`} />
          ))}
        </NavItem>

        <NavItem label={t('shared.menu.pricing')} href="/pricing" />

        <Divider textAlign="left" className="mt-6 mb-1">
          <span className="text-xs">{t('shared.menu.settings')}</span>
        </Divider>

        <NavItem label={t('shared.languageToggle.change')}>
          {locales.map((item) => (
            <Button
              key={item}
              variant="text"
              color={item === locale ? 'primary' : 'secondary'}
              className="w-full justify-start"
              onClick={() => {
                cleaningModalItems()
                switchLocale(item)
              }}
            >
              {t(`shared.locale.${item}`)}
            </Button>
          ))}
        </NavItem>

        <NavItem label={t('shared.themeToggle.change')}>
          {THEMES.map((item) => (
            <Button
              key={item}
              variant="text"
              color={item === theme ? 'primary' : 'secondary'}
              className="w-full justify-start"
              onClick={() => setTheme(item)}
            >
              {t(`shared.themeToggle.${item}`)}
            </Button>
          ))}
        </NavItem>
      </div>
    </Modal>
  )
}

export default MenuModal
