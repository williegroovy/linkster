'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Chat, { TChat } from '~/components/Project/Chat';
import { XMarkIcon } from '@heroicons/react/24/outline';

const team = [
   {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Whitney Francis',
      email: 'whitney.francis@example.com',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Leonard Krasner',
      email: 'leonard.krasner@example.com',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Floyd Miles',
      email: 'floyd.miles@example.com',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
   {
      name: 'Emily Selman',
      email: 'emily.selman@example.com',
      href: '#',
      imageUrl:
         'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   },
]

type ProjectData = {
   name: string,
   description: string | null,
   address: {
      street: string,
      city: string,
      state: string,
      postalCode: string
   } | null,
}

export default function ChatSlideout({ children, imageUrl, initials, chatId } : { children: ReactElement, imageUrl?: string, initials?: string, chatId: string }) {
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
                                                Project Chat
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
                                 </div>
                                 <div className="flex-shrink-0 px-4 py-5 sm:px-6">
                                    <Chat image={imageUrl} chatId={chatId} initials={initials} />
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
