import { useQuery } from "@tanstack/react-query";

export interface TokenOverview {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  extensions?: { description?: string };
  logoURI: string;
  liquidity: number;
  price: number;
  supply: number;
  mc: number;
  v24hUSD: number;
  v24hChangePercent: number;
}

export function useTokenOverview(address: string) {
  return useQuery({
    queryKey: ["tokenOverview", address],
    queryFn: async (): Promise<TokenOverview | null> => {
      const res = await fetch(`/api/birdeye/token?address=${address}`);
      const data = await res.json();
      if (data.success && data.data) return data.data;
      throw new Error(data.error || "Failed to fetch overview");
    },
    enabled: !!address,
    refetchInterval: 10000, // Real-time: Poll every 10s
    retry: 2,
  });
}

export interface TokenHolder {
  owner: string;
  uiAmount: number;
  amount: string;
}

export function useTokenHolders(address: string) {
  return useQuery({
    queryKey: ["tokenHolders", address],
    queryFn: async (): Promise<TokenHolder[]> => {
      const res = await fetch(`/api/birdeye/holders?address=${address}`);
      const data = await res.json();
      if (data.success && data.data?.items) return data.data.items;
      throw new Error(data.error || "Failed to fetch holders");
    },
    enabled: !!address,
    refetchInterval: 60000, // Poll every 60s
    retry: 2,
  });
}

export interface LiveTrade {
  txHash: string;
  side: "buy" | "sell";
  volumeUSD: number;
  tokens: number;
  blockTime: number;
}

export function useLiveTrades(address: string) {
  return useQuery({
    queryKey: ["liveTrades", address],
    queryFn: async (): Promise<LiveTrade[]> => {
      const res = await fetch(`/api/birdeye/trades?address=${address}`);
      const data = await res.json();
      if (data.success && data.data?.items) return data.data.items;
      throw new Error(data.error || "Failed to fetch trades");
    },
    enabled: !!address,
    refetchInterval: 5000, // Real-time: Poll every 5s
    retry: 2,
  });
}
