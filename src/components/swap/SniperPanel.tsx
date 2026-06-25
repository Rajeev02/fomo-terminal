"use client";
import { useState } from "react";
import { Crosshair, Zap, Shield, Target } from "lucide-react";

interface SniperPanelProps {
  tokenAddress: string;
}

export function SniperPanel({ tokenAddress }: SniperPanelProps) {
  const [solAmount, setSolAmount] = useState("");
  const [tipAmount, setTipAmount] = useState("0.01");
  const [slippage, setSlippage] = useState("15");

  return (
    <div className="bg-bg-primary border border-[var(--chad-green)]/30 rounded-2xl p-4 shadow-xl shadow-[var(--chad-green)]/5">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-[var(--chad-green)]/10 rounded-lg text-[var(--chad-green)]">
          <Crosshair size={20} />
        </div>
        <h3 className="font-black text-lg text-foreground tracking-tight">
          MEME SNIPER
        </h3>
      </div>

      <div className="space-y-4">
        {/* Token Address Display */}
        <div className="bg-bg-secondary border border-foreground/10 rounded-xl p-3">
          <div className="text-xs text-foreground/50 font-bold mb-1 uppercase">
            Target Contract
          </div>
          <div className="font-mono text-sm text-foreground/70 truncate">
            {tokenAddress}
          </div>
        </div>

        {/* Snipe Settings */}
        <div className="bg-bg-secondary border border-foreground/10 rounded-xl p-3 focus-within:border-[var(--chad-green)] transition-colors">
          <div className="text-xs text-foreground/50 font-bold mb-1 uppercase">
            Amount to Snipe (SOL)
          </div>
          <input
            type="number"
            placeholder="1.0"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            className="bg-transparent text-2xl w-full outline-none font-mono text-foreground placeholder:text-foreground/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-secondary border border-foreground/10 rounded-xl p-3">
            <div className="text-xs text-foreground/50 font-bold mb-1 uppercase flex items-center gap-1">
              <Zap size={12} /> Jito Tip (SOL)
            </div>
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="bg-transparent text-lg w-full outline-none font-mono text-foreground"
            />
          </div>
          <div className="bg-bg-secondary border border-foreground/10 rounded-xl p-3">
            <div className="text-xs text-foreground/50 font-bold mb-1 uppercase flex items-center gap-1">
              <Shield size={12} /> Slippage (%)
            </div>
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="bg-transparent text-lg w-full outline-none font-mono text-foreground"
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-bg-tertiary rounded-lg p-3 text-sm font-mono text-foreground/60 flex items-start gap-2 border border-foreground/10">
          <div className="mt-0.5">
            <Target size={14} className="text-[var(--chad-purple)]" />
          </div>
          <div>
            <span className="font-bold text-[var(--chad-purple)] mb-1 block">
              COMING SOON
            </span>
            The sniper backend is currently being upgraded for v2. UI settings
            are saved locally.
          </div>
        </div>

        {/* Action Button */}
        <button
          disabled
          className="w-full font-black py-4 rounded-xl text-lg transition-colors shadow-lg mt-4 flex items-center justify-center gap-2 bg-bg-secondary text-foreground/50 cursor-not-allowed opacity-80"
        >
          <Crosshair size={20} />
          ENABLE SNIPER
        </button>
      </div>
    </div>
  );
}
