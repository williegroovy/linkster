import DropdownMenu from '~/components/Project/DropdownMenu';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';
import StatusMenu from '~/components/Project/Trade/StatusMenu';
function classNames(...classes: Array<string | undefined | boolean>) {
   return classes.filter(Boolean).join(' ')
}

type Task = {
   id: string;
   description: string;
   status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
   dueDate: Date | null;
   createdAt: Date;
   updatedAt: Date | null;
}

export default function TaskList({ tasks, projectId, tradeId, isProjectOwner } : { tasks?: Task[], projectId: string, tradeId?: string, isProjectOwner: boolean }) {

   const onDeleteTask = async (id: string) => {
      'use server';
      await api.projects.deleteTradeTask({ taskId: id });
      redirect(`/dashboard/projects/${projectId}/trade/${tradeId}`);
   }

   return (
      <ul role="list" className="mb-10 divide-y divide-gray-100">
         {tasks?.map(({ id, description, status }) => (
            <li key={id} className="flex items-center justify-between gap-x-6 py-5">
               <div className="flex flex-col">
                  <div className="min-w-0">
                     <div className="flex items-start">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{description}</p>
                     </div>
                     <div className="mt-1 flex items-center gap-x-1 text-xs leading-5 text-gray-500">
                        {/*<p className="whitespace-nowrap">*/}
                        {/*   Due on <time dateTime={'10:00am'}>{'05/05/24'}</time>*/}
                        {/*</p>*/}
                        {/*<svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">*/}
                        {/*   <circle cx={1} cy={1} r={1} />*/}
                        {/*</svg>*/}
                        <p className="truncate">Assigned to {'user'}</p>
                     </div>
                  </div>
                  <div className={'mt-3'}>
                     <StatusMenu />
                  </div>
               </div>
               <div className="flex flex-none items-center gap-x-4">
                  { isProjectOwner && <DropdownMenu id={id} name={description} onDelete={onDeleteTask} /> }
               </div>
            </li>
         ))}
      </ul>
   )
}
