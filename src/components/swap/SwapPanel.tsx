"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuote, useSwapTransaction } from "@/hooks/useJupiter";
import { Token } from "@/components/Banner";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { env } from "@/config/env";

const SOL_MINT = "So11111111111111111111111111111111111111112";
const SOL_DECIMALS = 9;

interface SwapPanelProps {
  tokenAddress: string;
  selectedToken?: Token | null;
}

export function SwapPanel({ tokenAddress, selectedToken }: SwapPanelProps) {
  const { walletAddress, wallet } = useAuth();
  const [swapTab, setSwapTab] = useState<"buy" | "sell">("buy");

  // UI State
  const [inputAmount, setInputAmount] = useState<string>("");
  const [debouncedAmount, setDebouncedAmount] = useState<string>("");
  const [slippage] = useState<number>(50); // 0.5% default

  // Debounce input to avoid spamming Jupiter API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAmount(inputAmount);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputAmount]);

  // Derived params for Quote
  const inputMint = swapTab === "buy" ? SOL_MINT : tokenAddress;
  const outputMint = swapTab === "buy" ? tokenAddress : SOL_MINT;

  // Convert input to lamports (assuming token decimals for sell, SOL decimals for buy)
  // For simplicity, we assume token has 6 decimals if not provided, but ideally we'd fetch it.
  // SOL is 9. Let's fetch token decimals from selectedToken if possible, or fallback to 6.
  const tokenDecimals = selectedToken?.decimals || 6;
  const inputDecimals = swapTab === "buy" ? SOL_DECIMALS : tokenDecimals;

  let amountInSmallestUnits = "0";
  try {
    if (debouncedAmount && parseFloat(debouncedAmount) > 0) {
      amountInSmallestUnits = Math.floor(
        parseFloat(debouncedAmount) * Math.pow(10, inputDecimals)
      ).toString();
    }
  } catch {
    // Ignore parse errors
  }

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useQuote({
    inputMint,
    outputMint,
    amount: amountInSmallestUnits,
    slippageBps: slippage,
  });

  const outputDecimals = swapTab === "buy" ? tokenDecimals : SOL_DECIMALS;
  const outputAmountUI = quote
    ? (parseInt(quote.outAmount) / Math.pow(10, outputDecimals)).toFixed(4)
    : "";

  // Swap Mutation
  const { mutateAsync: generateSwap, isPending: isSwapping } =
    useSwapTransaction();

  const handleSwap = async () => {
    if (!walletAddress || !wallet) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!quote) {
      toast.error("No valid quote found");
      return;
    }

    try {
      toast.loading("Generating transaction...", { id: "swap" });
      const { swapTransaction } = await generateSwap({
        quoteResponse: quote,
        userPublicKey: walletAddress,
      });

      // Deserialize transaction from base64 string natively
      const swapTransactionBuf = Uint8Array.from(atob(swapTransaction), (c) =>
        c.charCodeAt(0)
      );
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      toast.loading("Please sign the transaction...", { id: "swap" });

      const connection = new Connection(
        env.NEXT_PUBLIC_ALCHEMY_RPC_URL || "https://api.mainnet-beta.solana.com"
      );

      // Send transaction using Privy
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const txHash = await (wallet as any).sendTransaction(
        transaction,
        connection
      );

      toast.success(
        <div className="flex flex-col gap-1">
          <span>Swap successful!</span>
          <a
            href={`https://solscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs underline text-zinc-400"
          >
            View on Solscan
          </a>
        </div>,
        { id: "swap" }
      );

      setInputAmount("");
    } catch (error) {
      console.error("Swap error:", error);
      toast.error(
        `Swap failed: ${(error as Error).message || "Unknown error"}`,
        { id: "swap" }
      );
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
      {/* Buy/Sell Tabs */}
      <div className="flex bg-zinc-950 rounded-xl p-1 mb-6 border border-zinc-800">
        <button
          onClick={() => {
            setSwapTab("buy");
            setInputAmount("");
          }}
          className={`flex-1 py-2 text-center rounded-lg font-bold text-sm transition-colors ${
            swapTab === "buy"
              ? "bg-[var(--chad-green)] text-black"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => {
            setSwapTab("sell");
            setInputAmount("");
          }}
          className={`flex-1 py-2 text-center rounded-lg font-bold text-sm transition-colors ${
            swapTab === "sell"
              ? "bg-red-500 text-white"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          SELL
        </button>
      </div>

      <div className="space-y-4">
        {/* Input Panel */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus-within:border-[var(--chad-green)] transition-colors">
          <div className="text-xs text-zinc-500 font-bold mb-1 uppercase">
            You pay
          </div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              placeholder="0.0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="bg-transparent text-2xl w-full outline-none font-mono text-white placeholder:text-zinc-700"
            />
            <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700 shrink-0">
              {swapTab === "buy" ? (
                <>
                  <Image
                    width={24}
                    height={24}
                    src="/images/logo.png"
                    alt="SOL"
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="font-bold text-sm text-white">SOL</span>
                </>
              ) : (
                <>
                  {selectedToken?.logoURI ? (
                    <Image
                      width={24}
                      height={24}
                      src={selectedToken.logoURI}
                      alt="Token"
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[var(--chad-green)]" />
                  )}
                  <span className="font-bold text-sm text-white">
                    {selectedToken?.symbol || "..."}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <div className="bg-zinc-800 p-2 rounded-xl border border-zinc-700 text-white shadow-lg">
            {isQuoteLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
            ) : (
              "↓"
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus-within:border-[var(--chad-green)] transition-colors">
          <div className="text-xs text-zinc-500 font-bold mb-1 uppercase">
            You receive
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="0.0"
              value={outputAmountUI}
              readOnly
              className="bg-transparent text-2xl w-full outline-none font-mono text-white placeholder:text-zinc-700 cursor-not-allowed"
            />
            <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700 shrink-0">
              {swapTab === "sell" ? (
                <>
                  <Image
                    width={24}
                    height={24}
                    src="/images/logo.png"
                    alt="SOL"
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="font-bold text-sm text-white">SOL</span>
                </>
              ) : (
                <>
                  {selectedToken?.logoURI ? (
                    <Image
                      width={24}
                      height={24}
                      src={selectedToken.logoURI}
                      alt="Token"
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[var(--chad-green)]" />
                  )}
                  <span className="font-bold text-sm text-white">
                    {selectedToken?.symbol || "..."}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Price Impact & Details */}
        {quote && (
          <div className="px-2 py-1 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Price Impact: {quote.priceImpactPct}%</span>
            <span>
              Fee:{" "}
              {(
                parseInt(quote.routePlan[0]?.swapInfo?.feeAmount || "0") /
                Math.pow(10, inputDecimals)
              ).toFixed(6)}
            </span>
          </div>
        )}
        {isQuoteError && (
          <div className="px-2 py-1 text-xs text-red-500 font-mono">
            Unable to fetch quote. Not enough liquidity.
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSwap}
          disabled={!quote || isSwapping || isQuoteLoading || !walletAddress}
          className={`w-full font-black py-4 rounded-xl text-lg transition-colors shadow-lg mt-4 flex items-center justify-center gap-2 ${
            !walletAddress
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : !quote || isQuoteLoading
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : swapTab === "buy"
                  ? "bg-[var(--chad-green)] text-black hover:bg-[#2ae00e] shadow-[var(--chad-green)]/20"
                  : "bg-red-500 text-white hover:bg-red-400 shadow-red-500/20"
          }`}
        >
          {isSwapping ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Swapping...
            </>
          ) : !walletAddress ? (
            "Connect Wallet to Trade"
          ) : !quote ? (
            "Enter Amount"
          ) : swapTab === "buy" ? (
            "Quick Buy"
          ) : (
            "Quick Sell"
          )}
        </button>
      </div>
    </div>
  );
}
