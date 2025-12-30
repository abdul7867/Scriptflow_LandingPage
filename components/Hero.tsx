"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Smartphone, Wand2, FileText, Heart, MessageCircle, Share2, Link, RefreshCw, Zap, MoreHorizontal } from "lucide-react";
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
             backgroundColor: isFlashing ? "rgba(239, 68, 68, 0.5)" : "rgba(255, 255, 255, 0.05)" // Red-500 vs White/5
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
          
          {/* Shimmer Effect */}
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

      {/* 3-Part Flow Container - Machine Interface */}
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
             <div className="absolute top-1/2 left-[18%] right-[50%] h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`input-particle-${i}`}
                        className="absolute top-1/2 left-0 w-2 h-2 bg-white rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        initial={{ x: "0%",  opacity: 0, y: "-50%" }}
                        animate={{ x: "100%", opacity: [0, 1, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            delay: i * 0.6,
                            ease: "linear"
                        }}
                    />
                ))}
             </div>

             {/* Beam 2: Output (Core -> Editor) */}
             <div className="absolute top-1/2 left-[50%] right-[18%] h-[2px] bg-gradient-to-r from-transparent via-acid-lime/30 to-acid-lime/10 -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`output-particle-${i}`}
                        className={cn(
                            "absolute top-1/2 left-0 w-8 h-[3px] shadow-[0_0_15px_rgba(189,255,0,0.8)]",
                            i % 2 === 0 ? "bg-acid-lime" : "bg-acid-magenta shadow-[0_0_15px_rgba(255,0,255,0.8)]"
                        )}
                        initial={{ x: "0%", opacity: 0, y: "-50%" }}
                        animate={{ x: "100%", opacity: [0, 1, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            delay: i * 0.4,
                            ease: "circIn"
                        }}
                    />
                ))}
            </div>
          </div>

          {/* PART 1: INPUT (Phone Mockup) */}
          <div className="relative z-10 flex flex-col items-center">
            <IPhoneMockup />
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Input: Viral Reel</p>
          </div>

          {/* PART 2: PROCESS (AI Core) */}
          <div className="relative z-10 flex flex-col items-center justify-center h-64 lg:h-auto">
             <div className="relative w-40 h-40">
                {/* Spinning Core Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "absolute inset-0 border-2 rounded-full",
                            i === 0 ? "border-acid-lime/30" : i === 1 ? "border-acid-magenta/30" : "border-white/10"
                        )}
                        style={{ borderStyle: i === 2 ? 'dashed' : 'solid' }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 10 - (i * 2), ease: "linear" }}
                    />
                ))}
                
                {/* Central Prism */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ 
                            boxShadow: ["0 0 20px #FFFFFF", "0 0 30px #BDFF00", "0 0 50px #FF00FF", "0 0 20px #FFFFFF"],
                            scale: [1, 1.1, 1.05, 1],
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="w-20 h-20 bg-black border border-white/20 backdrop-blur-md rounded-xl flex items-center justify-center rotate-45 relative overflow-hidden"
                    >
                         {/* Internal Alchemy Swirl */}
                        <motion.div 
                             className="absolute inset-[-50%] bg-gradient-to-t from-white/20 via-acid-lime/40 to-acid-magenta/40 blur-xl"
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        />
                        <Zap className="w-8 h-8 text-white -rotate-45 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </motion.div>
                </div>

                {/* Flying Bits */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full bg-acid-lime"
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={{ 
                            x: (Math.random() - 0.5) * 200, 
                            y: (Math.random() - 0.5) * 200, 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2, delay: Math.random() * 2 }}
                    />
                ))}
            </div>
            <p className="mt-8 text-zinc-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin text-acid-lime" />
                <span className="text-zinc-400">Refactoring Logic...</span>
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
                    <span className="ml-auto text-[10px] font-mono text-zinc-600">script_v1.txt</span>
                </div>

                {/* Editor Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-zinc-400 font-light overflow-hidden relative">
                    {/* Scanline */}
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-acid-lime/10 shadow-[0_0_10px_rgba(189,255,0,0.2)]"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase text-acid-magenta font-bold tracking-wider opacity-70">/// HOOK</span>
                            <div className="text-white border-l-2 border-acid-magenta/50 pl-3">
                                <TypewriterEffect 
                                    text={`"Stop scrolling if you want to fix your engagement right now."`}
                                    delay={2}
                                    duration={1}
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase text-blue-400 font-bold tracking-wider opacity-70">/// BODY</span>
                            <div className="text-zinc-300 border-l-2 border-blue-400/50 pl-3">
                                <TypewriterEffect 
                                    text={`Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1%...`}
                                    delay={3.2}
                                    duration={2}
                                    textColor="text-zinc-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                             <span className="text-[10px] uppercase text-acid-lime font-bold tracking-wider opacity-70">/// CTA</span>
                             <div className="text-white border-l-2 border-acid-lime/50 pl-3">
                                <TypewriterEffect 
                                    text={`"Comment 'SCRIPT' and I'll send you the template instantly."`}
                                    delay={5.5}
                                    duration={1}
                                    textColor="text-white"
                                />
                                <span className="inline-block w-2 h-4 bg-acid-lime ml-1 align-middle animate-pulse" />
                             </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <p className="mt-6 text-zinc-500 font-mono text-sm tracking-widest uppercase">Output: Unique Script</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
