import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-start justify-between bg-[var(--hero-bg)]">
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex items-center text-foreground font-black text-4xl tracking-tighter"
        >
          chadwallet
        </Link>
        <div className="text-[17px] text-muted-foreground tracking-tight">
          where traders become legends.
        </div>
        <div className="text-[#52525B] text-[15px] mt-12 hidden md:block">
          © 2026 ChadWallet Labs Inc.
        </div>
      </div>
      <div className="flex items-start flex-col md:flex-row gap-12 md:gap-[100px] mt-10 md:mt-0">
        <div className="flex flex-col items-start gap-[18px] min-w-[100px]">
          <div className="text-[#52525B] text-xs font-semibold tracking-wider">
            ABOUT
          </div>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Blog
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            FAQ
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Affiliates
          </Link>
        </div>
        <div className="flex flex-col items-start gap-[18px] min-w-[100px]">
          <div className="text-[#52525B] text-xs font-semibold tracking-wider">
            SOCIAL
          </div>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Discord
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            X/Twitter
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Instagram
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Youtube
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            LinkedIn
          </Link>
        </div>
        <div className="flex flex-col items-start gap-[18px] min-w-[100px]">
          <div className="text-[#52525B] text-xs font-semibold tracking-wider">
            LEGAL
          </div>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-[14px] font-medium hover:text-foreground text-muted-foreground transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="text-[#52525B] text-[15px] mt-10 block md:hidden">
        © 2026 ChadWallet Labs Inc.
      </div>
    </footer>
  );
}
