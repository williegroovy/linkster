import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import ComboBox from '~/components/ComboBox';
import ContractorList from '~/components/Project/ContractorList';
import TeamList from '~/components/Team/TeamList';

export default async function ProjectPage({ params } : { params: { projectId: string } }) {
   // const project = await api.projects.get({ projectId: params.projectId });
   const team = await api.team.listTeam();
   const subcontractors = await api.team.listSubContractors();

   const contractors = await api.projects.listContractors();

   // const selected = project?.trades.map(({ trade }) => trade) ?? []

   // console.log('subs', project?.subContractors);
   // const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []

   console.log('team', team);
   console.log('subs', subcontractors);
   return (
      <>
         <DarkNavHeader title={'Team'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               {/*<ProjectHeader project={project} />*/}
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  {/*<ComboBox projectId={params.projectId} listItems={trades} selected={selected} />*/}
                  {/*<TradeItems projectId={params.projectId} trades={project.trades} />*/}
                  {/*<Calendar />*/}
                  {/*<ContractorList projectId={params.projectId} contractors={contractors} selected={selectedSubs} />*/}
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Team</h2>
                  { team?.team && <TeamList team={team?.team} /> }
                  <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">Subcontractors</h2>
                  { subcontractors?.subContractors && <TeamList team={subcontractors?.subContractors} /> }
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
