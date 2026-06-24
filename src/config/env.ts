import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ALCHEMY_RPC_URL: z.string().url().optional(),
  NEXT_PUBLIC_PRIVY_APP_ID: z.string().optional(),
  BIRDEYE_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_ALCHEMY_RPC_URL: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
  NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  BIRDEYE_API_KEY: process.env.BIRDEYE_API_KEY,
});
