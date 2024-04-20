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
         street: z.string().min(1).optional(),
         city: z.string().min(1).optional(),
         state: z.string().min(1).optional(),
         postalCode: z.string().min(1).optional(),
         country: z.string().min(1).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
         if(input.street && input.city && input.state && input.postalCode && input.country) {
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
         }

         return ctx.db.contractor.create({
            data: {
               profile: { connect: { id: ctx.session.user.profile.id } },
               companyName: input.companyName,
            }
         })
      }),
   addTrade: protectedProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
         return ctx.db.contractorTrade.create({
            data: {
               contractor: {
                  connect: {
                     id: ctx.session.user.profile.contractorProfile.id,
                  },
               },
               trade: {
                  connect: {
                     id: input.id,
                  },
               },
            },
         });
   }),
   removeTrade: protectedProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
         return ctx.db.contractorTrade.delete({
            where: {
               id: input.id
            },
         });
      }),
   addServiceArea: protectedProcedure
      .input(z.object({
         name: z.string().min(1),
         serviceRange: z.string().min(1),
         city: z.string().min(1),
         state: z.string().min(1),
         postalCode: z.string().min(1),
         country: z.string().min(1)
      }))
      .mutation(async ({ ctx, input }) => {
      return ctx.db.serviceArea.create({
         data: {
            name: '',
            serviceRange: parseInt(input.serviceRange),
            location: {
               city: input.city,
               state: input.state,
               postalCode: input.postalCode,
               country: input.country,
            },
            contractors: {
               connect: {
                  id: ctx.session.user.profile.contractorProfile.id
               }
            },
         }
      });
   }),
   addServiceAreas: protectedProcedure
      .input(z.object({
         serviceAreas: z.array(
            z.object({
               name: z.string().min(1),
               serviceRange: z.string().min(1),
               city: z.string().min(1),
               state: z.string().min(1),
               postalCode: z.string().min(1),
               country: z.string().min(1)
            }))
      }))
      .mutation(async ({ ctx, input }) => {
         return Promise.allSettled(input.serviceAreas.map(async (serviceArea) => {
            return ctx.db.serviceArea.create({
               data: {
                  name: serviceArea.name,
                  serviceRange: parseInt(serviceArea.serviceRange),
                  location: {
                     city: serviceArea.city,
                     state: serviceArea.state,
                     postalCode: serviceArea.postalCode,
                     country: serviceArea.country,
                  },
                  contractors: {
                     connect: {
                        id: ctx.session.user.profile.contractorProfile.id
                     }
                  },
               }
            });
         }))
      }),
});
