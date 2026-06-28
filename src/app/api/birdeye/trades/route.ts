import { NextRequest, NextResponse } from "next/server";
import { fetchBirdEye } from "@/utils/birdeye";
import { env } from "@/config/env";

function getMockTrades() {
  return {
    items: Array.from({ length: 15 }).map((_, i) => ({
      txHash: `tx...${i}`,
      side: Math.random() > 0.5 ? "buy" : "sell",
      volumeUSD: Math.random() * 5000 + 100,
      tokens: Math.random() * 100000,
      blockTime: Date.now() - i * 15 * 1000,
    })),
  };
}

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
      data: getMockTrades(),
    });
  }

  try {
    const json = await fetchBirdEye(
      `https://public-api.birdeye.so/defi/txs/token?address=${address}&offset=0&limit=30&tx_type=swap`,
      5
    );
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
    console.error("Failed to fetch live trades, falling back to mock:", error);
    return NextResponse.json({
      success: true,
      data: getMockTrades(),
    });
  }
}
