import { PublicKey } from "@solana/web3.js";
import { solanaConnection } from "./connection";

export interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
}

export async function getSolBalance(address: string): Promise<number> {
  try {
    const pubKey = new PublicKey(address);
    const balance = await solanaConnection.getBalance(pubKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error("Failed to fetch SOL balance:", error);
    throw new Error("Failed to fetch SOL balance");
  }
}

// Fetch SPL token balances (e.g. USDC, BONK)
export async function getTokenBalances(
  address: string
): Promise<TokenBalance[]> {
  try {
    const pubKey = new PublicKey(address);
    const response = await solanaConnection.getParsedTokenAccountsByOwner(
      pubKey,
      {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      }
    );

    const tokens: TokenBalance[] = [];

    response.value.forEach((accountInfo) => {
      const parsedInfo = accountInfo.account.data.parsed.info;
      const amount = parsedInfo.tokenAmount.uiAmount;
      const decimals = parsedInfo.tokenAmount.decimals;

      // Filter out empty accounts
      if (amount > 0) {
        tokens.push({
          mint: parsedInfo.mint,
          amount,
          decimals,
        });
      }
    });

    return tokens;
  } catch (error) {
    console.error("Failed to fetch token balances:", error);
    throw new Error("Failed to fetch token balances");
  }
}
