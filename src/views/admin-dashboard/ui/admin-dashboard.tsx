import { getTranslations } from 'next-intl/server'
import { getPostsTotalCount } from '@/entities/post'
import { getCategoriesTotalCount } from '@/entities/post-category'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export const AdminDashboardPage = async ({ params }: LocalePageProps<'/[locale]/admin'>) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'shared.admin.dashboard' })
  const [postsCount, categoriesCount] = await Promise.all([getPostsTotalCount(), getCategoriesTotalCount()])

  const stats = [
    { label: t('stats.posts'), value: postsCount },
    { label: t('stats.categories'), value: categoriesCount },
  ]

  return (
    <div className="container flex flex-col gap-4 animate-fade-in">
      <h1>{t('label')}</h1>
      <div className="grid grid-cols-2 gap-4 t:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="paper flex flex-col gap-1 p-4">
            <span className="text-secondary text-[14px]">{stat.label}</span>
            <span className="text-[32px] font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
