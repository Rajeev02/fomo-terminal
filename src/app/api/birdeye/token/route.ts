import { NextRequest, NextResponse } from "next/server";
import { fetchBirdEye } from "@/utils/birdeye";
import { env } from "@/config/env";

function getMockTokenOverview(address: string) {
  // Return different metadata seeds based on the address
  const isSol = address === "So11111111111111111111111111111111111111112";
  const isUsdc = address === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  const isBonk = address === "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";
  const isWen = address === "WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk";
  const isJup = address === "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN";
  const isWif = address === "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm";

  let symbol = "MOCK";
  let name = "Mock Token";
  let price = 1.5;
  let v24hChangePercent = 12.5;

  if (isSol) {
    symbol = "SOL";
    name = "Wrapped Solana";
    price = 150.23;
    v24hChangePercent = 5.2;
  } else if (isUsdc) {
    symbol = "USDC";
    name = "USD Coin";
    price = 1.0;
    v24hChangePercent = 0.01;
  } else if (isBonk) {
    symbol = "BONK";
    name = "Bonk";
    price = 0.000021;
    v24hChangePercent = 15.4;
  } else if (isWen) {
    symbol = "WEN";
    name = "Wen";
    price = 0.00015;
    v24hChangePercent = -2.3;
  } else if (isJup) {
    symbol = "JUP";
    name = "Jupiter";
    price = 1.25;
    v24hChangePercent = 8.7;
  } else if (isWif) {
    symbol = "$WIF";
    name = "dogwifhat";
    price = 2.3;
    v24hChangePercent = 22.1;
  }

  return {
    address,
    decimals: 9,
    symbol,
    name,
    extensions: {
      description: `This is a mockup payload for ${name} (${symbol}).`,
    },
    logoURI: "",
    liquidity: 1000000,
    price,
    supply: 1000000000,
    mc: price * 1000000000,
    v24hUSD: 5000000,
    v24hChangePercent,
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
      data: getMockTokenOverview(address),
    });
  }

  try {
    const json = await fetchBirdEye(
      `https://public-api.birdeye.so/defi/token_overview?address=${address}`,
      10
    );
    return NextResponse.json(json);
  } catch (error) {
    console.error(
      "Failed to fetch token overview, falling back to mock:",
      error
    );
    return NextResponse.json({
      success: true,
      data: getMockTokenOverview(address),
    });
  }
}
