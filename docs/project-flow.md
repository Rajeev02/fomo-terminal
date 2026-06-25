# ChadWallet Project Flow

This document details the user journey and data flow within the ChadWallet application.

## 1. User Journey & Onboarding Flow

1. **Discovery (Landing Page)**
   - The user lands on `/`, where they see the ChadWallet branding, app download links, and live rotating banners of trending tokens.
   - The user can click "Login" in the header or click any token on the banner.

2. **Authentication Flow (Privy)**
   - If the user clicks "Login", the Privy modal appears.
   - The user selects Google or Apple.
   - Privy authenticates the user and seamlessly creates an embedded Solana wallet in the background.
   - The user is redirected to the `/trade` dashboard.

3. **Trading & Exploration**
   - On the `/trade` page, the user sees a list of trending tokens.
   - Clicking a token navigates them to `/trade/[tokenAddress]`.
   - The `/trade/[tokenAddress]` route loads the BirdEye TradingView chart, token metadata, live trades, and the Swap panel.

## 2. Swap Execution Data Flow (Jupiter)

When a user initiates a trade, the following data flow occurs:

1. **Quote Fetching:**
   - The user enters an input amount (e.g., 1 SOL) in the `SwapPanel`.
   - The frontend debounces the input and sends a request to `/api/jupiter/quote`.
   - The server proxies this to `quote-api.jup.ag` and returns the exact expected output amount and route plan.

2. **Transaction Building:**
   - The user clicks the "Swap" button.
   - The frontend sends the quote data and the user's Privy wallet address to `/api/jupiter/swap`.
   - The Jupiter API returns a serialized, unsigned base64 Solana transaction.

3. **Transaction Signing & Broadcasting:**
   - The frontend deserializes the transaction into a `VersionedTransaction` object.
   - The app uses `wallet.signTransaction()` (from Privy) to prompt the user's embedded wallet to securely sign the transaction.
   - The signed transaction is sent to the Solana network via the RPC node (Alchemy / Helius).
   - The user receives a success toast notification confirming the trade.

## 3. Deployment Flow (Vercel)

- Code is pushed to the `main` branch of the GitHub repository.
- Vercel automatically detects the Next.js project and begins the build process.
- Environment variables (`NEXT_PUBLIC_PRIVY_APP_ID`, `BIRDEYE_API_KEY`) are injected during the build and runtime phases.
- The build statically generates pages and provisions the Serverless Functions for the API routes.
- The site goes live globally on Vercel's edge network.
