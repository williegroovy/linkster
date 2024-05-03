import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { TRPCReactProvider } from '~/trpc/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import '~/styles/globals.css'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Linkster',
    default: 'Linkster - Plan, Connect, Build',
  },
  description:
    'Plan, Connect, Build',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
      <GoogleAnalytics gaId={'G-E3N9N28PCN'} />
    </html>
  )
}
