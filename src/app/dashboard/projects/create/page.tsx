import ProjectForm from '~/components/ProjectForm';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';


export default async function CreateProject() {
   return (
      <>
         <DarkNavHeader title={'Project Information'} />
         <DarkNavContainer>
            <ProjectForm />
         </DarkNavContainer>
      </>
   )
}
