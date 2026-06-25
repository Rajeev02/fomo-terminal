"use client";

import Link from "next/link";
import { Moon, Sun, Zap } from "lucide-react";
import { AuthButton } from "./auth/AuthButton";
import { useAppStore } from "@/store/useAppStore";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const { theme, setTheme } = useAppStore();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "chad") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else setTheme("chad");
  };

  return (
    <header className="items-center h-13 pt-4 pb-2 px-6 justify-between hidden md:flex sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-foreground/5">
      <Link
        href="/"
        className="flex items-center text-foreground font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity"
      >
        <Logo className="w-8 h-8 mr-2" />
        CHAD<span className="text-[var(--chad-green)]">WALLET</span>
      </Link>
      <div className="flex gap-3">
        {!isAuthenticated && (
          <>
            <Link
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              className="hover:opacity-80 transition-opacity hidden sm:block"
            >
              <img
                src="/images/app-store.png"
                alt="Download on the App Store"
                className="h-[40px] w-auto rounded-lg"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              className="hover:opacity-80 transition-opacity hidden sm:block"
            >
              <img
                src="/images/google-play.png"
                alt="Get it on Google Play"
                className="h-[40px] w-auto rounded-lg"
              />
            </Link>
          </>
        )}
        <button
          onClick={cycleTheme}
          className="bg-bg-secondary backdrop-blur-md rounded-md hover:ring-foreground/20 hover:ring-1 hover:bg-bg-tertiary transition-all flex items-center justify-center p-2 border border-foreground/10 text-foreground/50 hover:text-foreground"
          title={`Current Theme: ${theme}`}
        >
          {mounted && theme === "dark" && <Moon size={18} />}
          {mounted && theme === "light" && <Sun size={18} />}
          {(!mounted || theme === "chad") && (
            <Zap size={18} className="text-[var(--chad-green)]" />
          )}
        </button>
        <AuthButton />
      </div>
    </header>
  );
}
