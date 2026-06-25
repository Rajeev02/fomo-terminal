"use client";
import { useAppStore } from "@/store/useAppStore";

interface TradingViewChartProps {
  tokenAddress: string;
}

export function TradingViewChart({ tokenAddress }: TradingViewChartProps) {
  const theme = useAppStore((state) => state.theme);

  if (!tokenAddress) return null;

  const chartTheme = theme === "light" ? "light" : "dark";
  const birdeyeWidgetUrl = `https://birdeye.so/tv-widget/${tokenAddress}?chain=solana&viewMode=pair&theme=${chartTheme}`;

  return (
    <div className="w-full h-full bg-bg-secondary rounded-xl overflow-hidden border border-foreground/10 shadow-2xl relative">
      {/* Loading Skeleton underneath iframe */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-bg-tertiary animate-pulse">
        <span className="text-muted-foreground font-bold font-mono">
          Loading Chart...
        </span>
      </div>
      <iframe
        key={tokenAddress}
        src={birdeyeWidgetUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        className="w-full h-full relative z-10"
        allowFullScreen
        title={`TradingView Chart for ${tokenAddress}`}
      />
    </div>
  );
}
