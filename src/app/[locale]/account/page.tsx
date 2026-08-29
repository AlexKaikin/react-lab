import { redirect } from 'next/navigation'
import type { LocalePageProps } from '@/shared/lib/i18n/types'

export default async function AccountPage({ params }: LocalePageProps<'/[locale]/account'>) {
  const { locale } = await params
  redirect(`/${locale}/account/profile`)
}
