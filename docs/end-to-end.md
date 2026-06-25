# ChadWallet End-to-End Documentation

## Overview

ChadWallet is a modern web application built for the Solana ecosystem, drawing design inspiration from platforms like fomo.family. It provides a seamless, gasless-feeling experience for users to discover trending tokens, view real-time market data, and execute swaps.

This document serves as the end-to-end (E2E) guide covering the features implemented to meet the Founding Engineer assessment criteria.

## 1. Landing Page (Minimum Requirement)

- **Brand Assets:** The application heavily utilizes the provided ChadWallet brand assets, including the Chad logo, dynamic theme-aware logo switching, and brand colors (e.g., `#39FF14` neon green).
- **Mobile App Links:** The App Store and Google Play download buttons are prominently featured in the `Header` and the `Hero` section to drive mobile conversions.
- **Rotating Token Banners:** Two rotating marquee banners (`Banner.tsx`) display live trending tokens at the top and bottom of the landing page. Clicking on any token in these banners immediately routes the user to the dedicated trading page for that specific token (`/trade/[token]`).

## 2. Authentication (Privy)

- **Social Logins:** Users can sign in using **Google** and **Apple** via the Privy SDK, eliminating the friction of traditional seed-phrase wallets.
- **Embedded Solana Wallet:** Upon successful login, Privy automatically provisions an embedded non-custodial Solana wallet for the user (`createOnLogin: "users-without-wallets"`). This wallet is entirely managed within the app and is used to sign swap transactions.

## 3. Trading UI (Bonus Requirement)

The Trading UI (`/trade/[token]`) is a fully functional dashboard broken into three primary sections:

- **Left Panel (Trending Tokens):** A sidebar listing the current top trending tokens on Solana, fetched live from the BirdEye API.
- **Middle Panel (Market Data):**
  - **Token Info:** Displays the token's current price, 24h change, market cap, and volume.
  - **Price Chart:** Integrates a TradingView chart via the BirdEye widget, providing real-time candlestick data for the selected token.
  - **Live Trades & Holders:** Two tabs display the most recent trades and the top token holders, fetched directly from BirdEye.
- **Right Panel (Swap / Action):**
  - **Swap UI:** Users can input an amount of SOL to buy the token (or vice versa).
  - **Jupiter Integration:** The app fetches real-time swap quotes from the Jupiter API (`/quote`) and executes trades via the Jupiter `/swap` endpoint. The transaction is signed securely using the user's embedded Privy wallet.

## 4. Technical Stack & Services Used

- **Frontend Framework:** Next.js 16 (App Router) + React + TailwindCSS.
- **Hosting:** Vercel (Edge network optimized, automated CI/CD).
- **Authentication:** Privy (Handles user sessions and embedded Solana wallets).
- **Data APIs:**
  - BirdEye API: Used for trending tokens, token price/metadata, holder lists, and live trades.
  - Jupiter API: Used for optimal routing and swap execution on Solana.
- **RPC:** Alchemy / Helius RPCs can be injected via the `NEXT_PUBLIC_SOLANA_RPC_URL` environment variable.

## 5. Development Notes (Accuracy & Environment)

- **Design Accuracy:** The UI mimics the fomo.family aesthetic—utilizing deep dark backgrounds, neon accents, glassmorphism (`backdrop-blur`), and monospace fonts for financial data.
- **Mainnet vs Devnet:** Jupiter's liquidity aggregator operates strictly on Solana Mainnet. Therefore, while UI testing can be done freely, executing actual swaps requires mainnet SOL. Users should fund their embedded Privy wallets with a small amount of mainnet SOL to test the end-to-end swap functionality.
