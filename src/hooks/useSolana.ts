import { useQuery } from "@tanstack/react-query";
import { getSolBalance, getTokenBalances } from "@/lib/solana/queries";
import { useAuth } from "./useAuth";

export function useSolana() {
  const { walletAddress } = useAuth();

  const solBalanceQuery = useQuery({
    queryKey: ["solBalance", walletAddress],
    queryFn: () => getSolBalance(walletAddress!),
    enabled: !!walletAddress,
    refetchInterval: 30000, // Refetch every 30s
  });

  const tokenBalancesQuery = useQuery({
    queryKey: ["tokenBalances", walletAddress],
    queryFn: () => getTokenBalances(walletAddress!),
    enabled: !!walletAddress,
    refetchInterval: 60000, // Refetch every 60s
  });

  return {
    solBalance: solBalanceQuery.data,
    isSolLoading: solBalanceQuery.isLoading,
    solError: solBalanceQuery.error,

    tokenBalances: tokenBalancesQuery.data,
    isTokensLoading: tokenBalancesQuery.isLoading,
    tokensError: tokenBalancesQuery.error,

    // Overall convenience booleans
    isLoading: solBalanceQuery.isLoading || tokenBalancesQuery.isLoading,
    isError: solBalanceQuery.isError || tokenBalancesQuery.isError,
  };
}
