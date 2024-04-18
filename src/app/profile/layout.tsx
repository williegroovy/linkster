import '~/styles/globals.css'
import { type Metadata } from 'next'
import { BellIcon, UserCircleIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
   title: {
      template: '%s - TaxPal',
      default: 'TaxPal - Accounting made simple for small businesses',
   },
   description:
      'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const secondaryNavigation = [
   { name: 'Contractor Profile', href: '#', icon: UserCircleIcon, current: true },
   { name: 'Hiring Profile', href: '#', icon: UsersIcon, current: false },
]

function classNames(...classes: Array<string>) {
   return classes.filter(Boolean).join(' ')
}

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {

   return (
      <div className={'w-full'}>{children}</div>
   );
   // return (
   //    <div className={'w-full'}>
   //       <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
   //             <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
   //                <div className="flex flex-1 items-center gap-x-6">
   //                   <img
   //                      className="h-8 w-auto"
   //                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
   //                      alt="Your Company"
   //                   />
   //                </div>
   //                <div className="flex flex-1 items-center justify-end gap-x-8">
   //                   <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
   //                      <span className="sr-only">View notifications</span>
   //                      <BellIcon className="h-6 w-6" aria-hidden="true" />
   //                   </button>
   //                   <a href="#" className="-m-1.5 p-1.5">
   //                      <span className="sr-only">Your profile</span>
   //                      <img
   //                         className="h-8 w-8 rounded-full bg-gray-800"
   //                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
   //                         alt=""
   //                      />
   //                   </a>
   //                </div>
   //             </div>
   //          </header>
   //       <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
   //          <h1 className="sr-only">General Settings</h1>
   //
   //          <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
   //             <nav className="flex-none px-4 sm:px-6 lg:px-0">
   //                <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
   //                   {secondaryNavigation.map((item) => (
   //                      <li key={item.name}>
   //                         <a
   //                            href={item.href}
   //                            className={classNames(
   //                               item.current
   //                                  ? 'bg-gray-50 text-indigo-600'
   //                                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
   //                               'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
   //                            )}
   //                         >
   //                            <item.icon
   //                               className={classNames(
   //                                  item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
   //                                  'h-6 w-6 shrink-0'
   //                               )}
   //                               aria-hidden="true"
   //                            />
   //                            {item.name}
   //                         </a>
   //                      </li>
   //                   ))}
   //                </ul>
   //             </nav>
   //          </aside>
   //
   //          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
   //             {children}
   //          </main>
   //       </div>
   //    </div>
   // )
}
