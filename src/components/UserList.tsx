import UserSlideout from '~/components/Team/UserSlideout';

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

type Users = Array<Contractor>

export default function UserList({ users } : { users: Users }) {
   const userInitials = (firstName: string, lastName: string) => {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`
   }

   return (
      <>
         <ul role="list" className="divide-y divide-gray-100">
            {users?.map((user) => (
               <UserSlideout user={user.profile}>
                  <li key={user.id} className="flex gap-x-4 py-5">
                     { user.profile?.user.image ?
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.profile.user.image} alt="profile-image" referrerPolicy={'no-referrer'} />
                        : <div className="h-12 w-12 flex-none rounded-full bg-gray-50">{userInitials(user.profile.firstName, user.profile.lastName)}</div>
                     }
                     <div className="min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.profile.firstName} {user.profile.lastName}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.profile.user.email}</p>
                     </div>
                  </li>
               </UserSlideout>
            ))}
         </ul>
      </>
   )
}
