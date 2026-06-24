import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quoteResponse, userPublicKey, wrapAndUnwrapSol = true } = body;

    if (!quoteResponse || !userPublicKey) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const jupiterUrl = `https://quote-api.jup.ag/v6/swap`;

    const response = await fetch(jupiterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Jupiter API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating Jupiter swap transaction:", error);
    return NextResponse.json(
      { error: "Failed to generate swap transaction" },
      { status: 500 }
    );
  }
}
