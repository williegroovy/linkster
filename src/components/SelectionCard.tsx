type TUser = {
   name: string
   role: string
   imageUrl: string
}

export default function SelectionCard({ user } : { user: TUser }) {
   return (
      <div className="overflow-hidden mb-5 rounded-lg bg-white shadow">
         <h2 className="sr-only" id="profile-overview-title">
            Contractor Profile
         </h2>
         <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
               <div className="sm:flex sm:space-x-5">
                  <div className="flex-shrink-0">
                     <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                     <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                     <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                     <p className="text-sm font-medium text-gray-600">{user.role}</p>
                  </div>
               </div>
               <div className="mt-5 flex justify-center sm:mt-0">
                  <a
                     href="src/app/dashboard#"
                     className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                     Dashboard
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}
