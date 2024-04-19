'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

type FormData = {
   firstName: string
   lastName: string
   email: string
   country: string
   street: string
   city: string
   state: string
   postalCode: string
}

type Profile = {
   id: string;
   firstName?: string
   lastName?: string
   address?: {
      country?: string
      street?: string
      city?: string
      state?: string
      postalCode?: string
   }
} | undefined;

export default function ProfileForm({ profile, email } : { profile: Profile, email: string | undefined }) {
   const router = useRouter();

   const createProfile = api.profiles.create.useMutation({
      onSuccess: () => {
         router.push('/dashboard?step=2');
      }
   });

   const updateProfile = api.profiles.update.useMutation({
      onSuccess: () => {
         router.push('/dashboard?step=2');
      }
   });

   const [formData, setFormData] = useState<FormData>({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: email || '',
      country: profile?.address?.country || 'United States',
      street: profile?.address?.street || '',
      city: profile?.address?.city || '',
      state: profile?.address?.state || '',
      postalCode: profile?.address?.postalCode || '',
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async () => {
      if(profile) {
         await updateProfile.mutateAsync({ id: profile.id, ...formData });
      } else {
         await createProfile.mutateAsync(formData);
      }
   }

   return (
      <form>
         <div className="space-y-4">
            <div className="border-b border-gray-900/10 pb-6">
               <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
               <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                     <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.firstName}
                           type="text"
                           name="firstName"
                           id="firstName"
                           autoComplete="given-name"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-3">
                     <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.lastName}
                           type="text"
                           name="lastName"
                           id="lastName"
                           autoComplete="family-name"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-4">
                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.email}
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="col-span-full">
                     <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.street}
                           type="text"
                           name="street"
                           id="street"
                           autoComplete="street-address"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                     <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.city}
                           type="text"
                           name="city"
                           id="city"
                           autoComplete="address-level2"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-2">
                     <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.state}
                           type="text"
                           name="state"
                           id="state"
                           autoComplete="address-level1"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-2">
                     <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={formData.postalCode}
                           type="text"
                           name="postalCode"
                           id="postalCode"
                           autoComplete="postal-code"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-3">
                     <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                     </label>
                     <div className="mt-2">
                        <select
                           onChange={handleChange}
                           value={formData.country}
                           id="country"
                           name="country"
                           autoComplete="country-name"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                           <option>United States</option>
                           <option>Canada</option>
                           <option>Mexico</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
               Cancel
            </button>
            <button
               type="button"
               onClick={handleSubmit}
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               { profile ? 'Update' : 'Save' }
            </button>
         </div>
      </form>
   )
}
