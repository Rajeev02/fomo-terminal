"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSolana } from "@/hooks/useSolana";
import { Copy, RefreshCw, Wallet } from "lucide-react";
import { Button } from "../ui/Button";

function truncateAddress(address: string | undefined) {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function PortfolioBalances() {
  const { walletAddress, createWallet } = useAuth();
  const { solBalance, tokenBalances, isSolLoading, isTokensLoading, isError } =
    useSolana();

  if (!walletAddress) {
    return (
      <div className="p-6 bg-zinc-950/50 rounded-xl border border-zinc-800 flex flex-col items-center text-center">
        <Wallet className="mb-4 text-zinc-500" size={32} />
        <h3 className="font-bold text-lg mb-2">No Wallet Found</h3>
        <p className="text-zinc-500 text-sm mb-4">
          It looks like Privy hasn&apos;t provisioned an embedded wallet for you
          yet.
        </p>
        <Button onClick={createWallet} variant="default">
          Create Embedded Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/50">
      {/* Header: Wallet Address */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="font-bold text-lg">Portfolio</h2>
        <button
          onClick={() => navigator.clipboard.writeText(walletAddress)}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-md text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-zinc-800"
          title="Copy address"
        >
          {truncateAddress(walletAddress)}
          <Copy size={12} />
        </button>
      </div>

      {/* Main Balance Display */}
      <div className="p-6 border-b border-zinc-800 flex flex-col items-center justify-center">
        <div className="text-zinc-500 font-bold mb-2 tracking-widest text-xs">
          TOTAL BALANCE
        </div>
        {isSolLoading ? (
          <div className="flex items-center gap-2">
            <RefreshCw size={20} className="animate-spin text-zinc-500" />
            <span className="text-4xl font-black text-zinc-500">-.--</span>
          </div>
        ) : isError ? (
          <div className="text-red-500 text-sm">Failed to load balance</div>
        ) : (
          <div className="text-5xl font-black text-[var(--chad-green)] flex items-baseline gap-2">
            {solBalance?.toFixed(4) || "0.0000"}
            <span className="text-xl font-bold text-zinc-500">SOL</span>
          </div>
        )}
      </div>

      {/* Token List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-bold text-sm text-zinc-400 mb-4 px-2">
          SPL TOKENS
        </h3>
        {isTokensLoading ? (
          <div className="text-center p-4 text-zinc-500 flex justify-center">
            <RefreshCw size={16} className="animate-spin" />
          </div>
        ) : tokenBalances && tokenBalances.length > 0 ? (
          <div className="space-y-2">
            {tokenBalances.map((token) => (
              <div
                key={token.mint}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-zinc-500">
                    {truncateAddress(token.mint)}
                  </span>
                </div>
                <div className="font-bold">
                  {token.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500 text-sm">No SPL tokens found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
