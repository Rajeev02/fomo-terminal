# ChadWallet Technical Documentation

## Architecture & Frameworks

ChadWallet is a serverless application deployed on Vercel, leveraging Next.js 16 (App Router) for both server-side and client-side rendering.

### Frontend

- **React & Next.js:** Utilizes Server Components for layout and initial routing, and Client Components (`"use client"`) for interactivity (e.g., wallet connection, Jupiter swaps).
- **Styling:** Tailwind CSS is used for utility-first styling. The `globals.css` defines a strict set of design tokens (CSS variables) to enforce the "fomo.family" dark mode/neon aesthetic and glassmorphism.
- **State Management:** `zustand` is used for global state management (e.g., theme toggle, tracking the currently selected token globally if needed). `react-query` handles async data fetching and caching for the BirdEye APIs.

### Authentication & Wallet

- **Privy (`@privy-io/react-auth`):** Handles the entire authentication flow. When a user signs in via Google or Apple, Privy verifies the identity and spins up an MPC (Multi-Party Computation) non-custodial Solana wallet.
- **Session Handling:** The Privy `Provider` wraps the application, exposing the `usePrivy` hook globally to check authentication status and retrieve the user's embedded wallet.

## API Integrations

### 1. BirdEye API

We utilize the BirdEye API heavily for read-only market data:

- `/api/trending`: Fetches the top trending tokens on Solana to populate the landing page marquee and the trading page sidebar.
- `/api/birdeye/token`: Fetches detailed metadata (price, volume, market cap) for a specific token address.
- `/api/birdeye/trades`: Fetches real-time trade history for the token.
- `/api/birdeye/holders`: Fetches the top token holders for the token.
  _Note: All BirdEye calls are proxied through Next.js Route Handlers (`src/app/api/...`) to keep the BirdEye API key hidden from the client._

### 2. Jupiter API

Jupiter is used for routing and executing swaps on Solana.

- `/api/jupiter/quote`: Fetches the optimal route and price for a swap between two tokens.
- `/api/jupiter/swap`: Generates the serialized unsigned transaction for the swap.
  _Once the serialized transaction is returned, the client deserializes it and signs it using the Privy embedded wallet provider before broadcasting it to the network via the Alchemy RPC._

### 3. TradingView Chart

To satisfy the charting requirement without bloating the bundle with a heavy charting library, we embed the official BirdEye TradingView widget via an `iframe` (`src/components/TradingViewChart.tsx`). This widget automatically loads the specific Solana token pair and syncs with our application's dark/light theme.

## File Structure Overview

- `/src/app`: Next.js App Router (Pages, Layouts, and API Route Handlers).
- `/src/components`: Reusable UI components (Header, SwapPanel, Chart, etc.).
- `/src/hooks`: Custom React hooks (e.g., `useAuth`, `useJupiter`, `useBirdeye`).
- `/src/store`: Zustand stores.
- `/public`: Static assets (Logo, screenshots, placeholder images).
- `/docs`: Project documentation.
