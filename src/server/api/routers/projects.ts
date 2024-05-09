import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const getLatLong = async function(address: string) {
   const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
   const json = await res.json();
   return json.results[0].geometry.location;
}

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
       const chat = await ctx.db.chat.create({});

       const fullAddress = `${input.address}, ${input.city}, ${input.state}, ${input.postalCode}, ${input.country}`;
       const coords = await getLatLong(fullAddress);
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
                coordinates: coords
             },
             chat: chat.id,
             contractor: { connect: { id: ctx.session.user.profile.contractorProfile.id } },
        },
      });
    }),
   update: protectedProcedure
      .input(z.object({
         projectId: z.string().min(1),
         name: z.string().min(1),
         description: z.string().optional(),
         address: z.string().min(1),
         city: z.string().min(1),
         state: z.string().min(1),
         postalCode: z.string().min(1),
         country: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
         const fullAddress = `${input.address}, ${input.city}, ${input.state}, ${input.postalCode}, ${input.country}`;
         const coords = await getLatLong(fullAddress);

         return ctx.db.project.update({
            where: {
              id: input.projectId,
            },
            data: {
               name: input.name,
               ...input.description && { description: input.description },
               address: {
                  street: input.address,
                  city: input.city,
                  state: input.state,
                  postalCode: input.postalCode,
                  country: input.country,
                  coordinates: coords
               },
               contractor: { connect: { id: ctx.session.user.profile.contractorProfile.id } },
            },
         });
      }),
   delete: protectedProcedure.input(z.object({ projectId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      return ctx.db.project.delete({
         where: {
            id: input.projectId,
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
            images: {
               select: {
                  id: true,
                  url: true
               }
            },
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
            },
            NOT: {
               profile: null
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
   sendChat: protectedProcedure.input(z.object({
         chatId: z.string().min(1),
         content: z.string().min(1)
      })).mutation(({ ctx, input }) => {
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
   addTrade: protectedProcedure.input(z.object({
      projectId: z.string().min(1),
      tradeId: z.string().min(1),
      tasks: z.array(z.object({ description: z.string().min(1) })).optional()
   })).mutation(({ ctx, input }) => {
      return ctx.db.tradeLineItems.create({
         data: {
            project: {
               connect: {
                  id: input.projectId,
               },
            },
            trade: {
               connect: {
                  id: input.tradeId,
               },
            },
            ...input.tasks && { tasks: { create: input.tasks } }
         }
      });
   }),
   assignTradeContractor: protectedProcedure.input(z.object({ projectId: z.string().min(1), tradeId: z.string().min(1), contractorId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.tradeLineItems.update({
         where: {
            id: input.tradeId,
         },
         data: {
            subContractor: {
               connectOrCreate: {
                  where: {
                     id: input.contractorId,
                  },
                  create: {
                     project: {
                        connect: {
                           id: input.projectId,
                        }
                     },
                     contractor: {
                        connect: {
                           id: input.contractorId,
                        }
                     },
                  },
               },
            },
         },
      });
   }),
   removeTrade: protectedProcedure.input(z.object({ projectId: z.string().min(1), tradeId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.tradeLineItems.delete({
         where: {
            id: input.tradeId,
         }
      });
   }),
   addTradeTask: protectedProcedure.input(z.object({ description: z.string().min(1), tradeId: z.string().min(1), subContractorId: z.string().min(1).optional() })).mutation(({ ctx, input }) => {
      return ctx.db.tradeTask.create({
         data: {
            description: input.description,
            tradeLineItem: {
               connect: {
                  id: input.tradeId
               },
               ...input.subContractorId && {
                  subContractor: {
                     connect: {
                        id: input.subContractorId
                     }
                  }
               }
            },
         }
      });
   }),
   deleteTradeTask: protectedProcedure.input(z.object({ taskId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.tradeTask.delete({
         where: {
            id: input.taskId
         }
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
   }),
   addPhoto: protectedProcedure.input(z.object({ projectId: z.string().min(1), imageUrl: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      return ctx.db.projectPhoto.create({
         data: {
            project: {
               connect: {
                  id: input.projectId,
               },
            },
            url: input.imageUrl,
         },
      });
   }),
});
