import { api } from '~/trpc/server';
import TradeHeader from '~/components/Project/Trade/TradeHeader';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Chat from '~/components/Project/Chat';
import { getServerAuthSession } from '~/server/auth';
import TaskList from '~/components/Project/Trade/TaskList';
import { CheckIcon, MapPinIcon, PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import HeaderMenu from '~/components/Project/HeaderMenu';
import AddTask from '~/components/Project/Trade/AddTask';
import AddTrade from '~/components/Project/AddTrade';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {
   const serverSession = await getServerAuthSession();
   const project = await api.projects.get({ projectId: params.projectId });

   const tradeLineItem = await api.trades.get({ tradeId: params.tradeId });
   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   return project && (
      <>
         {/*<DarkNavHeader>*/}
         {/*   <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">*/}
         {/*      <h1 className="text-base font-semibold leading-7 text-indigo-600">{project.name} Trade Creation</h1>*/}
         {/*   </div>*/}
         {/*</DarkNavHeader>*/}
         <DarkNavHeader>
               <div className="flex flex-wrap items-center gap-6">
                  <h1 className="text-base font-semibold leading-7 text-indigo-600">{project.name}</h1>

                  {/*<div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">*/}
                  {/*   <a href={`/dashboard/projects/${params.projectId}/chat`} className="text-gray-700">*/}
                  {/*      Chat*/}
                  {/*   </a>*/}
                  {/*   <a href={`/dashboard/projects/${params.projectId}/calendar`} className="text-gray-700">*/}
                  {/*      Calendar*/}
                  {/*   </a>*/}
                  {/*   <a href={`/dashboard/projects/${params.projectId}/subcontractors`} className="text-gray-700">*/}
                  {/*      Subcontractors*/}
                  {/*   </a>*/}
                  {/*</div>*/}
               {/*</div>*/}
               {/*<div className={'flex flex-wrap w-full gap-4 text-sm'}>*/}
               {/*   /!*<div className="mt-2 flex items-center text-sm text-gray-500">*!/*/}
               {/*   /!*   <InformationCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />*!/*/}
               {/*   /!*   {project.description ?? 'No description'}*!/*/}
               {/*   /!*</div>*!/*/}
               {/*   <div className="mt-2 flex items-center text-xs md:text-small text-gray-500">*/}
               {/*      <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />*/}
               {/*      {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}*/}
               {/*   </div>*/}
               {/*</div>*/}
            </div>
            { isProjectOwner && (
               <div className="divide-y divide-gray-100 mt-5 flex 2xl:ml-4 2xl:mt-0">
               <span className="ml-3 block">
                  {/*<Link href={`/dashboard/projects/${params.projectId}/trade/create`}>*/}
                  {/*   <button*/}
                  {/*      type="button"*/}
                  {/*      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                  {/*   >*/}
                  {/*      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />*/}
                  {/*      Add Task*/}
                  {/*   </button>*/}
                  {/*</Link>*/}
                  <AddTask tradeId={params.tradeId}>
                        <button
                           type="button"
                           className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                           Task
                        </button>
                  </AddTask>
                  {/*<AddTrade projectId={project.id} isProjectOwner={isProjectOwner} />*/}
               </span>
               {/*<span className="ml-3 hidden md:block">*/}
                  {/*<Link href={`/dashboard/projects/${params.projectId}/edit`}>*/}
                  {/*   <button*/}
                  {/*      type="button"*/}
                  {/*      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
                  {/*   >*/}
                  {/*      <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                  {/*      Edit*/}
                  {/*   </button>*/}
                  {/*</Link>*/}
               {/*</span>*/}
                  {/*<HeaderMenu projectId={params.projectId} isProjectOwner={isProjectOwner} />*/}
               </div>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               {/*<TradeHeader project={project} tradeId={params.tradeId} isProjectOwner={isProjectOwner} />*/}
               <div className={'mt-10'}>
                  { tradeLineItem && <h2 className="text-lg font-semibold leading-7 text-gray-900">{tradeLineItem.trade.name}</h2> }
               </div>
               { tradeLineItem?.tasks && tradeLineItem.tasks.length > 0 ?
                 <div className={'mt-10'}>
                  <h2 className="text-md font-semibold leading-7 text-gray-900">Tasks</h2>
                  <TaskList tasks={tradeLineItem.tasks} isProjectOwner={isProjectOwner} />
               </div>
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
                     <h3 className="mt-2 text-sm font-semibold text-gray-900">No Tasks</h3>
                     <p className="mt-1 text-sm text-gray-500">Get started by adding tasks to this trade.</p>
                     <div className="mt-6">
                        <AddTask tradeId={params.tradeId}>
                           <button
                              type="button"
                              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                           >
                              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                              Add Task
                           </button>
                        </AddTask>
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
            </div>
         </DarkNavContainer>
      </>
   )
}
