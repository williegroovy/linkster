import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeForm from '~/components/TradeForm';
import ComboBox from '~/components/ComboBox';
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import TradeCreation from '~/components/Project/Trade/TradeCreation';
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/20/solid';

export default async function CreateTrade({ params } : { params: { projectId: string } }) {
   const serverSession = await getServerAuthSession();
   const project = await api.projects.get({ projectId: params.projectId });
   const trades = await api.trades.list();
   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   return (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">Trade Items</h1>
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between'}>
               <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Add Trade</h2>
                  <TradeCreation projectId={params.projectId} isProjectOwner={isProjectOwner} />
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
