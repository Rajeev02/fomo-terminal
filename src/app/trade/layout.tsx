import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export const metadata = {
  title: "Trading Terminal | ChadWallet",
  description: "Trade like a Chad on Solana.",
};

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
