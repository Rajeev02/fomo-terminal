# ⚡ ChadWallet (FomoTerminal)

[![ChadWallet Live Dashboard](https://img.shields.io/badge/Live-Vercel-39FF14?style=for-the-badge&logo=vercel&logoColor=black)](https://fomo-terminal.vercel.app/)
[![Solana Powered](https://img.shields.io/badge/Solana-Mainnet-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/)
[![React Version](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Next.js Version](https://img.shields.io/badge/Next.js-16--Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

## Overview
**ChadWallet (FomoTerminal)** is a premium, high-performance web-based trading terminal designed specifically for the Solana blockchain. By integrating slick aesthetics with social-first crypto onboarding principles, ChadWallet completely removes the traditional friction points associated with Web3. Using embedded wallets and social log-ins, it offers a "gasless-feeling" Web2-like user experience combined with the power of DeFi.

## Features
- **Frictionless Social Authentication:** Seamless one-click login using Google or Apple via Privy.
- **Embedded Invisible Wallets:** Instantly provisions non-custodial Solana wallets upon authentication. No seed phrases or browser extensions required.
- **High-Performance Trading Terminal:** Responsive three-column layout featuring token discovery, dynamic canvas charts, and Jupiter DEX integration.
- **Native Canvas-Based Charting:** Implements `@tradingview/lightweight-charts` for smooth, interactive, and customizable charting experiences without iframe lag.
- **Optimal Price Swaps:** Leverages the Jupiter API to source the best swap routes and lowest slippage across Solana DEX pools.
- **Automated API Resiliency:** Includes intelligent key rotation and automatic mock-data fallbacks to guarantee 100% uptime when external data providers (like Birdeye) hit rate limits.

## Architecture
The application is built on a modern Next.js 16 (App Router) foundation:
- **Client/Frontend:** Uses React 19, Tailwind CSS v4, and Zustand to render highly responsive UI components and manage client-side state.
- **Data Layer:** React Query (TanStack) orchestrates real-time polling and cache invalidation.
- **Server API Proxies:** Next.js Serverless API routes act as intermediaries to fetch data, handle API key rotation securely, and hide sensitive tokens from the client.
- **Blockchain Interface:** Privy handles wallet provisioning, while Alchemy RPCs and `@solana/web3.js` are used for broadcasting signed transactions.

## Technology Stack
- **Framework:** Next.js 16 (App Router), React 19, Turbopack
- **Styling:** Tailwind CSS v4, clsx, tailwind-merge
- **State Management:** Zustand, React Query (TanStack)
- **Web3 / Auth:** Privy React SDK, @solana/web3.js
- **DeFi:** Jupiter API (DEX Aggregator)
- **Data Visualization:** Lightweight Charts (@tradingview/lightweight-charts)
- **Tooling:** TypeScript, ESLint, Prettier, Husky

## Project Structure
```text
fomo-terminal/
├── docs/                      # Technical flow and end-to-end user guides
├── public/                    # Static branding graphics and mp4 previews
├── src/
│   ├── app/                   # Next.js App Router (Pages, Layouts)
│   │   ├── api/               # Server-side API proxy routes (resilient endpoints)
│   │   ├── trade/             # Trading Dashboard route
│   │   └── page.tsx           # Home Landing Page
│   ├── components/            # Reusable UI widgets (Auth, Swap, Chart, etc.)
│   ├── config/                # Environment schema validation
│   ├── hooks/                 # Centralized fetching hooks (useSolana, useBirdeye)
│   ├── lib/                   # Utility libraries and core functions
│   ├── store/                 # Zustand theme and panel preferences
│   └── utils/                 # Resilient helper utilities (fetchBirdEye key rotation)
├── .env.local                 # Local environment keys (ignored by Git)
├── package.json               # Dependency libraries and project run scripts
└── tsconfig.json              # TypeScript compilation rules
```

## Prerequisites
- **Node.js** v20.x or higher
- **npm** v10.x or higher
- API Keys for **Privy**, **Birdeye**, and **Alchemy**.

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Rajeev02/fomo-terminal.git
cd fomo-terminal
npm install
```

## Configuration
Create a `.env.local` file in the root directory and populate it with the required keys:
```env
# Comma-separated BirdEye keys for automated rate-limit rotation
BIRDEYE_API_KEY=your_key_1,your_key_2

# Solana network configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# Privy App ID for wallet auth
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Alchemy RPC endpoint to broadcast signed transactions
NEXT_PUBLIC_ALCHEMY_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/your_alchemy_key
```

## Quick Start
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Explore:** Use the left navigation panel on the trading dashboard to discover trending Solana tokens.
- **Chart Analysis:** Interact with the native canvas charts. Switch between timeframes (15m, 1H, 1D) directly from the UI.
- **Trade:** Authenticate via a social login to instantly provision an embedded wallet. Use the Jupiter-powered swap panel on the right to execute optimal trades.
- **Portfolio:** View your active token balances in real-time within the portfolio section.

## API Reference/CLI
This project communicates with the following core APIs:
- **Jupiter API (v6):** `/quote` and `/swap` endpoints for routing and transaction building.
- **Birdeye API:** Endpoints like `/defi/history_price` and `/defi/tokenlist` proxied through Next.js API routes under `src/app/api/` with multi-key rotation and caching.
- **Privy API:** Handled automatically via the `@privy-io/react-auth` SDK for wallet authentication.

## Testing
Ensure code quality by running linting and formatting tools:
```bash
npm run lint
```
Pre-commit hooks are configured using Husky to automatically run linting via `lint-staged`.

## Deployment/Publishing
ChadWallet is optimized for deployment on Vercel:
1. Push your repository to GitHub.
2. Import the project in your Vercel Dashboard.
3. Configure the Environment Variables present in your `.env.local`.
4. Deploy. Vercel automatically detects Next.js and configures the build settings (`npm run build`).

## Security
- **Non-Custodial Embedded Wallets:** Private keys are isolated and never touch the application's servers, relying purely on Privy’s secure infrastructure.
- **API Key Masking:** External data provider API keys (e.g., Birdeye) are strictly kept server-side and never exposed to the client.
- **Input Validation:** Zod is used (where applicable) to validate configuration and API payloads.

## Performance
- **Zero Iframe Footprint:** Migrated from bloated TradingView widgets to lightweight native canvas charts.
- **Optimized Builds:** Powered by Next.js Turbopack for rapid compilation and efficient server-side rendering.
- **Edge Caching:** Ready for Vercel's Edge Network to serve static assets and cache API responses effectively.

## Contributing
We welcome contributions to ChadWallet! Please adhere to standard fork/pull-request workflows:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.
