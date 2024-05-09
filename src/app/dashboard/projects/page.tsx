import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { api } from '~/trpc/server';
import ProjectMenu from '~/components/ProjectMenu';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import router from 'next/navigation'
import ProjectSlideout from '~/components/Project/ProjectSlideout';
import { ChatBubbleLeftIcon, CalendarIcon, InformationCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getServerAuthSession } from '~/server/auth';
import ChatSlideout from '~/components/ChatSlideout';
import CalendarSlideout from '~/components/CalendarSlideout';
import ProjectInfoSlideout from '~/components/Project/ProjectInfoSlideout';

const discussions = [
   {
      id: 1,
      title: 'Atque perspiciatis et et aut ut porro voluptatem blanditiis?',
      href: '#',
      author: { name: 'Leslie Alexander', href: '#' },
      date: '2d ago',
      dateTime: '2023-01-23T22:34Z',
      status: 'active',
      totalComments: 24,
      commenters: [
         {
            id: 12,
            name: 'Emma Dorsey',
            imageUrl:
               'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 6,
            name: 'Tom Cook',
            imageUrl:
               'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 4,
            name: 'Lindsay Walton',
            imageUrl:
               'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
               'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 23,
            name: 'Hector Gibbons',
            imageUrl:
               'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
      ],
   },
   {
      id: 2,
      title: 'Et ratione distinctio nesciunt recusandae vel ab?',
      href: '#',
      author: { name: 'Michael Foster', href: '#' },
      date: '2d ago',
      dateTime: '2023-01-23T19:20Z',
      status: 'active',
      totalComments: 6,
      commenters: [
         {
            id: 13,
            name: 'Alicia Bell',
            imageUrl:
               'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
               'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 3,
            name: 'Dries Vincent',
            imageUrl:
               'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
      ],
   },
   {
      id: 3,
      title: 'Blanditiis perferendis fugiat optio dolor minus ut?',
      href: '#',
      author: { name: 'Dries Vincent', href: '#' },
      date: '3d ago',
      dateTime: '2023-01-22T12:59Z',
      status: 'resolved',
      totalComments: 22,
      commenters: [
         {
            id: 19,
            name: 'Lawrence Hunter',
            imageUrl:
               'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 21,
            name: 'Angela Fisher',
            imageUrl:
               'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 14,
            name: 'Jenny Wilson',
            imageUrl:
               'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
               'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
      ],
   },
   {
      id: 4,
      title: 'Voluptatum ducimus voluptatem qui in eum quasi consequatur vel?',
      href: '#',
      author: { name: 'Lindsay Walton', href: '#' },
      date: '5d ago',
      dateTime: '2023-01-20T10:04Z',
      status: 'resolved',
      totalComments: 8,
      commenters: [
         {
            id: 10,
            name: 'Emily Selman',
            imageUrl:
               'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 11,
            name: 'Kristin Watson',
            imageUrl:
               'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
      ],
   },
   {
      id: 5,
      title: 'Perferendis cum qui inventore ut excepturi nostrum occaecati?',
      href: '#',
      author: { name: 'Courtney Henry', href: '#' },
      date: '5d ago',
      dateTime: '2023-01-20T20:12Z',
      status: 'active',
      totalComments: 15,
      commenters: [
         {
            id: 11,
            name: 'Kristin Watson',
            imageUrl:
               'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 6,
            name: 'Tom Cook',
            imageUrl:
               'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 10,
            name: 'Emily Selman',
            imageUrl:
               'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
         {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
               'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
         },
      ],
   },
]


export default async function ProjectsPage() {
   const serverSession = await getServerAuthSession();
   const projects = await api.projects.list();
   const contractor = await api.projects.listSubcontractorProjects();

   const initials = serverSession?.user.name.split(' ').map((n) => n[0]).join('');

   const onDeleteProject = async (projectId: string) => {
      'use server';
      await api.projects.delete({ projectId });
      router.redirect('/dashboard/projects');
   }

   const createProject = async function(formData: FormData) {
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
            name,
            description,
            country,
            address,
            city,
            state,
            postalCode
         }

         const newProject = await api.projects.create(projectUpdate);
         router.redirect(`/dashboard/projects/${newProject.id}`);
      }

   }

   return (
      <>
         <DarkNavHeader>
            { projects && projects.length > 0 && (
               <>
                  <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                     <h1 className="text-base font-semibold leading-7 text-gray-900">Projects</h1>
                  </div>
                  <div className="flex flex-wrap items-center sm:flex-nowrap">
                     <ProjectSlideout formAction={createProject} >
                        <button
                           className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           New project
                        </button>
                     </ProjectSlideout>

                  </div>
               </>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'md:hidden'}>
               <ProjectSlideout formAction={createProject} >
                  <button className="fixed bottom-4 right-4 rounded-full bg-indigo-600 p-4 text-white">
                     <PlusIcon className="h-6 w-6" />
                  </button>
               </ProjectSlideout>
            </div>
            { projects && projects.length > 0 ? (
               <div className={'px-4 sm:px-6 lg:px-8'}>
                  <ul role="list" className="divide-y divide-gray-100">
                     {projects.map((project, idx) => (
                        <li
                           key={project.id}
                           className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
                        >
                           <div>
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                 <Link href={`/dashboard/projects/${project.id}`} className="underline md:no-underline	hover:underline">
                                    {project.name}
                                 </Link>
                              </p>
                              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                 <p>
                                    {project.description}
                                 </p>
                                 {/*<svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">*/}
                                 {/*   <circle cx={1} cy={1} r={1} />*/}
                                 {/*</svg>*/}
                                 {/*<p>*/}
                                 {/*   <time dateTime={discussion.dateTime}>{discussion.date}</time>*/}
                                 {/*</p>*/}
                              </div>
                           </div>
                           <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                              <div className="flex -space-x-0.5">
                                 <dt className="sr-only">Commenters</dt>
                                 {discussions?.[idx]?.commenters.map((commenter) => (
                                    <dd key={commenter.id}>
                                       <img
                                          className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                                          src={commenter.imageUrl}
                                          alt={commenter.name}
                                       />
                                    </dd>
                                 ))}
                              </div>
                              <div className="flex gap-x-2.5">
                                 <dt>
                                    <span className="sr-only">Chat</span>
                                    <ChatSlideout initials={initials} imageUrl={serverSession?.user.image} chatId={project.chat}>
                                       <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                    </ChatSlideout>
                                 </dt>
                                 {/*<dt>*/}
                                 {/*   <span className="sr-only">Calendar</span>*/}
                                 {/*   <CalendarSlideout>*/}
                                 {/*      <CalendarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />*/}
                                 {/*   </CalendarSlideout>*/}
                                 {/*</dt>*/}
                                 <dt>
                                    <span className="sr-only">Information</span>
                                    <ProjectInfoSlideout project={project}>
                                       <MapPinIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-description={'project information'} />
                                    </ProjectInfoSlideout>
                                 </dt>
                              </div>
                           </dl>
                        </li>
                     ))}
                  </ul>
               </div>
               // <div className={'px-4 sm:px-6 lg:px-8'}>
               //    <div className={'md:mt-10'}>
               //       <h2 className="text-base font-semibold leading-7 text-gray-900">My Projects</h2>
               //       <ul role="list" className="divide-y divide-gray-100">
               //          {projects.map((project) => (
               //             <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
               //                <div className="min-w-0">
               //                   <div className="flex items-start gap-x-3">
               //                      <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
               //                   </div>
               //                   <div className="mt-1 flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-2 text-xs md:leading-5 text-gray-500">
               //                      <p>
               //                         {project.description}
               //                      </p>
               //                      <svg viewBox="0 0 2 2" className="hidden h-0.5 w-0.5 fill-current md:block">
               //                         <circle cx={1} cy={1} r={1} />
               //                      </svg>
               //                      <p className="whitespace-nowrap">
               //                         {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}
               //                      </p>
               //                   </div>
               //                </div>
               //                <div className="flex flex-none items-center gap-x-4">
               //                   <Link
               //                      href={`/dashboard/projects/${project.id}`}
               //                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
               //                   >
               //                      Manage<span className="sr-only">, {project.name}</span>
               //                   </Link>
               //                   <ProjectMenu projectName={project.name} projectId={project.id} deleteProject={onDeleteProject} />
               //                </div>
               //             </li>
               //          ))}
               //       </ul>
               //    </div>
               // </div>
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
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                  <div className="mt-6">
                     <Link href="/dashboard/projects/create">
                        <button
                           type="button"
                           className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                           <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                           New Project
                        </button>
                     </Link>
                  </div>
               </div>
               )
            }
            {contractor && contractor?.subContractedProjects?.map((subProjects) => (
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <div className={'mt-20'}>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Subcontractor Projects</h2>
                  <ul role="list" className="divide-y divide-gray-100">
                     <li key={subProjects.project.id} className="flex items-center justify-between gap-x-6 py-5">
                        <div className="min-w-0">
                           <div className="flex items-start gap-x-3">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{subProjects.project.name}</p>
                           </div>
                           <div className="mt-1 flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-2 text-xs md:leading-5 text-gray-500">
                              <p>
                                 {subProjects.project.description}
                              </p>
                              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current hidden md:block">
                                 <circle cx={1} cy={1} r={1} />
                              </svg>
                              <p className="whitespace-nowrap">
                                 {subProjects.project?.address?.street}, {subProjects.project?.address?.city}, {subProjects.project?.address?.state} {subProjects.project?.address?.postalCode}
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                           <Link
                              href={`/dashboard/projects/${subProjects.project.id}`}
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                           >
                              View<span className="sr-only">, {subProjects.project.name}</span>
                           </Link>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
            ))}
         </DarkNavContainer>
      </>
   )
}
