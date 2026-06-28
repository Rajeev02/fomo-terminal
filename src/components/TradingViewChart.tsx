"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ColorType,
  CandlestickSeries,
  HistogramSeries,
  UTCTimestamp,
} from "lightweight-charts";
import { useTokenHistory } from "@/hooks/useBirdeye";

interface TradingViewChartProps {
  tokenAddress: string;
}

const TIMEFRAMES = [
  { label: "15m", value: "15m" },
  { label: "1H", value: "1H" },
  { label: "4H", value: "4H" },
  { label: "1D", value: "1D" },
];

export function TradingViewChart({ tokenAddress }: TradingViewChartProps) {
  const theme = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState("1H");

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const {
    data: historyData,
    isLoading,
    error,
  } = useTokenHistory(tokenAddress, timeframe);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !chartContainerRef.current || !historyData) return;

    // Helper to extract computed Tailwind theme variables
    const getCssVar = (name: string, fallback: string): string => {
      if (typeof window === "undefined") return fallback;
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return val || fallback;
    };

    const isLight = theme === "light";
    const bgColor = getCssVar("--bg-primary", isLight ? "#ffffff" : "#060510");
    const textColor = getCssVar(
      "--foreground",
      isLight ? "#09090b" : "#eaedff"
    );
    const gridColor = getCssVar(
      "--bg-tertiary",
      isLight ? "#e4e4e7" : "#1a1a24"
    );
    const greenColor = getCssVar(
      "--chad-green",
      isLight ? "#22c55e" : "#39ff14"
    );
    const purpleColor = getCssVar("--chad-purple", "#9d00ff");
    const redColor = "#ef4444";

    const downColor = theme === "chad" ? purpleColor : redColor;

    // Create the chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor: textColor,
        fontFamily: "Geist Mono, monospace",
      },
      grid: {
        vertLines: { color: gridColor, style: 2 }, // dotted/dashed lines
        horzLines: { color: gridColor, style: 2 },
      },
      timeScale: {
        borderColor: gridColor,
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: gridColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    chartRef.current = chart;

    // Add Candlestick Series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: greenColor,
      downColor: downColor,
      borderUpColor: greenColor,
      borderDownColor: downColor,
      wickUpColor: greenColor,
      wickDownColor: downColor,
    });

    // Format historical data for candlesticks
    const chartData = historyData.map((d) => ({
      time: d.time as UTCTimestamp,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candlestickSeries.setData(chartData);

    // Adjust scale margins for Candlesticks
    candlestickSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });

    // Add Volume Series as Histogram
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // Overlay scale (no secondary scale axis)
    });

    // Format historical data for volume
    const volumeData = historyData.map((d) => ({
      time: d.time as UTCTimestamp,
      value: d.volume,
      color: d.close >= d.open ? `${greenColor}44` : `${downColor}44`, // transparent green/red (25% opacity)
    }));

    volumeSeries.setData(volumeData);

    // Adjust scale margins for Volume (keep in bottom 20%)
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Resizing Handler
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight
        );
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    // Initial fit
    chart.timeScale().fitContent();

    // Cleanup on unmount or update
    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [mounted, historyData, theme]);

  if (!tokenAddress) return null;

  return (
    <div className="w-full h-full bg-bg-secondary rounded-xl overflow-hidden border border-foreground/10 shadow-2xl relative flex flex-col p-4">
      {/* Header controls inside the card */}
      <div className="flex items-center justify-between pb-3 border-b border-foreground/5 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono tracking-widest text-muted-foreground uppercase">
            Market History
          </span>
        </div>

        {/* Timeframe switcher */}
        <div className="flex items-center bg-bg-tertiary rounded-lg p-0.5 border border-foreground/5">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                timeframe === tf.value
                  ? theme === "chad"
                    ? "bg-[var(--chad-green)] text-black shadow-sm"
                    : theme === "light"
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-primary text-foreground shadow-sm"
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 w-full relative min-h-[300px] mt-3">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary z-10 animate-pulse">
            <span className="text-muted-foreground font-bold font-mono text-sm tracking-widest animate-pulse">
              LOADING CHARTS...
            </span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary z-10 p-4 text-center">
            <span className="text-red-500 font-bold font-mono text-sm mb-2">
              FAILED TO LOAD CHART DATA
            </span>
            <span className="text-xs text-muted-foreground">
              Verify your API connection or check token address.
            </span>
          </div>
        )}

        <div ref={chartContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
