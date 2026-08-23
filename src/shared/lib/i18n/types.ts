import type { AppRoutes } from '../../../../.next/types/routes'
import type { Locale } from './'

type LocaleParams<Route extends AppRoutes> = Awaited<PageProps<Route>['params']>

export type LocalePageProps<Route extends AppRoutes> = Omit<PageProps<Route>, 'params'> & {
  params: Promise<Omit<LocaleParams<Route>, 'locale'> & { locale: Locale }>
}
