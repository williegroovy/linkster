import { z } from "zod";

import {
   createTRPCRouter,
   publicProcedure
} from '~/server/api/trpc';


export const betaSignup = createTRPCRouter({
   betaSignup: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ ctx, input }) => {
      return ctx.db.signup.create({
         data: {
            email: input.email,
         },
      });
   }),
});
