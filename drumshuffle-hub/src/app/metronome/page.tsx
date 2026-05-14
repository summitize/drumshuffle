import type { Metadata } from "next";
import { MetronomeUI } from "@/features/metronome";

export const metadata: Metadata = {
  title: "Smart Metronome",
  description: "Professional drummer metronome with tap tempo, subdivisions, and visual pulse.",
};

export default function MetronomePage() {
  return <MetronomeUI />;
}
