import Cors from "micro-cors";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/server/env";
import { stripe } from "~/server/payment/stripe";
import { prisma } from "~/server/prisma";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const getNewSubDate = () => {
  const newSubDate = new Date();
  newSubDate.setMonth(newSubDate.getMonth() + 1);
  newSubDate.setHours(newSubDate.getHours() + 48);
  return newSubDate;
};

const billingPaid = async (invoice: Stripe.Invoice) => {
  if (!invoice.customer)
    throw new Error(`No customers assign to this invoice: ${invoice.id}`);
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer.id;
  const newSubDate = getNewSubDate();
  await prisma.paymentInfo.update({
    where: {
      customerId,
    },
    data: {
      subscriptionEndAt: newSubDate,
    },
  });
};

const stripeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let event: Stripe.Event;
  const endpointSecret = env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    res.status(400);
    res.send("Signature verification failed");
    return;
  }
  switch (event.type) {
    case "invoice.paid":
      console.log("[Payment], Invoice paid");
      let invoice = event.data.object as Stripe.Invoice;
      await billingPaid(invoice);
      break;
    case "invoice.payment_failed":
      invoice = event.data.object as Stripe.Invoice;
      console.warn(
        `[PaymentFailed] payement failed for user ${invoice.customer}, invoiceId: ${invoice.id}`
      );
      // TODO notify user that the payment failed (RECURRING)
      break;
    default:
      console.log(`Unhandled event type ${event.type}. (Not critical)`);
  }
  res.status(200);
  res.send("success");
};

export default cors(stripeHandler as any);
export const config = { api: { bodyParser: false } };
