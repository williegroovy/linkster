import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import ComboBox from '~/components/ComboBox';
import ContractorList from '~/components/Project/ContractorList';
import { getServerAuthSession } from '~/server/auth';

export default async function ProjectPage({ params } : { params: { projectId: string } }) {
   const serverSession = await getServerAuthSession();

   const project = await api.projects.get({ projectId: params.projectId });
   const contractors = await api.projects.listContractors();
   const trades = await api.trades.list();

   const selected = project?.trades.map(({ trade }) => trade) ?? [];

   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []

   console.log('isProjectOwner', isProjectOwner);

   return project && (
      <>
         <DarkNavHeader title={'Project Details'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} />
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  { isProjectOwner && <ComboBox projectId={params.projectId} listItems={trades} selected={selected} /> }
                  <TradeItems projectId={params.projectId} trades={project.trades} />
                  {/*<Calendar />*/}
                  { isProjectOwner && <ContractorList projectId={params.projectId} contractors={contractors} selected={selectedSubs} /> }
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
