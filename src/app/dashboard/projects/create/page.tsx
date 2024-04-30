import ProjectForm from '~/components/ProjectForm';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';


export default async function CreateProject() {
   return (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">Project Information</h1>
            </div>
         </DarkNavHeader>
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectForm />
            </div>
         </DarkNavContainer>
      </>
   )
}
