import Link from 'next/link';

export function Footer() {
  return (
    <footer className="px-10 pt-16 pb-12 flex flex-col md:flex-row gap-10 items-start justify-between border-t border-white/5 mt-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center text-foreground font-black text-2xl tracking-tighter">
            CHAD<span className="text-[var(--chad-green)]">WALLET</span>
          </Link>
          <div className="text-xl text-zinc-400 leading-7 tracking-tighter">where chads manage wealth.</div>
        </div>
        <div className="text-zinc-500 hidden md:block">© 2026 ChadWallet Inc.</div>
      </div>
      <div className="flex items-start flex-col md:flex-row gap-12 md:gap-20">
        <div className="flex flex-col items-start gap-3 min-w-32">
          <div className="text-zinc-500 font-mono text-sm mb-2 font-bold tracking-widest">ABOUT</div>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Blog</Link>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">FAQ</Link>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Affiliates</Link>
        </div>
        <div className="flex flex-col items-start gap-3 min-w-32">
          <div className="text-zinc-500 font-mono text-sm mb-2 font-bold tracking-widest">SOCIAL</div>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Discord</Link>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">X/Twitter</Link>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Instagram</Link>
        </div>
        <div className="flex flex-col items-start gap-3 min-w-32">
          <div className="text-zinc-500 font-mono text-sm mb-2 font-bold tracking-widest">LEGAL</div>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Privacy Policy</Link>
          <Link className="text-sm hover:text-foreground text-zinc-400 transition-colors" href="#">Terms of Service</Link>
        </div>
      </div>
      <div className="text-zinc-500 block md:hidden">© 2026 ChadWallet Inc.</div>
    </footer>
  );
}
