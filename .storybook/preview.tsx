import '../src/assets/styles/globals.css'
import type { Decorator, Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../src/shared/lib/i18n/translations/en'

const withIntl: Decorator = (Story) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    <Story />
  </NextIntlClientProvider>
)

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'dark'
  document.documentElement.setAttribute('data-theme', theme)

  return (
    <div className="min-h-screen bg-primary p-6 text-primary">
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [withIntl, withTheme],
}

export default preview
