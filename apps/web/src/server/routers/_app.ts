/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { postRouter } from "./post";
import { paymentRouter } from "./payment";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  payment: paymentRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
