import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts')

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/sb', destination: '/sb/index.html' },
      { source: '/sb-manager/:path*', destination: '/sb/sb-manager/:path*' },
      { source: '/sb-addons/:path*', destination: '/sb/sb-addons/:path*' },
      { source: '/sb-common-assets/:path*', destination: '/sb/sb-common-assets/:path*' },
      { source: '/assets/:path*', destination: '/sb/assets/:path*' },
      { source: '/index.json', destination: '/sb/index.json' },
      { source: '/project.json', destination: '/sb/project.json' },
      { source: '/iframe.html', destination: '/sb/iframe.html' },
      { source: '/vite-inject-mocker-entry.js', destination: '/sb/vite-inject-mocker-entry.js' },
    ]
  },
}

export default withNextIntl(nextConfig)
