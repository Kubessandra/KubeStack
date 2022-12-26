/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/server/env";

import { SUCCESS_URL } from "~/utils/constants";
import { authProcedure } from "../auth/middleware";

const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = router({
  test: authProcedure.query(async () => {
    return "lol";
  }),
  createSession: authProcedure
    .input(
      z.object({
        priceID: z.string().max(250),
      })
    )
    .mutation(async ({ input }) => {
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        line_items: [
          {
            price: input.priceID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${env.FRONT_URL}/${SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.FRONT_URL}/videos`,
      });

      if (!session.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No session url, the session is probably not active",
        });
      }
      return session.url;
    }),
});
