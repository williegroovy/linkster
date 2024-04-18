import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeForm from '~/components/TradeForm';
import ComboBox from '~/components/ComboBox';


export default async function CreateProject({ params } : { params: { projectId: string } }) {
   const project = await api.projects.get({ projectId: params.projectId });
   const trades = await api.trades.list();

   console.log('project', project);
   return (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <>
               <div className="mt-10 flex justify-center">
                  <div className="w-1/2">
                     <ComboBox projectId={params.projectId} listItems={trades} selected={project?.trades ?? []} />
                     <TradeForm />
                  </div>
               </div>
               <div className={'flex flex-col mt-10'}>
                  <ul>
                     { project && project?.trades?.map((trade) => (
                        <li key={trade.id}>
                           {trade.name}
                        </li>
                     )) }
                  </ul>
               </div>
            </>
         </DarkNavContainer>
      </>
   )
}
