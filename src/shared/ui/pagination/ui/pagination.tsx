import { LinkButton } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
  label: string
  prevLabel: string
  nextLabel: string
}

const getPageHref = (basePath: string, page: number) => (page === 1 ? basePath : `${basePath}/page/${page}`)

export const Pagination = ({ currentPage, totalPages, basePath, label, prevLabel, nextLabel }: PaginationProps) => {
  if (totalPages <= 1) return null

  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-4">
      <LinkButton
        href={getPageHref(basePath, hasPrev ? currentPage - 1 : currentPage)}
        aria-label={prevLabel}
        aria-hidden={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={hasPrev ? undefined : 'invisible'}
      >
        <Icon name="ArrowLeft" />
      </LinkButton>
      <span className="text-secondary">
        {currentPage} / {totalPages}
      </span>
      <LinkButton
        href={getPageHref(basePath, hasNext ? currentPage + 1 : currentPage)}
        aria-label={nextLabel}
        aria-hidden={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={hasNext ? undefined : 'invisible'}
      >
        <Icon name="ArrowRight" />
      </LinkButton>
    </nav>
  )
}
