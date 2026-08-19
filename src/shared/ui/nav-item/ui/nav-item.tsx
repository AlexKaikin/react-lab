'use client'

import { type ReactNode, useState } from 'react'
import { classNames } from '@/shared/lib/class-names'
import { Button, LinkButton } from '@/shared/ui/button'
import { Collapse } from '@/shared/ui/collapse'
import { Icon } from '@/shared/ui/icon'

type NavItemProps = {
  label: string
  href?: string
  children?: ReactNode
}

export const NavItem = ({ label, href, children }: NavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = Boolean(children)
  const toggle = () => setIsExpanded((value) => !value)

  return (
    <div className="flex flex-col">
      <div className="flex min-h-10 items-center gap-2">
        <div className="flex-1 *:w-full">
          {href ? (
            <LinkButton href={href} variant="text" color="primary">
              {label}
            </LinkButton>
          ) : (
            <Button variant="text" color="primary" onClick={hasChildren ? toggle : undefined}>
              {label}
            </Button>
          )}
        </div>

        {hasChildren && (
          <Button
            variant="text"
            color="secondary"
            shape="square"
            size="small"
            onClick={toggle}
            aria-expanded={isExpanded}
          >
            <Icon name="ChevronDown" className={classNames('transition-transform', isExpanded && 'rotate-180')} />
          </Button>
        )}
      </div>

      {hasChildren && (
        <Collapse isVisible={isExpanded} gapClassName="pt-1">
          <div className="flex flex-col gap-1 border-secondary border-l pl-4">{children}</div>
        </Collapse>
      )}
    </div>
  )
}
