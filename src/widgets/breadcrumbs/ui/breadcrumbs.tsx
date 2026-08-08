import type { FC } from 'react'
import { LinkButton } from '@/shared/ui'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  label: string
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, label }) => (
  <nav aria-label={label}>
    <ol className="flex items-center gap-2 text-secondary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <LinkButton href={item.href} variant="text">
                {item.label}
              </LinkButton>
            ) : (
              <span className={isLast ? 'font-medium opacity-100' : undefined}>{item.label}</span>
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
