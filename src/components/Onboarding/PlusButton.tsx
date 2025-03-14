import { PlusIcon } from '@heroicons/react/20/solid'

export default function PlusButton({ onClick } : { onClick: () => void}) {
   return (
      <button
         onClick={onClick}
         type="button"
         className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
         <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
   )
}
