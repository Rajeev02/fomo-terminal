import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  label: string;
  title: string;
  imageUrl?: string;
  placeholderColor?: string;
}

export function FeatureCard({
  label,
  title,
  imageUrl,
  placeholderColor = "bg-[var(--chad-green)]/20",
}: FeatureCardProps) {
  return (
    <div className="group flex-1 min-w-0 shrink pt-8 pb-0 rounded-[25px] flex flex-col overflow-hidden gap-2 border border-bg-tertiary hover:border-white/12 transition-colors duration-300 bg-bg-secondary aspect-square">
      <div className="font-mono text-[var(--chad-green)] px-8 font-bold text-sm tracking-widest">
        {label}
      </div>
      <h3 className="text-[28px] leading-8 tracking-tight md:text-[36px] md:leading-[40px] px-8 text-foreground font-bold">
        {title}
      </h3>
      <div className="min-h-0 flex-1 flex items-end justify-center px-4 pt-4 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-4/5 rounded-t-xl transition-transform duration-300 group-hover:scale-105 ${placeholderColor} flex items-center justify-center border-t border-l border-r border-white/10`}
          >
            <span className="text-white/30 font-mono text-sm">
              [3D ASSET PLACEHOLDER]
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
