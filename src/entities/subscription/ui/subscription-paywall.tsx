import { LinkButton } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

type SubscriptionPaywallProps = {
  description: string
  title: string
  actionLabel: string
}

export const SubscriptionPaywall = ({ description, title, actionLabel }: SubscriptionPaywallProps) => (
  <section className="mx-auto flex max-w-md flex-col items-center gap-6 py-8 text-center">
    <div className="flex items-center justify-center">
      <Icon name="LockKeyhole" size={40} aria-hidden="true" />
    </div>
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">{title}</h2>
      <p className="text-secondary">{description}</p>
    </div>
    <LinkButton href="/pricing" variant="contained" color="primary">
      {actionLabel}
    </LinkButton>
  </section>
)
