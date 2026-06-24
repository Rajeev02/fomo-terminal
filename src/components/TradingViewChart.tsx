"use client";

interface TradingViewChartProps {
  tokenAddress: string;
}

export function TradingViewChart({ tokenAddress }: TradingViewChartProps) {
  if (!tokenAddress) return null;

  const birdeyeWidgetUrl = `https://birdeye.so/tv-widget/${tokenAddress}?chain=solana&viewMode=pair&theme=dark`;

  return (
    <div className="w-full h-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative">
      {/* Loading Skeleton underneath iframe */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-zinc-900 animate-pulse">
        <span className="text-zinc-600 font-bold">Loading Chart...</span>
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
