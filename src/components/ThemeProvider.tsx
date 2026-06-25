"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    // Remove all previous theme classes
    root.classList.remove("theme-light", "theme-dark", "theme-chad");

    // Add the current theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return <>{children}</>;
}
