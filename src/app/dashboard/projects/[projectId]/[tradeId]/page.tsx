import { api } from '~/trpc/server';
import LineItems from '../LineItems';
import ProjectHeader from '~/app/dashboard/projects/[projectId]/ProjectHeader';
import Calendar from '~/app/dashboard/projects/[projectId]/Calendar';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';

export default async function ProjectPage({ params } : { params: { projectId: string, tradeId: string } }) {

   const project = await api.projects.get({ projectId: params.projectId });

   const lineItem = await api.trades.listLineItems({ projectId: params.projectId });

   console.log('lineItem', lineItem);

   return project && (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} />
               <div className={'mt-10'}>
                  <LineItems />
                  <Calendar />
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
