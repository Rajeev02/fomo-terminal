# ChadWallet / FomoTerminal One-Pager

## 1. Project Design & GitHub Repository

### The Design

**ChadWallet** (also referred to as **FomoTerminal**) is a premium, high-performance web application tailored for the Solana ecosystem. Drawing strong design inspiration from top-tier crypto tracking platforms like [fomo.family](https://fomo.family), the interface delivers a slick, Web2-style "gasless-feeling" user experience that abstracts away the complexity of traditional Web3 products.

- **Landing Page & Onboarding:** Features a clean dark-mode design with modern glassmorphism (`backdrop-blur`), animated glowing rings, live-scrolling market banners displaying trending tokens, and direct links to App Store/Google Play downloads.
- **Frictionless Authentication:** Implements **Privy** to allow users to sign in using social credentials (Google, Apple). Privy automatically provisions a secure, embedded, non-custodial Solana wallet in the background.
- **Trading Dashboard (`/trade/[token]`):** A fully functional three-column view:
  - _Left Panel:_ Discovery panel showing top trending Solana tokens fetched via the BirdEye API.
  - _Middle Panel:_ Real-time market metrics, native canvas-based **Lightweight Candlestick Charts** (supporting 15m, 1H, 4H, and 1D timeframes and theme-aware layouts), and tabbed panels displaying live trade history and top token holders.
  - _Right Panel (Swap):_ A swap component that interfaces with the **Jupiter Aggregator API** to find optimal routes and generate signed transactions using the user's embedded wallet, broadcast via an **Alchemy RPC**.

### The GitHub Repository

- **Repository URL:** [https://github.com/Rajeev02/fomo-terminal](https://github.com/Rajeev02/fomo-terminal)
- **Local Path:** `/Users/rajeevjoshi/Documents/GitHub/fomo-terminal`
- **Main Branch:** `main`
- **Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Zustand, React Query, Privy SDK, BirdEye API, Jupiter API, and `lightweight-charts` (v5.2).

---

## 2. AI Tool Usage & Task Durations

During this project, we leveraged the **Gemini 3.5 Flash**-powered AI Agent (**Antigravity**) to act as a founding-engineer pairing partner. The agent helped with architectural scaffolding, API integration, and troubleshooting.

Below is the chronological breakdown of the development tasks and the approximate duration for each:

| Task Name                      | Description                                                                                                                                                                                                           |    Duration    |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------: |
| **Scaffolding & Architecture** | Setting up the Next.js 16 framework, Tailwind configuration, folder structure, and renaming the workspace to `fomo-terminal`.                                                                                         | **0.5 Hours**  |
| **Landing Page & Branding**    | Developing the landing page layout, embedding the desktop mockup, building the dynamic rotating CSS banners, and incorporating store badges.                                                                          | **1.5 Hours**  |
| **Privy Auth & Wallets**       | Integrating the Privy React SDK, setting up social logins, automatically provisioning embedded Solana wallets, and coding route protection.                                                                           | **1.0 Hours**  |
| **Market Data Integration**    | Writing proxies for the BirdEye API to fetch trending lists, coin metadata, holder lists, and live trade history.                                                                                                     | **1.5 Hours**  |
| **Jupiter Swaps & RPCs**       | Implementing the swap panel to fetch live quotes, build serialized transactions from Jupiter, sign via Privy, and broadcast via Alchemy.                                                                              | **1.5 Hours**  |
| **Theme & UI Polishing**       | Implementing persistent Light/Dark/Chad themes, solving hydration warnings, and replacing hardcoded Tailwind colors with theme variables.                                                                             | **1.0 Hours**  |
| **Native Candlestick Charts**  | Creating the `/api/birdeye/history` proxy route, adding the `useTokenHistory` hook, and replacing the iframe with a fully responsive, theme-aware canvas-based `lightweight-charts` rendering and timeframe switcher. | **1.5 Hours**  |
| **CI/CD & Documentation**      | Deploying to Vercel, setting up environment variables, writing developer guides (`project-flow.md`, etc.), and drafting the README and this one-pager.                                                                | **1.0 Hours**  |
| **Total Development Time**     | _From scaffolding to production-ready deployment on Vercel._                                                                                                                                                          | **~9.5 Hours** |

---

## 3. Encountered Issues & Resolutions

Throughout development, several technical challenges were resolved:

### 1. Persistent Theme Hydration Mismatch

- **The Issue:** Using Next.js Server-Side Rendering (SSR) along with Zustand's `persist` middleware to store the theme in `localStorage` caused mismatches. The server rendered the default theme while the client hydrated with the stored theme, raising React console errors and causing visual flickering.
- **The Resolution:** Introduced a `mounted` state inside a `useEffect` hook. Server rendering defaults to the fallback styles, and theme-dependent components (like logos and charts) only render local theme classes once the client-side component registers as mounted.

### 2. Privy Multi-Chain Wallet Selection Error

- **The Issue:** When retrieving the active wallet address to fetch portfolio balances, the code originally queried `wallets[0]` or checked for `w.walletClientType === "privy"`. In multi-chain environments, this often returned an EVM/Ethereum address, breaking Solana queries.
- **The Resolution:** Refactored `useAuth.ts` to strictly filter for `w.chainType === "solana"`. This ensures the application always targets the user's embedded Solana wallet.

### 3. Hardcoded Colors Breaking Light Mode

- **The Issue:** Hardcoded Tailwind classes (e.g. `bg-zinc-900`, `border-zinc-800`) prevented elements from updating during theme shifts, leaving parts of the dashboard unreadable in Light theme.
- **The Resolution:** Created a series of Python script helpers (`remove_zinc.py`, `fix_swap.py`, etc.) to run regex search-and-replace rules across the source directories. Hardcoded colors were replaced with CSS custom properties (e.g., `bg-bg-secondary`, `border-foreground/10`), which dynamically shift based on the data attributes on the HTML element.

### 4. Lightweight Charts v5.0 API Breaking Changes

- **The Issue:** Attempting to use series helpers like `addCandlestickSeries` or `addHistogramSeries` threw compilation errors because these methods were deprecated and removed in version 5.0 of `lightweight-charts`.
- **The Resolution:** Updated the chart initialization code to use the new generic API: `chart.addSeries(CandlestickSeries, { ... })` and `chart.addSeries(HistogramSeries, { ... })`, importing the series classes directly from the package.

### 5. TypeScript Time Type Mismatch (`number` vs `Time`)

- **The Issue:** Lightweight charts requires timestamp values to conform to its internal `Time` nominal/brand type. Assigning standard numbers fetched from the API caused compiler type-checking failures.
- **The Resolution:** Imported the `UTCTimestamp` type from the library and explicitly cast the timestamp fields: `time: item.unixTime as UTCTimestamp`.

### 6. Privy `ConnectedWallet` Type Error on `chainType`

- **The Issue:** When type safety was enforced on Privy's `ConnectedWallet` array iteration in `useAuth.ts`, the TS compiler threw errors asserting that `chainType` did not exist on `ConnectedWallet`, although it is present at runtime.
- **The Resolution:** Safe-cast the wallet elements inside the query callback using `(w as unknown as { chainType: string })` to resolve the type compilation checks without resorting to broad `any` statements.

### 7. Chart Theme Update Sync Issue (Layout Race Condition)

- **The Issue:** The canvas chart was retrieving its layout colors (like background and grid wicks) by querying CSS custom variables from the DOM dynamically on render. However, because both the global `ThemeProvider` and the `TradingViewChart` subscribe to the theme change state simultaneously, a race condition occurred: the chart component would read the DOM before the parent provider had updated the theme classes on the root element. This left the chart with default styling (such as a white background) instead of matching the active dark/chad theme.
- **The Resolution:** Refactored the chart layout styling logic to use a static TypeScript mapping object (`getThemeColors(theme)`) instead of querying the DOM dynamically. This guarantees immediate, typesafe theme updates without race conditions or side-effects.

---

## 4. Proposed Improvements

To elevate the platform to a production-grade retail terminal, the following roadmap is recommended:

1.  **Fiat On-Ramp Integration:** Connect services like Stripe or MoonPay directly to the Privy modal. This will enable users to buy Solana assets using credit cards or Apple Pay, fully realizing a gasless-feeling Web2-to-Web3 onboarding flow.
2.  **RPC Resiliency & Congestion Routing:** Implement an RPC provider aggregator (e.g., alternating between Alchemy, Helius, and QuickNode) with automatic fallback and retry logic. This prevents swap failures during high Solana network congestion.
3.  **Portfolio Analytics:** Create a dedicated portfolio tab with historical performance lines (using `recharts`), profit/loss tracking per asset, and automated token price updates.
4.  **Database Integration (Supabase):** Set up a database to allow users to save persistent watchlists, configure price alerts (notifying via Webhook or Telegram), and store user-profile preferences.
