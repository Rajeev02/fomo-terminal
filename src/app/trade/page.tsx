import { redirect } from "next/navigation";

export default function TradeIndexPage() {
  // Default to Solana (SOL) if no token is specified
  redirect("/trade/So11111111111111111111111111111111111111112");
}
