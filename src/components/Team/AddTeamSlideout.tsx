'use client';
import { cloneElement, ReactElement, Fragment, useState, KeyboardEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import TeamCombo from '~/components/Team/TeamCombo';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import TeamCombobox from '~/components/Team/TeamCombobox';

type Member = {
   id: string,
   profile: {
      firstName: string,
      lastName: string,
      address: {
         street: string,
         city: string,
         state: string,
         postalCode: string,
         country: string,
         coordinates: {
            lat: number,
            lng: number
         }
      } | null;
      user: {
         email: string,
         image: string | null
      },
   };
}

export type Team = Array<Member>

export default function AddTeamSlideout({
   children,
   formAction,
   contractors,
   team
} : {
   children: ReactElement,
   formAction: (add: Team, remove: Team) => void,
   contractors: Team,
   team: Team
}) {
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const [selectedTeam, setSelectedTeam] = useState<Team>(team);
   const [addSub, setAddSub] = useState(false);

   const toggle = () => {
      setOpen(!open);
   }

   const save = async () => {
      const add = selectedTeam.filter((member) => !team.some((t) => t.id === member.id));
      const remove = team.filter((member) => !selectedTeam.some((t) => t.id === member.id));

      await formAction(add, remove);
      toggle();
      router.refresh();
   }

   return (
      <>
         <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
               <div className="fixed inset-0" />

               <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Transition.Child
                           as={Fragment}
                           enter="transform transition ease-in-out duration-500 sm:duration-700"
                           enterFrom="translate-x-full"
                           enterTo="translate-x-0"
                           leave="transform transition ease-in-out duration-500 sm:duration-700"
                           leaveFrom="translate-x-0"
                           leaveTo="translate-x-full"
                        >
                           <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 <div className="flex-1">
                                    {/* Header */}
                                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                       <div className="flex items-start justify-between space-x-3">
                                          <div className="space-y-1">
                                             <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Team
                                             </Dialog.Title>
                                             <p className="text-sm text-gray-500">
                                                Manage your team members and subcontractors
                                             </p>
                                          </div>
                                          <div className="flex h-7 items-center">
                                             <button
                                                type="button"
                                                className="relative text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                             >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                       <div>
                                          <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                                       </div>
                                       <div className="sm:col-span-2">
                                          <div className="flex space-x-2">
                                             {team.map((member) => (
                                                <img
                                                   className="inline-block h-8 w-8 rounded-full"
                                                   src={member.profile.user.image ?? ''}
                                                   alt={`${member.profile.firstName} ${member.profile.lastName}`}
                                                   referrerPolicy={'no-referrer'}
                                                   key={member.id}
                                                />
                                             ))}

                                             <button
                                                type="button"
                                                onClick={() => setAddSub(!addSub)}
                                                className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                             >
                                                <span className="absolute -inset-2" />
                                                <span className="sr-only">Add team member</span>
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                             </button>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Divider container */}
                                    { addSub &&
                                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                       {/* Team members */}
                                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                             <div>
                                                <h3 className="text-sm font-medium leading-6 text-gray-900">Edit Team</h3>
                                             </div>
                                             <div className={'col-span-2'}>
                                                <TeamCombo contractors={contractors} selected={selectedTeam} setSelected={setSelectedTeam} />
                                             </div>
                                          </div>
                                       </div>
                                    }
                                 </div>

                                 {/* Action buttons */}
                                 <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <div className="flex justify-end space-x-3">
                                       <button
                                          type="button"
                                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                          onClick={() => setOpen(false)}
                                       >
                                          Cancel
                                       </button>
                                       <button
                                          type="button"
                                          onClick={save}
                                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       >
                                          Save
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
         {children && cloneElement(children, { onClick: toggle })}
      </>
   )
}
