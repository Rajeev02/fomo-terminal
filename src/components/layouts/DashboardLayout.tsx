import React from "react";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-primary text-foreground">
      <Header />
      <ProtectedRoute>
        <div className="flex flex-1">
          {/* Sidebar placeholder - would typically map to 'isTerminalActive' or 'activeTab' in Zustand */}
          <aside className="hidden w-64 border-r border-white/10 bg-bg-secondary p-4 md:block">
            <nav className="flex flex-col space-y-2">
              <div className="text-zinc-500 font-mono text-xs mb-4 ml-2 tracking-widest font-bold">
                TERMINAL
              </div>
              <button className="text-left px-4 py-2 rounded-lg bg-[var(--chad-green)]/10 text-[var(--chad-green)] font-semibold text-sm transition-colors">
                Portfolio
              </button>
              <button className="text-left px-4 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-foreground font-semibold text-sm transition-colors">
                Swap
              </button>
              <button className="text-left px-4 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-foreground font-semibold text-sm transition-colors">
                Sniper
              </button>
            </nav>
          </aside>

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </ProtectedRoute>
    </div>
  );
}
