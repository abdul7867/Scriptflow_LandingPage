"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Clipboard, Check, Search, Zap, BarChart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LOADING_PHASES = [
  { text: "Detecting Hook Pattern...", icon: Search },
  { text: "Analyzing Pacing & Cuts...", icon: BarChart },
  { text: "Identifying Viral Keywords...", icon: Zap },
];

export default function LiveDemo() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleAnalyze = () => {
    if (!inputText) return;
    setStep("loading");
    setLoadingPhase(0);

    // Cycle through loading phases
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase < LOADING_PHASES.length) {
        setLoadingPhase(phase);
      }
    }, 1500);

    // Finish after all phases
    setTimeout(() => {
      clearInterval(interval);
      setStep("result");
    }, 4500);
  };

  const handleCopy = () => {
    const script = `HOOK: "Stop scrolling if you want to fix your engagement right now."
    
VALUE PROP: "Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1%..."

CTA: "Comment 'SCRIPT' and I'll send you the template instantly."`;
    
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-32 px-4 bg-brand-dark flex flex-col items-center border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
                See it in Action
            </h2>
            <p className="text-zinc-400 text-lg">
                Paste a link. Get a viral script. <span className="text-acid-lime">It's that fast.</span>
            </p>
        </div>

        {/* The Machine Interface */}
        <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col">
                
                {/* Window Controls (Decorative) */}
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 1: INPUT */}
                        {step === "input" && (
                            <motion.div 
                                key="input"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-3xl flex flex-col gap-10"
                            >
                                <div className="relative group w-full">
                                     <div className="relative w-full flex items-center">
                                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 pointer-events-none">
                                            <span className="text-zinc-700 text-3xl md:text-4xl font-heading font-bold animate-pulse">
                                                {inputText ? "" : ">"}
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="Paste Reel Link..." 
                                            className="w-full h-24 pl-10 pr-40 md:pr-48 bg-transparent border-b-4 border-zinc-800 focus:border-acid-lime text-3xl md:text-5xl text-white placeholder-zinc-800 transition-colors font-heading font-bold focus:outline-none"
                                        />
                                        
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2">
                                            <button 
                                                onClick={handleAnalyze}
                                                disabled={!inputText}
                                                className={cn(
                                                    "h-16 px-8 font-black font-heading uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden clip-path-slant disabled:opacity-50",
                                                    inputText 
                                                        ? "bg-acid-lime text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(189,255,0,0.5)]" 
                                                        : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                                                )}
                                                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
                                            >
                                                <span className="relative z-10">ANALYZE</span>
                                                {inputText && <Zap className="w-5 h-5 relative z-10 fill-black" />}
                                            </button>
                                        </div>
                                     </div>
                                </div>
                                
                                {/* Examples */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <span className="text-zinc-500 font-mono text-sm self-center">Try:</span>
                                    {["instagram.com/reel/C3...", "tiktok.com/@alexhormozi/..."].map((ex, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setInputText(ex)}
                                            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono hover:bg-white/10 hover:text-white transition-colors"
                                        >
                                            {ex}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: LOADING */}
                        {step === "loading" && (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-8"
                            >
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                                    <motion.div 
                                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-acid-lime"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(189,255,0,0.2)] animate-pulse" />
                                    <Zap className="w-10 h-10 text-acid-lime" />
                                </div>

                                <div className="flex flex-col items-center gap-2 h-16">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={loadingPhase}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-3 text-xl font-mono text-zinc-300"
                                        >
                                            {(() => {
                                                const Icon = LOADING_PHASES[loadingPhase].icon;
                                                return <Icon className="w-5 h-5 text-acid-magenta" />;
                                            })()}
                                            {LOADING_PHASES[loadingPhase].text}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-acid-lime to-acid-magenta"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 4.5, ease: "easeInOut" }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: RESULT */}
                        {step === "result" && (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full max-w-3xl flex flex-col items-start gap-6 font-mono"
                            >
                                <div className="w-full bg-zinc-900/50 border border-white/5 rounded-xl p-6 md:p-8 space-y-8 relative overflow-hidden">
                                     {/* Scanline Effect */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-acid-lime/10 animate-[scan_3s_linear_infinite]" />

                                    {/* Script Content */}
                                    <div className="space-y-6">
                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs font-bold text-acid-lime mb-2 tracking-wider uppercase">
                                                <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
                                                [HOOK 0-3s]
                                            </span>
                                            <p className="text-xl md:text-2xl text-white font-medium pl-4 border-l-2 border-acid-lime group-hover:bg-acid-lime/5 transition-colors duration-300 py-2">
                                                "Stop scrolling if you want to fix your engagement right now."
                                            </p>
                                        </div>

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs font-bold text-acid-magenta mb-2 tracking-wider uppercase">
                                                <span className="w-2 h-2 rounded-full bg-acid-magenta animate-pulse" />
                                                [VALUE PROP 3-15s]
                                            </span>
                                            <p className="text-lg text-zinc-300 pl-4 border-l-2 border-acid-magenta/50 group-hover:border-acid-magenta group-hover:bg-acid-magenta/5 transition-colors duration-300 py-2">
                                                "Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1%..."
                                            </p>
                                        </div>

                                        <div className="group">
                                            <span className="flex items-center gap-2 text-xs font-bold text-acid-lime mb-2 tracking-wider uppercase">
                                                <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
                                                [CTA]
                                            </span>
                                            <p className="text-lg text-white pl-4 border-l-2 border-acid-lime/50 group-hover:border-acid-lime group-hover:bg-acid-lime/5 transition-colors duration-300 py-2">
                                                "Comment 'SCRIPT' and I'll send you the template instantly."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 w-full">
                                    <button 
                                        onClick={handleCopy}
                                        className="flex-1 h-14 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-5 h-5 text-green-500" />
                                                <span className="text-green-500">COPIED!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Clipboard className="w-5 h-5" />
                                                COPY SCRIPT
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        onClick={() => { setStep("input"); setInputText(""); }}
                                        className="px-6 h-14 text-zinc-500 hover:text-white font-medium transition-colors"
                                    >
                                        Try Another
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
