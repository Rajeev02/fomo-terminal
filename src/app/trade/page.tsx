"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Token } from "@/components/Banner";

function TradeContent() {
  const searchParams = useSearchParams();
  const tokenAddress = searchParams.get("token") || "So11111111111111111111111111111111111111112";
  
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([]);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTrendingTokens(data.data);
        }
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-background">
      {/* Left Column: Trending List */}
      <aside className="w-full lg:w-80 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="font-bold text-lg">Trending Tokens</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {trendingTokens.map((t) => (
            <div 
              key={t.address} 
              className={`p-4 border-b border-zinc-800/50 hover:bg-zinc-800/50 cursor-pointer flex items-center justify-between ${t.address === tokenAddress ? 'bg-zinc-800/80 border-l-2 border-l-[var(--chad-green)]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--chad-green)] to-[var(--chad-purple)]" />
                <div>
                  <div className="font-bold">{t.symbol}</div>
                  <div className="text-sm text-zinc-500">${t.price.toFixed(4)}</div>
                </div>
              </div>
              <div className={`text-sm ${t.change24h >= 0 ? 'text-[var(--chad-green)]' : 'text-red-500'}`}>
                {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Middle Column: Chart & Info */}
      <main className="flex-1 flex flex-col border-r border-zinc-800 min-h-[500px]">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black">{trendingTokens.find(t => t.address === tokenAddress)?.symbol || "Loading..."} / USD</h1>
            <span className="text-xl text-[var(--chad-green)] font-mono">
              ${trendingTokens.find(t => t.address === tokenAddress)?.price.toFixed(4) || "0.00"}
            </span>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col">
          {/* Chart Placeholder */}
          <div className="flex-1 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 mb-4">
            <p className="text-zinc-500">TradingView Chart (Coming Soon)</p>
          </div>
          
          {/* Live Trades Stream Placeholder */}
          <div className="h-48 bg-zinc-900 rounded-lg border border-zinc-800 p-4 overflow-y-auto">
            <h3 className="font-bold mb-2">Live Trades</h3>
            <div className="text-zinc-500 text-sm italic">Connecting to stream...</div>
          </div>
        </div>
      </main>

      {/* Right Column: Swap Interface */}
      <aside className="w-full lg:w-96 flex flex-col bg-zinc-950/50 p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <h2 className="font-bold text-xl mb-6">Swap</h2>
          
          <div className="space-y-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
              <div className="text-sm text-zinc-500 mb-1">You pay</div>
              <div className="flex items-center justify-between">
                <input 
                  type="number" 
                  placeholder="0.0" 
                  className="bg-transparent text-2xl w-full outline-none"
                />
                <button className="bg-zinc-800 px-3 py-1 rounded-full font-bold">SOL</button>
              </div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-zinc-800 p-2 rounded-full border border-zinc-700">↓</div>
            </div>
            
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
              <div className="text-sm text-zinc-500 mb-1">You receive</div>
              <div className="flex items-center justify-between">
                <input 
                  type="number" 
                  placeholder="0.0" 
                  className="bg-transparent text-2xl w-full outline-none"
                  readOnly
                />
                <button className="bg-zinc-800 px-3 py-1 rounded-full font-bold">
                  {trendingTokens.find(t => t.address === tokenAddress)?.symbol || "..."}
                </button>
              </div>
            </div>
            
            <button className="w-full bg-[var(--chad-green)] text-black font-bold py-4 rounded-xl text-lg hover:bg-[#2ae00e] transition-colors mt-4">
              Connect Wallet to Swap
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function TradePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading trading interface...</div>}>
      <TradeContent />
    </Suspense>
  );
}
