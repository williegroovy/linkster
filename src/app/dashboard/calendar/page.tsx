import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Calendar from '~/components/Project/Calendar';

export default async function CalendarPage() {

   return (
      <>
         <DarkNavHeader title={'Calendar'} />
         <DarkNavContainer>
            <div className={'px-4 sm:px-6 lg:px-8'}>
               <div className={'mt-10'}>
                  <Calendar />
               </div>
            </div>
         </DarkNavContainer>
      </>
   )
}
