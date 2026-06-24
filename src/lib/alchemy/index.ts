import { Connection } from "@solana/web3.js";

// Stub for Alchemy RPC connection
// Provides a reliable, premium RPC endpoint for our high-performance terminal

export class AlchemyService {
  private static connection: Connection | null = null;

  /**
   * Gets or initializes the Solana Connection via Alchemy RPC
   */
  static getConnection(): Connection {
    if (!this.connection) {
      const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

      if (!rpcUrl) {
        console.warn(
          "Alchemy RPC URL is missing! Falling back to public mainnet (Expect rate limits)."
        );
      }

      this.connection = new Connection(
        rpcUrl || "https://api.mainnet-beta.solana.com",
        "confirmed"
      );
    }
    return this.connection;
  }
}
