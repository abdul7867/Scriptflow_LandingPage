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
  const [step, setStep] = useState<"input" | "matrix" | "result">("input");
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const handleAnalyze = () => {
    if (!inputText) return;
    setStep("matrix");

    // 1.5s Decrypt/Matrix Effect then show result
    setTimeout(() => {
      setStep("result");
    }, 1500);
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
            <div className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col font-mono">
                
                {/* Window Controls (Decorative) */}
                <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-zinc-600" />
                        <div className="w-3 h-3 rounded-full bg-zinc-600" />
                        <div className="w-3 h-3 rounded-full bg-zinc-600" />
                    </div>
                    <div className="ml-auto text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                        TERMINAL_V2.0
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 1: INPUT (Terminal Redesign) */}
                        {step === "input" && (
                            <motion.div 
                                key="input"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-2xl"
                            >
                                <div className="bg-[#050505] p-6 border-l-4 border-acid-lime relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                    
                                    {/* Terminal Structure */}
                                    <div className="flex flex-col gap-4">
                                        
                                        {/* Input Line */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 font-mono text-sm md:text-base">
                                            <span className="text-acid-lime shrink-0">
                                                {"> root/users/guest/analyze: "}
                                            </span>
                                            <input 
                                                type="text" 
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                placeholder="_Paste_Reel_Link_" 
                                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-zinc-700 outline-none pl-2 caret-acid-lime"
                                                autoFocus
                                            />
                                        </div>

                                        {/* Action Line */}
                                        <div className="flex justify-end mt-4">
                                            <button 
                                                onClick={handleAnalyze}
                                                onMouseEnter={() => setIsHoveringButton(true)}
                                                onMouseLeave={() => setIsHoveringButton(false)}
                                                disabled={!inputText}
                                                className={cn(
                                                    "border border-acid-lime px-6 py-2 text-sm font-bold tracking-widest transition-all duration-200",
                                                    isHoveringButton 
                                                        ? "bg-acid-lime text-black" 
                                                        : "text-acid-lime bg-transparent"
                                                )}
                                            >
                                                [ EXECUTE ]
                                            </button>
                                        </div>

                                    </div>
                                    
                                    {/* Blink Cursor Decor (Optional, CSS handles input caret well usually, but we can add a trailing block if desired) */}
                                </div>

                                {/* Examples */}
                                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                    <span className="text-zinc-600 font-mono text-xs self-center">test_params:</span>
                                    {["instagram.com/reel/C3...", "tiktok.com/@alexhormozi/..."].map((ex, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setInputText(ex)}
                                            className="text-xs text-zinc-500 font-mono hover:text-acid-lime transition-colors border-b border-transparent hover:border-acid-lime"
                                        >
                                            {ex}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: MATRIX RAIN (Decrypt) */}
                        {step === "matrix" && (
                            <motion.div 
                                key="matrix"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full max-w-2xl h-64 bg-black font-mono text-acid-lime p-4 overflow-hidden relative border border-acid-lime/20"
                            >
                                <MatrixRain />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-4 left-4 bg-acid-lime/10 px-2 py-1 text-xs border border-acid-lime/20 animate-pulse">
                                    DECRYPTING_SOURCE...
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
                                <div className="w-full bg-zinc-900/50 border border-white/5 rounded-none border-l-2 border-l-white p-6 md:p-8 space-y-8 relative overflow-hidden backdrop-blur-sm">
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
                                        className="h-12 px-6 bg-acid-lime text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a6e000] transition-colors flex items-center gap-2"
                                    >
                                        {copied ? "COPIED" : "COPY_SOURCE"}
                                    </button>
                                    <button 
                                        onClick={() => { setStep("input"); setInputText(""); }}
                                        className="h-12 px-6 border border-zinc-700 text-zinc-400 font-bold uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors"
                                    >
                                        RESET_TERMINAL
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

// Simple Matrix Rain Component
function MatrixRain() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    const [drops, setDrops] = useState<string[]>([]);
    
    // Initialize drops
    useEffect(() => {
        // Just random strings to simulate the rain for this short duration
        const interval = setInterval(() => {
             setDrops(prev => {
                 const newLine = Array(20).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join(" ");
                 return [newLine, ...prev.slice(0, 15)];
             });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full text-xs leading-4 opacity-70 break-all select-none flex flex-col items-center justify-center text-center mask-image-fade">
            {drops.map((line, i) => (
                <div key={i} style={{ opacity: 1 - (i * 0.05) }} className="w-full">{line}</div>
            ))}
        </div>
    );
}
