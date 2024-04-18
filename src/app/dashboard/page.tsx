import ProfileCreation from './ProfileCreation';
import { getServerAuthSession } from '~/server/auth';

export default async function DashboardPage() {
   const serverSession = await getServerAuthSession();

   console.log(serverSession?.user?.profile)
   if(!serverSession?.user?.profile) {
      return (
         <ProfileCreation />
      )
   }

   return (
      <div className="px-4 sm:px-6 lg:px-8">Dashboard</div>
   )
}

