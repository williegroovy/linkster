'use client';

import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'

type Contractor = {
   id: string,
   profile: {
      firstName: string,
      lastName: string,
      address: {
         street: string,
         city: string,
         state: string,
         postalCode: string,
         country: string,
         coordinates: {
            lat: number,
            lng: number
         }
      } | null;
      user: {
         email: string,
         image: string | null
      },
   };
}

type Contractors = Array<Contractor>

export default function TeamCombo({ contractors, selected, setSelected } : { contractors: Contractors, selected: Contractors, setSelected: (contractors: Contractors) => void }) {
   const [query, setQuery] = useState('')

   console.log('selected', selected);
   const filteredPeople =
      query === ''
         ? contractors
         : contractors.filter((contractor) => {
            const name = `${(contractor.profile?.firstName ?? '').toLowerCase()} ${(contractor.profile?.lastName ?? '').toLowerCase()}`;
            return name.includes(query.toLowerCase())
         })

   return contractors && contractors.length > 0 && (
      // @ts-ignore
      <Combobox as="div" by={'id'} value={selected} onChange={setSelected} multiple>
         <div className="relative mt-2">
            <Combobox.Input
               className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               onChange={(event) => setQuery(event.target.value)}
               displayValue={(person: Contractor) => `${person?.profile?.firstName ?? ''} ${person?.profile?.lastName ?? ''}`}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>

            {filteredPeople.length > 0 && (
               <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredPeople.map((contractor) => (
                     <Combobox.Option
                        key={contractor.id}
                        value={contractor}
                        className={({ active }) =>
                           classNames(
                              'relative cursor-default select-none py-2 pl-3 pr-9',
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                           )
                        }
                     >
                        {({ active, selected }) => (
                           <>
                             <div className="flex items-center">
                                { contractor.profile?.user?.image ? <img src={contractor.profile.user.image} alt="" referrerPolicy={'no-referrer'} className="h-6 w-6 flex-shrink-0 rounded-full" /> : <div className={'h-6 w-6'}/>}
                                 <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>
                                    {contractor.profile?.firstName} {contractor.profile?.lastName}
                                 </span>
                              </div>

                              {selected && (
                                 <span
                                    className={classNames(
                                       'absolute inset-y-0 right-0 flex items-center pr-4',
                                       active ? 'text-white' : 'text-indigo-600'
                                    )}
                                 >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                              )}
                           </>
                        )}
                     </Combobox.Option>
                  ))}
               </Combobox.Options>
            )}
         </div>
      </Combobox>
   )
}
