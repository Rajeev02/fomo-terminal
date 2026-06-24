import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.BIRDEYE_API_KEY;

  if (!apiKey) {
    // Return mock data if no API key is configured
    return NextResponse.json({
      success: true,
      data: [
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
      ],
    });
  }

  try {
    const response = await fetch(
      "https://public-api.birdeye.so/defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=0&limit=20",
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`BirdEye API error: ${response.statusText}`);
    }

    const json = await response.json();

    // Transform BirdEye response to our Token format
    const tokens = json.data.tokens.map(
      (t: {
        address: string;
        symbol: string;
        price: number;
        price_change_24h_percent: number;
        logoURI: string;
      }) => ({
        address: t.address,
        symbol: t.symbol,
        price: t.price || 0,
        change24h: t.price_change_24h_percent || 0,
        logoURI: t.logoURI,
      })
    );

    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    console.error("Failed to fetch trending tokens:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
