import DropdownMenu from '~/components/Project/DropdownMenu';

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

export default function TaskList({ tasks, isProjectOwner } : { tasks?: Task[], isProjectOwner: boolean }) {
   return (
      <ul role="list" className="mb-10 divide-y divide-gray-100">
         {tasks?.map(({ id, description, status }) => (
            <li key={id} className="flex items-center justify-between gap-x-6 py-5">
               <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                     <p className="text-sm font-semibold leading-6 text-gray-900">{description}</p>
                     <p
                        className={classNames(
                           'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                        )}
                     >
                        {status}
                     </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                     <p className="whitespace-nowrap">
                        Due on <time dateTime={'10:00am'}>{'05/05/24'}</time>
                     </p>
                     <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                        <circle cx={1} cy={1} r={1} />
                     </svg>
                     <p className="truncate">Assigned to {'user'}</p>
                  </div>
               </div>
               <div className="flex flex-none items-center gap-x-4">
                  {/*{ isProjectOwner && <DropdownMenu id={id} trade={trade} projectId={projectId} /> }*/}
               </div>
            </li>
         ))}
      </ul>
   )
}
