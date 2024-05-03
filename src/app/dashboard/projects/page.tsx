import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { api } from '~/trpc/server';
import ProjectMenu from '~/components/ProjectMenu';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import router from 'next/navigation'
import ProjectSlideout from '~/components/Project/ProjectSlideout';

export default async function ProjectsPage() {
   const projects = await api.projects.list();
   const contractor = await api.projects.listSubcontractorProjects();

   const onDeleteProject = async (projectId: string) => {
      'use server';
      await api.projects.delete({ projectId });
      router.redirect('/dashboard/projects');
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
                     <Link
                        href="/dashboard/projects/create"
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        New project
                     </Link>

                  </div>
               </>
            )}
         </DarkNavHeader>
         <DarkNavContainer>
            <ProjectSlideout />
            { projects && projects.length > 0 ? (
               <div className={'px-4 sm:px-6 lg:px-8'}>
                  <div className={'md:mt-10'}>
                     <h2 className="text-base font-semibold leading-7 text-gray-900">My Projects</h2>
                     <ul role="list" className="divide-y divide-gray-100">
                        {projects.map((project) => (
                           <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                              <div className="min-w-0">
                                 <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                                 </div>
                                 <div className="mt-1 flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-2 text-xs md:leading-5 text-gray-500">
                                    <p>
                                       {project.description}
                                    </p>
                                    <svg viewBox="0 0 2 2" className="hidden h-0.5 w-0.5 fill-current md:block">
                                       <circle cx={1} cy={1} r={1} />
                                    </svg>
                                    <p className="whitespace-nowrap">
                                       {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex flex-none items-center gap-x-4">
                                 <Link
                                    href={`/dashboard/projects/${project.id}`}
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                 >
                                    Manage<span className="sr-only">, {project.name}</span>
                                 </Link>
                                 <ProjectMenu projectName={project.name} projectId={project.id} deleteProject={onDeleteProject} />
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
