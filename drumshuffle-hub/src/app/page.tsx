import { HeroSection } from "@/components/sections/HeroSection";
import { YouTubeSection } from "@/components/sections/YouTubeSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TrendingSheetsSection } from "@/components/sections/TrendingSheetsSection";
import { SamplePacksSection } from "@/components/sections/SamplePacksSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-24">
      <HeroSection />
      <YouTubeSection />
      <FeaturesSection />
      <TrendingSheetsSection />
      <SamplePacksSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
