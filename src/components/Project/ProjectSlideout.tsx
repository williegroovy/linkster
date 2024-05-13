'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import TeamCombo from '~/components/Team/TeamCombo';

type ProjectData = {
   name: string,
   description: string | null,
   address: {
      street: string,
      city: string,
      state: string,
      postalCode: string
   } | null,
}

type Contractor = {
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

type TeamContractor = {
   contractor: Contractor
}

type Team = Array<TeamContractor>
export type Contractors = Array<Contractor>

export default function ProjectSlideout({ children, formData, formAction, team, contractors } : { children: ReactElement, formData?: ProjectData, formAction: (formData: FormData) => void, team: Team, contractors: Contractors }) {
   const [open, setOpen] = useState(false);
   const [addSub, setAddSub] = useState(false);

   const currentTeam = team?.map((member) => member.contractor) ?? [];
   
   const [selectedTeam, setSelectedTeam] = useState<Contractors>(currentTeam); // Current team

   // const { data: contractors } = api.projects.listContractors.useQuery();

   const toggle = () => {
      setOpen(!open);
   }

   const handleSubmit = (formSubmission: FormData) => {
      const teamIds = selectedTeam.map((member) => member.id).join(',');
      formSubmission.append('team', teamIds);
      formAction(formSubmission);
      toggle();
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
                              <form action={handleSubmit} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 <div className="flex-1">
                                    {/* Header */}
                                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                       <div className="flex items-start justify-between space-x-3">
                                          <div className="space-y-1">
                                             <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                { formData ? 'Project Information' : 'New project' }
                                             </Dialog.Title>
                                             {/*<p className="text-sm text-gray-500">*/}
                                             {/*   Get started by filling in the information below to create your new project.*/}
                                             {/*</p>*/}
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

                                    {/* Divider container */}
                                    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                       {/* Project name */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Project name
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={formData?.name ?? ''}
                                             />
                                          </div>
                                       </div>

                                       {/* Project description */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="description"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Description
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                              <textarea
                                                 id="description"
                                                 name="description"
                                                 rows={3}
                                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                 defaultValue={formData?.description ?? ''}
                                              />
                                          </div>
                                       </div>
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                Street address
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={formData?.address?.street ?? ''}
                                             />
                                          </div>
                                       </div>
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="city"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                City
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={formData?.address?.city ?? ''}
                                             />
                                          </div>
                                       </div>
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="region"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                State (2-letter code)
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                maxLength={2}
                                                style={{ textTransform: 'uppercase' }}
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={formData?.address?.state ?? ''}
                                             />
                                          </div>
                                       </div>
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <label
                                                htmlFor="postalCode"
                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                             >
                                                ZIP / Postal code
                                             </label>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <input
                                                type="text"
                                                name="postalCode"
                                                id="postalCode"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={formData?.address?.postalCode ?? ''}
                                             />
                                          </div>
                                       </div>

                                       {/* Team members */}
                                       <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                          <div>
                                             <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                                          </div>
                                          <div className="sm:col-span-2">
                                             <div className="flex space-x-2">
                                                {team?.map((member) => (
                                                   <img
                                                      className="inline-block h-8 w-8 rounded-full"
                                                      src={member.contractor.profile.user.image ?? ''}
                                                      alt={`${member.contractor.profile.firstName} ${member.contractor.profile.lastName}`}
                                                      referrerPolicy={'no-referrer'}
                                                      key={member.contractor.id}
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
                                       { addSub && contractors &&
                                         <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                            {/* Team members */}
                                           <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                             <div />
                                             <div className={'col-span-2'}>
                                               <TeamCombo contractors={contractors} selected={selectedTeam} setSelected={setSelectedTeam} />
                                             </div>
                                           </div>
                                         </div>
                                       }
                                    </div>
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
                                          type="submit"
                                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                       >
                                          { formData ? 'Save' : 'Create' }
                                       </button>
                                    </div>
                                 </div>
                              </form>
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
