import { api } from '~/trpc/server';
import TradeHeader from '~/components/Project/Trade/TradeHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Chat from '~/components/Project/Chat';
import { getServerAuthSession } from '~/server/auth';
import TaskList from '~/components/Project/Trade/TaskList';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {
   const serverSession = await getServerAuthSession();
   const project = await api.projects.get({ projectId: params.projectId });

   const tradeLineItem = await api.trades.get({ tradeId: params.tradeId });
   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   console.log(tradeLineItem);

   return project && (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-indigo-600">{project.name} Trade Creation</h1>
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <TradeHeader project={project} tradeId={params.tradeId} isProjectOwner={isProjectOwner} />
               <div className={'mt-10'}>
                  { tradeLineItem && <h2 className="text-lg font-semibold leading-7 text-gray-900">{tradeLineItem.trade.name}</h2> }
               </div>
               <div className={'mt-10'}>
                  <h2 className="text-md font-semibold leading-7 text-gray-900">Tasks</h2>
                  <TaskList tasks={tradeLineItem?.tasks} isProjectOwner={isProjectOwner} />
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
