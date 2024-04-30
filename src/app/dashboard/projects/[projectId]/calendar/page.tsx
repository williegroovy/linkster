import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Calendar from '~/components/Project/Calendar';
import { api } from '~/trpc/server';

export default async function CalendarPage({ params } : { params: { projectId: string } }) {
   const project = await api.projects.get({ projectId: params.projectId });

   return project && (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">
                  <a href={`/dashboard/projects/${params.projectId}`}>{project.name}</a>
               </h1>
               <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                  <a href={`/dashboard/projects/${params.projectId}/chat`} className="text-gray-700">
                     Chat
                  </a>
                  <a href={`/dashboard/projects/${params.projectId}/calendar`} className="text-indigo-600">
                     Calendar
                  </a>
                  <a href={`/dashboard/projects/${params.projectId}/subcontractors`} className="text-indigo-600">
                     Subcontractors
                  </a>
               </div>
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <div className={'mt-10'}>
                  <Calendar />
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
