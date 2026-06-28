import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

function getMockHolders() {
  return {
    items: [
      { owner: "7hF...9pL", uiAmount: 1500000, amount: "1500000000000000" },
      { owner: "2aB...3kQ", uiAmount: 850000, amount: "850000000000000" },
      { owner: "9cD...1rY", uiAmount: 420000, amount: "420000000000000" },
      { owner: "4wS...8xV", uiAmount: 200000, amount: "200000000000000" },
      { owner: "5kP...1tZ", uiAmount: 120000, amount: "120000000000000" },
    ],
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
      data: getMockHolders(),
    });
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/v3/token/holder?address=${address}&offset=0&limit=10`,
      {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(
        `BirdEye API error: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error(
      "Failed to fetch token holders, falling back to mock:",
      error
    );
    return NextResponse.json({
      success: true,
      data: getMockHolders(),
    });
  }
}
