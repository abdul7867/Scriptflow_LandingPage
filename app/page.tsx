import Hero from "@/components/Hero";

import Problem from "@/components/Problem";
import ComparisonToggle from "@/components/ComparisonToggle";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import TargetAudience from "@/components/TargetAudience";
import FoundersManifesto from "@/components/FoundersManifesto";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />

      <Problem />
      <ComparisonToggle />
      <LiveDemo />
      <Features />
      <TargetAudience />
      <FoundersManifesto />
      <Footer />
      <FloatingDock />
    </main>
  );
}
