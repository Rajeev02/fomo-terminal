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
    // Return mock data for development
    return NextResponse.json({
      success: true,
      data: {
        address,
        decimals: 9,
        symbol: "MOCK",
        name: "Mock Token",
        extensions: { description: "This is a mock token." },
        logoURI: "",
        liquidity: 1000000,
        price: 1.5,
        supply: 1000000000,
        mc: 1500000000,
        v24hUSD: 5000000,
        v24hChangePercent: 12.5,
      },
    });
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/token_overview?address=${address}`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        next: { revalidate: 10 }, // Cache for 10 seconds (near real-time)
      }
    );

    if (!response.ok) {
      throw new Error(`BirdEye API error: ${response.statusText}`);
    }

    const json = await response.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("Failed to fetch token overview:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch token overview" },
      { status: 500 }
    );
  }
}
