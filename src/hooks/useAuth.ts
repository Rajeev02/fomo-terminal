import { usePrivy, useWallets } from "@privy-io/react-auth";

export function useAuth() {
  const { ready, authenticated, user, login, logout, createWallet } =
    usePrivy();
  const { wallets } = useWallets();

  // Find the Solana embedded wallet specifically, as we are a Solana app.
  const activeWallet =
    wallets.find(
      (w) =>
        w.walletClientType === "privy" &&
        (w as unknown as { chainType: string }).chainType === "solana"
    ) ||
    wallets.find(
      (w) => (w as unknown as { chainType: string }).chainType === "solana"
    );

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
