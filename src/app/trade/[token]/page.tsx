"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { PortfolioBalances } from "@/components/wallet/PortfolioBalances";
import { useAppStore } from "@/store/useAppStore";
import { SniperPanel } from "@/components/swap/SniperPanel";
import {
  useTokenOverview,
  useLiveTrades,
  useTokenHolders,
} from "@/hooks/useBirdeye";
import { Token } from "@/components/Banner";
import { TradingViewChart } from "@/components/TradingViewChart";
import Link from "next/link";
import { Copy, TrendingUp, TrendingDown, Users, Activity } from "lucide-react";
import { SwapPanel } from "@/components/swap/SwapPanel";

function TradeContent({ tokenAddress }: { tokenAddress: string }) {
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);
  const [activeStatsTab, setActiveStatsTab] = useState<"trades" | "holders">(
    "trades"
  );
  const [topTab, setTopTab] = useState<"alerts" | "tokens" | "leaderboard">(
    "tokens"
  );
  const [listTab, setListTab] = useState<"watchlist" | "crypto" | "trending">(
    "trending"
  );
  const { activeTab: layoutTab } = useAppStore();

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
      <aside className="w-full lg:w-80 border-r border-foreground/10 flex flex-col bg-bg-primary">
        <div className="px-4 pt-4 pb-2 border-b border-foreground/10 flex flex-col gap-3">
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground tracking-wide">
            <span
              onClick={() => setTopTab("alerts")}
              className={`cursor-pointer ${topTab === "alerts" ? "text-foreground border-b border-foreground pb-1" : "hover:text-foreground"}`}
            >
              Alerts
            </span>
            <span
              onClick={() => setTopTab("tokens")}
              className={`cursor-pointer ${topTab === "tokens" ? "text-foreground border-b border-foreground pb-1" : "hover:text-foreground"}`}
            >
              Tokens
            </span>
            <span
              onClick={() => setTopTab("leaderboard")}
              className={`cursor-pointer ${topTab === "leaderboard" ? "text-foreground border-b border-foreground pb-1" : "hover:text-foreground"}`}
            >
              Leaderboard
            </span>
          </div>
          {topTab === "tokens" && (
            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground bg-bg-secondary rounded-lg p-1 w-full justify-between">
              <span
                onClick={() => setListTab("watchlist")}
                className={`flex-1 text-center py-1 rounded-md cursor-pointer transition-colors ${listTab === "watchlist" ? "bg-foreground/10 text-foreground shadow-sm" : "hover:text-foreground"}`}
              >
                Watchlist
              </span>
              <span
                onClick={() => setListTab("crypto")}
                className={`flex-1 text-center py-1 rounded-md cursor-pointer transition-colors ${listTab === "crypto" ? "bg-foreground/10 text-foreground shadow-sm" : "hover:text-foreground"}`}
              >
                Crypto
              </span>
              <span
                onClick={() => setListTab("trending")}
                className={`flex-1 text-center py-1 rounded-md cursor-pointer transition-colors ${listTab === "trending" ? "bg-foreground/10 text-foreground shadow-sm" : "hover:text-foreground"}`}
              >
                Trending
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {topTab !== "tokens" ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              {topTab === "alerts"
                ? "Alerts coming soon."
                : "Leaderboard coming soon."}
            </div>
          ) : listTab !== "trending" ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              {listTab === "watchlist"
                ? "Your watchlist is empty."
                : "Crypto list coming soon."}
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center text-muted-foreground animate-pulse">
              Loading trends...
            </div>
          ) : (
            trendingTokens.map((t) => (
              <Link
                href={`/trade/${t.address}`}
                key={t.address}
                className={`p-4 border-b border-foreground/10 hover:bg-foreground/5 cursor-pointer flex items-center justify-between transition-colors ${
                  t.address === tokenAddress
                    ? "bg-foreground/10 border-l-2 border-l-[var(--chad-green)]"
                    : "border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {t.logoURI ? (
                    <Image
                      width={24}
                      height={24}
                      src={t.logoURI}
                      alt={t.symbol}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--chad-green)] to-[var(--chad-purple)]" />
                  )}
                  <div>
                    <div className="font-bold text-sm text-foreground">
                      {t.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
      <main className="flex-1 flex flex-col border-r border-foreground/10 min-w-0 bg-bg-primary overflow-y-auto custom-scrollbar">
        {/* Token Info Header */}
        <div className="p-4 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {isOverviewLoading ? (
              <div className="w-12 h-12 rounded-full bg-bg-tertiary animate-pulse" />
            ) : overview?.logoURI ? (
              <Image
                width={24}
                height={24}
                src={overview.logoURI}
                alt={overview.symbol}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-bg-tertiary" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-foreground">
                  {isOverviewLoading
                    ? "Loading..."
                    : overview?.symbol || "Unknown"}
                </h1>
                <span className="text-muted-foreground text-sm bg-bg-secondary px-2 py-0.5 rounded-full border border-foreground/10">
                  / USD
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-mono text-muted-foreground">
                  {tokenAddress.slice(0, 8)}...{tokenAddress.slice(-8)}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(tokenAddress)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-foreground/10 bg-bg-secondary/30">
          <div className="p-4 border-r border-b md:border-b-0 border-foreground/10 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-bold tracking-wider">
              MARKET CAP
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-bg-tertiary rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-foreground">
                ${formatNumber(overview?.mc)}
              </span>
            )}
          </div>
          <div className="p-4 border-r border-b md:border-b-0 border-foreground/10 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-bold tracking-wider">
              24H VOLUME
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-bg-tertiary rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-foreground">
                ${formatNumber(overview?.v24hUSD)}
              </span>
            )}
          </div>
          <div className="p-4 border-r border-foreground/10 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-bold tracking-wider">
              LIQUIDITY
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-bg-tertiary rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-foreground">
                ${formatNumber(overview?.liquidity)}
              </span>
            )}
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-bold tracking-wider">
              SUPPLY
            </span>
            {isOverviewLoading ? (
              <div className="h-6 w-20 bg-bg-tertiary rounded animate-pulse" />
            ) : (
              <span className="text-lg font-mono text-foreground">
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
          <div className="flex-1 flex flex-col bg-bg-secondary border border-foreground/10 rounded-xl overflow-hidden min-h-[300px]">
            <div className="flex border-b border-foreground/10">
              <button
                onClick={() => setActiveStatsTab("trades")}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeStatsTab === "trades"
                    ? "border-[var(--chad-green)] text-[var(--chad-green)]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity size={16} />
                LIVE TRADES
              </button>
              <button
                onClick={() => setActiveStatsTab("holders")}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeStatsTab === "holders"
                    ? "border-[var(--chad-purple)] text-[var(--chad-purple)]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users size={16} />
                TOP HOLDERS
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeStatsTab === "trades" ? (
                isTradesLoading ? (
                  <div className="p-4 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 bg-bg-tertiary rounded animate-pulse"
                      />
                    ))}
                  </div>
                ) : trades?.length ? (
                  <table className="w-full text-sm text-left font-mono">
                    <thead className="text-[11px] uppercase tracking-wider text-muted-foreground sticky top-0 bg-bg-secondary border-b border-foreground/10">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-left">
                          Maker
                        </th>
                        <th className="px-4 py-3 font-semibold text-left">
                          Type
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Value
                        </th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5 text-xs">
                      {trades.map((t, i) => (
                        <tr
                          key={i}
                          className="hover:bg-foreground/5 cursor-pointer"
                        >
                          <td className="px-4 py-3 text-muted-foreground flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-50" />
                            {new Date(t.blockTime || 0).toLocaleTimeString([], {
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 font-bold ${t.side === "buy" ? "text-[var(--chad-green)]" : "text-red-500"}`}
                          >
                            {t.side.toUpperCase()}
                          </td>
                          <td className="px-4 py-3 font-mono text-right text-foreground">
                            ${(t.volumeUSD || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 font-mono text-right text-muted-foreground">
                            {(t.tokens || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center text-muted-foreground italic text-sm">
                    No recent trades found.
                  </div>
                )
              ) : isHoldersLoading ? (
                <div className="p-4 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 bg-bg-tertiary rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : holders?.length ? (
                <table className="w-full text-sm text-left font-mono">
                  <thead className="text-xs text-muted-foreground sticky top-0 bg-bg-secondary">
                    <tr>
                      <th className="px-4 py-2 font-normal">RANK</th>
                      <th className="px-4 py-2 font-normal">ADDRESS</th>
                      <th className="px-4 py-2 font-normal">AMOUNT</th>
                      <th className="px-4 py-2 font-normal">% SUPPLY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {holders.map((h, i) => (
                      <tr key={i} className="hover:bg-foreground/5">
                        <td className="px-4 py-2 text-muted-foreground">
                          #{i + 1}
                        </td>
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
                <div className="p-4 text-center text-muted-foreground italic text-sm">
                  No holders data found.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Right Column: Action & Position */}
      <aside className="w-full lg:w-96 flex flex-col bg-bg-secondary overflow-y-auto custom-scrollbar border-l border-foreground/10">
        <div className="flex-1 p-4">
          {layoutTab === "swap" && (
            <SwapPanel
              tokenAddress={tokenAddress}
              selectedToken={selectedToken}
            />
          )}
          {layoutTab === "sniper" && (
            <SniperPanel tokenAddress={tokenAddress} />
          )}
          {layoutTab === "portfolio" && <PortfolioBalances />}
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
