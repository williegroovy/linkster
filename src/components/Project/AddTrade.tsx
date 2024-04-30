'use client';

import { Fragment, useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import { api } from '~/trpc/react';
import TradeCreation from '~/components/Project/Trade/TradeCreation';

export default function AddTrade({ projectId, isProjectOwner = false } : { projectId: string, isProjectOwner?: boolean }) {

   const [dialogOpen, setDialogOpen] = useState(false);

   const toggle = () => {
      setDialogOpen(!dialogOpen);
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
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full min-h-[80vh] sm:max-w-xl sm:p-6">
                        <div>
                           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                           </div>
                           <div className="mt-3 text-center sm:mt-5">
                              <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                 Add Trade
                              </Dialog.Title>
                              <div className="mt-2">
                                 <TradeCreation projectId={projectId} isProjectOwner={isProjectOwner} />
                                 {/*{ trades && trades.length > 0 && <TradeComboBox projectId={projectId} listItems={trades} setTradeId={setTradeId} /> }*/}

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
      <button
         key={'button'}
         onClick={toggle}
         // href={`/dashboard/projects/${project.id}?createTrade=true`}
         className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
         <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
         Add Trade
      </button>
   ]
}
