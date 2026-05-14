import type { Metadata } from "next";
import { DrumKitUI } from "@/features/simulator";

export const metadata: Metadata = {
  title: "Pro Drum Simulator",
  description: "Low latency, velocity sensitive drum simulator with recording capabilities.",
};

export default function SimulatorPage() {
  return <DrumKitUI />;
}
