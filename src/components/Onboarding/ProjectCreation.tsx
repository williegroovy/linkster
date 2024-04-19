import NewProjectButton from '~/components/Onboarding/NewProjectButton';
import SkipButton from '~/components/Onboarding/SkipButton';

export default async function ContractorProfileCreation() {

   return (
      <div className="bg-white">
         <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
               Ready to start?
            </p>
         </div>
         <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Let&apos;s create your first project
         </p>
         <div className={'flex justify-center mt-10'}>
            <NewProjectButton />
         </div>
         <div className={'flex justify-center mt-10'}>
            <SkipButton />
         </div>
      </div>
   )
}
