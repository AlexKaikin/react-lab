import { getTranslations } from 'next-intl/server'
import type { ComponentProps, FC } from 'react'
import { getTopTags } from '@/entities/post'
import { getCategories } from '@/entities/post-category'
import { classNames } from '@/shared/lib/class-names'
import type { Locale } from '@/shared/lib/i18n'
import { Link } from '@/shared/lib/i18n/navigation'

const TAGS_LIMIT = 10

type FooterProps = ComponentProps<'div'> & { locale: Locale }

export const Footer: FC<FooterProps> = async ({ className, locale }) => {
  const t = await getTranslations({ locale })
  const categories = await getCategories(locale)
  const tags = await getTopTags(locale, TAGS_LIMIT)
  const year = new Date().getFullYear()

  return (
    <footer className={classNames('border-t border-primary', className)}>
      <div className="container flex flex-col gap-8 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-lg uppercase">{t('shared.header.title')}</span>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-secondary text-sm hover:text-primary">
                {t('shared.menu.home')}
              </Link>
              <Link href="/blog" className="text-secondary text-sm hover:text-primary">
                {t('shared.menu.blog')}
              </Link>
            </nav>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-secondary text-sm uppercase tracking-wide">
                {t('shared.footer.categoriesLabel')}
              </span>
              <nav className="flex flex-col gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className="text-secondary text-sm hover:text-primary"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-secondary text-sm uppercase tracking-wide">{t('shared.footer.tagsLabel')}</span>
              <nav className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag}`} className="text-secondary text-sm hover:text-primary">
                    {tag}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <span className="text-secondary text-sm uppercase tracking-wide">{t('shared.footer.legalLabel')}</span>
            <nav className="flex flex-col gap-2">
              <Link href="/terms" className="text-secondary text-sm hover:text-primary">
                {t('shared.legal.terms.label')}
              </Link>
              <Link href="/privacy" className="text-secondary text-sm hover:text-primary">
                {t('shared.legal.privacy.label')}
              </Link>
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
