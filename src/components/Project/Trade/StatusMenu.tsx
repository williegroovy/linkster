'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

type Status = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

const publishingOptions: Array<{ title: string, value: Status, description: string, current: boolean }> = [
   { title: 'Not Started', value: 'NOT_STARTED', description: 'This job posting can be viewed by anyone who has the link.', current: true },
   { title: 'In Progress', value: 'IN_PROGRESS', description: 'This job posting will no longer be publicly accessible.', current: false },
   { title: 'Completed', value: 'COMPLETED', description: 'This job posting will no longer be publicly accessible.', current: false },
   { title: 'Blocked', value: 'BLOCKED', description: 'This job posting will no longer be publicly accessible.', current: false },
]

function classNames(...classes: Array<string | boolean | undefined>) {
   return classes.filter(Boolean).join(' ')
}

export default function StatusMenu() {
   const [selected, setSelected] = useState( { title: 'Not Started', value: 'NOT_STARTED', description: 'This job posting can be viewed by anyone who has the link.', current: true })

   return (
      <Listbox value={selected} onChange={setSelected}>
         {({ open }) => (
            <>
               <Listbox.Label className="sr-only">Change published status</Listbox.Label>
               <div className="relative">
                  <div className="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm">
                     <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-600 px-3 py-2 text-white shadow-sm">
                        <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        <p className="text-sm font-semibold">{selected.title}</p>
                     </div>
                     <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-600 p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                        <span className="sr-only">Change published status</span>
                        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                     </Listbox.Button>
                  </div>

                  <Transition
                     show={open}
                     as={Fragment}
                     leave="transition ease-in duration-100"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <Listbox.Options className="absolute z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {publishingOptions.map((option) => (
                           <Listbox.Option
                              key={option.title}
                              className={({ active }) =>
                                 classNames(
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'cursor-default select-none p-4 text-sm'
                                 )
                              }
                              value={option}
                           >
                              {({ selected, active }) => (
                                 <div className="flex flex-col">
                                    <div className="flex justify-between">
                                       <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                                       {selected ? (
                                          <span className={active ? 'text-white' : 'text-indigo-600'}>
                                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                           </span>
                                       ) : null}
                                    </div>
                                    <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                                       {option.description}
                                    </p>
                                 </div>
                              )}
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </Transition>
               </div>
            </>
         )}
      </Listbox>
   )
}
