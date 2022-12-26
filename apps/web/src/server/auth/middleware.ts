import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";

export const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No Session available",
      cause: "No Session available",
    });
  }
  if (!ctx.user.paymentInfo) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No customer registered on the platform",
      cause: "No customer registered on the platform",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
      user: {
        ...ctx.user,
        paymentInfo: ctx.user.paymentInfo,
      },
    },
  });
});

export const authProcedure = publicProcedure.use(isAuthed);
