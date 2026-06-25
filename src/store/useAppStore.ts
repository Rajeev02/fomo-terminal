import { create } from "zustand";

type Theme = "dark" | "light" | "chad";

interface AppState {
  isTerminalActive: boolean;
  toggleTerminal: () => void;
  activeTab: "portfolio" | "swap" | "sniper";
  setActiveTab: (tab: "portfolio" | "swap" | "sniper") => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isMockAppId: boolean;
  setIsMockAppId: (isMock: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isTerminalActive: false,
  activeTab: "portfolio",
  theme: "chad",
  isMockAppId: false,

  toggleTerminal: () =>
    set((state) => ({ isTerminalActive: !state.isTerminalActive })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setTheme: (theme) => set({ theme }),
  setIsMockAppId: (isMock) => set({ isMockAppId: isMock }),
}));
