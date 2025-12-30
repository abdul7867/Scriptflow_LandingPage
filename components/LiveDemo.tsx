"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SCRIPT_CONTENT = `HOOK: (Points to screen)
If you think your computer is fast, you're wrong.

BODY:
Imagine a coin spinning on a table.
It's not heads. It's not tails.
It's both at the same time.

That is a Qubit. And it's about to change everything.`;

export default function LiveDemo() {
  const [status, setStatus] = useState<"idle" | "thinking" | "typing" | "done">("idle");
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 20; // ms per char

  // Start the demo loop automatically
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runDemo = () => {
      setStatus("thinking");
      setDisplayedText("");

      // Phase 1: Thinking
      timeout = setTimeout(() => {
        setStatus("typing");
      }, 1500);
    };

    // Run on mount
    const initialDelay = setTimeout(runDemo, 1000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, []);

  // Typing Effect
  useEffect(() => {
    if (status === "typing") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < SCRIPT_CONTENT.length) {
          setDisplayedText(SCRIPT_CONTENT.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setStatus("done");
          
          // Reset loop after delay
          setTimeout(() => {
             setStatus("idle");
             setDisplayedText("");
             setTimeout(() => setStatus("thinking"), 500);
          }, 6000);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <section className="w-full py-32 px-4 bg-brand-dark flex flex-col items-center border-t border-white/5">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
                See it in Action
            </h2>
            <p className="text-zinc-400">No editing required. Just pure viral logic.</p>
        </div>

        {/* The Live Interface */}
        <div className="rounded-2xl border border-glass-border bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
          
          {/* Prompt Bar */}
          <div className="p-4 border-b border-white/5 flex gap-4 items-center bg-white/5">
            <div className="flex-1 bg-black/40 rounded-lg px-4 py-3 flex items-center gap-3 border border-white/5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span className="text-sm md:text-base text-zinc-300 font-mono truncate">
                    Input: "Explain Quantum Computing to a 5-year-old..."
                </span>
            </div>
            <motion.button
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all",
                    status === "idle" || status === "thinking" 
                        ? "bg-brand-orange text-white shadow-[0_0_20px_rgba(255,85,0,0.4)]" 
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                )}
            >
                {status === "thinking" ? (
                    <Loader2 className="w-4 h-4 animate-spin" /> 
                ) : (
                    <Play className="w-4 h-4 fill-current" />
                )}
                <span className="hidden md:inline">Generate</span>
            </motion.button>
          </div>

          {/* Result Card */}
          <div className="relative min-h-[300px] p-8 md:p-12 font-sans text-lg md:text-xl leading-relaxed text-zinc-300">
             
             {/* Thinking State */}
             <AnimatePresence>
                {status === "thinking" && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/20 backdrop-blur-[2px] z-20"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border-4 border-brand-orange/30 border-t-brand-orange animate-spin" />
                            <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(255,85,0,0.4)]" />
                        </div>
                        <p className="text-sm font-mono text-brand-orange animate-pulse">Analyzing topic...</p>
                    </motion.div>
                )}
             </AnimatePresence>

             {/* Content Area */}
             <div className="whitespace-pre-wrap">
                {status === "done" ? (
                   // Render Highlighted Version
                   <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-wider block mb-2">HOOK: (Points to screen)</span>
                        <span className="text-white font-medium">If you think your computer is fast, </span> 
                        <span className="text-brand-orange font-bold drop-shadow-[0_0_10px_rgba(255,85,0,0.5)]">you're wrong.</span>
                        <br /><br />
                        <span className="text-zinc-500 font-mono text-sm uppercase tracking-wider block mb-2">BODY:</span>
                        Imagine a coin spinning on a table. <br/>
                        It's not heads. It's not tails. <br/>
                        It's <span className="text-brand-orange font-bold">both at the same time.</span>
                        <br /><br />
                        That is a Qubit. And it's about to <span className="text-brand-orange font-bold">change everything.</span>
                   </motion.div>
                ) : (
                   // Render Typing Text
                   <span>{displayedText}</span>
                )}
                
                {/* Visual Cursor when typing */}
                {status === "typing" && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7 }}
                        className="inline-block w-2 h-5 bg-brand-orange ml-1 translate-y-1"
                    />
                )}
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
