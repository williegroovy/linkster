'use client';
import { KeyboardEvent, useState } from 'react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import ContractorList from '~/components/Project/ContractorList';
import TradeContractorList from '~/components/Project/Trade/TradeContractorList';
import TaskList from '~/components/Project/Trade/TaskList';
import Link from 'next/link';

export default function TradeCreation({ projectId, isProjectOwner = false }: { projectId: string, isProjectOwner?: boolean }) {
   const router = useRouter();
   const [tasks, setTasks] = useState<string[]>([]);
   const [description, setDescription] = useState<string>('');
   const [tradeId, setTradeId] = useState<string | null>(null);
   const [sub, setSub] = useState<string | null>(null);

   const { data: project } = api.projects.get.useQuery({ projectId });
   const { data: trades } = api.trades.list.useQuery();
   const { data: contractors } = api.projects.listContractors.useQuery();

   const selectedSubs = project?.subContractors?.map(({ contractor }) => ({ id: contractor.id, profile: contractor.profile })) ?? []

   const createTask = api.projects.addTradeTask.useMutation({
      onSuccess: () => {
         router.refresh();
      }
   });

   const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
         if(tradeId) {
            setTasks([...tasks, description]);
            await createTask.mutateAsync({ tradeId, description });
            setDescription('');
         }
      }
   }


   return (
      <div>
         { trades && <TradeComboBox setTradeId={setTradeId} projectId={projectId} listItems={trades} /> }
         { isProjectOwner && contractors && tradeId && <TradeContractorList projectId={projectId} tradeId={tradeId} contractors={contractors} setSelected={setSub} /> }
         { tradeId &&
           <div className={'mt-10'}>
               <div className="flex justify-between">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                     Trade Task Description
                  </label>
                  <span className="text-sm leading-6 text-gray-500" id="email-optional">
                Optional
              </span>
               </div>
               <div className="mt-2">
                  <input
                     type="text"
                     name="description"
                     id="description"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     onKeyDown={handleOnKeyDown}
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     placeholder="Trade task description"
                     aria-describedby="trade-task"
                  />
               </div>
               <div className={'overflow-y-auto mt-2'}>
                {/*{tasks.map(task => <div key={task}>{task}</div>)}*/}
                { tasks &&
                  <ul role="list" className="mb-10 divide-y divide-gray-100">
                     {tasks?.map((description) => (
                        <li key={description} className="flex items-center justify-between gap-x-6 py-5">
                           <div className="min-w-0">
                              <div className="flex items-start gap-x-3">
                                 <p className="text-sm font-semibold leading-6 text-gray-900">{description}</p>
                              </div>
                              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                 <p className="whitespace-nowrap">
                                    Due on <time dateTime={'10:00am'}>{'05/05/24'}</time>
                                 </p>
                                 <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1} />
                                 </svg>
                                 { sub && <p className="truncate">Assigned to {sub}</p> }
                              </div>
                           </div>
                           <div className="flex flex-none items-center gap-x-4">
                              {/*{ isProjectOwner && <DropdownMenu id={id} trade={trade} projectId={projectId} /> }*/}
                           </div>
                        </li>
                     ))}
                  </ul>
                }
             </div>
           </div>
         }
         <div className={'mt-10 w-full flex flex-col gap-y-6'}>
            { tradeId &&
              <Link href={`/dashboard/projects/${projectId}/trade/${tradeId}`}>
                  <button
                     key={'button'}
                     className="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     View Trade
                  </button>
               </Link>
            }
            <Link href={`/dashboard/projects/${projectId}`}>
               <button
                  key={'button'}
                  className="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  Back to Project
               </button>
            </Link>
         </div>
      </div>
   )
}
