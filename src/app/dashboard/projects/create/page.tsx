import { getServerAuthSession } from '~/server/auth';
import ProjectForm from '~/components/ProjectForm';
import ContractorForm from '~/components/ContractorForm';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';


export default async function CreateProject() {
   const serverSession = await getServerAuthSession();
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
