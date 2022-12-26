/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "./auth/ory";
import { Session } from "./auth/types";
import { prisma } from "./prisma";
import { createPaymentAccount, createUser } from "./core/user";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  session: Session | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  const externalId = _opts.session?.externalId;
  const email = _opts.session?.email;
  if (externalId && email) {
    let userInfo = await prisma.userInfo.findUnique({
      where: { externalId },
      include: { paymentInfo: true },
    });
    if (!userInfo) {
      userInfo = await createUser({ externalId, email });
    }
    if (!userInfo.paymentInfo) {
      userInfo = await createPaymentAccount({ userId: userInfo.id, email });
    }
    return { session: _opts.session, user: userInfo };
  }
  return { session: null, user: null };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  let session = null;

  const authHeader = opts.req.headers.authorization;
  const { cookies } = opts.req;
  session = await getSession({
    authorization: authHeader ?? "",
    cookies,
  });

  return await createContextInner({ session });
}
