import {
   LinkIcon,
   MapPinIcon,
   PencilIcon,
} from '@heroicons/react/20/solid'

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import HeaderMenu from '~/components/Project/HeaderMenu';
import AddTrade from '~/components/Project/AddTrade';

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

export default function ProjectHeader({ project, isProjectOwner = false } : { project: Project, isProjectOwner?: boolean }) {
   return (
      <div className="xl:flex xl:items-center xl:justify-between">
         <div className="min-w-0 flex-1">
            {/*<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">*/}
            {/*   { project.name }*/}
            {/*</h2>*/}
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
      </div>
   )
}
