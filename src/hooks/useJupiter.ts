import { useQuery, useMutation } from "@tanstack/react-query";

interface QuoteParams {
  inputMint: string;
  outputMint: string;
  amount: string; // amount in smallest units (lamports/decimals)
  slippageBps?: number;
}

export function useQuote(params: QuoteParams) {
  return useQuery({
    queryKey: ["jupiterQuote", params],
    queryFn: async () => {
      if (
        !params.inputMint ||
        !params.outputMint ||
        !params.amount ||
        params.amount === "0"
      ) {
        return null;
      }
      const slippage = params.slippageBps || 50;
      const res = await fetch(
        `/api/jupiter/quote?inputMint=${params.inputMint}&outputMint=${params.outputMint}&amount=${params.amount}&slippageBps=${slippage}`
      );
      if (!res.ok) throw new Error("Failed to fetch quote");
      return res.json();
    },
    enabled: Boolean(
      params.inputMint &&
      params.outputMint &&
      params.amount &&
      params.amount !== "0"
    ),
    refetchInterval: 15000, // Refresh quote every 15s to keep it fresh
  });
}

interface SwapParams {
  quoteResponse: unknown;
  userPublicKey: string;
}

export function useSwapTransaction() {
  return useMutation({
    mutationFn: async ({ quoteResponse, userPublicKey }: SwapParams) => {
      const res = await fetch("/api/jupiter/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteResponse, userPublicKey }),
      });
      if (!res.ok) throw new Error("Failed to generate swap transaction");
      return res.json();
    },
  });
}
