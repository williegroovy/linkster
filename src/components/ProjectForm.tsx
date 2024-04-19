'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

type ProjectDetails = {
   name: string;
   description: string;
   country: string;
   address: string;
   city: string;
   state: string;
   postalCode: string;
}
export default function ProjectForm() {
   const router = useRouter();
   const createProject = api.projects.create.useMutation({
      onSuccess: () => {
         router.push('/dashboard/projects');
      }
   });

   const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
      name: '',
      description: '',
      country: 'United States',
      address: '',
      city: '',
      state: '',
      postalCode: ''
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      console.log('e', e.target.name, e.target.value);
      setProjectDetails({
         ...projectDetails,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = async () => {
      await createProject.mutateAsync(projectDetails);
   }

   return (
      <form>
         <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                  <div className="sm:col-span-3">
                     <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Project name
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={projectDetails.name}
                           type="text"
                           name="name"
                           id="name"
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
                           onChange={handleChange}
                           value={projectDetails.description}
                           type="text"
                           name="description"
                           id="description"
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
                           onChange={handleChange}
                           value={projectDetails.address}
                           type="text"
                           name="address"
                           id="address"
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
                           onChange={handleChange}
                           value={projectDetails.city}
                           type="text"
                           name="city"
                           id="city"
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
                           onChange={handleChange}
                           value={projectDetails.state}
                           type="text"
                           name="state"
                           id="state"
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
                           onChange={handleChange}
                           value={projectDetails.postalCode}
                           type="text"
                           name="postalCode"
                           id="postalCode"
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
                           onChange={handleChange}
                           value={projectDetails.country}
                           id="country"
                           name="country"
                           autoComplete="country-name"
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
            <button
               onClick={() => router.back()}
               type="button"
               className="text-sm font-semibold leading-6 text-gray-900"
            >
               Cancel
            </button>
            <button
               type={'button'}
               onClick={handleSubmit}
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               Save
            </button>
         </div>
      </form>
   )
}
