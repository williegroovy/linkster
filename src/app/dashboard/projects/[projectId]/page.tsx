import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import ComboBox from '~/components/ComboBox';
import ContractorList from '~/components/Project/ContractorList';
import { getServerAuthSession } from '~/server/auth';
import Chat from '~/components/Project/Chat';
import TradeDialog from '~/components/Project/TradeDialog';

export default async function ProjectPage({ params, searchParams } : { params: { projectId: string }, searchParams?: { [key: string]: string } }) {
   const serverSession = await getServerAuthSession();

   const project = await api.projects.get({ projectId: params.projectId });
   const contractors = await api.projects.listContractors();
   const trades = await api.trades.list();

   const selected = project?.trades.map(({ trade }) => trade) ?? [];

   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []
   const initials = serverSession?.user.name.split(' ').map((n) => n[0]).join('');

   const dialogOpen = searchParams?.createTrade === 'true';

   return project && (
      <>
         <DarkNavHeader title={'Project Details'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} isProjectOwner={isProjectOwner} />
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  {/*{ isProjectOwner && <ComboBox projectId={params.projectId} listItems={trades} selected={selected} /> }*/}
                  <TradeItems projectId={params.projectId} trades={project.trades} isProjectOwner={isProjectOwner} />
                  {/*<Calendar />*/}
                  {/*{ isProjectOwner && <ContractorList projectId={params.projectId} contractors={contractors} selected={selectedSubs} /> }*/}
                  <div className={'mt-10'}>
                     { project.chats.length > 0 && project?.chats[0] && <Chat image={serverSession?.user?.image} chatId={project.chats[0].id} initials={initials} /> }
                  </div>
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
