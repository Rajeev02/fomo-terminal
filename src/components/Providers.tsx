"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { useLogoSrc } from "./Logo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // If the user hasn't provided an App ID, we use a placeholder that bypasses build checks
  const appId =
    process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cltxxxmockappid1234567890";

  const privyTheme = mounted && theme === "light" ? "light" : "dark";
  const logoSrc = useLogoSrc();

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: privyTheme,
          accentColor: "#39FF14",
          logo: logoSrc,
        },
        // Setup Google & Apple Auth
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
