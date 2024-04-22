import { projectsRouter } from "~/server/api/routers/projects";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { profilesRouter } from '~/server/api/routers/profiles';
import { tradesRouter } from '~/server/api/routers/trades';
import { teamRouter } from '~/server/api/routers/team';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  profiles: profilesRouter,
  trades: tradesRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
