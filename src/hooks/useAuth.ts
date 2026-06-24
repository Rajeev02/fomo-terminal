import { usePrivy, useWallets } from "@privy-io/react-auth";

export function useAuth() {
  const { ready, authenticated, user, login, logout, createWallet } =
    usePrivy();
  const { wallets } = useWallets();

  // Privy supports embedded wallets, so we can find the Solana wallet attached to the user if any.
  // The first wallet is typically the embedded one created on login.
  const activeWallet =
    wallets.find((w) => w.walletClientType === "privy") || wallets[0];

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
    login,
    logout,
    createWallet,
  };
}
