'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import Calendar from '~/components/Project/Calendar';

export default function CalendarSlideout({ children } : { children: ReactElement }) {
   const [open, setOpen] = useState(false);

   const toggle = () => {
      setOpen(!open);
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
                                                Project Calendar
                                             </Dialog.Title>
                                             {/*<p className="text-sm text-gray-500">*/}
                                             {/*   Get started by filling in the information below to create your new project.*/}
                                             {/*</p>*/}
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
                                    <div className="flex-shrink-0 px-4 py-5 sm:px-6">
                                       <Calendar />
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
