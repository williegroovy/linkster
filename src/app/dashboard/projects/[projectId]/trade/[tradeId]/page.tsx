import { api } from '~/trpc/server';
import TradeHeader from '~/components/Project/Trade/TradeHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Chat from '~/components/Project/Chat';
import { getServerAuthSession } from '~/server/auth';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {
   const serverSession = await getServerAuthSession();
   const project = await api.projects.get({ projectId: params.projectId });

   const tradeLineItem = await api.trades.get({ tradeId: params.tradeId });
   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   return project && (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <TradeHeader project={project} tradeId={params.tradeId} isProjectOwner={isProjectOwner} />
               <div className={'mt-10'}>
                  { tradeLineItem && <h2 className="text-lg font-semibold leading-7 text-gray-900">{tradeLineItem.trade.name}</h2> }
               </div>
               <div className={'mt-10'}>
                  <h2 className="text-md font-semibold leading-7 text-gray-900">Tasks</h2>
                  { tradeLineItem && tradeLineItem.tasks.map((task) => (
                     <div key={task.id} className={'mt-4'}>
                        <p className="text-sm leading-5 text-gray-900">{task.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
