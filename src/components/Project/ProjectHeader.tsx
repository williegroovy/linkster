import {
   CheckIcon,
   LinkIcon,
   MapPinIcon,
   PencilIcon,
} from '@heroicons/react/20/solid'

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import HeaderMenu from '~/components/Project/HeaderMenu';

type Project = {
   id: string;
   name: string;
   description: string | null;
   address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
   } | null;
};

export default function ProjectHeader({ project } : { project: Project }) {
   return (
      <div className="xl:flex xl:items-center xl:justify-between">
         <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
               { project.name }
            </h2>
            <div className="mt-1 flex flex-col xl:mt-0 xl:flex-row xl:flex-wrap xl:space-x-6">
               <div className="mt-2 flex items-center text-sm text-gray-500">
                  <InformationCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {project.description ?? 'No description'}
               </div>
               <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {project?.address?.street}, {project?.address?.city}, {project?.address?.state} {project?.address?.postalCode}
               </div>
               {/*<div className="mt-2 flex items-center text-sm text-gray-500">*/}
               {/*   <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />*/}
               {/*   Closing on January 9, 2020*/}
               {/*</div>*/}
            </div>
         </div>
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
               <a
                  href={`/dashboard/projects/${project.id}/trades`}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Add Trade
               </a>
            </span>

            <HeaderMenu />
         </div>
      </div>
   )
}
