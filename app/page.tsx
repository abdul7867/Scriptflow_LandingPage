import HeroOrchestrator from "@/components/hero/HeroOrchestrator";
import PlatformMarquee from "@/components/sections/PlatformMarquee";
import Problem from "@/components/sections/Problem";
import ComparisonToggle from "@/components/sections/ComparisonToggle";
import LiveDemo from "@/components/sections/LiveDemo";
import TargetAudience from "@/components/sections/TargetAudience";
import FoundersManifesto from "@/components/sections/FoundersManifesto";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";
import FloatingDock from "@/components/layout/FloatingDock";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-white relative">
      <FloatingDock />
      
      <HeroOrchestrator />
      
      <PlatformMarquee />
      
      {/* Space between sections */}
      <div className="space-y-24 pb-24">
        <Problem />
        <ComparisonToggle />
        <LiveDemo />
        <Features />
        <TargetAudience />
        <FoundersManifesto />
        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
