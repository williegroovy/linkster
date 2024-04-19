import { z } from "zod";

import {
   createTRPCRouter,
   protectedProcedure,
} from "~/server/api/trpc";


export const profilesRouter = createTRPCRouter({
   setOnboarded: protectedProcedure.mutation(async ({ ctx }) => {
      return ctx.db.profile.update({
         where: {
            id: ctx.session.user.profile.id,
         },
         data: {
            onboarded: true,
         }
      });
   }),
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
   update: protectedProcedure
      .input(z.object({
         id: z.string().min(1),
         firstName: z.string().min(1).optional(),
         lastName: z.string().min(1).optional(),
         street: z.string().min(1).optional(),
         city: z.string().min(1).optional(),
         state: z.string().min(1).optional(),
         postalCode: z.string().min(1).optional(),
         country: z.string().min(1).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
         if (input.street && input.city && input.state && input.postalCode && input.country) {
            return ctx.db.profile.update({
               where: {
                  id: input.id,
               },
               data: {
                  ...input.firstName && { firstName : input.firstName },
                  ...input.lastName && { lastName: input.lastName },
                  address: {
                     street: input.street,
                     city: input.city,
                     state: input.state,
                     postalCode: input.postalCode,
                     country: input.country,
                  },
               }
            })
         }

         return ctx.db.profile.update({
            where: {
               id: input.id,
            },
            data: {
               ...input.firstName && { firstName : input.firstName },
               ...input.lastName && { lastName: input.lastName },
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
