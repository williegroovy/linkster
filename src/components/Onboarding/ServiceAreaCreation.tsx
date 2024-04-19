import ServiceAreaForm from '~/components/Onboarding/ServiceAreaForm';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

export default async function ContractorProfileCreation() {
   const serverSession = await getServerAuthSession();

   const trades = await api.trades.list();

   return (
      <div className="bg-white">
         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
               Service area(s) & Trades
            </p>
         </div>
         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Let&apos;s set up your service area(s) and trades for projects
         </p>
         <div className="mx-auto mt-2 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-10 sm:gap-y-0 lg:max-w-4xl">
            <ServiceAreaForm trades={trades} contractorProfile={serverSession?.user?.profile?.contractorProfile}/>
         </div>
      </div>
   )
}
