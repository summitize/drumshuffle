import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "DrumShuffle Hub — Phase 2 feature coming soon.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20 px-4">
      <div className="text-center max-w-md w-full glass-card p-10">
        <h1 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
          Coming Soon
        </h1>
        <p className="text-night-400 text-lg mb-8 leading-relaxed">
          This section is currently under construction.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-500/20 bg-brand-500/[0.06] text-xs font-bold text-brand-300 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,61,46,0.1)]">
          Phase 2 Feature
        </div>
      </div>
    </div>
  );
}
