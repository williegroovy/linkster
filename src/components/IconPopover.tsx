'use client';

import { ReactNode } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'


export default function IconPopOver({ children, icon } : { children: ReactNode, icon: ReactNode }) {
   return (
      <Popover className="relative max-width-screen">
         <>
            <Popover.Button className={'focus:outline-none'}>
               {icon}
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Transition
               as={Fragment}
               enter="transition ease-out duration-200"
               enterFrom="opacity-0 translate-y-1"
               enterTo="opacity-100 translate-y-0"
               leave="transition ease-in duration-150"
               leaveFrom="opacity-100 translate-y-0"
               leaveTo="opacity-0 translate-y-1"
            >
               <Popover.Panel className="bg-white fixed left-5 p-5 rounded-md z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
                  {children}
               </Popover.Panel>
            </Transition>
         </>
      </Popover>
   )
}
