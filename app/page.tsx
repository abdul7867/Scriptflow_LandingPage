import Hero from "@/components/Hero";
import PlatformMarquee from "@/components/PlatformMarquee";
import Problem from "@/components/Problem";
import ComparisonToggle from "@/components/ComparisonToggle";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import FoundersManifesto from "@/components/FoundersManifesto";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <PlatformMarquee />
      <Problem />
      <ComparisonToggle />
      <LiveDemo />
      <Features />
      <FoundersManifesto />
      <Footer />
      <FloatingDock />
    </main>
  );
}
