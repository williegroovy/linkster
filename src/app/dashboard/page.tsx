import ProfileCreation from '~/components/Onboarding/ProfileCreation';
import { getServerAuthSession } from '~/server/auth';
import Steps from '~/components/Onboarding/Steps';
import { redirect } from 'next/navigation';
import ContractorProfileCreation from '~/components/Onboarding/ContractorProfileCreation';
import ServiceAreaCreation from '~/components/Onboarding/ServiceAreaCreation';

export default async function DashboardPage({ searchParams } : { searchParams: { step: string } }) {
   const serverSession = await getServerAuthSession();


   const currentStep = parseInt(searchParams.step);
   if((!serverSession?.user?.profile || !serverSession?.user?.profile?.onboarded) && !currentStep) {
      redirect('/dashboard?step=1');
   }

   // TODO:
   // Set up database to track onboarding progress
   // Create logic to determine if all steps are completed
   // The users might user a link to navigate ahead and check thing.
   // Either block that or support custom logic.
   if(!serverSession?.user?.profile || !serverSession?.user?.profile?.onboarded) {
      return (
         <>
            <Steps currentStep={currentStep} />
            { currentStep === 1 && <ProfileCreation /> }
            { currentStep === 2 && <ContractorProfileCreation /> }
            { currentStep === 3 && <ServiceAreaCreation /> }
         </>
      )
   }

   return (
      <div className="px-4 sm:px-6 lg:px-8">Dashboard</div>
   )
}

