import DarkNavContainer from '~/components/DarkNav/Container';
import DarkNavHeader from '~/components/DarkNav/Header';
import Calendar from '~/components/Project/Calendar';

export default async function CalendarPage() {

   return (
      <>
         <DarkNavHeader>
            <div className="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
               <h1 className="text-base font-semibold leading-7 text-gray-900">Calendar</h1>
            </div>
         </DarkNavHeader>
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
