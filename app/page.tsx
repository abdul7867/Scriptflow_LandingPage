import HeroOrchestrator from "@/components/hero/HeroOrchestrator";
import PlatformMarquee from "@/components/PlatformMarquee";
import Problem from "@/components/Problem";
import ComparisonToggle from "@/components/ComparisonToggle";
import Features from "@/components/Features";
import LiveDemo from "@/components/LiveDemo";
import TargetAudience from "@/components/TargetAudience";
import FoundersManifesto from "@/components/FoundersManifesto";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

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
        <Features />
        <LiveDemo />
        <TargetAudience />
        <FoundersManifesto />
      </div>

      <Footer />
    </main>
  );
}
