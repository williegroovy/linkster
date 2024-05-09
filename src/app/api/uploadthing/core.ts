import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from '~/server/auth';
const f = createUploadthing();
import { z } from "zod";
import { db } from "~/server/db";

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   // Define as many FileRoutes as you like, each with a unique routeSlug
   imageUploader: f({ image: { maxFileSize: "4MB" } })
      // Set permissions and file types for this FileRoute
      .input(z.object({ projectId: z.string().min(1) }))
      .middleware(async ({ req, input }) => {
         // This code runs on your server before upload
         const session = await getServerAuthSession();
         const user = session?.user;
         console.log('input', input);

         // If you throw, the user will not be able to upload
         if (!user) throw new UploadThingError("Unauthorized");

         // Whatever is returned here is accessible in onUploadComplete as `metadata`
         return { userId: user.id, projectId: input.projectId };
      })
      .onUploadComplete(async ({ metadata, file }) => {
         // This code RUNS ON YOUR SERVER after upload
         console.log("Upload complete for userId:", metadata.userId);
         console.log('ProjectId', metadata.projectId);

         console.log("file url", file.url);
         let createdFile = null;

         try {
            createdFile = await db.projectPhoto.create({
               data: {
                  project: {
                     connect: {
                        id: metadata.projectId,
                     },
                  },
                  url: file.url,
               },
            });
         } catch (error) {
            console.error('Error adding photo to project', error);
         }

         // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
         return { url: file.url, id: createdFile?.id, uploadedBy: metadata.userId };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
