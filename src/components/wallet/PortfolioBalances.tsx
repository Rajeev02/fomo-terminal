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
      <div className="p-6 bg-bg-secondary rounded-xl border border-foreground/10 flex flex-col items-center text-center">
        <Wallet className="mb-4 text-foreground/50" size={32} />
        <h3 className="font-bold text-lg mb-2">No Wallet Found</h3>
        <p className="text-foreground/50 text-sm mb-4">
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
    <div className="flex flex-col h-full bg-bg-primary">
      {/* Header: Wallet Address */}
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
        <h2 className="font-bold text-lg">Portfolio</h2>
        <button
          onClick={() => navigator.clipboard.writeText(walletAddress)}
          className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary hover:bg-bg-tertiary rounded-md text-xs font-mono text-foreground/60 hover:text-foreground transition-colors border border-foreground/10"
          title="Copy address"
        >
          {truncateAddress(walletAddress)}
          <Copy size={12} />
        </button>
      </div>

      {/* Main Balance Display */}
      <div className="p-6 border-b border-foreground/10 flex flex-col items-center justify-center">
        <div className="text-foreground/50 font-bold mb-2 tracking-widest text-xs">
          TOTAL BALANCE
        </div>
        {isSolLoading ? (
          <div className="flex items-center gap-2">
            <RefreshCw size={20} className="animate-spin text-foreground/50" />
            <span className="text-4xl font-black text-foreground/50">-.--</span>
          </div>
        ) : isError ? (
          <div className="text-red-500 text-sm">Failed to load balance</div>
        ) : (
          <div className="text-5xl font-black text-[var(--chad-green)] flex items-baseline gap-2">
            {solBalance?.toFixed(4) || "0.0000"}
            <span className="text-xl font-bold text-foreground/50">SOL</span>
          </div>
        )}
      </div>

      {/* Token List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-bold text-sm text-foreground/60 mb-4 px-2">
          SPL TOKENS
        </h3>
        {isTokensLoading ? (
          <div className="text-center p-4 text-foreground/50 flex justify-center">
            <RefreshCw size={16} className="animate-spin" />
          </div>
        ) : tokenBalances && tokenBalances.length > 0 ? (
          <div className="space-y-2">
            {tokenBalances.map((token) => (
              <div
                key={token.mint}
                className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary border border-foreground/10"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-foreground/50">
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
          <div className="text-center p-8 border border-dashed border-foreground/10 rounded-xl">
            <p className="text-foreground/50 text-sm">No SPL tokens found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
