import type { ReactNode } from 'react';

export default function DarkNavHeader({ children } : { children?: ReactNode }) {
   return (
      <header className="bg-white shadow-sm">
         <div className="flex justify-between mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            { children && children }
         </div>
      </header>
   )
}
