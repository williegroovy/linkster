import { z } from "zod";

import {
   createTRPCRouter,
   protectedProcedure,
} from "~/server/api/trpc";


export const profilesRouter = createTRPCRouter({
   create: protectedProcedure
      .input(z.object({
         firstName: z.string().min(1),
         lastName: z.string().min(1),
         street: z.string().min(1),
         city: z.string().min(1),
         state: z.string().min(1),
         postalCode: z.string().min(1),
         country: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
         return ctx.db.profile.create({
            data: {
               user: { connect: { id: ctx.session.user.id } },
               firstName: input.firstName,
               lastName: input.lastName,
               address: {
                  street: input.street,
                  city: input.city,
                  state: input.state,
                  postalCode: input.postalCode,
                  country: input.country,
               },
            }
         })
      }),
   createContractor: protectedProcedure
      .input(z.object({
         companyName: z.string().min(1),
         street: z.string().min(1),
         city: z.string().min(1),
         state: z.string().min(1),
         postalCode: z.string().min(1),
         country: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
         return ctx.db.contractor.create({
            data: {
               profile: { connect: { id: ctx.session.user.profile.id } },
               companyName: input.companyName,
               address: {
                  street: input.street,
                  city: input.city,
                  state: input.state,
                  postalCode: input.postalCode,
                  country: input.country,
               },
            }
         })
      }),
});
