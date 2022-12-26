import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";

export const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No Session available",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const authProcedure = publicProcedure.use(isAuthed);
