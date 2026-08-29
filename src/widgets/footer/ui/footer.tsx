import { getTranslations } from 'next-intl/server'
import type { ComponentProps, FC } from 'react'
import { getTopTags } from '@/entities/post'
import { getCategories } from '@/entities/post-category'
import { classNames } from '@/shared/lib/class-names'
import type { Locale } from '@/shared/lib/i18n'
import { LinkButton } from '@/shared/ui'

const TAGS_LIMIT = 10

type FooterProps = ComponentProps<'div'> & { locale: Locale }

export const Footer: FC<FooterProps> = async ({ className, locale }) => {
  const t = await getTranslations({ locale })
  const categories = await getCategories(locale)
  const tags = await getTopTags(locale, TAGS_LIMIT)
  const year = new Date().getFullYear()

  return (
    <footer className={classNames('border-t border-secondary', className)}>
      <div className="container flex flex-col gap-8 py-10">
        <div className="grid grid-cols-2 gap-8 t:grid-cols-4 t:gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-lg uppercase">{t('shared.header.title')}</span>
            <nav className="flex flex-col gap-2">
              <LinkButton href="/" variant="text" color="secondary">
                {t('shared.menu.home')}
              </LinkButton>
              <LinkButton href="/blog" variant="text" color="secondary">
                {t('shared.menu.blog')}
              </LinkButton>
              <LinkButton href="/pricing" variant="text" color="secondary">
                {t('shared.menu.pricing')}
              </LinkButton>
            </nav>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-primary text-sm uppercase font-bold tracking-wide">
                {t('shared.footer.categoriesLabel')}
              </span>
              <nav className="flex flex-col gap-2">
                {categories.map((category) => (
                  <LinkButton
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    variant="text"
                    color="secondary"
                  >
                    {category.name}
                  </LinkButton>
                ))}
              </nav>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold text-sm uppercase tracking-wide">
                {t('shared.footer.tagsLabel')}
              </span>
              <nav className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <LinkButton key={tag} href={`/blog/tag/${tag}`} variant="text" color="secondary">
                    {tag}
                  </LinkButton>
                ))}
              </nav>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold text-sm uppercase tracking-wide">
              {t('shared.footer.legalLabel')}
            </span>
            <nav className="flex flex-col gap-2">
              <LinkButton href="/terms" variant="text" color="secondary">
                {t('shared.legal.terms.label')}
              </LinkButton>
              <LinkButton href="/privacy" variant="text" color="secondary">
                {t('shared.legal.privacy.label')}
              </LinkButton>
              <LinkButton href="/cookies" variant="text" color="secondary">
                {t('shared.legal.cookies.label')}
              </LinkButton>
            </nav>
          </div>
        </div>

        <span className="border-primary border-t pt-6 text-secondary text-xs opacity-50">
          © {year} {t('shared.header.title')}
        </span>
      </div>
    </footer>
  )
}
