import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Chat from '~/components/Project/Chat';
import { getServerAuthSession } from '~/server/auth';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {
   const serverSession = await getServerAuthSession();
   const project = await api.projects.get({ projectId: params.projectId });

   // const lineItems = await api.trades.listLineItems({ projectId: params.projectId });

   const initials = serverSession?.user.name.split(' ').map((n) => n[0]).join('');
   return project && (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} />
               <div className={'mt-10'}>
                  {/*<LineItems lineItems={lineItems} />*/}
               </div>
               { project.chats.length > 0 && project?.chats[0] && <Chat image={serverSession?.user?.image} chatId={project.chats[0].id} initials={initials} /> }
            </div>
         </DarkNavContainer>
      </>
   )
}
