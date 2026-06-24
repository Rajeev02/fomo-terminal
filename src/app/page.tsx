import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
              className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
            >
              <Image
                src="/images/app-store.png"
                alt="Download on the App Store"
                width={192}
                height={64}
                className="h-[3rem] w-auto"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
            >
              <Image
                src="/images/google-play.png"
                alt="Get it on Google Play"
                width={216}
                height={64}
                className="h-[3rem] w-auto"
              />
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
              className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
            >
              <Image
                src="/images/app-store.png"
                alt="Download on the App Store"
                width={192}
                height={64}
                className="h-[3.1rem] w-auto"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
            >
              <Image
                src="/images/google-play.png"
                alt="Get it on Google Play"
                width={216}
                height={64}
                className="h-[3.1rem] w-auto"
              />
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
              <div className="mt-8 p-8 h-full bg-gradient-to-b from-bg-tertiary to-bg-primary flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/images/logo.png"
                  alt="ChadWallet Logo"
                  width={200}
                  height={200}
                  className="opacity-10 absolute mix-blend-overlay w-[400px] h-[400px]"
                />
                <iframe
                  src="/trade"
                  className="absolute inset-0 w-full h-full border-none z-10 rounded-b-2xl opacity-90"
                  title="ChadWallet Desktop"
                />
              </div>
            </div>
            <div className="w-[260px] h-[520px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl absolute -right-4 bottom-[-100px] animate-float-desktop z-20 overflow-hidden flex items-center justify-center relative">
              <video
                src="/images/chadwallet.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
              />
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
                imageUrl="/images/chadwallet/promo1.jpg"
              />
              <FeatureCard
                label="DEFI YIELD"
                title="stake and earn while you sleep"
                imageUrl="/images/chadwallet/promo2.jpg"
              />
              <FeatureCard
                label="MEMECOIN SNIPER"
                title="never miss a 100x gem again"
                imageUrl="/images/chadwallet/promo3.jpg"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <FeatureCard
                label="EASY ONBOARDING"
                title="create a wallet in an instant"
                imageUrl="/images/chadwallet/app-store-promo.jpg"
              />
              <FeatureCard
                label="ZERO GAS"
                title="sponsored transactions built in"
                imageUrl="/images/chadwallet/app-icon.png"
              />
              <FeatureCard
                label="ONE CLICK"
                title="fund easily with apple pay"
              />
            </div>
          </div>
        </div>

        {/* Closing Social Proof Section */}
        <div className="relative self-stretch flex items-center justify-center py-40 md:py-60 mt-20 overflow-hidden bg-gradient-to-b from-bg-primary via-[var(--chad-purple)]/5 to-bg-primary">
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
                      className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
                    >
                      <Image
                        src="/images/app-store.png"
                        alt="Download on the App Store"
                        width={192}
                        height={64}
                        className="h-[3rem] w-auto"
                      />
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                      target="_blank"
                      className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
                    >
                      <Image
                        src="/images/google-play.png"
                        alt="Get it on Google Play"
                        width={216}
                        height={64}
                        className="h-[3rem] w-auto"
                      />
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
                      className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
                    >
                      <Image
                        src="/images/app-store.png"
                        alt="Download on the App Store"
                        width={192}
                        height={64}
                        className="h-[3.1rem] w-auto"
                      />
                    </Link>
                    <Link
                      href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                      target="_blank"
                      className="inline-flex items-center justify-center overflow-hidden rounded-md transition-transform duration-200 hover:-translate-y-0.5 z-10"
                    >
                      <Image
                        src="/images/google-play.png"
                        alt="Get it on Google Play"
                        width={216}
                        height={64}
                        className="h-[3.1rem] w-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Spinning background rings */}
              <div className="absolute inset-0 m-auto z-1 w-[80vw] h-[80vw] md:w-[30vw] md:h-[30vw] rounded-full border border-dashed border-white/20 animate-[spin_30s_linear_infinite_reverse]">
                {/* Inner Ring Avatars */}
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-0">
                  <div className="w-10 h-10 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-zinc-700 overflow-hidden flex items-center justify-center animate-[spin_30s_linear_infinite]">
                    <img
                      src="/images/logo.png"
                      className="w-3/4 h-3/4 object-contain"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[120deg]">
                  <div className="w-12 h-12 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-zinc-700 overflow-hidden animate-[spin_30s_linear_infinite]">
                    <img
                      src="/images/chadwallet/app-icon.png"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[240deg]">
                  <div className="w-8 h-8 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-[var(--chad-green)] overflow-hidden flex items-center justify-center animate-[spin_30s_linear_infinite]">
                    <img
                      src="/images/logo.png"
                      className="w-3/4 h-3/4 object-contain"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 m-auto z-1 w-[150vw] h-[150vw] md:w-[55vw] md:h-[55vw] rounded-full border border-dashed border-white/10 animate-[spin_45s_linear_infinite]">
                {/* Outer Ring Avatars */}
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-45">
                  <div className="w-14 h-14 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-zinc-700 overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <img
                      src="/images/chadwallet/app-icon.png"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[160deg]">
                  <div className="w-12 h-12 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-zinc-700 overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <img
                      src="/images/chadwallet/promo1.jpg"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[280deg]">
                  <div className="w-16 h-16 -translate-y-1/2 translate-x-1/2 bg-zinc-900 rounded-full border border-[var(--chad-purple)] overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <img
                      src="/images/chadwallet/app-store-promo.jpg"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
