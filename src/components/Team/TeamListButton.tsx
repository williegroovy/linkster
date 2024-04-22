'use client';
import { type ReactNode } from 'react';
import { api } from '~/trpc/react';

export default function TeamListButton({ id, children } : { id: string, children: ReactNode }) {
   const removeTeamMember = api.team.removeTeamMember.useMutation();

   const onClick = async () => {
      await removeTeamMember.mutateAsync({ contractorId: id });
   }

   return (
      <button
         onClick={onClick}
         className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
         {children}
      </button>
   );
}
