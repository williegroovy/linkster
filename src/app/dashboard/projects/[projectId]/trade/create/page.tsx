import { api } from '~/trpc/server';
import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import TradeForm from '~/components/TradeForm';
import ComboBox from '~/components/ComboBox';
import TradeComboBox from '~/components/Project/Trade/TradeComboBox';
import TradeCreation from '~/components/Project/Trade/TradeCreation';

export default async function CreateProject({ params } : { params: { projectId: string } }) {
   // const project = await api.projects.get({ projectId: params.projectId });
   const trades = await api.trades.list();

   return (
      <>
         <DarkNavHeader title={'Trade Line Items'} />
         <DarkNavContainer>
            <div>
               <h2 className="text-base font-semibold leading-7 text-gray-900">Add Trade</h2>

               <TradeCreation projectId={params.projectId} />
            </div>
         </DarkNavContainer>
      </>
   )
}
