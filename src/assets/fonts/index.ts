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
