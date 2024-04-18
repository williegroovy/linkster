import '~/styles/globals.css'
import { redirect } from 'next/navigation';
import { type Metadata } from 'next'
import { getServerAuthSession } from '~/server/auth';
import SideBarContainer from '~/components/SideBarContainer';
import DarkNav from '~/components/DarkNav';

export const metadata: Metadata = {
   title: {
      template: '%s - TaxPal',
      default: 'TaxPal - Accounting made simple for small businesses',
   },
   description:
      'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {

   const serverSession = await getServerAuthSession();
   if(!serverSession?.user) {
      redirect('/login');
   }

   // if(!serverSession?.user?.profile) {
   //    redirect('/profile');
   // }

   if(!serverSession?.user?.profile) {
      return (
         <main className="py-8">
            <div className="px-4 sm:px-4 lg:px-8">{children}</div>
         </main>
      )
   }
   return (
      <DarkNav>
         {children}
      </DarkNav>
   )

   // return (
   //    <SideBarContainer name={serverSession?.user.name} image={serverSession?.user.image}>{children}</SideBarContainer>
   // )
}
