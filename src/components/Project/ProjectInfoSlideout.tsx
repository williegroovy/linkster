'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import Map from '~/components/Map';

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
      postalCode: string,
      coordinates: {
         lat: number,
         lng: number
      } | null
   } | null,
}

export default function ProjectInfoSlideout({ children, project } : { children: ReactElement, project: ProjectData }) {
   const [open, setOpen] = useState(false);

   const toggle = () => {
      setOpen(!open);
   }

   const lat = project.address?.coordinates?.lat;
   const lng = project.address?.coordinates?.lng;

   const address = project.address ? `${project.address.street}, ${project.address.city}, ${project.address.state} ${project.address.postalCode}` : '';

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
                                                Project Information
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

                                    { lat && lng && <Map lat={lat} lng={lng} /> }
                                    {/* Divider container */}
                                    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                       {/* Project name */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Project name
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             {project.name}
                                          </div>
                                       </div>

                                       {/* Project description */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="description"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Description
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             {project.description || ''}
                                          </div>
                                       </div>
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Address
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <Link className={'underline'} href={`https://www.google.com/maps/search/?api=1&query=${address}`} target="_blank" rel="noreferrer">
                                                {address}
                                             </Link>
                                          </div>
                                       </div>

                                       {/* Team members */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <div className="flex space-x-2">
                                                {team.map((person) => (
                                                   <a
                                                      key={person.email}
                                                      href={person.href}
                                                      className="flex-shrink-0 rounded-full hover:opacity-75"
                                                   >
                                                      <img
                                                         className="inline-block h-8 w-8 rounded-full"
                                                         src={person.imageUrl}
                                                         alt={person.name}
                                                      />
                                                   </a>
                                                ))}

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
