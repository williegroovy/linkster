'use client';
import { cloneElement, ReactElement, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UploadButton } from '~/components/uploadthing';

function FullScreenPreview({ src, open, toggle } : { src: string, open: boolean, toggle: () => void }) {

   return (
      <Transition.Root show={open} as={Fragment}>
         <Dialog className="relative z-10" onClose={toggle}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 h-screen overflow-y-auto">
               <div className="flex min-h-full items-center justify-center text-center sm:items-center">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                        <button
                           type="button"
                           className="absolute bg-white rounded-lg right-2 top-2 text-gray-800 hover:text-gray-500"
                           onClick={() => toggle()}
                        >
                           <span className="absolute -inset-2.5" />
                           <span className="sr-only">Close panel</span>
                           <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <img className={'max-h-screen'} src={src} alt="project-image" />
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   )
}

export default function PhotoSlideout({ children, projectId, images } : { children: ReactElement, projectId: string, images: Array<{ id: string, url: string }> }) {
   const [open, setOpen] = useState(false);
   const [fullscreenOpen, setFullscreenOpen] = useState<boolean>(false);
   const [fullScreenSrc, setFullScreenSrc] = useState<string>('');
   const [imageList, setImageList] = useState<Array<{ id: string, url: string }>>(images);

   const toggle = () => {
      if(!fullscreenOpen) {
         setOpen(!open);
      }
   }

   const toggleFullScreen = (src?: string) => {
      if(fullscreenOpen) {
         setFullscreenOpen(false);
         setFullScreenSrc('');
      } else if (src) {
         setFullScreenSrc(src);
         setFullscreenOpen(true);
      }
   }

   return (
      <>
         <FullScreenPreview src={fullScreenSrc} open={fullscreenOpen} toggle={toggleFullScreen}/>
         <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-12" onClose={toggle}>
               <div className="fixed inset-0" />

               <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                     <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <Transition.Child
                           as={Fragment}
                           enter="transform transition ease-in-out duration-500 sm:duration-700"
                           enterFrom="translate-x-full"
                           enterTo="translate-x-0"
                           leave="transform transition ease-in-out duration-500 sm:duration-700"
                           leaveFrom="translate-x-0"
                           leaveTo="translate-x-full"
                        >
                           <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                 <div className="flex-1">
                                    {/* Header */}
                                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                       <div className="flex items-start justify-between space-x-3">
                                          <div className="space-y-1">
                                             <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Project Photos
                                             </Dialog.Title>
                                             {/*<p className="text-sm text-gray-500">*/}
                                             {/*   Get started by filling in the information below to create your new project.*/}
                                             {/*</p>*/}
                                          </div>
                                          <div className="flex h-7 items-center">
                                             <button
                                                type="button"
                                                className="relative text-gray-400 hover:text-gray-500"
                                                onClick={() => setOpen(false)}
                                             >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                       <div className="flex justify-center space-x-3">
                                          <UploadButton
                                             input={{
                                                projectId,
                                             }}
                                             endpoint="imageUploader"
                                             onClientUploadComplete={(res) => {
                                                const files = res.map((fileResp) => ({
                                                   id: fileResp?.serverData.id || fileResp.url,
                                                   url: fileResp.url,
                                                }));

                                                setImageList([...imageList, ...files]);
                                             }}
                                             onUploadError={(error: Error) => {}}
                                          />
                                       </div>
                                    </div>

                                    {/* Divider container */}
                                    <div className="space-y-6 py-6 px-4 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                          { imageList.map(({ id, url }) => (
                                             <div key={id}>
                                                <img onClick={() => toggleFullScreen(url)} className="h-auto max-w-full rounded-lg" src={url} alt="" />
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
         {children && cloneElement(children, { onClick: toggle })}
      </>
   )
}
