'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import PlusButton from '~/components/Onboarding/PlusButton';
import ComboBox from '~/components/Onboarding/ComboBox';
import Badges from '~/components/Onboarding/Badges';

type ContractorProfile = {
   companyName?: string;
   address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
   }
   trades: Array<{
      id: string;
      name: string;
   }>;
   serviceAreas: Array<{
      id: string;
      name: string;
      city: string;
      state: string;
      postalCode: string;
   }>
} | undefined;

type ServiceArea = {
   name: string;
   city: string;
   state: string;
   postalCode: string;
   country: string;
   serviceRange: string;
}


type ListItem = {
   id: string;
   name: string;
}

type ListItems = Array<ListItem>;

const defaultServiceArea = {
   name: '',
   city: '',
   state: '',
   postalCode: '',
   country: 'United States',
   serviceRange: ''
}

export default function ContractorForm({ contractorProfile, tradesList } : { contractorProfile?: ContractorProfile, tradesList: ListItems }) {
   const router = useRouter();

   const setOnboarded = api.profiles.setOnboarded.useMutation({
      onSuccess: () => {
         router.push('/dashboard');
         router.refresh();
      }
   });

   const addServiceArea = api.profiles.addServiceAreas.useMutation({
      onSuccess: () => {
         setOnboarded.mutate(undefined);
      }
   });

   const [serviceAreaDetails, setServiceAreaDetails] = useState<Array<ServiceArea>>([defaultServiceArea]);

   const addServiceAreaForm = () => {
      setServiceAreaDetails([
         ...serviceAreaDetails,
         defaultServiceArea
      ]);
   }

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
      const items = [...serviceAreaDetails];
      if(items[index]) {
         // @ts-ignore
         items[index] = {
            ...items[index],
            [e.target.name]: e.target.value
         }
      }
      setServiceAreaDetails(items);
   }

   const handleSubmit = async () => {
      await addServiceArea.mutateAsync({ serviceAreas: serviceAreaDetails });
   }

   return (
      <form>
         <ComboBox listItems={tradesList} selected={contractorProfile?.trades} />
         <h2 className="text-base font-semibold leading-7 text-gray-900">Trade(s)</h2>
         <Badges list={contractorProfile?.trades} />

         <div className="mt-10 space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
               <h2 className="text-base font-semibold leading-7 text-gray-900">Service Area(s)</h2>
               { serviceAreaDetails?.map((serviceArea, index) =>
                  <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-12">
                     <div className="sm:col-span-3">
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                           Service Area Name
                        </label>
                        <div className="mt-2">
                           <input
                              onChange={(e) => handleChange(e, index)}
                              value={serviceArea.name}
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="none"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                        </div>
                     </div>

                     <div className="col-span-full">
                        <h3 className="text-md font-semibold leading-7 text-gray-900">Location</h3>
                     </div>

                     <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                           City
                        </label>
                        <div className="mt-2">
                           <input
                              onChange={(e) => handleChange(e, index)}
                              value={serviceArea.city}
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
                              onChange={(e) => handleChange(e, index)}
                              value={serviceArea.state}
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
                              onChange={(e) => handleChange(e, index)}
                              value={serviceArea.postalCode}
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
                              onChange={(e) => handleChange(e, index)}
                              value={serviceArea.country}
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


                     <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                           Service Range (miles)
                        </label>
                        <div className="mt-2">
                           <input
                              onChange={(e) => handleChange(e, index)}
                              type="text"
                              name="serviceRange"
                              id="serviceRange"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           />
                        </div>
                     </div>
                  </div>
               )}
               <div className="mt-10 text-center sm:col-span-6">
                  <PlusButton onClick={addServiceAreaForm} />
                  <h3 className="mt-2 text-sm font-semibold leading-6 text-gray-900">Add another service area</h3>
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
               { contractorProfile?.serviceAreas && contractorProfile.serviceAreas.length > 0 ? 'Update': 'Save' }
            </button>
         </div>
      </form>
   )
}
