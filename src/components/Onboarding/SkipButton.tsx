'use client';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

export default function SkipButton() {
   const router = useRouter();

   const setOnboarded = api.profiles.setOnboarded.useMutation({
      onSuccess: () => {
         router.push('/dashboard');
         router.refresh();
      }
   });

   const onClick = async () => {
      await setOnboarded.mutateAsync(undefined);
   }

   return (
      <button
         onClick={onClick}
         type="button"
         className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
         Skip
      </button>
   )
}
