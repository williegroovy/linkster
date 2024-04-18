import { getServerAuthSession } from '~/server/auth';
import ProjectForm from '~/app/dashboard/projects/create/ProjectForm';
import ContractorForm from '~/app/dashboard/projects/create/ContractorForm';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';


export default async function CreateProject() {
   const serverSession = await getServerAuthSession();
   console.log(serverSession?.user?.profile)
   if(!serverSession?.user?.profile?.contractorProfile) {
      return <ContractorForm />
   }

   return (
      <>
         <DarkNavHeader title={'Project Information'} />
         <DarkNavContainer>
            <ProjectForm />
         </DarkNavContainer>
      </>
   )
}
