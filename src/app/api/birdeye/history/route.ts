import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const type = searchParams.get("type") || "1H"; // e.g. 15m, 1H, 4H, 1D
  const timeFromStr = searchParams.get("timeFrom");
  const timeToStr = searchParams.get("timeTo");

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Missing address parameter" },
      { status: 400 }
    );
  }

  const timeTo = timeToStr
    ? parseInt(timeToStr)
    : Math.floor(Date.now() / 1000);

  // Calculate default timeFrom if not specified (approx 200 candles back)
  const getSecondsForType = (res: string): number => {
    const num = parseInt(res);
    const unit = res.replace(num.toString(), "").toLowerCase();
    switch (unit) {
      case "m":
        return num * 60;
      case "h":
        return num * 3600;
      case "d":
        return num * 86400;
      case "w":
        return num * 604800;
      default:
        return 3600; // default 1 hour
    }
  };

  const candleSeconds = getSecondsForType(type);
  const timeFrom = timeFromStr
    ? parseInt(timeFromStr)
    : timeTo - candleSeconds * 200;

  const apiKey = env.BIRDEYE_API_KEY;
  if (!apiKey) {
    // Generate high-quality mock OHLCV history for local testing
    // Generate a stable base price based on a simple hash of the token address
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      hash = address.charCodeAt(i) + ((hash << 5) - hash);
    }
    const basePrice = Math.abs(hash % 1000) / 100 + 0.1; // stable starting price e.g. 0.1 to 10.1

    const items = [];
    let currentPrice = basePrice;
    const count = 200;

    // Generate chronologically ordered candles from oldest to newest
    for (let i = count; i > 0; i--) {
      const candleTime = timeTo - i * candleSeconds;

      // Random walk generator
      const changePercent = (Math.random() - 0.48) * 0.04; // slight upward bias
      const open = currentPrice;
      const close = currentPrice * (1 + changePercent);
      const high = Math.max(open, close) * (1 + Math.random() * 0.02);
      const low = Math.min(open, close) * (1 - Math.random() * 0.02);
      const volume = Math.random() * 500000 + 50000;

      items.push({
        o: open,
        h: high,
        l: low,
        c: close,
        v: volume,
        unixTime: candleTime,
        address,
        type,
        currency: "usd",
      });

      currentPrice = close;
    }

    return NextResponse.json({
      success: true,
      data: {
        items,
        isScaledUiToken: false,
        multiplier: 1,
      },
    });
  }

  try {
    const url = `https://public-api.birdeye.so/defi/ohlcv?address=${address}&type=${type}&time_from=${timeFrom}&time_to=${timeTo}`;
    const response = await fetch(url, {
      headers: {
        "X-API-KEY": apiKey,
        "x-chain": "solana",
      },
      next: { revalidate: 30 }, // Cache history for 30 seconds
    });

    if (!response.ok) {
      throw new Error(`BirdEye OHLCV API error: ${response.statusText}`);
    }

    const json = await response.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("Failed to fetch OHLCV history:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch OHLCV history" },
      { status: 500 }
    );
  }
}
