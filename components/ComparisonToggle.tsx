"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ComparisonToggle() {
  const [activeTab, setActiveTab] = useState<"old" | "new">("old");

  return (
    <section className="w-full py-24 px-4 bg-brand-dark flex flex-col items-center">
      
      {/* Toggle Controls */}
      <div className="relative p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-16">
        <div className="flex relative z-10">
          <button
            onClick={() => setActiveTab("old")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200",
              activeTab === "old" ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            The Old Way
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200",
              activeTab === "new" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            With ScriptFlow
          </button>
        </div>
        
        {/* Sliding Pill Background */}
        <motion.div
            layout
            className={cn(
                "absolute top-1 bottom-1 rounded-full",
                activeTab === "old" ? "bg-zinc-800 w-[100px] left-1" : "bg-white w-[130px] left-[108px]"
            )}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Comparison Container */}
      <div className="relative w-full max-w-4xl min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === "old" ? (
            <motion.div
              key="old"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* The Old Way: Boring Card */}
              <div className="w-full h-full bg-[#e5e5e5] rounded-xl p-12 shadow-sm text-[#333] font-mono text-xl leading-relaxed border border-zinc-300 flex flex-col gap-6" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
                 <div className="flex gap-2 mb-4 opacity-30">
                    <div className="w-3 h-3 rounded-full bg-zinc-400" />
                    <div className="w-3 h-3 rounded-full bg-zinc-400" />
                    <div className="w-3 h-3 rounded-full bg-zinc-400" />
                 </div>
                 <p className="opacity-80">
                   Video idea... maybe talk about AI?<br/>
                   umm start with a question...<br/>
                   <br/>
                   ask them to subscribe at the end.<br/>
                   <br/>
                   make sure to show the tool.<br/>
                   idk what hook to use.<br/>
                   <br/>
                   (come back to this later)
                 </p>
                 <div className="mt-auto opacity-40 italic text-xs font-sans">
                    Last edited: Yesterday 
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="new"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
