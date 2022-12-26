import { GetSessionFunc } from "./types";
import { FrontendApi, Configuration } from "@ory/client";
import { env } from "../env";

const ory = new FrontendApi(
  new Configuration({
    basePath: env.NEXT_ORY_SDK_URL,
  })
);

export const getSession: GetSessionFunc = async ({
  authorization,
  cookies,
}) => {
  const hasAuthHeader = authorization.startsWith("Bearer ");
  const sessionToken = hasAuthHeader
    ? authorization.slice(7, authorization.length)
    : undefined;

  const cookieArray = Object.entries(cookies).map(
    ([key, value]) => `${key}=${value}`
  );
  const cookieString = cookieArray.join("; ");

  try {
    const { data } = await ory.toSession({
      cookie: cookieString,
      xSessionToken: sessionToken,
    });
    return {
      externalId: data.identity.id,
      email: data.identity.traits.email,
    };
  } catch (e) {
    console.warn("Returning null no session found", e);
    return null;
  }
};
