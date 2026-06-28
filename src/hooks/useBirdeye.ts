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

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const getResolutionSeconds = (resolution: string): number => {
  const num = parseInt(resolution);
  const unit = resolution.replace(num.toString(), "").toLowerCase();
  switch (unit) {
    case "m":
      return num * 60;
    case "h":
      return num * 3600;
    case "d":
      return num * 86400;
    default:
      return 3600;
  }
};

export function useTokenHistory(address: string, resolution: string) {
  return useQuery({
    queryKey: ["tokenHistory", address, resolution],
    queryFn: async (): Promise<Candle[]> => {
      const timeTo = Math.floor(Date.now() / 1000);
      const candleSecs = getResolutionSeconds(resolution);
      const timeFrom = timeTo - candleSecs * 200; // fetch 200 candles

      const res = await fetch(
        `/api/birdeye/history?address=${address}&type=${resolution}&timeFrom=${timeFrom}&timeTo=${timeTo}`
      );
      const data = await res.json();
      if (data.success && data.data?.items) {
        return data.data.items
          .map(
            (item: {
              o: number;
              h: number;
              l: number;
              c: number;
              v: number;
              unixTime: number;
            }) => ({
              time: item.unixTime,
              open: item.o,
              high: item.h,
              low: item.l,
              close: item.c,
              volume: item.v,
            })
          )
          .sort((a: Candle, b: Candle) => a.time - b.time);
      }
      throw new Error(data.error || "Failed to fetch history");
    },
    enabled: !!address && !!resolution,
    refetchInterval: 30000, // Poll history every 30s
    retry: 2,
  });
}
