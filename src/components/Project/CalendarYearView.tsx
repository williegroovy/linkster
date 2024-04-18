import CalendarHeader from '~/components/Project/CalendarHeader';


function classNames(...classes: Array<string | boolean | undefined>) {
   return classes.filter(Boolean).join(' ')
}

type Months = Array<{
   name: string;
   days: Array<{
      date: string;
      isToday?: boolean;
      isCurrentMonth?: boolean;
   }>;
}>;

export default function CalendarYearView({ months } : { months: Months }) {
   return (
      <div className="bg-white">
         <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
            {months.map((month) => (
               <section key={month.name} className="text-center">
                  <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
                  <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                     <div>S</div>
                     <div>M</div>
                     <div>T</div>
                     <div>W</div>
                     <div>T</div>
                     <div>F</div>
                     <div>S</div>
                  </div>
                  <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                     {month.days.map((day, dayIdx) => (
                        <button
                           key={day.date}
                           type="button"
                           className={classNames(
                              day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                              dayIdx === 0 && 'rounded-tl-lg',
                              dayIdx === 6 && 'rounded-tr-lg',
                              dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                              dayIdx === month.days.length - 1 && 'rounded-br-lg',
                              'py-1.5 hover:bg-gray-100 focus:z-10'
                           )}
                        >
                           <time
                              dateTime={day.date}
                              className={classNames(
                                 day.isToday && 'bg-indigo-600 font-semibold text-white',
                                 'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                              )}
                           >
                              {day?.date?.split('-')?.pop()?.replace(/^0/, '')}
                           </time>
                        </button>
                     ))}
                  </div>
               </section>
            ))}
         </div>
      </div>
   )
}
