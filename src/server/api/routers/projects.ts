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
           chats: {
              create: {},
           },
           contractor: { connect: { id: ctx.session.user.profile.contractorProfile.id } },
        },
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
   listSubcontractorProjects: protectedProcedure.query(({ ctx }) => {
      return ctx.db.contractor.findUnique({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         select: {
            subContractedProjects: {
               include: {
                  project: true,
               }
            }
         }
      })
   }),
   get: protectedProcedure.input(z.object({ projectId: z.string().min(1)})).query(({ ctx, input }) => {
      return ctx.db.project.findUnique({
         where: { id: input.projectId },
         include: {
            subContractors: {
               include: {
                  contractor: {
                     select: {
                        id: true,
                        profile: {
                           select: {
                              userId: true,
                              firstName: true,
                              lastName: true,
                              user: {
                                 select: {
                                    email: true,
                                    image: true
                                 }
                              },
                           },
                        },
                     }
                  },
               },
            },
            chats: {
               select: {
                  id: true
               },
            },
            trades: {
               include: {
                  trade: true,
               }
            }
         },
      });
   }),
   listContractors: protectedProcedure.query(({ ctx }) => {
      return ctx.db.contractor.findMany({
         where: {
            id: {
               not: ctx.session.user.profile.contractorProfile.id,
            }
         },
         select: {
            id: true,
            profile: {
               select: {
                  userId: true,
                  firstName: true,
                  lastName: true,
                  user: {
                     select: {
                        email: true,
                        image: true
                     }
                  },
               },
            },
         }
      });
   }),
   addSubcontractor: protectedProcedure.input(z.object({ projectId: z.string().min(1), contractorId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.project.update({
         where: {
            id: input.projectId,
         },
         data: {
            subContractors: {
               create: {
                  contractor: {
                     connect: {
                        id: input.contractorId,
                     },
                  },
               },
            },
         },
      });
   }),
   getChat: protectedProcedure.input(z.object({ chatId: z.string().min(1) })).query(async ({ ctx, input }) => {
      return ctx.db.chat.findUnique({
         where: {
            id: input.chatId,
         },
         include: {
            activity: {
               include: {
                  sender: {
                     include: {
                        profile: {
                           select: {
                              userId: true,
                              firstName: true,
                              lastName: true,
                              user: {
                                 select: {
                                    email: true,
                                    image: true
                                 }
                              },
                           },
                        },
                     }
                  },
               },
               orderBy: {
                  createdAt: "asc"
               }
            }
         }
      });
   }),
   sendChat: protectedProcedure
      .input(z.object({
         chatId: z.string().min(1),
         content: z.string().min(1)
      }))
      .mutation(({ ctx, input }) => {
         return ctx.db.chatActivity.create({
            data: {
               chat: {
                  connect: {
                     id: input.chatId,
                  },
               },
               sender: {
                  connect: {
                     id: ctx.session.user.profile.contractorProfile.id,
                  },
               },
               content: input.content,
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
   addTradeTask: protectedProcedure
      .input(z.object({
         name: z.string().min(1),
         description: z.string().min(1),
         status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
         dueDate: z.date(),
         tradeId: z.string().min(1)
      }))
      .mutation(({ ctx, input }) => {
      return ctx.db.tradeTask.create({
         data: {
            name: input.name,
            description: input.description,
            status: input.status,
            dueDate: input.dueDate,
            tradeLineItem: {
               connect: {
                  id: input.tradeId
               },
            },
         }
      });
   }),
   createChat: protectedProcedure.input(z.object({ projectId: z.string().min(1) })).mutation(async ({ ctx }) => {
      return ctx.db.chat.create({
         data: {
            project: {
               connect: {
                  id: ctx.session.user.profile.contractorProfile.id,
               },
            },
         },
      });
   }),
   sendMessage: protectedProcedure.input(z.object({ chatId: z.string().min(1), content: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      return ctx.db.chatActivity.create({
         data: {
            chat: {
               connect: {
                  id: input.chatId,
               },
            },
            sender: {
               connect: {
                  id: ctx.session.user.profile.contractorProfile.id,
               },
            },
            content: input.content
         },
      });
   })
});
