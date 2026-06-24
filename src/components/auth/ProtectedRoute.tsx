"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Once Privy is ready, if the user isn't authenticated, force login or redirect
    if (isReady && !isAuthenticated) {
      // Typically, apps might redirect to '/' or automatically open the login modal
      router.push("/");
      login();
    }
  }, [isReady, isAuthenticated, router, login]);

  // Show a full-screen loading state while checking session
  if (!isReady || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-[var(--chad-green)] animate-spin" />
          <div className="text-zinc-500 font-mono text-sm tracking-widest animate-pulse">
            AUTHENTICATING...
          </div>
        </div>
      </div>
    );
  }

  // Render the protected content once verified
  return <>{children}</>;
}
