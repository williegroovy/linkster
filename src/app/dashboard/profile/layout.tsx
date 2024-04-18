import '~/styles/globals.css'
import { type Metadata } from 'next'

export const metadata: Metadata = {
   title: {
      template: '%s - TaxPal',
      default: 'TaxPal - Accounting made simple for small businesses',
   },
   description:
      'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

export default async function DashboardProfileLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className={'h-full'}>{children}</div>
   )
}
