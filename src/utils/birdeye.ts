import { env } from "@/config/env";

/**
 * Perform a resilient fetch to the BirdEye API.
 * Dynamically cycles through a list of comma-separated API keys if rate-limited or encountering network errors.
 */
export async function fetchBirdEye(url: string, revalidateSeconds = 60) {
  const apiKeysStr = env.BIRDEYE_API_KEY || "";
  const apiKeys = apiKeysStr
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  if (apiKeys.length === 0) {
    throw new Error("No BirdEye API key configured");
  }

  let lastError = null;
  for (const apiKey of apiKeys) {
    try {
      const response = await fetch(url, {
        headers: {
          "X-API-KEY": apiKey,
          "x-chain": "solana",
        },
        next: { revalidate: revalidateSeconds },
      });

      if (response.ok) {
        return await response.json();
      }

      lastError = new Error(
        `BirdEye API error: ${response.status} ${response.statusText}`
      );
      console.warn(
        `BirdEye key rotation: Key ${apiKey.slice(0, 4)}... failed with status ${response.status}. Retrying with next key...`
      );
    } catch (err) {
      lastError = err;
      console.warn(
        `BirdEye key rotation: Key ${apiKey.slice(0, 4)}... threw error. Retrying with next key...`
      );
    }
  }

  throw lastError || new Error("All BirdEye API keys failed");
}
