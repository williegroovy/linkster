import { z } from "zod";

import {
   createTRPCRouter,
   protectedProcedure,
} from "~/server/api/trpc";


export const teamRouter = createTRPCRouter({
   listTeam: protectedProcedure.query(({ ctx }) => {
      return ctx.db.contractor.findUnique({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         select: {
            team: {
               select: {
                  id: true,
                  profile: {
                     select: {
                        firstName: true,
                        lastName: true,
                        address: true,
                        user: {
                           select: {
                              email: true,
                              id: true,
                              image: true,
                           }
                        }
                     }
                  },
               }
            },
         }
      });
   }),
   addTeamMembers: protectedProcedure.input(z.object({ teamIds: z.array(z.string().min(1)) })).mutation(async ({ ctx, input }) => {
      return Promise.allSettled(input.teamIds.map(async (id) => {
         return ctx.db.contractor.update({
            where: {
               id: ctx.session.user.profile.contractorProfile.id,
            },
            data: {
               team: {
                  connect: {
                     id: id,
                  }
               }
            }
         });
      }));
   }),
   removeTeamMembers: protectedProcedure.input(z.object({ teamIds: z.array(z.string().min(1)) })).mutation(async ({ ctx, input }) => {
      return Promise.allSettled(input.teamIds.map(async (id) => {
         return ctx.db.contractor.update({
            where: {
               id: ctx.session.user.profile.contractorProfile.id,
            },
            data: {
               team: {
                  disconnect: {
                     id: id,
                  }
               }
            }
         });
      }));
   }),
   addTeamMember: protectedProcedure.input(z.object({ contractorId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      return ctx.db.contractor.update({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         data: {
            team: {
               connect: {
                  id: input.contractorId,
               }
            }
         }
      });
   }),
   removeTeamMember: protectedProcedure.input(z.object({ contractorId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      return ctx.db.contractor.update({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         data: {
            team: {
               disconnect: {
                  id: input.contractorId,
               }
            }
         }
      });
   }),
   listSubContractors: protectedProcedure.query(async ({ ctx }) => {
      return ctx.db.contractor.findUnique({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         select: {
            subContractors: {
               select: {
                  id: true,
                  profile: {
                     select: {
                        firstName: true,
                        lastName: true,
                        user: {
                           select: {
                              email: true,
                              id: true,
                              image: true,
                           }
                        }
                     }
                  },
               }
            },
         }
      });
   }),
   addSubcontractor: protectedProcedure.input(z.object({ contractorId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.contractor.update({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         data: {
            subContractors: {
               connect: {
                  id: input.contractorId,
               },
            },
         },
      });
   }),
   removeSubcontractor: protectedProcedure.input(z.object({ contractorId: z.string().min(1) })).mutation(({ ctx, input }) => {
      return ctx.db.contractor.update({
         where: {
            id: ctx.session.user.profile.contractorProfile.id,
         },
         data: {
            subContractors: {
               disconnect: {
                  id: input.contractorId,
               },
            },
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
                  firstName: true,
                  lastName: true,
                  address: true,
                  user: {
                     select: {
                        email: true,
                        id: true,
                        image: true,
                     }
                  }
               }
            },
         }
      });
   }),
});
