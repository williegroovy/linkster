import ProfileForm from '~/components/Onboarding/ProfileForm';
import { getServerAuthSession } from '~/server/auth';

export default async function ProfileCreation() {
   const serverSession = await getServerAuthSession();

   return (
      <div className="bg-white">
         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
               Welcome!
            </p>
         </div>
         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Let&apos;s get started by creating your profile
         </p>
         <div className="mx-auto mt-2 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-10 sm:gap-y-0 lg:max-w-4xl">
            <ProfileForm profile={serverSession?.user?.profile} email={serverSession?.user.email}/>
         </div>
      </div>
   )
}
