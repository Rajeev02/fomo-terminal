"use client";

import React from "react";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAppStore } from "@/store/useAppStore";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-primary text-foreground">
      <Header />
      <ProtectedRoute>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden w-16 border-r border-foreground/10 bg-bg-secondary flex-col items-center py-4 md:flex flex-shrink-0 relative z-20">
            <nav className="flex flex-col space-y-4 w-full px-2">
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`flex justify-center p-3 rounded-xl transition-colors ${
                  activeTab === "portfolio"
                    ? "bg-foreground/10 text-foreground"
                    : "hover:bg-foreground/5 text-foreground/50 hover:text-foreground"
                }`}
                title="Portfolio"
              >
                <div className="w-5 h-5 border-2 border-current rounded-full" />
              </button>
              <button
                onClick={() => setActiveTab("swap")}
                className={`flex justify-center p-3 rounded-xl transition-colors ${
                  activeTab === "swap"
                    ? "bg-foreground/10 text-foreground"
                    : "hover:bg-foreground/5 text-foreground/50 hover:text-foreground"
                }`}
                title="Swap"
              >
                <div className="w-5 h-5 bg-current rounded-sm rotate-45" />
              </button>
              <button
                onClick={() => setActiveTab("sniper")}
                className={`flex justify-center p-3 rounded-xl transition-colors ${
                  activeTab === "sniper"
                    ? "bg-foreground/10 text-[var(--chad-green)]"
                    : "hover:bg-foreground/5 text-foreground/50 hover:text-foreground"
                }`}
                title="Sniper"
              >
                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                  <div className="w-1 h-1 bg-current rounded-full" />
                </div>
              </button>
            </nav>
          </aside>

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </ProtectedRoute>
    </div>
  );
}
