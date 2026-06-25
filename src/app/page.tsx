import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="relative isolate flex flex-col min-h-screen bg-bg-primary overflow-x-hidden selection:bg-[var(--chad-green)] selection:text-black">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 h-full w-full">
        {/* Top Banner */}
        <Banner />

        {/* Hero Deep Space Background */}
        <div className="absolute top-0 left-0 w-full h-[1400px] -z-10 pointer-events-none select-none bg-[var(--hero-bg)] overflow-hidden">
          {/* Deep space glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--hero-glow-start)] via-[var(--hero-glow-via)] to-[var(--hero-glow-to)]" />
          {/* Earth reflection curve */}
          <div className="absolute top-[-600px] left-1/2 -translate-x-1/2 w-[1800px] h-[800px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--hero-earth)] to-transparent rounded-[100%] blur-3xl opacity-80" />
          {/* Starry dust particles (CSS simulated via box shadow dots if needed, keeping it clean with just the glow for now) */}
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center gap-5 md:gap-8 mt-20 md:mt-32 z-10">
          <div className="flex flex-col gap-2 items-center text-center px-6">
            <h1 className="text-[70px] leading-[70px] md:text-[130px] md:leading-[120px] text-foreground text-center tracking-tighter font-black max-w-5xl">
              chadwallet
            </h1>
            <p className="text-[24px] md:text-[36px] text-foreground font-bold tracking-tight text-center mt-2">
              where traders become legends.
            </p>
            <p className="md:text-[22px] text-muted-foreground text-center tracking-tight max-w-2xl mt-4">
              From memecoins to viral tokens, trade any crypto in seconds.
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
            <button className="group relative items-center justify-center overflow-hidden bg-[#2563EB] hover:bg-[#1D4ED8] text-white backdrop-blur-md transition-colors duration-150 py-4 px-10 rounded-full text-lg font-bold border border-white/10 z-10 flex">
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
        <div className="hidden md:flex flex-col items-center pt-32 pb-24 px-8 gap-3 w-full relative z-10">
          <div className="font-mono font-bold text-[#3B82F6] tracking-widest text-sm">
            NOW AVAILABLE ON DESKTOP
          </div>
          <h2 className="text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] tracking-tighter text-center font-black mt-2 text-foreground">
            trade from anywhere.
            <br />
            never lose a beat.
          </h2>
          <p className="text-muted-foreground text-[22px] tracking-tight mt-4 text-center">
            Open a trade on your phone, close it on your desktop.
            <br />
            All in one app.
          </p>

          <div className="relative mt-16 w-full max-w-5xl flex justify-center pb-32">
            {/* Desktop Frame (iMac Style) */}
            <div className="relative flex flex-col items-center z-10 w-full max-w-[900px] mx-4 md:mx-0">
              {/* Monitor Bezel */}
              <div className="w-full aspect-video bg-[#111] rounded-2xl md:rounded-3xl border border-[#27272A] shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden">
                {/* Inner Screen */}
                <div className="flex-1 w-full bg-black relative">
                  <Image
                    src="/images/hero-section.png"
                    alt="ChadWallet Desktop UI"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              {/* iMac Stand */}
              <div className="w-32 h-12 md:w-48 md:h-16 bg-gradient-to-b from-[#222] to-[#111] border-b-[4px] border-[#333] shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform perspective-[100px] rotateX-[10deg] -mt-2 z-0 rounded-b-lg"></div>
            </div>

            {/* Mobile Frame (iPhone Style Overlapping) */}
            <div className="w-[180px] h-[380px] md:w-[260px] md:h-[540px] bg-black rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-[#222] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] absolute right-0 md:-right-8 bottom-12 md:bottom-0 rotate-[12deg] z-20 overflow-hidden flex flex-col animate-float-desktop ring-1 ring-white/10">
              {/* Dynamic Island Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[20px] md:h-[25px] bg-black rounded-full z-30 shadow-sm"></div>

              {/* Video Content */}
              <div className="flex-1 w-full h-full relative overflow-hidden bg-black rounded-[2rem] md:rounded-[2.8rem]">
                <video
                  src="/images/chadwallet.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid Section */}
        <div className="pt-24 md:py-32 px-4 md:px-20 flex flex-col self-stretch md:self-center gap-12 w-full max-w-[1400px] z-10 relative">
          <div className="hidden md:flex flex-col gap-1 text-left mb-4">
            <h2 className="text-[40px] md:text-[56px] tracking-tighter leading-tight font-black text-foreground">
              never miss out again
            </h2>
            <p className="text-muted-foreground leading-6 text-[22px] md:text-[24px]">
              the only social-first trading app
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
                <p className="md:text-[24px] text-muted-foreground tracking-tight text-center mt-4">
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
              <div className="absolute inset-0 m-auto z-1 w-[80vw] h-[80vw] md:w-[30vw] md:h-[30vw] rounded-full border border-dashed border-foreground/20 animate-[spin_30s_linear_infinite_reverse]">
                {/* Inner Ring Avatars */}
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-0">
                  <div className="w-10 h-10 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-white/10 shadow-sm overflow-hidden flex items-center justify-center animate-[spin_30s_linear_infinite]">
                    <Logo className="w-3/4 h-3/4 object-contain" alt="" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[120deg]">
                  <div className="w-12 h-12 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-white/10 shadow-sm overflow-hidden animate-[spin_30s_linear_infinite]">
                    <Image
                      width={24}
                      height={24}
                      src="/images/chadwallet/app-icon.png"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[240deg]">
                  <div className="w-14 h-14 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-white/10 shadow-sm overflow-hidden flex items-center justify-center animate-[spin_30s_linear_infinite]">
                    <Logo className="w-3/4 h-3/4 object-contain" alt="" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 m-auto z-1 w-[120vw] h-[120vw] md:w-[45vw] md:h-[45vw] rounded-full border border-dashed border-foreground/10 animate-[spin_45s_linear_infinite]">
                {/* Outer Ring Avatars */}
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[45deg]">
                  <div className="w-16 h-16 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-white/10 shadow-sm overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <Image
                      width={24}
                      height={24}
                      src="/images/chadwallet/app-icon.png"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[160deg]">
                  <div className="w-12 h-12 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-foreground/10 overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <Image
                      width={24}
                      height={24}
                      src="/images/chadwallet/promo1.jpg"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-full h-0 flex justify-end -translate-x-1/2 rotate-[280deg]">
                  <div className="w-16 h-16 -translate-y-1/2 translate-x-1/2 bg-bg-secondary rounded-full border border-[var(--chad-purple)] overflow-hidden animate-[spin_45s_linear_infinite_reverse]">
                    <Image
                      width={24}
                      height={24}
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

        {/* Bottom Banner */}
        <Banner reverse />
      </main>

      <Footer />
    </div>
  );
}
