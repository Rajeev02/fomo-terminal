"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthenticated } = useAuth();
  const router = useRouter();

  const isMockAppId = !process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  useEffect(() => {
    if (isMockAppId) return;

    // Once Privy is ready, if the user isn't authenticated, redirect to the home page
    if (isReady && !isAuthenticated) {
      router.push("/");
    }
  }, [isReady, isAuthenticated, router, isMockAppId]);

  // Show a full-screen loading state while checking session
  if (!isMockAppId && (!isReady || !isAuthenticated)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-foreground/10 border-t-[var(--chad-green)] animate-spin" />
          <div className="text-foreground/50 font-mono text-sm tracking-widest animate-pulse">
            AUTHENTICATING...
          </div>
        </div>
      </div>
    );
  }

  // Render the protected content once verified
  return <>{children}</>;
}
