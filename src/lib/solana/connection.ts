import { Connection, clusterApiUrl, Cluster } from "@solana/web3.js";
import { env } from "@/config/env";

const network = env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta";

// If Alchemy RPC is provided, use it. Otherwise gracefully fallback to public RPC.
const rpcUrl =
  env.NEXT_PUBLIC_ALCHEMY_RPC_URL || clusterApiUrl(network as Cluster);

// Create a singleton connection instance to be reused
export const solanaConnection = new Connection(rpcUrl, {
  commitment: "confirmed",
});
