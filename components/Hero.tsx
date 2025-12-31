"use client";

import { useState, useEffect } from "react";
import { motion, Variants, LayoutGroup } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScarcity } from "@/lib/useScarcity";
import { GhostReel } from "@/components/ui/GhostReel";
import { AlchemyPrism } from "@/components/ui/AlchemyPrism";
import { ScriptSlate } from "@/components/ui/ScriptSlate";
import { DataShard } from "@/components/ui/DataShard";
import PlatformMarquee from "@/components/PlatformMarquee";


// Headline Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SHARDS = Array.from({ length: 50 }, (_, i) => {
  let color = "bg-green-500/50"; // Visuals (Middle)
  if (i < 15) color = "bg-red-500/50"; // Hook (Top)
  else if (i >= 35) color = "bg-blue-500/50"; // Audio (Bottom)
  
  return { id: i, color };
});


export default function Hero() {
  const headlineWords = ["STOP", "GUESSING.", "START", "GOING", "VIRAL."];
  const { spots, isFlashing } = useScarcity();
  
  // Master Timeline State
  const [step, setStep] = useState(0);

  // Phase Logic:
  // 0s-2s: Phone (Intact)
  // 2s-3.5s: Flight (Explosion to Center)
  // 3.5s-6s: Editor (Reassembly)
  const phase = step === 0 ? 'phone'
              : step === 1 ? 'flight'
              : step === 2 ? 'editor'
              : 'phone';

  // 6s Master Loop
  useEffect(() => {
    const loop = () => {
      setStep(0); // 0s: Phone
      setTimeout(() => setStep(1), 2000); // 2s: Flight
      setTimeout(() => setStep(2), 3500); // 3.5s: Editor
      setTimeout(() => setStep(0), 6000); // 6s: Reset
    };

    loop();
    const interval = setInterval(loop, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-acid-magenta/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-acid-lime/15 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
        {/* Scarcity Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ 
             opacity: 1, 
             y: 0,
             backgroundColor: isFlashing ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.05)"
           }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md transition-colors duration-500"
        >
          <span className={`w-2 h-2 rounded-full ${isFlashing ? "bg-white" : "bg-red-500"} animate-pulse`} />
          <span className="text-sm font-medium text-zinc-300">
            High Demand: <span className={isFlashing ? "text-white font-bold" : "text-white"}>{spots} spots left</span>
          </span>
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-heading font-bold text-5xl md:text-8xl tracking-tighter leading-[0.9]"
        >
          {headlineWords.map((word, i) => {
            const isViral = word.includes("VIRAL");
            return (
                <motion.span 
                    key={i} 
                    variants={wordVariants} 
                    className={cn(
                        "text-white",
                        isViral && "text-transparent bg-clip-text bg-gradient-to-br from-acid-lime to-acid-magenta"
                    )}
                >
                {word}
                </motion.span>
            )
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light"
        >
          The first AI that watches viral reels and writes your unique version in
          seconds.
        </motion.p>

        {/* Shimmer Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-acid-lime text-black font-bold rounded-full overflow-hidden"
        >
          <span className="relative z-10">Join the First 100</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 1,
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
          />
        </motion.button>
      </div>

      {/* 3-Part Flow Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="w-full max-w-6xl mt-24 relative z-10"
      >
        <LayoutGroup>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative min-h-[500px]">
          
          {/* 1. INPUT: The Phone / Ghost Reel */}
          <div className="relative z-10 flex flex-col items-center">
            <GhostReel>
                {/* Render Grid System inside Phone only if Phase is Phone */}
                {phase === 'phone' && (
                    <div className="w-full h-full grid grid-cols-5 gap-1">
                        {SHARDS.map((shard, i) => (
                             <DataShard key={shard.id} id={shard.id} color={shard.color}  phase="phone" index={i} />
                        ))}
                    </div>
                )}
            </GhostReel>
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Input: Viral Reel</p>
          </div>

          {/* 2. PROCESS: Alchemy Prism / Flight Zone */}
          <div className="relative z-10 flex flex-col items-center justify-center h-64 lg:h-auto">
             
             {/* Flight Container Overlay */}
             {phase === 'flight' && (
                 <div className="absolute inset-0 flex items-center justify-center z-50">
                     <div className="w-64 h-64 relative">
                        {/* Swarm scatter logic is handled by Layout animations attempting to move from Grid to Editor, but we intercept here */}
                        {/* Actually, if we want them to STOP in the middle, we render them here */}
                        {SHARDS.map((shard, i) => (
                             <motion.div 
                                key={shard.id}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    x: (Math.random() - 0.5) * 200,
                                    y: (Math.random() - 0.5) * 200,
                                }}
                             >
                                <DataShard id={shard.id} color={shard.color}  phase="flight" index={i} />
                             </motion.div>
                        ))}
                     </div>
                 </div>
             )}

             <AlchemyPrism hitType={phase === 'flight' ? 'visual' : null} />
            <p className="mt-8 text-zinc-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                <RefreshCw strokeWidth={1.5} className={cn("w-3 h-3 animate-spin", phase === 'flight' ? "text-white" : "text-acid-lime")} />
                <span className={phase === 'flight' ? "text-white font-bold" : "text-zinc-400"}>
                    {phase === 'flight' ? "DECONSTRUCTING..." : "Analyzing Pattern..."}
                </span>
            </p>
          </div>

          {/* 3. OUTPUT: Script Slate */}
          <div className="relative z-10 flex flex-col items-center">
            <ScriptSlate phase={phase}>
                {phase === 'editor' && (
                    <div className="w-full h-full flex flex-col gap-1 p-2">
                        {SHARDS.map((shard, i) => (
                             <DataShard key={shard.id} id={shard.id} color={shard.color} phase="editor" index={i} />
                        ))}
                    </div>
                )}
            </ScriptSlate>
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Output: Generated Script</p>
          </div>

        </div>
        </LayoutGroup>
      </motion.div>

      {/* 4. Connected Platforms (Reacts to Extraction) */}
      <PlatformMarquee isActive={phase === 'flight'} />

    </section>
  );
}
