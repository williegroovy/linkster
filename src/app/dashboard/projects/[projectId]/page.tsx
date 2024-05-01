import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import ContractorList from '~/components/Project/ContractorList';
import { getServerAuthSession } from '~/server/auth';
import { CheckIcon, LinkIcon, MapPinIcon, PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import AddTrade from '~/components/Project/AddTrade';
import HeaderMenu from '~/components/Project/HeaderMenu';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default async function ProjectPage({ params, searchParams } : { params: { projectId: string }, searchParams?: { [key: string]: string } }) {
   const serverSession = await getServerAuthSession();

   const project = await api.projects.get({ projectId: params.projectId });
   const contractors = await api.projects.listContractors();
   const trades = await api.trades.list();

   const selected = project?.trades.map(({ trade }) => trade) ?? [];

   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []
   const initials = serverSession?.user.name.split(' ').map((n) => n[0]).join('');

   console.log('project', project);
   return project && (
      <>
         <DarkNavHeader>
            <div className="flex flex-col flex-wrap items-center gap-6 px-4 sm:px-6 lg:px-8">
               <div className="flex flex-wrap gap-6">
                  <h1 className="text-base font-semibold leading-7 text-indigo-600">{project.name}</h1>
                  <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                     <a href={`/dashboard/projects/${params.projectId}/chat`} className="text-gray-700">
                        Chat
                     </a>
                     <a href={`/dashboard/projects/${params.projectId}/calendar`} className="text-gray-700">
                        Calendar
                     </a>
                     <a href={`/dashboard/projects/${params.projectId}/subcontractors`} className="text-gray-700">
                        Subcontractors
                     </a>
                  </div>
               </div>
               <div className={'flex flex-wrap w-full gap-4 text-sm'}>
                  {/*<div className="mt-2 flex items-center text-sm text-gray-500">*/}
                  {/*   <InformationCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />*/}
                  {/*   {project.description ?? 'No description'}*/}
                  {/*</div>*/}
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                     <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                     {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}
                  </div>
               </div>
            </div>
            { isProjectOwner && (
               <div className="divide-y divide-gray-100 mt-5 flex 2xl:ml-4 2xl:mt-0">
               <span className="ml-3 hidden md:block">
                  <Link href={`/dashboard/projects/${params.projectId}/trade/create`}>
                     <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Add Trade
                     </button>
                  </Link>
                  {/*<AddTrade projectId={project.id} isProjectOwner={isProjectOwner} />*/}
               </span>
               <span className="ml-3 hidden md:block">
                  <Link href={`/dashboard/projects/${params.projectId}/edit`}>
                     <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                     >
                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Edit
                     </button>
                  </Link>
               </span>
                  <HeaderMenu projectId={params.projectId} isProjectOwner={isProjectOwner} />
               </div>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               {/*<ProjectHeader project={project} isProjectOwner={isProjectOwner} />*/}
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  {/*{ isProjectOwner && <ComboBox projectId={params.projectId} listItems={trades} selected={selected} /> }*/}
                  { project.trades.length > 0 ?
                     <TradeItems projectId={params.projectId} trades={project.trades} isProjectOwner={isProjectOwner} />
                     : <div className="h-[50vh] flex flex-col justify-center text-center">
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
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Trades</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding a trade to the project.</p>
                        <div className="mt-6">
                           {/*<Link href={`/dashboard/projects/${params.projectId}/trade/create`}>*/}
                           {/*   <button*/}
                           {/*      key={'button'}*/}
                           {/*      // href={`/dashboard/projects/${project.id}?createTrade=true`}*/}
                           {/*      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                           {/*   >*/}
                           {/*      <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />*/}
                           {/*      Add Trade*/}
                           {/*   </button>*/}
                           {/*</Link>*/}
                           <AddTrade projectId={project.id} isProjectOwner={isProjectOwner}>
                              <button
                                 key={'button'}
                                 // onClick={toggle}
                                 // href={`/dashboard/projects/${project.id}?createTrade=true`}
                                 className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                 <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                 Add Trade
                              </button>
                           </AddTrade>
                           {/*<Link href={`/dashboard/projects/${params.projectId}/trade/create`}>*/}
                           {/*   <button*/}
                           {/*      type="button"*/}
                           {/*      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                           {/*   >*/}
                           {/*      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />*/}
                           {/*      Add Trade*/}
                           {/*   </button>*/}
                           {/*</Link>*/}
                        </div>
                     </div>
                  }
                  {/*<Calendar />*/}
                  {/*{ isProjectOwner && <ContractorList projectId={params.projectId} contractors={contractors} selected={selectedSubs} /> }*/}
                  {/*{ project.chats.length > 0 && project?.chats[0] && (*/}
                  {/*   <div className={'max-w-screen mt-10'}>*/}
                  {/*      <h2 className="text-md font-semibold leading-7 text-gray-900">Chat</h2>*/}
                  {/*      <Chat image={serverSession?.user?.image} chatId={project.chats[0].id} initials={initials} />*/}
                  {/*   </div>*/}
                  {/*)}*/}
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
