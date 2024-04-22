import { api } from '~/trpc/server';
import LineItems from '~/components/Project/LineItems';
import ProjectHeader from '~/components/Project/ProjectHeader';
import Calendar from '~/components/Project/Calendar';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Chat from '~/components/Project/Chat';
import ContractorList from '~/components/Project/ContractorList';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {

   const project = await api.projects.get({ projectId: params.projectId });

   const lineItems = await api.trades.listLineItems({ projectId: params.projectId });

   console.log('chat', project?.chats);
   return project && (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} />
               <div className={'mt-10'}>
                  {/*<LineItems lineItems={lineItems} />*/}
               </div>
               { project?.chats[0] && <Chat chatId={project.chats[0].id} /> }
            </div>
         </DarkNavContainer>
      </>
   )
}
