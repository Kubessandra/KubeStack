/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router } from "../trpc";

import { createCustomer } from "../payment/stripe";
import { prisma } from "../prisma";

interface CreateUserParams {
  externalId: string;
  email: string;
}

export const createUser = async ({ externalId, email }: CreateUserParams) => {
  const userCreated = await prisma.userInfo.create({
    data: { externalId, email },
    include: {
      paymentInfo: true,
    },
  });
  return userCreated;
};

interface CreatePaymentAccountParams {
  userId: string;
  email: string;
}

export const createPaymentAccount = async ({
  userId,
  email,
}: CreatePaymentAccountParams) => {
  console.log("[Payment], Creating stripe account for: ", userId);
  const newCustomer = await createCustomer({ userId, email });
  const userUpdated = await prisma.userInfo.update({
    where: { id: userId },
    data: {
      paymentInfo: {
        create: {
          customerId: newCustomer.id,
        },
      },
    },
    include: {
      paymentInfo: true,
    },
  });
  return userUpdated;
};

export const paymentRouter = router({});
