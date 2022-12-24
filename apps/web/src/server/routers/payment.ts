/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import Stripe from "stripe";
if (!process.env.STRIPE_SECRET) throw new Error("NO STRIPE_SECRET ENV");
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});
if (!process.env.FRONT_URL) throw new Error("NO FRONT_URL ENV");
const FRONT_URL = process.env.FRONT_URL;

export const paymentRouter = router({
  createSession: publicProcedure
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
        success_url: `${FRONT_URL}/videos?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONT_URL}/videos`,
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
