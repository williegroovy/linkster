'use client';

import { KeyboardEvent, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

function classNames(...classes: Array<string | boolean | undefined>) {
   return classes.filter(Boolean).join(' ')
}


type ListItem = {
   id: string;
   name: string;
}

type ListItems = Array<ListItem>;

export default function ComboBox({ projectId, listItems, selected }: { projectId: string, listItems: ListItems, selected?: ListItems }) {
   const router = useRouter();


   const [query, setQuery] = useState('')
   const [selectedItems, setSelectedItems] = useState<ListItems>(selected ?? []);

   const addTrade = api.projects.addTrade.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const removeTrade = api.projects.removeTrade.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const createTrade = api.trades.create.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const filteredListItems =
      query === ''
         ? listItems
         : listItems?.filter((listItem) => {
            return listItem?.name.toLowerCase().includes(query.toLowerCase())
         }) ?? listItems

   const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
         console.log('query', query);

         console.log('filteredListItems', filteredListItems);
         if(filteredListItems.length === 0) {
            console.log('key down enter', e.currentTarget.value);
            const tradeLineItem = await createTrade.mutateAsync({ name: query });
            await addTrade.mutateAsync({ projectId, tradeId: tradeLineItem.id });
            setQuery('');
            setSelectedItems([...selectedItems, tradeLineItem]);
         }
      }
   }

   const handleOnChange = async (newListItems: ListItems) => {

      setSelectedItems(newListItems);

      const add = newListItems?.filter((listItem) => {
         return !selectedItems?.includes(listItem);
      });

      const remove = selectedItems?.filter((listItem) => {
         return !newListItems?.includes(listItem);
      });

      if(add && add.length > 0 && add[0]?.id) {
         const trade = await addTrade.mutateAsync({ projectId, tradeId: add[0].id });

      }

      if(remove && remove.length > 0 && remove[0]?.id) {
         await removeTrade.mutateAsync({ projectId, tradeId: remove[0].id });
      }
   }


   return (
      <Combobox className={'mb-10'} as="div" by={'id'} value={selectedItems} onChange={handleOnChange} multiple>
         <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Create or add trade</Combobox.Label>
         <div className="relative mt-2">
            <Combobox.Input
               className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               onChange={(event) => setQuery(event.target.value)}
               onKeyDown={handleOnKeyDown}
               displayValue={(listItem: ListItem) => listItem?.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>

            { filteredListItems && filteredListItems.length > 0 && (
               <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredListItems?.map((item) => (
                     <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                           classNames(
                              'relative cursor-default select-none py-2 pl-3 pr-9',
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                           )
                        }
                     >
                        {({ active, selected }) => (
                           <>
                              <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

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
