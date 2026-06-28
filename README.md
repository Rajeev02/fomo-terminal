# ⚡ ChadWallet (FomoTerminal)

[![ChadWallet Live Dashboard](https://img.shields.io/badge/Live-Vercel-39FF14?style=for-the-badge&logo=vercel&logoColor=black)](https://fomo-terminal.vercel.app/)
[![Solana Powered](https://img.shields.io/badge/Solana-Mainnet-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/)
[![React Version](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Next.js Version](https://img.shields.io/badge/Next.js-16--Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

**ChadWallet** is a premium, high-performance web-based trading terminal designed for the Solana blockchain. Drawing aesthetic inspiration from slick, social-first crypto platforms like [fomo.family](https://fomo.family), ChadWallet abstracts away the typical friction points of Web3 onboarding—delivering a "gasless-feeling" Web2 user experience.

---

## 🚀 Key Features & Capabilities (What We Achieved)

### 1. Frictionless Social Authentication & Embedded Wallets

- **One-Click Social Logins:** Seamlessly authenticate using **Google** or **Apple** credentials powered by **Privy**.
- **Invisible Non-Custodial Wallets:** Privy instantly provisions an embedded, secure Solana wallet in the background upon login. Users do not need seed phrases, browser extensions, or pre-existing Web3 knowledge.

### 2. High-Performance Trading Terminal UI (`/trade/[token]`)

- **Three-Column Responsive Layout:**
  - _Left Column (Discovery):_ Real-time trending tokens list fetched live from the Solana ecosystem.
  - _Middle Column (Analysis):_ Token price information, native interactive charts, live trade history feeds, and top holders tables.
  - _Right Column (Actions):_ Jupiter DEX aggregator swap panels and real-time portfolio balance listings.
- **100% Mobile Responsive Optimization:** Integrates a sticky mobile bottom tab navigation bar (`Explore`, `Chart`, `Trade`, `Portfolio`) that toggles visibility of the active panel, transforming the stacked vertical viewport into a clean, single-focused app experience on small viewports.

### 3. Native Canvas-Based Charting (Lightweight Charts)

- **No Iframes:** Replaced lagging TradingView/BirdEye widget iframes with a native, interactive canvas chart using `@tradingview/lightweight-charts`.
- **Dynamic Timeframe Selectors:** Users can toggle resolutions ("15m", "1H", "4H", "1D") directly on the chart, triggering dynamic history windows and ticks.
- **Volume Panels:** Secondary volume histograms are rendered directly onto the bottom 20% of the chart canvas.
- **Instant Theme Synchronization:** Redesigned color-wick drawing to use a static TypeScript theme mapping (`getThemeColors`), resolving hydration race conditions and displaying instant theme updates (Dark/Light/Chad).

### 4. Optimal Price Swaps (Jupiter Aggregator)

- **Jupiter API Integration:** Queries optimal swap routes and slippage bounds across all Solana DEX pools.
- **Alchemy RPC Node:** signs compiled swap transactions via Privy's embedded wallet and broadcasts the payload directly to the Solana network.

### 5. Automated API Key Rotation & Resiliency

- **Multi-Key Cycling:** Supports a comma-separated list of keys under `BIRDEYE_API_KEY`. If a key hits rate limits (HTTP 429 Too Many Requests) or fails, the central fetch utility (`fetchBirdEye`) automatically logs the issue and cycles to the next key.
- **Resilient Fallback Engines:** If all keys fail, all endpoints automatically serve realistic, structured mock datasets, guaranteeing **100% uptime** and preventing Vercel HTTP 500 error pages.

---

## 🛠️ Technology Stack & Libraries

- **Core Framework:** [Next.js 16 (App Router)](https://nextjs.org/) utilizing React 19 and Turbopack.
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/) with dark-mode glassmorphism accents.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for global persistent UI settings.
- **Data Fetching & Cache:** [React Query (TanStack)](https://tanstack.com/query/latest) for frontend polling intervals and deduplication.
- **Auth & Wallets:** [Privy React SDK](https://privy.io/) for social sign-in and embedded Solana wallet provisionings.
- **DEX Swap Aggregator:** [Jupiter API](https://developers.jup.ag/) for transaction serialization and route quotes.
- **Solana Connection:** `@solana/web3.js` and Alchemy RPC nodes.
- **Canvas Charts:** `@tradingview/lightweight-charts` (v5.2) for charting.

---

## 📂 Project Directory Structure

```text
fomo-terminal/
├── docs/                      # Technical flow and end-to-end user guides
├── public/                    # Static branding graphics and mp4 previews
├── src/
│   ├── app/                   # Next.js App Router (Pages, Layouts)
│   │   ├── api/               # Server-side API proxy routes (resilient endpoints)
│   │   ├── trade/             # Trading Dashboard route
│   │   └── page.tsx           # Home Landing Page
│   ├── components/            # Reusable UI widgets
│   │   ├── auth/              # Privy AuthButton and ProtectedRoute wrapper
│   │   ├── swap/              # SwapPanel and Sniper settings card
│   │   ├── ui/                # Shared buttons, tables, and tabs
│   │   ├── Banner.tsx         # Top/Bottom rotating token marquee banners
│   │   └── TradingViewChart.tsx # Lightweight Canvas Chart component
│   ├── config/                # Environment schema validation
│   ├── hooks/                 # Centralized fetching hooks (useSolana, useBirdeye)
│   ├── store/                 # Zustand theme and panel preferences
│   └── utils/                 # Resilient helper utilities (fetchBirdEye key rotation)
├── .env.local                 # Local environment keys (ignored by Git)
├── package.json               # Dependency libraries and project run scripts
└── tsconfig.json              # TypeScript compilation rules
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/Rajeev02/fomo-terminal.git
cd fomo-terminal
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project:

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

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Compile Production Builds

Ensure lints and compilation checks pass cleanly:

```bash
npm run lint
npm run build
```

---

## ⚡ Deployment on Vercel

ChadWallet is optimized for zero-config Vercel deployments.

1. Push your changes to your GitHub repository.
2. Connect your repository on the [Vercel Dashboard](https://vercel.com/).
3. Add the matching Environment Variables (from your `.env.local`) under the Project Settings.
4. Trigger a Deploy. Vercel's global edge network handles caching and static page optimization.
