import type { FC } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { env } from '@/shared/lib/env'
import type { Locale } from '@/shared/lib/i18n'
import { LinkButton } from '@/shared/ui'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  label: string
  locale: Locale
}

const buildJsonLd = (items: BreadcrumbItem[], locale: Locale) => {
  const siteUrl = env('NEXT_PUBLIC_SITE_URL').replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}/${locale}${item.href}` } : {}),
    })),
  }
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, label, locale }) => (
  <nav aria-label={label}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(items, locale)).replace(/</g, '\\u003c') }}
    />
    <ol className="flex items-center gap-2 overflow-x-auto text-secondary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <li key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-2">
            {item.href && !isLast ? (
              <LinkButton href={item.href} variant="text" className="whitespace-nowrap">
                {item.label}
              </LinkButton>
            ) : (
              <span className={classNames('whitespace-nowrap', isLast && 'font-medium opacity-100')}>{item.label}</span>
            )}
            {!isLast && (
              <svg
                className="size-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)
