import { usePrivy, useWallets } from "@privy-io/react-auth";

export function useAuth() {
  const { ready, authenticated, user, login, logout, createWallet } =
    usePrivy();
  const { wallets } = useWallets();

  // Find the Solana embedded wallet specifically, as we are a Solana app.
  const activeWallet =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wallets.find(
      (w: any) => w.walletClientType === "privy" && w.chainType === "solana"
    ) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wallets.find((w: any) => w.chainType === "solana");

  // Format the user's name based on their login method (email or google name)
  const userName =
    user?.google?.name ||
    user?.email?.address ||
    user?.apple?.email ||
    "Anon Chad";

  return {
    isReady: ready,
    isAuthenticated: authenticated,
    user,
    userName,
    walletAddress: activeWallet?.address,
    wallet: activeWallet,
    login,
    logout,
    createWallet,
  };
}
