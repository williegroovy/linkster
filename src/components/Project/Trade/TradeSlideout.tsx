'use client';
import { cloneElement, ReactElement, Fragment, useState, KeyboardEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import { useRouter } from 'next/navigation';

export default function TradeSlideout({
   children,
   formAction,
   projectId,
   trades
} : {
   children: ReactElement,
   formAction: (tradeId: string, tasks: Array<{ description: string}>) => void,
   projectId: string,
   trades: Array<{ name: string, id: string
}> }) {
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const [tradeId, setTradeId] = useState<string | null>(null);
   const [tasks, setTasks] = useState<Array<{ description: string }>>([]);
   const [description, setDescription] = useState<string>('');

   const toggle = () => {
      setOpen(!open);
      setTasks([]);
   }

   const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
         setTasks([...tasks, { description }]);
         setDescription('');
      }
   }

   const deleteTrade = (id: number) => {
      setTasks(tasks.filter((_, index) => index !== id));
   }

   const saveTrade = async () => {
      if(tradeId) {
         await formAction(tradeId, tasks);
         toggle();
         router.refresh();
      }
   }

   return (
      <>
         <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
               <div className="fixed inset-0" />

               <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Transition.Child
                           as={Fragment}
                           enter="transform transition ease-in-out duration-500 sm:duration-700"
                           enterFrom="translate-x-full"
                           enterTo="translate-x-0"
                           leave="transform transition ease-in-out duration-500 sm:duration-700"
                           leaveFrom="translate-x-0"
                           leaveTo="translate-x-full"
                        >
                           <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 <div className="flex-1">
                                    {/* Header */}
                                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                       <div className="flex items-start justify-between space-x-3">
                                          <div className="space-y-1">
                                             <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Add Trade
                                             </Dialog.Title>
                                             <p className="text-sm text-gray-500">
                                                Add your trade, add tasks, and assign a subcontractor
                                             </p>
                                          </div>
                                          <div className="flex h-7 items-center">
                                             <button
                                                type="button"
                                                className="relative text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                             >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                             </button>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Divider container */}
                                    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                       {/* Project name */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Trade
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             { trades && <TradeComboBox projectId={projectId} listItems={trades} setTradeId={setTradeId} /> }

                                          </div>
                                       </div>

                                       {/* Project description */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="task-description"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Add Tasks
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                              <input
                                                 type="text"
                                                 name="task-description"
                                                 id="task-description"
                                                 value={description}
                                                 onChange={(e) => setDescription(e.target.value)}
                                                 onKeyDown={handleOnKeyDown}
                                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                 placeholder="Trade task description"
                                                 aria-describedby="trade-task"
                                              />
                                          </div>
                                       </div>

                                       { tasks.length > 0 &&
                                         <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                           <fieldset>
                                             <legend className="text-base font-semibold leading-6 text-gray-900">Tasks</legend>
                                             <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                                                {tasks.map(({ description }, idx) => (
                                                   <div key={idx} className="relative flex items-start py-4">
                                                      <div className="min-w-0 flex-1 text-sm leading-6">
                                                         <label htmlFor={`task-${idx}`} className="select-none font-medium text-gray-900">
                                                            {description}
                                                         </label>
                                                      </div>
                                                      {/*<div className="ml-3 flex h-6 items-center">*/}
                                                      {/*   <input*/}
                                                      {/*      id={`task-${idx}`}*/}
                                                      {/*      name={`task-${idx}`}*/}
                                                      {/*      type="checkbox"*/}
                                                      {/*      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
                                                      {/*   />*/}
                                                      {/*</div>*/}
                                                   </div>
                                                ))}
                                             </div>
                                           </fieldset>
                                         </div>
                                       }

                                       {/* Team members */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <h3 className="text-sm font-medium leading-6 text-gray-900">Subcontractor</h3>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <div className="flex space-x-2">
                                                <button
                                                   type="button"
                                                   className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                   <span className="absolute -inset-2" />
                                                   <span className="sr-only">Add team member</span>
                                                   <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Action buttons */}
                                 <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <div className="flex justify-end space-x-3">
                                       <button
                                          type="button"
                                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                          onClick={() => setOpen(false)}
                                       >
                                          Cancel
                                       </button>
                                       <button
                                          type="button"
                                          onClick={saveTrade}
                                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       >
                                          Create
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
         {children && cloneElement(children, { onClick: toggle })}
      </>
   )
}
