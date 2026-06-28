import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Missing address parameter" },
      { status: 400 }
    );
  }

  const apiKey = env.BIRDEYE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      success: true,
      data: {
        items: Array.from({ length: 15 }).map((_, i) => ({
          txHash: `tx...${i}`,
          side: Math.random() > 0.5 ? "buy" : "sell",
          volumeUSD: Math.random() * 5000 + 100,
          tokens: Math.random() * 100000,
          blockTime: Date.now() - i * 15 * 1000,
        })),
      },
    });
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/txs/token?address=${address}&offset=0&limit=30&tx_type=swap`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        next: { revalidate: 5 }, // Cache for 5 seconds for live trades
      }
    );

    if (!response.ok) {
      throw new Error(`BirdEye API error: ${response.statusText}`);
    }

    const json = await response.json();
    if (json.success && json.data?.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.data.items = json.data.items.map((item: any) => ({
        txHash: item.txHash,
        side: item.side,
        volumeUSD: Math.abs(
          (item.quote?.uiAmount || 0) * (item.quote?.price || 0)
        ),
        tokens: Math.abs(item.base?.uiAmount || 0),
        blockTime: (item.blockUnixTime || 0) * 1000,
      }));
    }
    return NextResponse.json(json);
  } catch (error) {
    console.error("Failed to fetch live trades:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live trades" },
      { status: 500 }
    );
  }
}
