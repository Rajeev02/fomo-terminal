import { create } from "zustand";

interface AppState {
  isTerminalActive: boolean;
  activeTab: "portfolio" | "swap" | "sniper";
  theme: "dark" | "chad";

  // Actions
  setTerminalActive: (active: boolean) => void;
  setActiveTab: (tab: "portfolio" | "swap" | "sniper") => void;
  setTheme: (theme: "dark" | "chad") => void;
}

export const useAppStore = create<AppState>((set) => ({
  isTerminalActive: false,
  activeTab: "portfolio",
  theme: "chad",

  setTerminalActive: (active) => set({ isTerminalActive: active }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setTheme: (theme) => set({ theme }),
}));
