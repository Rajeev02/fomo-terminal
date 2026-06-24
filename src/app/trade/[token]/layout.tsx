import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const tokenAddress = resolvedParams.token;

  try {
    // Fetch token metadata from BirdEye public API
    const res = await fetch(
      `https://public-api.birdeye.so/defi/v3/token/meta-data/single?address=${tokenAddress}`,
      {
        headers: {
          "X-API-KEY":
            process.env.BIRDEYE_API_KEY ||
            "b46a2aee-55e1-45a8-ac36-bd360341ea22",
          "x-chain": "solana",
        },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (res.ok) {
      const data = await res.json();
      const symbol = data?.data?.symbol || "Token";
      const name = data?.data?.name || "SPL Token";

      return {
        title: `Trade ${symbol} | ChadWallet`,
        description: `Trade ${name} (${symbol}) instantly on ChadWallet. View live charts, top holders, and real-time market data.`,
        openGraph: {
          title: `Trade ${symbol} | ChadWallet`,
          description: `Trade ${name} (${symbol}) instantly on ChadWallet. View live charts, top holders, and real-time market data.`,
          images: data?.data?.logoURI ? [{ url: data?.data?.logoURI }] : [],
        },
      };
    }
  } catch (e) {
    console.error("Failed to fetch token metadata for SEO", e);
  }

  return {
    title: "Trade Token | ChadWallet",
    description:
      "Trade tokens instantly on ChadWallet. View live charts, top holders, and real-time market data.",
  };
}

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
