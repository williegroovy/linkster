import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '~/components/Project/TradeItems';
import { getServerAuthSession } from '~/server/auth';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import HeaderMenu from '~/components/Project/HeaderMenu';
import Link from 'next/link';
import { PencilIcon, ChatBubbleLeftIcon, InformationCircleIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import ProjectSlideout from '~/components/Project/ProjectSlideout';
import router from 'next/navigation';
import TradeSlideout from '~/components/Project/Trade/TradeSlideout';
import ProjectInfoSlideout from '~/components/Project/ProjectInfoSlideout';
import ChatSlideout from '~/components/ChatSlideout';
import PhotoSlideout from '~/components/Project/PhotoSlideout';

export default async function ProjectPage({ params, searchParams } : { params: { projectId: string }, searchParams?: { [key: string]: string } }) {
   const serverSession = await getServerAuthSession();

   const project = await api.projects.get({ projectId: params.projectId });
   const contractors = await api.projects.listContractors();
   const trades = await api.trades.list();

   const selected = project?.trades.map(({ trade }) => trade) ?? [];

   const isProjectOwner = project?.contractorId === serverSession?.user?.profile?.contractorProfile?.id;

   const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []
   const initials = serverSession?.user.name.split(' ').map((n) => n[0]).join('');

   const createTrade = async function(tradeId: string, tasks: Array<{ description: string }> = []) {
      'use server'
      await api.projects.addTrade({ projectId: params.projectId, tradeId, tasks });
   };

   // const getLatLong = async function(address: string) {
   //    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
   //    const json = await res.json();
   //    console.log('json', json.results[0].geometry.location);
   //    return json.results[0].geometry.location;
   // }

   // console.log('addressString', addressString);
   // if(addressString) {
   //    getLatLong(addressString).then(console.log).catch(console.error);
   // }

   const updateProject = async function(formData: FormData) {
      'use server'

      const name = formData.get('name') as string | null;
      const description = formData.get('description') as string | null;
      const country = 'United States'
      const address = formData.get('address') as string | null;
      const city = formData.get('city') as string | null;
      const state = formData.get('state') as string | null;
      const postalCode = formData.get('postalCode') as string | null;

      if(name && description && country && address && city && state && postalCode) {
         const projectUpdate = {
            projectId: params.projectId,
            name,
            description,
            country,
            address,
            city,
            state,
            postalCode
         }

         await api.projects.update(projectUpdate);

         router.redirect(`/dashboard/projects/${params.projectId}`);
      }

   }

   return project && (
      <>
         <DarkNavHeader>
            <div className="flex flex-col flex-wrap items-start gap-3 px-4 sm:px-6 lg:px-8">
               <div className="flex flex-wrap gap-y-2 gap-x-1 md:gap-x-3 items-center">
                  <Link className={'md:hidden'} href={'/dashboard/projects'}>
                     <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                  </Link>
                  <h1 className="text-base font-semibold leading-7 text-indigo-600">{project.name}</h1>
                  <div className={'hidden md:flex gap-x-2'}>
                     {/*<ProjectInfoSlideout project={project}>*/}
                     {/*   <InformationCircleIcon className="h-6 w-6 flex-shrink-0 text-gray-600" aria-description={'project information'} />*/}
                     {/*</ProjectInfoSlideout>*/}
                     <ProjectInfoSlideout project={project}>
                        <MapPinIcon className="h-6 w-6 flex-shrink-0 text-gray-600" aria-description={'project information'} />
                     </ProjectInfoSlideout>
                     { /* TODO: Update to photo slide out, or add some other UI */ }
                     { isProjectOwner &&
                        <PhotoSlideout projectId={project.id} images={project.images}>
                           <PhotoIcon className="h-6 w-6 flex-shrink-0 text-gray-600" aria-description={'project photos'} />
                        </PhotoSlideout>
                     }
                  </div>
                  {/*<div className="hidden md:flex order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">*/}
                  {/*   <Link href={`/dashboard/projects/${params.projectId}/chat`} className="text-gray-700">*/}
                  {/*      Chat*/}
                  {/*   </Link>*/}
                  {/*   <Link href={`/dashboard/projects/${params.projectId}/calendar`} className="text-gray-700">*/}
                  {/*      Calendar*/}
                  {/*   </Link>*/}
                  {/*   <Link href={`/dashboard/projects/${params.projectId}/subcontractors`} className="text-gray-700">*/}
                  {/*      Subcontractors*/}
                  {/*   </Link>*/}
                  {/*</div>*/}
               </div>
               <div className={'flex flex-wrap w-full gap-x-2 mt-2 md:gap-x-4 text-xs'}>
                  <p className={'text-md text-gray-600'}>
                     {project.description ?? 'No description'}
                  </p>
               </div>
            </div>

            <div className="flex md:hidden divide-y divide-gray-100 gap-x-4 md:mt-5 2xl:ml-4 2xl:mt-0">
               <ProjectInfoSlideout project={project}>
                  <MapPinIcon className="h-8 w-8 flex-shrink-0 text-gray-600" aria-description={'project information'} />
               </ProjectInfoSlideout>
               <ChatSlideout initials={initials} imageUrl={serverSession?.user.image} chatId={project.chat}>
                  <ChatBubbleLeftIcon className="h-8 w-8 flex-shrink-0 text-gray-600" aria-hidden="true" />
               </ChatSlideout>
               { /* TODO: Update to photo slide out, or add some other UI */ }
               <PhotoSlideout projectId={project.id} images={project.images}>
                  <PhotoIcon className="h-8 w-8 flex-shrink-0 text-gray-600" aria-description={'project photos'} />
               </PhotoSlideout>
               <ProjectSlideout formAction={updateProject} formData={project}>
                  <PencilIcon className="h-8 w-8 flex-shrink-0 text-gray-600" aria-hidden="true" />
               </ProjectSlideout>
            </div>

            { isProjectOwner && (
               <div className="hidden md:flex divide-y divide-gray-100 md:mt-5 2xl:ml-4 2xl:mt-0">
                  <span className="ml-3">
                     <TradeSlideout formAction={createTrade} projectId={params.projectId} trades={trades}>
                        <button
                           type="button"
                           className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           Add Trade
                        </button>
                     </TradeSlideout>
                     {/*<AddTrade projectId={project.id} isProjectOwner={isProjectOwner} />*/}
                  </span>
                  <span className="ml-3 hidden md:block">
                     <ProjectSlideout formAction={updateProject} formData={project}>
                        <button
                           type="button"
                           className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                           <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                           Edit
                        </button>
                     </ProjectSlideout>
                  </span>
                  <div className={'mt-2 md:mt-0 border-none'}>
                     <HeaderMenu projectId={params.projectId} isProjectOwner={isProjectOwner} />
                  </div>
               </div>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'md:hidden'}>
               <TradeSlideout formAction={createTrade} projectId={params.projectId} trades={trades}>
                  <button className="fixed bottom-4 right-4 rounded-full bg-indigo-600 p-4 text-white">
                     <PlusIcon className="h-6 w-6" />
                  </button>
               </TradeSlideout>
            </div>
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
                           <TradeSlideout formAction={createTrade} projectId={params.projectId} trades={trades}>
                              <button
                                    key={'button'}
                                    // onClick={toggle}
                                    // href={`/dashboard/projects/${project.id}?createTrade=true`}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                 >
                                    <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    Add Trade
                                 </button>
                           </TradeSlideout>
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
