"use client";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Token = {
  address: string;
  symbol: string;
  price: number;
  change24h: number;
  logoURI?: string;
  decimals?: number;
};

function TokenIcon({ token }: { token: Token }) {
  const [error, setError] = useState(false);

  if (!token.logoURI || error) {
    return (
      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--chad-green)] to-[var(--chad-purple)] shrink-0" />
    );
  }

  return (
    <Image
      width={24}
      height={24}
      src={token.logoURI}
      alt={token.symbol}
      className="w-6 h-6 rounded-full object-cover shrink-0 bg-bg-tertiary"
      onError={() => setError(true)}
    />
  );
}

// Mock data to start with
const mockTokens: Token[] = [
  {
    address: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    price: 150.23,
    change24h: 5.2,
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    price: 1.0,
    change24h: 0.01,
  },
  {
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    symbol: "BONK",
    price: 0.000021,
    change24h: 15.4,
  },
  {
    address: "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk",
    symbol: "WEN",
    price: 0.00015,
    change24h: -2.3,
  },
  {
    address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    symbol: "JUP",
    price: 1.25,
    change24h: 8.7,
  },
  {
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    symbol: "$WIF",
    price: 2.3,
    change24h: 22.1,
  },
];

export function Banner({ reverse = false }: { reverse?: boolean }) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTokens(data.data);
        }
      })
      .catch((err) => console.error("Error fetching trending tokens:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Duplicate tokens to create a seamless infinite scroll effect
  const displayTokens = [...tokens, ...tokens, ...tokens];

  return (
    <div className="w-full overflow-hidden bg-bg-primary border-y border-foreground/10 py-3 relative flex items-center shadow-inner">
      <div
        className={`flex w-max space-x-8 animate-[marquee_120s_linear_infinite] ${reverse ? "[animation-direction:reverse]" : ""} hover:[animation-play-state:paused]`}
      >
        {isLoading
          ? // Skeleton loader
            Array.from({ length: 15 }).map((_, idx) => (
              <div
                key={`skel-${idx}`}
                className="flex items-center space-x-3 shrink-0 px-4 py-1"
              >
                <div className="w-6 h-6 rounded-full bg-bg-tertiary animate-pulse" />
                <div className="w-16 h-4 bg-bg-tertiary rounded animate-pulse" />
                <div className="w-16 h-4 bg-bg-tertiary rounded animate-pulse" />
              </div>
            ))
          : displayTokens.map((token, idx) => (
              <Link
                key={`${token.address}-${idx}`}
                href={`/trade/${token.address}`}
                className="flex items-center space-x-3 shrink-0 px-4 py-1 rounded-full hover:bg-bg-secondary transition-colors cursor-pointer group"
              >
                <TokenIcon token={token} />
                <span className="font-bold text-foreground group-hover:text-[var(--chad-green)] transition-colors">
                  {token.symbol}
                </span>
                <span className="text-foreground/60 font-mono">
                  $
                  {token.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </span>
                <span
                  className={`font-mono text-sm ${token.change24h >= 0 ? "text-[var(--chad-green)]" : "text-red-500"}`}
                >
                  {token.change24h > 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}
