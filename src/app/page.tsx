import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { ArrowRight, Apple, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate flex flex-col min-h-screen bg-bg-primary overflow-x-hidden selection:bg-[var(--chad-green)] selection:text-black">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 h-full w-full">
        {/* Hero Background Placeholder */}
        <div className="absolute top-0 left-0 w-full h-[800px] -z-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--chad-green)]/15 via-bg-primary to-bg-primary" />

        {/* Hero Content */}
        <div className="flex flex-col items-center gap-5 md:gap-8 mt-20 md:mt-32">
          <div className="flex flex-col gap-2 items-center text-center px-6">
            <h1 className="text-[36px] leading-[40px] md:text-[64px] md:leading-[68px] text-foreground text-center tracking-tighter font-black max-w-4xl">
              where chads manage wealth.
            </h1>
            <p className="md:text-[22px] text-zinc-400 text-center md:leading-8 tracking-tight max-w-2xl mt-4">
              From memecoins to yield farming, the most premium wallet on
              Solana. Built for the culture.
            </p>
          </div>

          <div className="flex gap-2 md:hidden mt-6">
            <Link
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              className="text-center z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl font-bold w-full py-3 px-4 text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Apple size={20} />
              iOS
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              className="text-center z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl font-bold w-full py-3 px-4 text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Smartphone size={20} />
              Android
            </Link>
          </div>

          <div className="hidden md:flex gap-4 mt-8">
            <button className="group relative items-center justify-center overflow-hidden bg-[var(--chad-green)]/20 hover:bg-[var(--chad-green)]/40 text-[var(--chad-green)] backdrop-blur-md transition-colors duration-150 py-4 px-8 rounded-xl text-lg font-bold border border-[var(--chad-green)]/30 z-10 flex">
              <span>Launch Web App</span>
              <div className="flex items-center overflow-hidden w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-150 ease-out">
                <ArrowRight className="size-5 ml-2 shrink-0" />
              </div>
            </button>
            <Link
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              className="z-10 group bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors duration-150 border border-white/10 text-white rounded-xl px-6 font-bold flex items-center justify-center overflow-hidden"
            >
              <Apple className="size-5 mr-2 shrink-0" />
              <span>App Store</span>
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              className="z-10 group bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors duration-150 border border-white/10 text-white rounded-xl px-6 font-bold flex items-center justify-center overflow-hidden"
            >
              <Smartphone className="size-5 mr-2 shrink-0" />
              <span>Google Play</span>
            </Link>
          </div>
        </div>

        {/* Floating Hero Elements (Placeholders) */}
        <div className="hidden md:block w-32 h-32 rounded-full bg-gradient-to-br from-[var(--chad-green)] to-[var(--chad-purple)] blur-2xl opacity-20 absolute top-40 left-20 animate-float-desktop" />
        <div
          className="hidden md:block w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-[var(--chad-green)] blur-2xl opacity-20 absolute top-60 right-32 animate-float-desktop"
          style={{ animationDelay: "1s" }}
        />

        {/* Cross Platform Section */}
        <div className="hidden md:flex flex-col items-center pt-32 pb-24 px-8 gap-3 w-full">
          <div className="font-mono font-bold text-[var(--chad-purple)] tracking-widest text-sm">
            NOW ON DESKTOP & MOBILE
          </div>
          <h2 className="text-[56px] leading-[60px] tracking-tighter text-center font-black mt-2">
            trade from anywhere.
            <br />
            never lose a beat.
          </h2>
          <p className="text-zinc-400 text-[22px] tracking-tight mt-4">
            Snipe on your phone, manage portfolio on your desktop.
          </p>

          <div className="relative mt-16 w-full max-w-5xl flex justify-center h-[400px]">
            <div className="w-[800px] h-[450px] bg-bg-secondary rounded-t-2xl border-t border-l border-r border-white/10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 w-full h-8 bg-black/40 flex items-center px-4 gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="mt-8 p-8 h-full bg-gradient-to-b from-bg-tertiary to-bg-primary opacity-50 flex items-center justify-center">
                <span className="font-mono text-zinc-600">
                  [DESKTOP UI MOCKUP]
                </span>
              </div>
            </div>
            <div className="w-[260px] h-[520px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl absolute -right-4 bottom-[-100px] animate-float-desktop z-20 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-bg-tertiary to-bg-primary opacity-80 flex items-center justify-center">
                <span className="font-mono text-zinc-600 text-sm">
                  [MOBILE UI MOCKUP]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid Section */}
        <div className="pt-24 md:py-32 px-4 md:px-20 flex flex-col self-stretch md:self-center gap-12 w-full max-w-[1400px] z-10">
          <div className="hidden md:flex flex-col gap-3 text-center md:text-left mb-8">
            <h2 className="text-[40px] md:text-[56px] tracking-tighter leading-tight font-black">
              built for the culture
            </h2>
            <p className="text-zinc-400 leading-6 text-[22px] md:text-[28px]">
              the only wallet you&apos;ll ever need
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <FeatureCard
                label="PORTFOLIO"
                title="track your wealth in real-time"
                placeholderColor="bg-blue-500/10"
              />
              <FeatureCard
                label="DEFI YIELD"
                title="stake and earn while you sleep"
                placeholderColor="bg-[var(--chad-green)]/10"
              />
              <FeatureCard
                label="MEMECOIN SNIPER"
                title="never miss a 100x gem again"
                placeholderColor="bg-[var(--chad-purple)]/10"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <FeatureCard
                label="EASY ONBOARDING"
                title="create a wallet in an instant"
                placeholderColor="bg-yellow-500/10"
              />
              <FeatureCard
                label="ZERO GAS"
                title="sponsored transactions built in"
                placeholderColor="bg-red-500/10"
              />
              <FeatureCard
                label="ONE CLICK"
                title="fund easily with apple pay"
                placeholderColor="bg-cyan-500/10"
              />
            </div>
          </div>
        </div>

        {/* Closing Social Proof Section */}
        <div className="relative self-stretch flex items-center justify-center py-40 md:py-60 mt-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-primary to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-10" />

          <div className="px-8 w-[90vw] max-w-4xl z-20">
            <div className="flex flex-col justify-center items-center relative">
              <div className="flex flex-col gap-6 items-center w-full relative z-30">
                <h2 className="text-[40px] leading-[44px] md:text-[72px] md:leading-[76px] tracking-tighter text-center font-black">
                  a crypto wallet
                  <br />
                  for the rest of us
                </h2>
                <p className="md:text-[24px] text-zinc-400 tracking-tight text-center mt-4">
                  join 100,000+ chads securing their bags
                </p>
                <div className="pt-10 w-full flex justify-center">
                  <div className="flex gap-2 md:hidden">
                    <Link
                      href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                      target="_blank"
                      className="text-center z-10 bg-[var(--chad-green)] text-black rounded-xl font-bold w-full py-3 px-6 flex items-center justify-center gap-2"
                    >
                      <Apple size={20} />
                      iOS
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                      target="_blank"
                      className="text-center z-10 bg-[var(--chad-green)] text-black rounded-xl font-bold w-full py-3 px-6 flex items-center justify-center gap-2"
                    >
                      <Smartphone size={20} />
                      Android
                    </Link>
                  </div>
                  <div className="hidden md:flex gap-4">
                    <button className="group relative items-center justify-center overflow-hidden bg-[var(--chad-green)] hover:bg-[var(--chad-green)]/90 text-black transition-colors duration-150 py-4 px-8 rounded-xl text-lg font-bold z-10 flex">
                      <span>Launch Web App</span>
                      <div className="flex items-center overflow-hidden w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-150 ease-out">
                        <ArrowRight className="size-5 ml-2 shrink-0" />
                      </div>
                    </button>
                    <Link
                      href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                      target="_blank"
                      className="z-10 group bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors duration-150 border border-white/10 text-white rounded-xl px-6 font-bold flex items-center justify-center overflow-hidden"
                    >
                      <Apple className="size-5 mr-2 shrink-0" />
                      <span>App Store</span>
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                      target="_blank"
                      className="z-10 group bg-white/5 hover:bg-white/10 backdrop-blur-md transition-colors duration-150 border border-white/10 text-white rounded-xl px-6 font-bold flex items-center justify-center overflow-hidden"
                    >
                      <Smartphone className="size-5 mr-2 shrink-0" />
                      <span>Google Play</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Spinning background rings */}
              <div className="absolute inset-0 m-auto z-1 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-[var(--chad-green)]/20 border-dashed animate-spin-slow-reverse" />
              <div className="absolute inset-0 m-auto z-1 w-[450px] md:w-[900px] h-[450px] md:h-[900px] rounded-full border border-[var(--chad-purple)]/20 animate-spin-slow" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
