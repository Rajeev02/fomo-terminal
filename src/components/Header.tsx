import Link from 'next/link';
import { Apple, Smartphone, LogIn } from 'lucide-react';

export function Header() {
  return (
    <header className="items-center h-13 pt-4 pb-2 px-6 justify-between hidden md:flex sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg border-b border-white/5">
      <Link href="/" className="flex items-center text-foreground font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
        CHAD<span className="text-[var(--chad-green)]">WALLET</span>
      </Link>
      <div className="flex gap-3">
        <Link 
          href="#"
          className="bg-white/5 backdrop-blur-md rounded-md hover:ring-white/20 hover:ring-1 hover:bg-white/10 transition-all flex items-center justify-center px-4 py-2 border border-white/10 text-sm font-semibold"
        >
          <Apple size={18} className="mr-2" /> iOS
        </Link>
        <Link 
          href="#"
          className="bg-white/5 backdrop-blur-md hover:ring-white/20 hover:ring-1 hover:bg-white/10 transition-all rounded-md flex items-center justify-center px-4 py-2 border border-white/10 text-sm font-semibold"
        >
          <Smartphone size={18} className="mr-2" /> Android
        </Link>
        <button className="bg-bg-secondary ring-1 ring-bg-tertiary hover:bg-bg-secondary/80 h-10 px-5 rounded-lg font-bold flex items-center gap-2 text-sm ml-2">
          <LogIn size={16} /> Login
        </button>
      </div>
    </header>
  );
}
