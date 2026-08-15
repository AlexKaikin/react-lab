import localFont from 'next/font/local'

export const fontText = localFont({
  src: [
    {
      path: './inter/InterVariable.woff2',
      weight: '400 800',
      style: 'normal',
    },
  ],
  variable: '--font-text',
  display: 'swap',
})

export const fontHeading = localFont({
  src: [
    { path: './onest/Onest-Light.woff2', weight: '300', style: 'normal' },
    { path: './onest/Onest-Regular.woff2', weight: '400', style: 'normal' },
    { path: './onest/Onest-Medium.woff2', weight: '500', style: 'normal' },
    { path: './onest/Onest-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './onest/Onest-Bold.woff2', weight: '700', style: 'normal' },
    { path: './onest/Onest-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
})
