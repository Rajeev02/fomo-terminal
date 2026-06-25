"use client";

import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// Utility to truncate long wallet addresses
function truncateAddress(address: string | undefined) {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function AuthButton() {
  const { isReady, isAuthenticated, login, logout, userName, walletAddress } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isReady && isAuthenticated && pathname === "/") {
      router.push("/trade");
    }
  }, [isReady, isAuthenticated, pathname, router]);

  if (!isReady) {
    return (
      <Button variant="secondary" className="gap-2 opacity-50" disabled>
        <span className="w-4 h-4 rounded-full border-2 border-zinc-500 border-t-transparent animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        {/* Auth Status & User Info */}
        <div className="hidden md:flex flex-col items-end mr-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{userName}</span>
            <div
              className="w-2 h-2 rounded-full bg-[var(--chad-green)] shadow-[0_0_10px_var(--chad-green)]"
              title="Authenticated"
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Wallet size={12} />
            <span>{truncateAddress(walletAddress)}</span>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={logout}
          className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10 gap-2"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={login}
      className="gap-2 font-bold ring-1 ring-bg-tertiary shadow-lg"
    >
      <LogIn size={16} /> Login
    </Button>
  );
}
