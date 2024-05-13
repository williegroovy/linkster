import '~/styles/globals.css'
import { redirect } from 'next/navigation';
import { type Metadata } from 'next'
import { getServerAuthSession } from '~/server/auth';
import DarkNav from '~/components/DarkNav';

export const metadata: Metadata = {
   title: {
      template: '%s - Linkster',
      default: 'Linkster - Plan, Connect, Build',
   },
   description:
      'Plan, Connect, Build',
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

   if(!serverSession?.user?.profile || !serverSession?.user?.profile?.onboarded) {
      return (
         <main className="py-8">
            <div className="px-4 sm:px-4 lg:px-8">{children}</div>
         </main>
      )
   }

   return (
      <DarkNav user={serverSession.user}>
         {children}
      </DarkNav>
   )

   // return (
   //    <SideBarContainer name={serverSession?.user.name} image={serverSession?.user.image}>{children}</SideBarContainer>
   // )
}
