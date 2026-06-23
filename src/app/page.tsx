import { Banner } from "@/components/Banner";
import Link from "next/link";
import { Apple, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Top Banner */}
      <Banner />

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 text-center z-10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--chad-green)]/10 via-background to-background -z-10" />
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
          Trade Like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--chad-green)] to-[var(--chad-purple)]">Chad</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12">
          The fastest, most premium Solana wallet and trading terminal. Built for the culture.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors w-full sm:w-auto justify-center"
          >
            <Apple size={24} />
            Download for iOS
          </Link>
          
          <Link 
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
            target="_blank"
            className="flex items-center gap-3 bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-colors w-full sm:w-auto justify-center"
          >
            <Smartphone size={24} />
            Download for Android
          </Link>

          <Link
            href="/trade"
            className="flex items-center gap-3 bg-transparent text-[var(--chad-green)] px-8 py-4 rounded-full font-bold text-lg border border-[var(--chad-green)] hover:bg-[var(--chad-green)]/10 transition-colors w-full sm:w-auto justify-center ml-0 sm:ml-4"
          >
            Launch Web App
          </Link>
        </div>
      </div>

      {/* Bottom Banner - Reversed */}
      <Banner reverse />
    </main>
  );
}
