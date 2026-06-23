"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { LogOut } from "lucide-react";

export function Header() {
  const { login, logout, authenticated, user } = usePrivy();
  
  // Find the user's Solana wallet address if they have one
  const solanaWallet = user?.linkedAccounts.find(
    (account): account is any => account.type === "wallet" && account.walletClientType === "privy" && account.chainType === "solana"
  );
  
  const address = solanaWallet?.address;
  const shortAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--chad-green)] to-[var(--chad-purple)]" />
        <span className="font-black text-xl tracking-tight text-white">ChadWallet</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {authenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700">
              <div className="w-2 h-2 rounded-full bg-[var(--chad-green)]" />
              <span className="font-mono text-sm text-zinc-300">
                {shortAddress || "Setting up wallet..."}
              </span>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              title="Log out"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="bg-[var(--chad-green)] text-black px-6 py-2 rounded-full font-bold hover:bg-[#2ae00e] transition-colors"
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
}
