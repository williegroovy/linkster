import { z } from "zod";

import {
   createTRPCRouter,
   protectedProcedure,
} from "~/server/api/trpc";


export const tradesRouter = createTRPCRouter({
   create: protectedProcedure
      .input(z.object({
         name: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
         return ctx.db.trade.create({
            data: {
               name: input.name,
            }
         })
      }),
   listLineItems: protectedProcedure.input(z.object({ projectId: z.string().min(1) })).query(({ ctx, input }) => {
      return ctx.db.tradeLineItems.findFirst({
         where: {
            projectId: input.projectId
         },
         select: {
            id: true,
            trade: true
         }
      });
   }),
   get: protectedProcedure.input(z.object({ tradeId: z.string().min(1) })).query(({ ctx, input }) => {
      return ctx.db.tradeLineItems.findUnique({
         where: {
            id: input.tradeId
         },
         include: {
            tasks: true,
            trade: true,
         }
      });
   }),
   list: protectedProcedure.query(({ ctx }) => {
      return ctx.db.trade.findMany({
         select: {
            id: true,
            name: true
         }
      });
   }),
});
