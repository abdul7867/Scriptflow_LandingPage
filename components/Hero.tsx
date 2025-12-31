"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScarcity } from "@/lib/useScarcity";
import IPhoneMockup from "@/components/ui/IPhoneMockup";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";

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

export default function Hero() {
  const headlineWords = ["STOP", "GUESSING.", "START", "GOING", "VIRAL."];
  const { spots, isFlashing } = useScarcity();
  
  // Animation Phase State
  const [phase, setPhase] = useState<'idle' | 'transfer' | 'processing' | 'generating' | 'highlight'>('idle');

  // 10s Loop Synchronization
  useEffect(() => {
    const loop = () => {
      setPhase('idle');
      
      // 4.5s: Link Orb shoots (Phone -> Core)
      setTimeout(() => setPhase('transfer'), 4500);
      
      // 5.0s: Processing (Core Hits)
      setTimeout(() => setPhase('processing'), 5000);

      // 5.5s: Generating (Core -> Desktop, Typing Starts)
      setTimeout(() => setPhase('generating'), 5500);

      // 8.0s: Highlight (Text finishes, Neon colors)
      setTimeout(() => setPhase('highlight'), 8000);
    };

    loop();
    const interval = setInterval(loop, 10000);
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
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
          
          {/* DATA STREAM BEAMS (Desktop Only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
             
             {/* Beam 1: Input (Phone -> Core) */}
             <motion.div 
                animate={{ opacity: phase === 'transfer' ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-[18%] right-[50%] h-[2px] bg-gradient-to-r from-acid-lime/50 to-acid-lime -translate-y-1/2 overflow-visible"
             >
                {/* ORB 1: Transfer @ 4.5s */}
                <AnimatePresence>
                    {phase === 'transfer' && (
                        <motion.div
                            initial={{ left: "0%", opacity: 0, scale: 0 }}
                            animate={{ left: "100%", opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }} 
                            transition={{ duration: 0.5, ease: "linear" }} 
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 z-20"
                        >
                            <div className="w-full h-full rounded-full bg-white border-2 border-acid-lime shadow-[0_0_15px_#BDFF00]" />
                        </motion.div>
                    )}
                </AnimatePresence>
             </motion.div>

             {/* Beam 2: Output (Core -> Editor) */}
             <motion.div 
                animate={{ opacity: phase === 'generating' ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-[50%] right-[18%] h-[2px] bg-gradient-to-r from-acid-lime to-acid-magenta -translate-y-1/2 overflow-visible"
             >
                {/* ORB 2: Generating (Magenta) */}
                <AnimatePresence>
                    {phase === 'generating' && (
                        <motion.div
                            initial={{ left: "0%", opacity: 0, scale: 0.5 }}
                            animate={{ left: "100%", opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5, ease: "linear" }} 
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 z-20"
                        >
                             <div className="w-full h-full rounded-full bg-white border-2 border-acid-magenta shadow-[0_0_15px_#FF00FF]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
          </div>

          {/* PART 1: INPUT (Phone Mockup) */}
          <div className="relative z-10 flex flex-col items-center">
            <IPhoneMockup />
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Input: Viral Reel</p>
          </div>

          {/* PART 2: PROCESS (AI Core) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-64 lg:h-auto">
             <div className="relative w-40 h-40">
                {/* Spinning Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "absolute inset-0 border-2 rounded-full",
                            i === 0 ? "border-acid-lime/30" : i === 1 ? "border-acid-magenta/30" : "border-white/10",
                            (phase === 'processing' || phase === 'generating') && "border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        )}
                        style={{ borderStyle: i === 2 ? 'dashed' : 'solid' }}
                        animate={{ 
                            rotate: i % 2 === 0 ? 360 : -360, 
                            scale: (phase === 'processing' || phase === 'generating') ? [1, 1.2, 1] : [1, 1.1, 1] 
                        }}
                        transition={{ 
                            rotate: { 
                                repeat: Infinity, 
                                duration: (phase === 'processing' || phase === 'generating') ? 1 : 10 - (i * 2), 
                                ease: "linear" 
                            },
                            scale: { repeat: Infinity, duration: 1 } 
                        }}
                    />
                ))}
                
                {/* Central Prism */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={phase === 'processing' ? { 
                            scale: [1, 1.5, 1],
                            rotate: [45, 405], // Spin 360 (45 -> 405)
                            backgroundColor: ["#000000", "#FFFFFF", "#000000"], // Flash White
                            boxShadow: ["0 0 20px #BDFF00", "0 0 100px #FFFFFF", "0 0 50px #FF00FF"]
                         } : { 
                            scale: [1, 1.1, 1.05, 1],
                            rotate: 45,
                            backgroundColor: "#000000",
                            boxShadow: ["0 0 20px #FFFFFF", "0 0 30px #BDFF00", "0 0 50px #FF00FF", "0 0 20px #FFFFFF"]
                         }}
                        transition={{ 
                            duration: phase === 'processing' ? 0.5 : 4,
                            ease: phase === 'processing' ? "easeInOut" : "linear",
                            repeat: phase === 'processing' ? 0 : Infinity,
                        }}
                        className="w-20 h-20 bg-black border border-white/20 backdrop-blur-md rounded-xl flex items-center justify-center rotate-45 relative overflow-hidden"
                    >
                         {/* Internal Swirl */}
                        <motion.div 
                             className={cn(
                                 "absolute inset-[-50%] bg-gradient-to-t blur-xl transition-colors duration-500",
                                 (phase === 'processing' || phase === 'generating') ? "from-white via-acid-lime to-white" : "from-white/20 via-acid-lime/40 to-acid-magenta/40"
                             )}
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: (phase === 'processing' || phase === 'generating') ? 0.2 : 3, ease: "linear" }}
                        />
                        <Zap className={cn(
                            "w-8 h-8 -rotate-45 relative z-10 transition-colors duration-300",
                            (phase === 'processing' || phase === 'generating') ? "text-black fill-black" : "text-white fill-none"
                        )} />
                    </motion.div>
                </div>

                {/* Explosion Particles */}
                {phase === 'processing' && [...Array(12)].map((_, i) => (
                    <motion.div
                        key={`spark-${i}`}
                        className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full"
                        initial={{ x: 0, y: 0, scale: 0 }}
                        animate={{ 
                            x: (Math.random() - 0.5) * 300, 
                            y: (Math.random() - 0.5) * 300, 
                            opacity: [1, 0],
                            scale: [0, 2, 0]
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                ))}
            </div>
            <p className="mt-8 text-zinc-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                <RefreshCw className={cn("w-3 h-3 animate-spin", (phase === 'processing' || phase === 'generating') ? "text-white" : "text-acid-lime")} />
                <span className={(phase === 'processing' || phase === 'generating') ? "text-white font-bold" : "text-zinc-400"}>
                    {(phase === 'processing' || phase === 'generating') ? "ANALYZING..." : "Refactoring Logic..."}
                </span>
            </p>
          </div>

          {/* PART 3: OUTPUT (Script Editor) */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[400px]"
            >
                {/* Window Header */}
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    {/* Header Message */}
                    <span className={cn(
                        "ml-auto text-[10px] font-mono",
                        (phase === 'generating' || phase === 'highlight') ? "text-acid-lime font-bold animate-pulse" : "text-zinc-600"
                    )}>
                        {(phase === 'generating' || phase === 'highlight') ? "Analyzing Hook..." : "waiting_for_input..."}
                    </span>
                </div>

                {/* Editor Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-zinc-400 font-light overflow-hidden relative">
                    {/* Scanline */}
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-acid-lime/10 shadow-[0_0_10px_rgba(189,255,0,0.2)]"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    
                    {(phase === 'generating' || phase === 'highlight') ? (
                        <div className="space-y-4">
                            {/* HOOK */}
                            <motion.div 
                                className="space-y-1"
                                initial={false}
                                animate={phase === 'highlight' ? { scale: 1.05 } : { scale: 1 }}
                            >
                                <span className="text-[10px] uppercase font-bold tracking-wider text-acid-lime">/// HOOK</span>
                                <motion.div 
                                    className={cn(
                                        "pl-3 border-l-2 transition-all duration-300",
                                        phase === 'highlight' ? "border-acid-lime bg-acid-lime/20 text-white p-2 rounded-r-md" : "border-acid-lime/50 text-white"
                                    )}
                                >
                                    <TypewriterEffect 
                                        text={`"Stop scrolling if you want to fix your engagement right now."`}
                                        delay={0}
                                        duration={1}
                                        textColor="text-white"
                                    />
                                </motion.div>
                            </motion.div>
                            
                            {/* BODY */}
                            <motion.div 
                                className="space-y-1"
                                animate={{ opacity: phase === 'highlight' ? 0.5 : 1 }}
                            >
                                <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">/// BODY</span>
                                <div className="text-zinc-300 border-l-2 border-white/10 pl-3">
                                    <TypewriterEffect 
                                        text={`Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1%...`}
                                        delay={1.2}
                                        duration={1.5}
                                        textColor="text-zinc-300"
                                    />
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div 
                                className="space-y-1"
                                initial={false}
                                animate={phase === 'highlight' ? { scale: 1.05 } : { scale: 1 }}
                            >
                                 <span className="text-[10px] uppercase font-bold tracking-wider text-acid-magenta">/// CTA</span>
                                 <motion.div 
                                    className={cn(
                                        "pl-3 border-l-2 transition-all duration-300",
                                        phase === 'highlight' ? "border-acid-magenta bg-acid-magenta/20 text-white p-2 rounded-r-md" : "border-acid-magenta/50 text-white"
                                    )}
                                 >
                                    <TypewriterEffect 
                                        text={`"Check the Link in bio for the template."`}
                                        delay={2.8}
                                        duration={1}
                                        textColor="text-white"
                                    />
                                    {phase === 'generating' && (
                                        <span className="inline-block w-2 h-4 bg-acid-lime ml-1 align-middle animate-pulse" />
                                    )}
                                 </motion.div>
                            </motion.div>
                        </div>
                    ) : (
                        // Placeholder or Empty state during idle/transfer/processing
                        <div className="flex items-center justify-center h-full opacity-20">
                            <RefreshCw className="w-8 h-8 animate-spin text-zinc-600" />
                        </div>
                    )}
                </div>
            </motion.div>
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Output: Unique Script</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
