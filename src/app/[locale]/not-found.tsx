import { getTranslations } from 'next-intl/server'
import { LinkButton } from '@/shared/ui'

export default async function NotFound() {
  const t = await getTranslations('shared.notFound')

  return (
    <div className="absolute inset-0 container flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-secondary">{t('description')}</p>
      <LinkButton href="/" variant="outlined" color="primary">
        {t('backHome')}
      </LinkButton>
    </div>
  )
}
