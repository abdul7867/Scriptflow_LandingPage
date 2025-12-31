"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ComparisonToggle() {
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");

  return (
    <section className="w-full py-24 px-4 bg-brand-dark flex flex-col items-center">
      
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
          Evolution of a Viral Script
        </h2>
        <p className="text-zinc-400 text-lg">
          See the difference between manual guessing and AI precision.
        </p>
      </div>

      {/* Toggle Controls */}
      <div className="relative p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-16 flex font-medium">
          {/* Old Way Button */}
          <button
            onClick={() => setActiveTab("old")}
            className={cn(
               "relative px-8 py-2.5 rounded-full text-sm transition-all duration-300 z-10",
               activeTab === "old" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            The Old Way
            {activeTab === "old" && (
                <motion.div
                    layoutId="toggle-pill"
                    className="absolute inset-0 bg-[#bdff00] rounded-full -z-10 shadow-[0_0_20px_rgba(189,255,0,0.5)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
          </button>

          {/* New Way Button */}
          <button
            onClick={() => setActiveTab("new")}
            className={cn(
               "relative px-8 py-2.5 rounded-full text-sm transition-all duration-300 z-10",
               activeTab === "new" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            With ScriptFlow
            {activeTab === "new" && (
                <motion.div
                     layoutId="toggle-pill"
                     className="absolute inset-0 bg-[#bdff00] rounded-full -z-10 shadow-[0_0_20px_rgba(189,255,0,0.5)]"
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
          </button>
      </div>

      {/* Comparison Container */}
      <div className="relative w-full max-w-4xl min-h-[500px]">
        {/* We use a single AnimatePresence to handle the switch */}
        <div className="relative w-full h-full min-h-[500px]">
             
             {/* SCRIPTFLOW CARD (Always rendered but covered by Old Way if activeTab is 'old') 
                 Wait, user said 'Morph'. Actually, simplest way to 'burn away' is to have New Way always underneath
                 and fade out Old Way on top.
             */}
            <div className="absolute inset-0 w-full h-full"> 
                {/* The ScriptFlow Way: High-Tech Glass Card */}
                <div className="w-full h-full rounded-xl p-12 border border-glass-border bg-gradient-to-br from-zinc-900 to-black backdrop-blur-xl shadow-[0_0_50px_rgba(189,255,0,0.1)] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[10px]">●</div>
                            <div className="w-4 h-4 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px]">●</div>
                            <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-[10px]">●</div>
                        </div>
                        <div className="px-3 py-1 rounded-md bg-acid-lime/10 border border-acid-lime/20 text-xs text-acid-lime font-mono uppercase tracking-wider">
                            Viral Pattern Detected
                        </div>
                    </div>

                    <div className="space-y-8 font-sans text-xl text-white/90">
                        {/* Hook Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-lg bg-acid-lime/10 border border-acid-lime/20 relative group"
                        >
                            <div className="absolute top-2 right-2 px-2 py-1 rounded text-[10px] bg-acid-lime/20 text-acid-lime font-mono uppercase tracking-wide">
                                Hook (0:03)
                            </div>
                            <p className="text-white font-medium z-10 relative leading-snug">
                                "Stop scrolling. Here is the exact prompt to 10x your views."
                            </p>
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 bg-acid-lime/5 rounded-lg animate-pulse z-0 pointer-events-none" />
                        </motion.div>

                        {/* Body Section */}
                        <div className="pl-6 border-l-2 border-white/10 space-y-3">
                            <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="h-4 bg-white/5 rounded w-full" />
                            <div className="h-4 bg-white/5 rounded w-5/6" />
                        </div>

                        {/* CTA Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-lg bg-acid-magenta/10 border border-acid-magenta/20"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-acid-magenta/70 font-mono uppercase">CTA</span>
                            </div>
                             <p className="text-acid-magenta font-bold text-2xl">
                                "Comment 'SCRIPT' for access."
                            </p>
                        </motion.div>
                    </div>

                    {/* Subtle Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                </div>
            </div>

            {/* OLD WAY CARD (Overlay that fades out) */}
            <AnimatePresence>
                {activeTab === "old" && (
                     <motion.div
                        layoutId="comparison-card" // Shared layoutId for morphing if we were swapping, but here we just fade
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-10"
                    >
                        {/* The Old Way: Boring Paper Card */}
                        <div className="w-full h-full bg-[#f0f0f0] rounded-xl p-12 shadow-xl text-[#1a1a1a] border border-zinc-300 flex flex-col gap-6 relative overflow-hidden" 
                             style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
                            
                            {/* Paper Texture/Noise */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.svg')]" />
                            
                            <div className="flex gap-2 mb-4 opacity-30">
                                <div className="w-3 h-3 rounded-full bg-zinc-400" />
                                <div className="w-3 h-3 rounded-full bg-zinc-400" />
                                <div className="w-3 h-3 rounded-full bg-zinc-400" />
                            </div>
                            
                            <div className="text-xl leading-relaxed relative">
                                <p className="mb-8">
                                    Video idea... maybe talk about AI?<br/>
                                    umm start with a question...
                                </p>
                                <p className="mb-8">
                                    ask them to subscribe at the end.
                                </p>
                                <p className="mb-4">
                                    make sure to show the tool.<br/>
                                    idk what hook to use.
                                </p>
                                <p className="opacity-60">
                                    (come back to this later)<span className="inline-block w-2.5 h-5 bg-black ml-1 animate-pulse align-middle"></span>
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-black/10 flex justify-between items-center opacity-50 text-xs font-sans text-black">
                                <span>Untitled.txt</span>
                                <span>Last edited: Yesterday</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
