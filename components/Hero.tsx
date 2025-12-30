"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-orange/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-zinc-300">
            Beta Access Open
          </span>
        </motion.div>

        {/* Typewriter Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-heading font-bold text-5xl md:text-8xl tracking-tighter leading-[0.9]"
        >
          {headlineWords.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="text-white">
              {word}
            </motion.span>
          ))}
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
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-full overflow-hidden"
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
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          />
        </motion.button>
      </div>

      {/* Living Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.02, rotateX: 2 }}
        className="w-full max-w-5xl mt-20 relative perspective-1000"
      >
        <div className="relative rounded-xl border border-glass-border bg-gradient-to-br from-zinc-900 to-black backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] group flex flex-col">
          
          {/* Glass Reflection */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-white/10 to-transparent -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20 pointer-events-none" />

          {/* Dashboard Header */}
          <div className="w-full h-12 border-b border-glass-border/30 bg-white/5 flex items-center px-4 gap-2 z-10 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            {/* Search Bar Detail */}
            <div className="ml-4 w-48 h-6 bg-white/5 rounded-full border border-white/5 mx-auto hidden md:block" />
          </div>

          <div className="flex flex-1 relative z-10 overflow-hidden">
             {/* Sidebar (Fake UI) */}
             <div className="w-16 md:w-48 h-full border-r border-glass-border/30 bg-white/2 hidden md:flex flex-col p-4 gap-4">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 w-full bg-white/5 rounded-full" style={{ width: `${Math.random() * 50 + 40}%` }} />
                 ))}
                 <div className="mt-auto h-24 w-full bg-white/5 rounded-lg border border-white/5" />
             </div>

             {/* Main Content Area */}
             <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                 
                 {/* Metadata Badges */}
                 <div className="absolute top-6 left-6 md:left-12 flex items-center gap-2">
                     {["TARGET: GEN Z", "MOOD: HIGH ENERGY", "DURATION: 0:45"].map((badge, i) => (
                        <span key={i} className="text-[9px] md:text-[10px] font-mono text-zinc-500 border border-white/10 px-2 py-1 rounded bg-white/5 uppercase tracking-wider">
                            {badge}
                        </span>
                     ))}
                 </div>

                 {/* Virality Score Widget */}
                 <div className="absolute top-6 right-6 md:right-12 hidden md:flex items-start gap-4 p-3 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm">
                    {/* Ring Chart */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                            <motion.circle 
                                cx="24" cy="24" r="20" 
                                stroke="#22c55e" strokeWidth="4" 
                                fill="transparent" 
                                strokeDasharray="125.6" 
                                strokeDashoffset="125.6"
                                animate={{ strokeDashoffset: 10 }} // 92/100ish
                                transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-[10px] font-bold text-white">92</span>
                    </div>
                    {/* Checklist */}
                    <div className="space-y-1">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Viral Potential: <span className="text-green-500">High</span></div>
                        <div className="flex flex-col gap-0.5">
                            {["Hook < 3s", "Trending Keyword", "Loopable"].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 2.5 + (i * 0.2) }}
                                    className="flex items-center gap-1.5"
                                >
                                    <div className="w-2 h-2 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-1 h-1 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-[9px] text-zinc-500 font-mono">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                 </div>

                 <div className="flex gap-12 items-center relative z-10 w-full justify-center">
                     
                     {/* Left Side: Waveform & Analysis */}
                     <div className="flex flex-col items-center">
                         {/* Active Audio Waveform */}
                        <div className="relative z-10 flex items-center gap-1.5 md:gap-3 h-32 md:h-48">
                            {[...Array(9)].map((_, i) => (
                                <motion.div
                                key={i}
                                animate={{
                                    height: ["20%", "80%", "20%"],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    delay: i * 0.1, // Stagger effect
                                    repeatType: "mirror"
                                }}
                                className="w-3 md:w-6 rounded-full bg-gradient-to-t from-orange-500 to-red-500 shadow-[0_0_20px_rgba(255,85,0,0.6)]"
                                style={{
                                    height: "40%"
                                }}
                                />
                            ))}
                        </div>

                        <div className="mt-8 relative z-10 text-center">
                            <motion.p 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="font-mono text-brand-orange text-sm md:text-base tracking-widest uppercase mb-6"
                            >
                                Analyzing Viral Patterns...
                            </motion.p>
                        </div>
                     </div>

                     {/* Right Side: Phone Mockup */}
                     <div className="hidden lg:block relative w-[200px] h-[400px] rounded-[30px] border-4 border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl rotate-3">
                         {/* Dynamic Dynamic Island */}
                         <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />
                         
                         {/* Phone Screen Content */}
                         <div className="absolute inset-0 bg-zinc-900 flex flex-col">
                             {/* Video Background Placeholder */}
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
                             
                             {/* UI Icons Right */}
                             <div className="absolute right-2 bottom-20 flex flex-col gap-4 z-20 items-center">
                                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white rounded-full" /> {/* Heart */}
                                 </div>
                                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md" /> {/* Comment */}
                                 <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md" /> {/* Share */}
                             </div>

                             {/* Script Overlay */}
                             <div className="mt-auto p-4 z-20 space-y-2 mb-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-brand-orange" />
                                    <span className="text-[10px] font-bold text-white">@viral_creator</span>
                                </div>
                                <motion.p 
                                    className="text-xs text-white font-medium leading-relaxed drop-shadow-md"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <span className="bg-brand-orange/80 px-1 rounded-sm text-white">Stop scrolling.</span> Here is the exact prompt to 10x your views.
                                    <span className="inline-block w-1 h-3 bg-brand-orange ml-1 animate-pulse" />
                                </motion.p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Timeline UI */}
                 <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 h-px bg-white/10 flex justify-between items-end pb-2">
                     <div className="h-2 w-px bg-white/20 relative"><span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-600">0:00</span></div>
                     <div className="h-1 w-px bg-white/10" />
                     <div className="h-1 w-px bg-white/10" />
                     <div className="h-2 w-px bg-white/20 relative"><span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-600">0:15</span></div>
                     <div className="h-1 w-px bg-white/10" />
                     <div className="h-1 w-px bg-white/10" />
                     <div className="h-2 w-px bg-white/20 relative"><span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-600">0:30</span></div>
                 </div>

             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
