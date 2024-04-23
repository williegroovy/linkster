'use client';
import { KeyboardEvent, useState } from 'react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import ContractorList from '~/components/Project/ContractorList';

export default function TradeCreation({ projectId, isProjectOwner = false }: { projectId: string, isProjectOwner?: boolean }) {
   const router = useRouter();
   const [tasks, setTasks] = useState<string[]>([]);
   const [description, setDescription] = useState<string>('');
   const [tradeId, setTradeId] = useState<string | null>(null);

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
         { tradeId &&
           <>
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
             <div className={'mt-2'}>
                {tasks.map(task => <div key={task}>{task}</div>)}
             </div>
              { isProjectOwner && contractors && <ContractorList projectId={projectId} contractors={contractors} selected={selectedSubs} /> }
           </>
         }
      </div>
   )
}
