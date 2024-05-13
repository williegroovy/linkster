'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import UserInformation, { type User } from '~/components/UserInformation';

export default function UserSlideout({
   children,
   user,
} : {
   children?: ReactElement,
   user: User,
}) {
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
                                    <button
                                       type="button"
                                       className="fixed right-2 top-2 text-gray-100 hover:text-gray-400"
                                       onClick={() => setOpen(false)}
                                    >
                                       <span className="absolute -inset-2.5" />
                                       <span className="sr-only">Close panel</span>
                                       <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                                    </button>
                                    <UserInformation user={user} />
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
