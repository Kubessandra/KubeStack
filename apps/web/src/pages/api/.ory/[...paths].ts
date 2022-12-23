import { config, createApiHandler } from "@ory/integrations/next-edge";
import { env } from "../../../server/env";

export { config };

export default createApiHandler({
  apiBaseUrlOverride: env.NEXT_ORY_SDK_URL,
  fallbackToPlayground: true,
});
