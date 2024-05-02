'use client';

import { cloneElement, ReactElement, Fragment, KeyboardEvent, useState } from 'react';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export default function AddTask({ tradeId, isProjectOwner = false, children } : { tradeId: string, isProjectOwner?: boolean, children?: ReactElement }) {
   const router = useRouter();
   const [dialogOpen, setDialogOpen] = useState(false);
   const [description, setDescription] = useState<string>('');
   const [createdTasks, setCreatedTasks] = useState<string[]>([]);

   const createTask = api.projects.addTradeTask.useMutation({
      // onSuccess: () => {
      //    router.refresh();
      //    setDialogOpen(false);
      // }
   });

   const handleSubmit = async (description: string) => {
      await createTask.mutateAsync({ tradeId, description });
   }

   const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
         setCreatedTasks([...createdTasks, description]);
         setDescription('');
         await handleSubmit(description);
      }
   }

   const toggle = () => {
      setDialogOpen(!dialogOpen);
      router.refresh();
   }

   return [
      <Transition.Root key={'dialog'} show={dialogOpen} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={toggle}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl min-h-[40vh] sm:p-6">
                        <div>
                           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                           </div>
                           <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                 Add Trade
                              </Dialog.Title>
                              <div className="mt-2">
                                 <div className="flex justify-between">
                                    <label htmlFor="task-description" className="block text-sm font-medium leading-6 text-gray-900">
                                       Trade Task Description
                                    </label>
                                 </div>
                                 <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                    <input
                                       type="text"
                                       name="task-description"
                                       id="task-description"
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                       onKeyDown={handleOnKeyDown}
                                       className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       placeholder="Trade task description"
                                       aria-describedby="trade-task"
                                    />
                                    <button
                                       type="button"
                                       onClick={() => handleSubmit(description)}
                                       className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md p-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                       <PlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                       Add
                                    </button>
                                 </div>
                                 {/*{ trades && trades.length > 0 && <TradeComboBox projectId={projectId} listItems={trades} setTradeId={setTradeId} /> }*/}
                                 { createdTasks.length > 0 &&
                                   <ul role="list" className="mb-10 divide-y divide-gray-100">
                                      {createdTasks?.map((description, idx) => (
                                         <li key={`${idx}-${description}`} className="flex items-center justify-between gap-x-6 py-5">
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
                                                  <p className="truncate">Assigned to {'user'}</p>
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
                        </div>
                        <div className="fixed bottom-5 left-5 right-5 mt-5 sm:mt-6">
                           <button
                              type="button"
                              onClick={toggle}
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                           >
                              Go back to dashboard
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>,
      children && cloneElement(children, { onClick: toggle, key: 'button' })
   ]
}
