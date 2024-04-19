import DropdownMenu from '~/components/Project/DropdownMenu';

// const statuses = {
//    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
//    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
//    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
// }
// const projects = [
//    {
//       id: 1,
//       name: 'GraphQL API',
//       href: '#',
//       status: 'Complete',
//       createdBy: 'Leslie Alexander',
//       dueDate: 'March 17, 2023',
//       dueDateTime: '2023-03-17T00:00Z',
//    },
//    {
//       id: 2,
//       name: 'New benefits plan',
//       href: '#',
//       status: 'In progress',
//       createdBy: 'Leslie Alexander',
//       dueDate: 'May 5, 2023',
//       dueDateTime: '2023-05-05T00:00Z',
//    },
//    {
//       id: 3,
//       name: 'Onboarding emails',
//       href: '#',
//       status: 'In progress',
//       createdBy: 'Courtney Henry',
//       dueDate: 'May 25, 2023',
//       dueDateTime: '2023-05-25T00:00Z',
//    },
//    {
//       id: 4,
//       name: 'iOS app',
//       href: '#',
//       status: 'In progress',
//       createdBy: 'Leonard Krasner',
//       dueDate: 'June 7, 2023',
//       dueDateTime: '2023-06-07T00:00Z',
//    },
//    {
//       id: 5,
//       name: 'Marketing site redesign',
//       href: '#',
//       status: 'Archived',
//       createdBy: 'Courtney Henry',
//       dueDate: 'June 10, 2023',
//       dueDateTime: '2023-06-10T00:00Z',
//    },
// ]

function classNames(...classes: Array<string | undefined | boolean>) {
   return classes.filter(Boolean).join(' ')
}

export default function TradeItems({ trades, projectId } : { trades: Array<{ id: string, trade: { id: string, name: string } }>, projectId: string }) {
   return (
      <ul role="list" className="mb-10 divide-y divide-gray-100">
         {trades.map(({ id, trade }) => (
            <li key={trade.id} className="flex items-center justify-between gap-x-6 py-5">
               <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                     <p className="text-sm font-semibold leading-6 text-gray-900">{trade.name}</p>
                     <p
                        className={classNames(
                           'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                        )}
                     >
                        {'Need Status'}
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
                  <a
                     href={`/dashboard/projects/${projectId}/${id}`}
                     className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  >
                     View trade<span className="sr-only">, {trade.name}</span>
                  </a>
                  <DropdownMenu id={id} trade={trade} projectId={projectId} />
               </div>
            </li>
         ))}
      </ul>
   )
}
