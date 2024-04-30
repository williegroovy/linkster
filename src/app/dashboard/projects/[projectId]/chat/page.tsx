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
import { LinkIcon, PencilIcon } from '@heroicons/react/20/solid';
import AddTrade from '~/components/Project/AddTrade';
import HeaderMenu from '~/components/Project/HeaderMenu';

export default async function ChatPage({ params, searchParams } : { params: { projectId: string }, searchParams?: { [key: string]: string } }) {
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
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">
                  <a href={`/dashboard/projects/${params.projectId}`}>{project.name}</a>
               </h1>
               <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                  <a href={`/dashboard/projects/${params.projectId}/chat`} className="text-indigo-600">
                     Chat
                  </a>
                  <a href={`/dashboard/projects/${params.projectId}/calendar`} className="text-gray-700">
                     Calendar
                  </a>
                  <a href={`/dashboard/projects/${params.projectId}/subcontractors`} className="text-indigo-600">
                     Subcontractors
                  </a>
               </div>
            </div>
            { isProjectOwner && (
               <div className="divide-y divide-gray-100 mt-5 flex 2xl:ml-4 2xl:mt-0">
               <span className="hidden 2xl:block">
                   <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                   >
                     <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                     Edit
                   </button>
               </span>
                  <span className="ml-3 hidden 2xl:block">
                  <button
                     type="button"
                     className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                     <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                     View
                  </button>
               </span>
                  <span className="xl:ml-3">
                  <AddTrade projectId={project.id} isProjectOwner={isProjectOwner} />
               </span>
                  <HeaderMenu />
               </div>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <div className={'mt-10'}>
                  { project.chats.length > 0 && project?.chats[0] && (
                     <div className={'max-w-screen mt-10'}>
                        <h2 className="text-md font-semibold leading-7 text-gray-900">Chat</h2>
                        <Chat image={serverSession?.user?.image} chatId={project.chats[0].id} initials={initials} />
                     </div>
                  )}
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
