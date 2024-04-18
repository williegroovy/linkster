import { api } from '~/trpc/server';
import ProjectHeader from '~/components/Project/ProjectHeader';
import Calendar from '~/components/Project/Calendar';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeItems from '../../../../components/Project/TradeItems';
import ComboBox from '~/components/ComboBox';

export default async function ProjectPage({ params } : { params: { projectId: string } }) {
   const project = await api.projects.get({ projectId: params.projectId });
   const trades = await api.trades.list();

   // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
   const selected = project?.trades.map(({ trade }) => trade) ?? []


   return project && (
      <>
         <DarkNavHeader title={'Project Details'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <ProjectHeader project={project} />
               <div className={'mt-10'}>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                  <ComboBox projectId={params.projectId} listItems={trades} selected={selected} />
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  { /* @ts-expect-error */ }
                  <TradeItems projectId={params.projectId} trades={project.trades} />
                  {/*<Calendar />*/}
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
