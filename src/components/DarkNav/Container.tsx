import { ReactNode } from 'react';
import classNames from 'classnames';

export default function DarkNavContainer({ children, className } : { children: ReactNode, className?: string }) {
   return (
      <main>
         <div className={classNames(className, "mx-auto max-w-7xl py-6 sm:px-6 lg:px-8")}>{children}</div>
      </main>
   )
}
