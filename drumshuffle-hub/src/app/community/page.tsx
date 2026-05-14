import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "DrumShuffle Hub — Community page.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
          Community
        </h1>
        <p className="text-night-400 text-lg">Coming soon — this page is under construction.</p>
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/20 bg-brand-500/[0.06] text-xs text-brand-300 uppercase tracking-widest">
          Phase 2
        </div>
      </div>
    </div>
  );
}
