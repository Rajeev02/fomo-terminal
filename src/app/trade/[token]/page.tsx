"use client";

import { use, useEffect, useState } from "react";
import { Token } from "@/components/Banner";
import { PortfolioBalances } from "@/components/wallet/PortfolioBalances";
import {
  useTokenOverview,
  useLiveTrades,
  useTokenHolders,
} from "@/hooks/useBirdeye";
import { TradingViewChart } from "@/components/TradingViewChart";
import Link from "next/link";
import { Copy, TrendingUp, TrendingDown, Users, Activity } from "lucide-react";
import { SwapPanel } from "@/components/swap/SwapPanel";

function TradeContent({ tokenAddress }: { tokenAddress: string }) {
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState<"trades" | "holders">("trades");

  const { data: overview, isLoading: isOverviewLoading } =
    useTokenOverview(tokenAddress);
  const { data: trades, isLoading: isTradesLoading } =
    useLiveTrades(tokenAddress);
  const { data: holders, isLoading: isHoldersLoading } =
    useTokenHolders(tokenAddress);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTrendingTokens(data.data);
        }
      });
  }, []);

  const selectedToken = trendingTokens.find((t) => t.address === tokenAddress);
  const isLoading = trendingTokens.length === 0;

  function formatNumber(num: number | undefined) {
    if (num === undefined || num === 0) return "0.00";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-background">
      {/* Left Column: Trending List */}
      <aside className="w-full lg:w-80 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="font-bold text-lg text-white">Trending Tokens</h2>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-8 text-center text-zinc-500 animate-pulse">
              Loading trends...
            </div>
          ) : (
            trendingTokens.map((t) => (
              <Link
                href={`/trade/${t.address}`}
                key={t.address}
                className={`p-4 border-b border-zinc-800/50 hover:bg-zinc-800/50 cursor-pointer flex items-center justify-between transition-colors ${
                  t.address === tokenAddress
                    ? "bg-zinc-800/80 border-l-2 border-l-[var(--chad-green)]"
                    : "border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {t.logoURI ? (
                    <img
                      src={t.logoURI}
                      alt={t.symbol}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--chad-green)] to-[var(--chad-purple)]" />
                  )}
                  <div>
                    <div className="font-bold text-sm text-white">
                      {t.symbol}
                    </div>
                    <div className="text-xs text-zinc-500">
                      ${t.price.toFixed(4)}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-sm font-mono ${t.change24h >= 0 ? "text-[var(--chad-green)]" : "text-red-500"}`}
                >
                  {t.change24h >= 0 ? "+" : ""}
                  {t.change24h.toFixed(2)}%
                </div>
              </Link>
            ))
          )}
        </div>
      </aside>

      {/* Middle Column: Chart & Info */}
      <main className="flex-1 flex flex-col border-r border-zinc-800 min-w-0 bg-black overflow-y-auto custom-scrollbar">
        {/* Token Info Header */}
        <div className="p-4 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {isOverviewLoading ? (
              <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse" />
            ) : overview?.logoURI ? (
              <img
                src={overview.logoURI}
                alt={overview.symbol}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-zinc-800" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">
                  {isOverviewLoading
                    ? "Loading..."
                    : overview?.symbol || "Unknown"}
                </h1>
                <span className="text-zinc-500 text-sm bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                  / USD
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-mono text-zinc-400">
                  {tokenAddress.slice(0, 8)}...{tokenAddress.slice(-8)}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(tokenAddress)}
                  className="text-zinc-500 hover:text-white transition-colors"
                  title="Copy address"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-3xl text-[var(--chad-green)] font-mono font-bold">
              $
              {isOverviewLoading
                ? "0.00"
                : overview?.price?.toFixed(6) || "0.00"}
            </div>
            <div
              className={`text-sm font-bold flex items-center gap-1 ${
                (overview?.v24hChangePercent || 0) >= 0
                  ? "text-[var(--chad-green)]"
                  : "text-red-500"
              }`}
            >
              {(overview?.v24hChangePercent || 0) >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {(overview?.v24hChangePercent || 0) >= 0 ? "+" : ""}
              {overview?.v24hChangePercent?.toFixed(2) || "0.00"}% (24h)
            </div>
          </div>
        </div>

        {/* Market Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-800 bg-zinc-950/30">
          <div className="p-4 border-r border-b md:border-b-0 border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 font-bold tracking-wider">
              MARKET CAP
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-white">
                ${formatNumber(overview?.mc)}
              </span>
            )}
          </div>
          <div className="p-4 border-r border-b md:border-b-0 border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 font-bold tracking-wider">
              24H VOLUME
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-white">
                ${formatNumber(overview?.v24hUSD)}
              </span>
            )}
          </div>
          <div className="p-4 border-r border-zinc-800 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 font-bold tracking-wider">
              LIQUIDITY
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-white">
                ${formatNumber(overview?.liquidity)}
              </span>
            )}
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-xs text-zinc-500 font-bold tracking-wider">
              SUPPLY
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-white">
                {formatNumber(overview?.supply)}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-4">
          {/* Chart Area */}
          <div className="h-[400px] shrink-0 w-full relative">
            <TradingViewChart tokenAddress={tokenAddress} />
          </div>

          {/* Lower Area: Tabs (Live Trades / Holders) */}
          <div className="flex-1 flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden min-h-[300px]">
            <div className="flex border-b border-zinc-800">
              <button
                onClick={() => setActiveTab("trades")}
                className={`flex-1 p-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "trades"
                    ? "bg-zinc-900 text-[var(--chad-green)] border-b-2 border-[var(--chad-green)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                }`}
              >
                <Activity size={16} />
                LIVE TRADES
              </button>
              <button
                onClick={() => setActiveTab("holders")}
                className={`flex-1 p-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "holders"
                    ? "bg-zinc-900 text-[var(--chad-purple)] border-b-2 border-[var(--chad-purple)]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                }`}
              >
                <Users size={16} />
                TOP HOLDERS
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {activeTab === "trades" ? (
                isTradesLoading ? (
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 bg-zinc-800 rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : trades?.length ? (
                  <table className="w-full text-sm text-left font-mono">
                    <thead className="text-xs text-zinc-500 sticky top-0 bg-zinc-950">
                      <tr>
                        <th className="px-4 py-2 font-normal">TIME</th>
                        <th className="px-4 py-2 font-normal">TYPE</th>
                        <th className="px-4 py-2 font-normal">USD</th>
                        <th className="px-4 py-2 font-normal">TOKENS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {trades.map((t, i) => (
                        <tr key={i} className="hover:bg-zinc-900/50">
                          <td className="px-4 py-2 text-zinc-400">
                            {new Date(t.blockTime * 1000).toLocaleTimeString(
                              [],
                              { hour12: false }
                            )}
                          </td>
                          <td
                            className={`px-4 py-2 font-bold ${t.side === "buy" ? "text-[var(--chad-green)]" : "text-red-500"}`}
                          >
                            {t.side.toUpperCase()}
                          </td>
                          <td className="px-4 py-2">
                            ${t.volumeUSD.toFixed(2)}
                          </td>
                          <td className="px-4 py-2">
                            {t.tokens.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center text-zinc-500 italic text-sm">
                    No recent trades found.
                  </div>
                )
              ) : isHoldersLoading ? (
                <div className="p-4 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 bg-zinc-800 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : holders?.length ? (
                <table className="w-full text-sm text-left font-mono">
                  <thead className="text-xs text-zinc-500 sticky top-0 bg-zinc-950">
                    <tr>
                      <th className="px-4 py-2 font-normal">RANK</th>
                      <th className="px-4 py-2 font-normal">ADDRESS</th>
                      <th className="px-4 py-2 font-normal">AMOUNT</th>
                      <th className="px-4 py-2 font-normal">% SUPPLY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {holders.map((h, i) => (
                      <tr key={i} className="hover:bg-zinc-900/50">
                        <td className="px-4 py-2 text-zinc-500">#{i + 1}</td>
                        <td className="px-4 py-2">
                          {h.owner.slice(0, 4)}...{h.owner.slice(-4)}
                        </td>
                        <td className="px-4 py-2">
                          {h.uiAmount.toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          {(
                            (h.uiAmount / (overview?.supply || 1)) *
                            100
                          ).toFixed(2)}
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-zinc-500 italic text-sm">
                  No holders data found.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Right Column: Action & Position */}
      <aside className="w-full lg:w-96 flex flex-col bg-zinc-950 overflow-y-auto custom-scrollbar">
        {/* Top Half: Swap Panels */}
        <div className="p-4 border-b border-zinc-800">
          <SwapPanel
            tokenAddress={tokenAddress}
            selectedToken={selectedToken}
          />
        </div>

        {/* Bottom Half: User Position (Portfolio) */}
        <div className="flex-1">
          <PortfolioBalances />
        </div>
      </aside>
    </div>
  );
}

export default function TradePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);

  return <TradeContent tokenAddress={resolvedParams.token} />;
}
