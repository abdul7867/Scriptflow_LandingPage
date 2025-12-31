"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextScramble } from "@/components/ui/TextScramble";

export default function LiveDemo() {
  const [step, setStep] = useState<"input" | "analyzing" | "result">("input");
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleAnalyze = () => {
    if (!inputText) return;
    setStep("analyzing");

    // Simulate "Decryption" delay before showing resolved text
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
    <section className="w-full py-32 px-4 bg-black flex flex-col items-center border-t border-white/5 relative overflow-hidden font-mono">
      
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

        {/* The Terminal Interface */}
        <div className="relative">
            <motion.div 
                className={cn(
                    "rounded-md border border-zinc-800 bg-[#0A0A0A] overflow-hidden shadow-2xl relative min-h-[400px] flex flex-col",
                    step === "analyzing" && "border-acid-lime/50" // Light up border on analyze
                )}
                animate={step === "analyzing" ? {
                    x: [-2, 2, -2, 2, 0],
                    transition: { duration: 0.4 }
                } : {}}
            >
                
                {/* Window Header */}
                <div className="h-8 bg-zinc-900/50 border-b border-zinc-800 flex items-center px-4 gap-2 text-xs text-zinc-500 select-none">
                   <div className="flex gap-1.5 opacity-50">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <span className="ml-auto">bash -- 80x24</span>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 p-6 text-sm md:text-base leading-relaxed text-zinc-300 relative">
                    
                    {/* Shell Input Line */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-0 font-mono mb-4">
                        <span className="text-acid-lime font-bold whitespace-nowrap shrink-0 select-none">
                            root@scriptflow:~ $
                        </span>
                        
                        <div className="flex-1 relative">
                            {step === "input" ? (
                                <input 
                                    type="text" 
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Paste_Link_Here" 
                                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-zinc-700 outline-none pl-2 py-0 h-auto"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                />
                            ) : (
                                <span className="pl-2 text-white">{inputText}</span>
                            )}
                        </div>
                    </div>

                    {/* Button if input is present */}
                    {step === "input" && inputText && (
                        <motion.div 
                            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 right-6"
                        >
                            <button 
                                onClick={handleAnalyze}
                                className="bg-acid-lime text-black px-4 py-1 text-xs font-bold uppercase tracking-widest hover:bg-[#b0ef00]"
                            >
                                Execute
                            </button>
                        </motion.div>
                    )}

                    {/* Analysis Output */}
                    <AnimatePresence>
                        {step !== "input" && (
                            <motion.div className="space-y-4 mt-8 text-zinc-400">
                                
                                {/* Status Log */}
                                <div className="space-y-1 text-xs text-zinc-500">
                                    <div>[init] Process started...</div>
                                    <div>[fetch] Downloading source content...</div>
                                    <div className="text-acid-lime">[success] Source acquired.</div>
                                    <div className="border-t border-dashed border-white/20 my-2 w-full" />
                                </div>

                                {/* Scrambled Result */}
                                {step === "analyzing" && (
                                    <div className="text-white break-all opacity-80 animate-pulse">
                                        <TextScramble text="!@#$%^&*()_+{}|:<>?~!@#$%^&*()_+{}|:<>?~!@#$%^&*()_+{}|:<>?" duration={3} className="text-acid-lime" />
                                        <br />
                                        <TextScramble text="XJSAD_&@!_ASDJK_9012_ASDJK_1290_ASDJK_1290" duration={3} />
                                    </div>
                                )}

                                {/* Resolved Script */}
                                {step === "result" && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        className="space-y-6 pt-2"
                                    >
                                        <div className="space-y-1">
                                            <span className="text-xs text-acid-lime uppercase font-bold tracking-wider">/// HOOK DETECTED</span>
                                            <div className="pl-4 border-l-2 border-acid-lime text-white">
                                                <TextScramble text='"Stop scrolling if you want to fix your engagement right now."' className="text-neon-lime" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">/// FRAMEWORK EXTRACTED</span>
                                            <div className="pl-4 border-l-2 border-zinc-800 text-zinc-300">
                                                <TextScramble text='"Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1%..."' duration={2.5} />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                             <span className="text-xs text-acid-magenta uppercase font-bold tracking-wider">/// CTA OPTIMIZED</span>
                                            <div className="pl-4 border-l-2 border-acid-magenta text-white">
                                                <TextScramble text='"Comment SCRIPT and I will send you the template instantly."' duration={2} />
                                            </div>
                                        </div>

                                        <div className="h-8" /> {/* Spacer */}
                                        
                                        <div className="flex gap-4">
                                            <button onClick={handleCopy} className="text-acid-lime hover:underline underline-offset-4 decoration-acid-lime text-xs uppercase tracking-widest">
                                                {copied ? "[ COPIED ]" : "[ COPY SCRIPT ]"}
                                            </button>
                                            <button onClick={() => { setStep("input"); setInputText(""); }} className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest">
                                                [ NEW SESSION ]
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>
            
            {/* Quick Links for Demo */}
            {step === "input" && (
                <div className="mt-4 flex flex-wrap gap-4 justify-center opacity-60 hover:opacity-100 transition-opacity">
                    {["instagram.com/reel/viral_1", "tiktok.com/@creator/best_hooks"].map((ex, i) => (
                        <button 
                            key={i}
                            onClick={() => setInputText(ex)}
                            className="text-[10px] text-zinc-500 font-mono hover:text-acid-lime border-b border-transparent hover:border-acid-lime transition-all"
                        >
                            {ex}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>
    </section>
  );
}

