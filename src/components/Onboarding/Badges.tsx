'use client';

import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export default function Badges({ list } : { list: Array<{  id: string, name: string }> | undefined }) {
   const router = useRouter();

   const removeTrade = api.profiles.removeTrade.useMutation(
      {
         onSuccess: () => {
            router.refresh();
         }
      }
   );

   const handleRemove = async (id: string) => {
      await removeTrade.mutate({ id });
   }

   return list && list.map((data) => (
      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
        {data.name}
         <button onClick={() => handleRemove(data.id)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-red-600/20">
          <span className="sr-only">Remove</span>
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-red-600/50 group-hover:stroke-red-600/75">
            <path d="M4 4l6 6m0-6l-6 6" />
          </svg>
          <span className="absolute -inset-1" />
        </button>
      </span>
   ));
}
