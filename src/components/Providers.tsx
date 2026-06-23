"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If the user hasn't provided an App ID, we use a placeholder that bypasses build checks
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cltxxxmockappid1234567890";

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#39FF14",
          logo: "https://auth.privy.io/logos/privy-logo-dark.png", // Replace with ChadWallet logo
        },
        // Setup Google and Apple Auth
        loginMethods: ["google", "apple"],
        // Automatically create a Solana wallet upon login
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          }
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
