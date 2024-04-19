'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

type ContractorDetails = {
   companyName: string;
   country: string;
   street: string | undefined
   city: string | undefined;
   state: string | undefined;
   postalCode: string | undefined
}

type ContractorProfile = {
   companyName?: string;
   address?: {
      country?: string;
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
   }
} | undefined;

export default function ContractorForm({ contractorProfile } : { contractorProfile?: ContractorProfile }) {
   const router = useRouter();
   const createContractor = api.profiles.createContractor.useMutation({
      onSuccess: () => {
         router.push('/dashboard?step=3');
      }
   });

   const [contractorDetails, setContractorDetails] = useState<ContractorDetails>({
      companyName: contractorProfile?.companyName || '',
      country: contractorProfile?.address?.country || 'United States',
      street: contractorProfile?.address?.street,
      city: contractorProfile?.address?.city,
      state: contractorProfile?.address?.state,
      postalCode: contractorProfile?.address?.postalCode
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setContractorDetails({
         ...contractorDetails,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = async () => {
      await createContractor.mutateAsync(contractorDetails);
   }

   return (
      <form>
         <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
               <h2 className="text-base font-semibold leading-7 text-gray-900">Company Information</h2>

               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                     <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                        Company Name <span className={'text-xs'}>(or personal name)</span>
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={contractorDetails.companyName}
                           type="text"
                           name="companyName"
                           id="companyName"
                           autoComplete="none"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="col-span-full">
                     <h3 className="text-md font-semibold leading-7 text-gray-900">
                        Address <span className={'text-xs'}>(optional)</span>
                     </h3>
                  </div>

                  <div className="col-span-full">
                     <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={contractorDetails.street}
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
                           value={contractorDetails.city}
                           type="text"
                           name="city"
                           id="city"
                           autoComplete="address-level2"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-2">
                     <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                     </label>
                     <div className="mt-2">
                        <input
                           onChange={handleChange}
                           value={contractorDetails.state}
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
                           value={contractorDetails.postalCode}
                           type="text"
                           name="postalCode"
                           id="postalCode"
                           autoComplete="postal-code"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div className="sm:col-span-2">
                     <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                     </label>
                     <div className="mt-2">
                        <select
                           onChange={handleChange}
                           value={contractorDetails.country}
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
            <button
               onClick={() => router.back()}
               type="button"
               className="text-sm font-semibold leading-6 text-gray-900"
            >
               Cancel
            </button>
            <button
               type={'button'}
               onClick={handleSubmit}
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               { contractorProfile ? 'Update': 'Save' }
            </button>
         </div>
      </form>
   )
}
