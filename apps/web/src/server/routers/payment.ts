/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { authProcedure } from "../auth/middleware";

import { createCheckoutSession, createCustomerPortal } from "../payment/stripe";

export const paymentRouter = router({
  createSession: authProcedure
    .input(
      z.object({
        priceId: z.string().max(250),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const customerId = ctx.user.paymentInfo.customerId;
      const session = await createCheckoutSession({
        userId: userId,
        customerId,
        priceId: input.priceId,
      });

      if (!session.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No session url, the session is probably not active",
        });
      }
      return session.url;
    }),
  createCustomerPortal: authProcedure.mutation(async ({ ctx }) => {
    const customerId = ctx.user.paymentInfo.customerId;
    const portalUrl = await createCustomerPortal({ customerId });
    return portalUrl;
  }),
});
