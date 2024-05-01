'use client';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, EllipsisVerticalIcon, PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import AddTrade from '~/components/Project/AddTrade';
import Link from 'next/link';

function classNames(...classes: Array<string | boolean>) {
   return classes.filter(Boolean).join(' ')
}

export default function HeaderMenu({ projectId, isProjectOwner } : { projectId: string, isProjectOwner: boolean }) {
   return (
      <Menu as="div" className="relative ml-3 md:hidden">
         {/*<Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">*/}
         {/*   More*/}
         {/*   <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
         {/*</Menu.Button>*/}
         <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
         </Menu.Button>

         <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <Menu.Item>
                  {({ active }) => (
                     // <AddTrade projectId={projectId} isProjectOwner={isProjectOwner}>
                     //    <button
                     //       type="button"
                     //       className={classNames(active ? 'bg-gray-100' : '', 'flex block px-4 py-2 text-sm text-gray-700')}
                     //    >
                     //       <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                     //       Add Trade
                     //    </button>
                     // </AddTrade>
                     <Link
                        href={`/dashboard/projects/${projectId}/trade/create`}
                        className={classNames(active ? 'bg-gray-100' : '', 'flex block px-4 py-2 text-sm text-gray-700')}
                     >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Add Trade
                     </Link>
                  )}
               </Menu.Item>
               <Menu.Item>
                  {({ active }) => (
                     <Link
                        href={`/dashboard/projects/${projectId}/edit`}
                        className={classNames(active ? 'bg-gray-100' : '', 'flex block px-4 py-2 text-sm text-gray-700')}
                     >
                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />

                        Edit
                     </Link>
                  )}
               </Menu.Item>
            </Menu.Items>
         </Transition>
      </Menu>
   )
}
