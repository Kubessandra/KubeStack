// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const { z } = require("zod");

/**
 * Public and private env are handled by the next.config.js
 */

const envSchema = z.object({
  NEXT_ORY_SDK_URL: z.string(),
  STRIPE_SECRET: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  FRONT_URL: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 4)
  );
  process.exit(1);
}
module.exports.env = env.data;
