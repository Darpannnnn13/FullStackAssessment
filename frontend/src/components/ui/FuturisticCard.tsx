'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface FuturisticCardProps {
  children: React.ReactNode;
  title?: string;
  badgeText?: string;
  className?: string;
  glowColor?: 'violet' | 'cyan' | 'emerald' | 'amber';
}

export default function FuturisticCard({
  children,
  title,
  badgeText,
  className = '',
  glowColor = 'violet',
}: FuturisticCardProps) {
  const glowStyles = {
    violet: 'from-violet-500/25 via-indigo-500/10 to-transparent',
    cyan: 'from-cyan-500/25 via-blue-500/10 to-transparent',
    emerald: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    amber: 'from-amber-500/25 via-orange-500/10 to-transparent',
  };

  return (
    <div
      className={`theme-card group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Dynamic Glow Orbs */}
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${glowStyles[glowColor]} opacity-50 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-80`}
      />

      {/* Interactive Shimmer Overlay */}
      <div className="shimmer-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header & Badge */}
      {(title || badgeText) && (
        <div className="mb-4 flex items-center justify-between">
          {badgeText && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300 backdrop-blur-md">
              <Sparkles size={12} className="animate-pulse text-violet-400" />
              {badgeText}
            </span>
          )}
          {title && (
            <h3 className="text-sm font-semibold tracking-wide">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}