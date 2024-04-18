'use client';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

export default function TradeForm() {
   const router = useRouter();

   const createTrade = api.trades.create.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );
   const [tradeName, setTradeName] = useState<string>('');

   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTradeName(e.target.value);
   };

   const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
         await createTrade.mutateAsync({ name: tradeName });
      }
   }

   return (
      <div>
         <label htmlFor="trade" className="block text-sm font-medium leading-6 text-gray-900">
            Trade Name
         </label>
         <div className="mt-2">
            <input
               onKeyDown={handleOnKeyDown}
               onChange={handleOnChange}
               type="text"
               name="trade"
               id="trade"
               value={tradeName}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
               placeholder="you@example.com"
            />
         </div>
      </div>
   )
}
