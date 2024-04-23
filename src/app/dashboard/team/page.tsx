import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import TeamCombobox from '~/components/Team/TeamCombobox';
import ContractorList from '~/components/Project/ContractorList';
import TeamList from '~/components/Team/TeamList';

export default async function ProjectPage({ params } : { params: { projectId: string } }) {
   // const project = await api.projects.get({ projectId: params.projectId });
   const team = await api.team.listTeam();
   const subcontractors = await api.team.listSubContractors();

   const contractors = await api.team.listContractors();

   // const selected = project?.addtrade.map(({ trade }) => trade) ?? []

   // console.log('subs', project?.subContractors);
   // const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []
   return (
      <>
         <DarkNavHeader title={'Team'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               {/*<ProjectHeader project={project} />*/}
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  {/*<ComboBox projectId={params.projectId} listItems={addtrade} selected={selected} />*/}
                  {/*<TradeItems projectId={params.projectId} addtrade={project.addtrade} />*/}
                  {/*<Calendar />*/}
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Team</h2>
                  { team?.team && <TeamList team={team?.team} /> }
                  <div>
                     <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">Add Team Members</h2>
                     <TeamCombobox contractors={contractors} selected={team?.team ?? []} type={'team'} />
                  </div>
                  <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">Subcontractors</h2>
                  { subcontractors?.subContractors && <TeamList team={subcontractors?.subContractors} /> }
                  <div>
                     <h2 className="mt-10 text-base font-semibold leading-7 text-gray-900">Add Subcontractors</h2>
                     <TeamCombobox contractors={contractors} selected={subcontractors?.subContractors ?? []} type={'subcontractor'} />
                  </div>
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
