import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const projectsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
       name: z.string().min(1),
       description: z.string().optional(),
       address: z.string().min(1),
       city: z.string().min(1),
       state: z.string().min(1),
       postalCode: z.string().min(1),
       country: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          ...input.description && { description: input.description },
          address: {
             street: input.address,
             city: input.city,
             state: input.state,
             postalCode: input.postalCode,
             country: input.country,
          },
          contractor: { connect: { id: ctx.session.user.profile?.contractorProfile?.id } },
        },
      });
    }),
   addTrade: protectedProcedure.input(z.object({ projectId: z.string().min(1), tradeId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.project.update({
         where: {
            id: input.projectId,
         },
         data: {
            trades: {
               create: {
                  trade: {
                     connect: {
                        id: input.tradeId,
                     },
                  }
               }
            },
         }
      });
   }),
   removeTrade: protectedProcedure.input(z.object({ projectId: z.string().min(1), tradeId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.tradeLineItems.delete({
         where: {
            id: input.tradeId,
         }
      });
   }),
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      where: { contractor: { id: ctx.session.user.profile?.contractorProfile?.id } },
       include: {
         trades: {
            include: {
               trade: true,
            }
         }
       }
    });
  }),
   get: protectedProcedure.input(z.object({ projectId: z.string().min(1)})).query(({ ctx, input }) => {
      return ctx.db.project.findUnique({
         where: { id: input.projectId },
         include: {
            trades: {
               include: {
                  trade: true,
               }
            }
         },
      });
   }),
});
