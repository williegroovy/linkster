import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { api } from '~/trpc/server';
import ProjectMenu from '~/app/dashboard/projects/ProjectMenu';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';

export default async function ProjectsPage() {
   const projects = await api.projects.list();

   return (
      <>
         <DarkNavHeader title={'Projects'}>
            { projects && projects.length > 0 && (
               <div className="flex flex-wrap items-center sm:flex-nowrap">
                  <a
                     href="/dashboard/projects/create"
                     className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     New project
                  </a>
               </div>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            { projects && projects.length > 0 ? (
               <div className={'px-4 sm:px-6 lg:px-8'}>
                  <div className={'mt-20'}>
                     <ul role="list" className="divide-y divide-gray-100">
                  {projects.map((project) => (
                     <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                        <div className="min-w-0">
                           <div className="flex items-start gap-x-3">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                           </div>
                           <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                              <p>
                                 {project.description}
                              </p>
                              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                 <circle cx={1} cy={1} r={1} />
                              </svg>
                              <p className="whitespace-nowrap">
                                 {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                           <a
                              href={`/dashboard/projects/${project.id}`}
                              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                           >
                              View project<span className="sr-only">, {project.name}</span>
                           </a>
                           <ProjectMenu projectName={project.name} />
                        </div>
                     </li>
                  ))}
               </ul>
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
         </DarkNavContainer>
      </>
   )
}
