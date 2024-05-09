'use client';
import { ReactNode, useState, cloneElement } from 'react';
import DeleteConfirmDialog from '~/components/DeleteConfirmDialog';

export default function DeleteConfirmation({ id, name, onDelete, children } : { id: string, name: string, onDelete: (id: string) => void, children: ReactNode }) {
   const [open, setOpen] = useState(false);

   const confirmDelete = async () => {
      await onDelete(id);
      setOpen(false);
   }


   return (
      <>
         <DeleteConfirmDialog open={open} setOpen={setOpen} confirm={confirmDelete} name={name} />
         { children && cloneElement(children as any, { onClick: () => setOpen(true) }) }
      </>
   )
}
