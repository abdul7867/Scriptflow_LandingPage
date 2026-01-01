"use client";


import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScarcity } from "@/lib/useScarcity";
import HeroOrchestrator from "@/components/hero/HeroOrchestrator";

// --- Configuration ---
// (Pixel Grid constants removed as they are no longer used)



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
  
  // HeroDirector handles the animation state internally
  
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-4 overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-acid-magenta/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-acid-lime/15 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto mb-20">
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

      {/* --- ANIMATION LAB (Phone -> Script) --- */}
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 1.2 }}
         className="w-full max-w-7xl relative z-10 mt-10"
      >
        <HeroOrchestrator />
      </motion.div>

    </section>
  );
}
