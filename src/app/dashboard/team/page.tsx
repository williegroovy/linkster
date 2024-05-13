import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import UserList from '~/components/UserList';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/20/solid';
import AddTeamSlideout, { type Team } from '~/components/Team/AddTeamSlideout';
import { getServerAuthSession } from '~/server/auth';

export default async function ProjectPage({ params } : { params: { projectId: string } }) {
   // const project = await api.projects.get({ projectId: params.projectId });
   const session = await getServerAuthSession();
   const contractorTeam = await api.team.listTeam();
   const subcontractors = await api.team.listSubContractors();

   const contractors = await api.team.listContractors();

   const contractorId = session?.user.profile.contractorProfile.id;

   async function formAction(add: Team, remove: Team) {
      'use server';
      const addIds = add.map((member) => member.id);
      await api.team.addTeamMembers({ teamIds: addIds });

      const removeIds = remove.map((member) => member.id);
      await api.team.removeTeamMembers({ teamIds: removeIds });


   }
   // const selected = project?.addtrade.map(({ trade }) => trade) ?? []

   // console.log('subs', project?.subContractors);
   // const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []
   return (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">Team</h1>
            </div>
            <div className="flex flex-wrap items-center sm:flex-nowrap">
               { contractorTeam &&
                 <AddTeamSlideout contractors={contractors} team={contractorTeam?.team ?? []} formAction={formAction}>
                     <button
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Manage Team
                     </button>
                  </AddTeamSlideout>
               }
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            { contractorTeam && contractorTeam.team.length > 0 ? (
               <div className={'flex w-full h-svh justify-around'}>
                  <div className={'max-h-full w-1/3 mr-10 overflow-y-auto'}>
                     <UserList users={contractorTeam.team} />
                  </div>
               </div>
               ) : (
               <div className="h-[50vh] flex flex-col justify-center text-center">
                  <svg
                     className="mx-auto h-12 w-12 text-gray-400"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     aria-hidden="true"
                  >
                     <path
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                     />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No team members</h3>
                  <p className="mt-1 text-sm text-gray-500">Add your first team member.</p>
                  <div className="mt-6">
                    <AddTeamSlideout contractors={contractors} team={contractorTeam?.team ?? []} formAction={formAction}>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Manage Team
                      </button>
                    </AddTeamSlideout>
                  </div>
               </div>
            )}
         </DarkNavContainer>
      </>
   )
}
