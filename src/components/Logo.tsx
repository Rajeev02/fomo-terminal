"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export function useLogoSrc() {
  const theme = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return "/images/logo.png";
  return theme === "light" ? "/images/logo-dark.png" : "/images/logo.png";
}

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function Logo({
  className = "",
  alt = "ChadWallet Logo",
  ...props
}: LogoProps) {
  const src = useLogoSrc();

  return <img src={src} alt={alt} className={className} {...props} />;
}
