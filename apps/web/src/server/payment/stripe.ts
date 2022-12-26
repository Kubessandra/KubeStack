import Stripe from "stripe";
import { SUCCESS_URL, VIDEO_URL } from "~/utils/constants";
import { env } from "../env";

export const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

interface CreateCheckoutParams {
  userId: string;
  priceId: string;
  customerId: string;
}

export const createCheckoutSession = async ({
  priceId,
  userId,
  customerId,
}: CreateCheckoutParams) => {
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId,
    metadata: {
      userId,
    },
    mode: "subscription",
    success_url: `${env.FRONT_URL}/${SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.FRONT_URL}/${VIDEO_URL}`,
  });
  return session;
};

// ---

interface CreateCustomerPortalParams {
  customerId: string;
}

export const createCustomerPortal = async ({
  customerId,
}: CreateCustomerPortalParams) => {
  const returnUrl = `${env.FRONT_URL}/${VIDEO_URL}`;
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return portalSession.url;
};

// ---

interface CreateCustomerProps {
  userId: string;
  email: string;
}

export const createCustomer = async ({
  userId,
  email,
}: CreateCustomerProps) => {
  return await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });
};
