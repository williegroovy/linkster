import { api } from '~/trpc/server';
import TeamListButton from '~/components/Team/TeamListButton';

type TeamMember = {
   id: string
   profile: {
      user: {
         id: string,
         email: string,
         image: string | null
      },
      firstName: string,
      lastName: string
   } | null;
}

type TeamMembers = Array<TeamMember> | undefined;

export default function TeamList({ team } : { team: TeamMembers }) {
   return (
      <div>
         <ul role="list" className="divide-y divide-gray-100">
            {team && team.length > 0 && team?.map((member) => (
               <li key={member?.profile?.user.email} className="flex items-center justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                     { member?.profile?.user.image ?
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={member?.profile?.user.image} alt="" />
                        : <div className={'h-12 w-12 flex-none rounded-full bg-gray-50'} />
                     }
                     <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{member?.profile?.firstName} {member?.profile?.lastName}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{member?.profile?.user.email}</p>
                     </div>
                  </div>
                  <TeamListButton id={member.id}>Remove</TeamListButton>
               </li>
            ))}
         </ul>
         <a
            href="#"
            className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
         >
            View all
         </a>
      </div>
   )
}
