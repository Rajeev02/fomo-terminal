/**
 * A centralized fetch wrapper for external APIs.
 * Automatically handles JSON parsing and standard errors.
 */
export async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => null);
    throw new Error(
      `API Error: ${response.status} ${response.statusText} ${errorBody ? `- ${errorBody}` : ""}`
    );
  }

  return response.json() as Promise<T>;
}
