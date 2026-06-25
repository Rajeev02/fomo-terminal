# ChadWallet

![ChadWallet Hero](./public/images/hero-section.png)

## What is this project?

ChadWallet is a modern, high-performance web application designed for the Solana ecosystem. It serves as an intuitive and frictionless gateway for users to discover trending tokens, view real-time market data, and execute decentralized swaps without the steep learning curve typically associated with crypto wallets.

## Why was this project created?

This project was developed as part of a Founding Engineer assessment for ChadWallet. The core objective was to build an application that mirrors the premium aesthetic of top-tier platforms (like fomo.family) while integrating a robust set of Web3 tools. The goal was to prove that complex blockchain interactions—like wallet creation and token swapping—can be abstracted into a seamless, user-friendly, "gasless-feeling" Web2-style experience.

## Goal to Achievement

**Goal:** Build a landing page and trading UI that leverages modern Web3 APIs and authentication methods to provide a frictionless Solana trading experience.
**Achievement:** Successfully delivered a responsive Next.js application that:

- Uses **Privy** to allow users to sign in with Google or Apple, automatically provisioning an embedded non-custodial Solana wallet.
- Fetches and displays live trending token data using the **BirdEye API**.
- Provides a comprehensive Trading UI with real-time charts (via **TradingView** widget), live trades, and holder data.
- Executes token swaps directly through the **Jupiter Aggregator API**, utilizing the embedded Privy wallet for secure, invisible transaction signing.

## Third-Party Libraries & SDKs

- **[Next.js 16](https://nextjs.org/):** The core React framework used for both server-side API proxying and client-side UI rendering.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development and strict design system adherence.
- **[Privy (`@privy-io/react-auth`)](https://privy.io/):** Handles social authentication (Google/Apple) and embedded Solana wallet creation.
- **[BirdEye API](https://birdeye.so/data-api):** Provides live market data (trending tokens, price, trades, holders).
- **[Jupiter API](https://station.jup.ag/docs/apis/swap-api):** Solana's premier liquidity aggregator used for optimal swap routing and transaction building.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Lightweight global state management (used for theme toggling).
- **[React Query](https://tanstack.com/query/latest):** Handles asynchronous data fetching and caching for the BirdEye market data.
- **[Lucide React](https://lucide.dev/):** Beautiful, consistent iconography used throughout the app.

## Project Structure

```text
ChadWallet/
├── docs/                      # Extensive end-to-end and technical documentation
├── public/                    # Static assets (images, logos, SVGs)
├── src/
│   ├── app/                   # Next.js App Router (Pages, Layouts)
│   │   ├── api/               # Server-side Route Handlers (API proxies for BirdEye/Jupiter)
│   │   ├── trade/             # Trading Dashboard routes
│   │   └── page.tsx           # Landing Page
│   ├── components/            # Reusable React UI Components
│   │   ├── auth/              # Auth buttons and protected route wrappers
│   │   ├── swap/              # Jupiter swap interface
│   │   └── ui/                # Base UI elements (Buttons, Tables, Tabs)
│   ├── config/                # Environment variable validation and config
│   ├── hooks/                 # Custom React hooks (useAuth, useBirdeye, useJupiter)
│   ├── store/                 # Zustand state stores
│   └── lib/                   # Utility functions (formatting, clsx)
├── next.config.ts             # Next.js configuration and SVG security policies
├── tailwind.config.ts         # Tailwind theme, colors, and animations
└── package.json               # Project dependencies and scripts
```

## Roadmap

While the core functionality for the assessment has been achieved, the following features are planned for future iterations:

1. **Portfolio Tracking:** A dedicated dashboard for users to view their embedded wallet's token balances and historical performance.
2. **Fiat On-Ramp:** Integration with Stripe or MoonPay to allow users to purchase SOL directly with a credit card to fund their embedded wallets.
3. **Advanced Charting:** Native integration of the full TradingView Lightweight Charts library for custom indicators and deeper technical analysis.
4. **Transaction History:** A clean, readable list of past swaps and transfers parsed from the Solana blockchain.
5. **Mobile App Deep Linking:** Seamless handoff from the web application to the native iOS and Android applications.
