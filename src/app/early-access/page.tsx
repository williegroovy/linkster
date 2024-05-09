import { api } from '~/trpc/server';
import router from 'next/navigation';

export default function EarlyAccess({ searchParams } : { searchParams: { plan: string }}) {
   const plan = searchParams.plan || null;

   const createBetaSignup = async function(formData: FormData) {
      'use server'

      const email = formData.get('email') as string | null;

      if(email) {
         await api.signup.betaSignup({ email, plan });
         router.redirect(`/early-access-success`);

      }

   }

   return (
      <div className="bg-white py-16 sm:py-24">
         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
               <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  We're launching soon!
               </h2>
               <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                  Sign up today for early access and 50% discount on all plans.
               </p>
               <form action={createBetaSignup} className="mx-auto mt-10 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                     Email address
                  </label>
                  <input
                     id="email-address"
                     name="email"
                     type="email"
                     autoComplete="email"
                     required
                     className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                     placeholder="Enter your email"
                  />
                  <button
                     type="submit"
                     className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                     Sign up
                  </button>
               </form>
               <svg
                  viewBox="0 0 1024 1024"
                  className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                  aria-hidden="true"
               >
                  <defs>
                     <radialGradient
                        id="759c1415-0410-454c-8f7c-9a820de03641"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(512 512) rotate(90) scale(512)"
                     >
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                     </radialGradient>
                  </defs>
               </svg>
            </div>
         </div>
      </div>
   )
}
