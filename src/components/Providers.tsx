"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  // If the user hasn't provided an App ID, we use a placeholder that bypasses build checks
  const appId =
    process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cltxxxmockappid1234567890";

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#39FF14",
          logo: "/images/logo.png", // Replace with ChadWallet logo
        },
        // Setup Google and Apple Auth
        loginMethods: ["google", "apple"],
        // Automatically create a Solana wallet upon login
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PrivyProvider>
  );
}
