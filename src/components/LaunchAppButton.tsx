"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface LaunchAppButtonProps {
  className?: string;
  variant?: "primary" | "secondary";
}

export function LaunchAppButton({
  className = "",
  variant = "primary",
}: LaunchAppButtonProps) {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const handleLaunch = () => {
    if (isAuthenticated) {
      router.push("/trade");
    } else {
      login();
    }
  };

  const baseStyles =
    "group relative items-center justify-center overflow-hidden transition-colors duration-150 py-4 px-10 rounded-full text-lg font-bold border border-white/10 z-10 flex cursor-pointer";
  const variantStyles =
    variant === "primary"
      ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
      : "bg-[var(--chad-green)] hover:bg-[var(--chad-green)]/90 text-black";

  return (
    <button
      onClick={handleLaunch}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span>Launch Web App</span>
      <div className="flex items-center overflow-hidden w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-150 ease-out">
        <ArrowRight className="size-5 ml-2 shrink-0" />
      </div>
    </button>
  );
}
