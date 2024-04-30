import ProjectForm from '~/components/ProjectForm';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import { api } from '~/trpc/server';
import router from 'next/navigation';
import Link from 'next/link';


type Project = {
   name: string;
   description: string;
   country: string;
   address: string;
   city: string;
   state: string;
   postalCode: string;
}

export default async function EditProject({ params } : { params: { projectId: string }}) {
   const project = await api.projects.get({ projectId: params.projectId });

   const updateProject = async function(formData: FormData) {
      'use server'


      const name = formData.get('name') as string | null;
      const description = formData.get('description') as string | null;
      const country = formData.get('country') as string | null;
      const address = formData.get('address') as string | null;
      const city = formData.get('city') as string | null;
      const state = formData.get('state') as string | null;
      const postalCode = formData.get('postalCode') as string | null;

      if(name && description && country && address && city && state && postalCode) {
         const projectUpdate: Project = {
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

   return (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">Project Information</h1>
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               {/*<ProjectForm />*/}
               { project &&
                  <form action={updateProject}>
                  <div className="space-y-12">
                     <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                           <div className="sm:col-span-3">
                              <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">
                                 Project name
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={project.name}
                                    autoComplete="none"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>

                           <div className="sm:col-span-3">
                              <label htmlFor="project-description" className="block text-sm font-medium leading-6 text-gray-900">
                                 Project description
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    defaultValue={project.description ?? ''}
                                    autoComplete="none"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>

                           <div className="sm:col-span-4">
                              <h2 className="block text-md font-medium leading-6 text-gray-900">Project Address</h2>
                           </div>

                           <div className="col-span-full">
                              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                 Street address
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    defaultValue={project.address?.street ?? ''}
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>

                           <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                 City
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    defaultValue={project.address?.city ?? ''}
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>

                           <div className="sm:col-span-2">
                              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                 State / Province
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    defaultValue={project.address?.state ?? ''}
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>

                           <div className="sm:col-span-2">
                              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                 ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    defaultValue={project.address?.postalCode ?? ''}
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                 />
                              </div>
                           </div>
                           <div className="sm:col-span-2">
                              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                 Country
                              </label>
                              <div className="mt-2">
                                 <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    defaultValue={project.address?.country ?? ''}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                 >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href={`/dashboard/projects/${params.projectId}`}>
                        <button
                           type="button"
                           className="text-sm font-semibold leading-6 text-gray-900"
                        >
                           Cancel
                        </button>
                    </Link>
                     <button
                        type={'submit'}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Save
                     </button>
                  </div>
               </form>
               }
            </div>
         </DarkNavContainer>
      </>
   )
}
