'use client';

import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

function classNames(...classes: Array<string | boolean | undefined>) {
   return classes.filter(Boolean).join(' ')
}

type Contractor = {
   id: string
   profile: {
      user: {
         id: string,
         email: string,
         image: string | null
      },
      firstName: string,
      lastName: string
   } | null;
}

type Contractors = Array<Contractor>

export default function ContractorList({ contractors, selected, type } : { contractors: Contractors, selected: Contractors, type: 'team' | 'subcontractor' }) {
   const router = useRouter();
   const [query, setQuery] = useState('')
   const [selectedItems, setSelectedItems] = useState<Contractors>(selected)

   const addTeamMember = api.team.addTeamMember.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const removeTeamMember = api.team.removeTeamMember.useMutation(
      {
         onSuccess: () => {
            setSelectedItems([]);
            router.refresh();
         }
      }
   );

   const addSubcontractor = api.team.addSubcontractor.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const removeSubcontractor = api.team.addSubcontractor.useMutation(
      {
         onSuccess: () => {
            setSelectedItems([]);
            router.refresh();
         }
      }
   );


   const handleOnChange = async (newItems: Contractors) => {
      setSelectedItems(newItems);

      const add = newItems?.filter((listItem) => {
         return !selectedItems?.includes(listItem);
      });

      const remove = selectedItems?.filter((listItem) => {
         return !newItems?.includes(listItem);
      });

      if(add && add.length > 0 && add[0]?.id) {
         setQuery('');
         if(type === 'team') {
            await addTeamMember.mutateAsync({ contractorId: add[0].id });
         } else {
            await addSubcontractor.mutateAsync({ contractorId: add[0].id });
         }

      }

      if(remove && remove.length > 0 && remove[0]?.id) {
         if(type === 'team') {
            await removeTeamMember.mutateAsync({ contractorId: remove[0].id });
         } else {
            await removeSubcontractor.mutateAsync({ contractorId: remove[0].id });

         }
      }
   }

   const filteredPeople =
      query === ''
         ? contractors
         : contractors.filter((contractor) => {
            const name = `${(contractor.profile?.firstName ?? '').toLowerCase()} ${(contractor.profile?.lastName ?? '').toLowerCase()}`;
            return name.includes(query.toLowerCase())
         })



   return contractors && contractors.length > 0 && (
      // @ts-ignore
      <Combobox as="div" by={'id'} value={selectedItems} onChange={handleOnChange} multiple>
         <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned Subcontractors</Combobox.Label>
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
