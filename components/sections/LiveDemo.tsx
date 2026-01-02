"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/TextScramble";

export default function LiveDemo() {
  const [step, setStep] = useState<"input" | "processing" | "result">("input");
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleRemix = () => {
    if (!inputText) return;
    setStep("processing");

    // 1. Show Processing Bar
    setTimeout(() => {
      setStep("result");
    }, 1500); // 1.5s visual Juice
  };

  const handleCopy = () => {
    const script = `HOOK: "Stop scrolling if you want to fix your engagement right now..."`;
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="w-full py-16 md:py-32 px-4 bg-black flex flex-col items-center border-t border-white/5 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">
                See it in Action
            </h2>
            <p className="text-zinc-400 text-lg">
                Paste a link. Get a viral script. <span className="text-acid-lime">It&apos;s that fast.</span>
            </p>
        </div>

        {/* --- THE OBSIDIAN TERMINAL --- */}
        <div className="relative group">
            
            {/* 1. Deep Black Container with Subtle Glow */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black shadow-[0_0_40px_-10px_rgba(189,255,0,0.15)]">

                {/* Glitch Overlay via CSS mix-blend if needed, but we used white flash before. Keeping it simple. */}
                
                {/* 2. Glass Header (Window Bar) */}
                <div className="h-[30px] bg-white/5 border-b border-zinc-800 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5 opacity-80">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" /> {/* Red */}
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /> {/* Yellow */}
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" /> {/* Green */}
                    </div>
                </div>

                {/* 3. Main Terminal Body */}
                <div className="w-full min-h-[400px] bg-[#050505] p-6 lg:p-10 font-mono text-sm md:text-base text-zinc-300 relative font-geist-mono">
                    
                    {/* INPUT STATE */}
                    {step === "input" && (
                         <div className="flex flex-col gap-2">
                             <div className="flex gap-2 items-center text-zinc-500 select-none">
                                 <span>➜</span>
                                 <span className="text-acid-lime">~</span>
                                 <span>/dev/null</span>
                             </div>
                             
                             <div className="relative flex items-center">
                                 <span className="text-acid-lime mr-3 font-bold">❯</span>
                                 
                                 <input 
                                     type="text"
                                     value={inputText}
                                     onChange={(e) => setInputText(e.target.value)}
                                     onFocus={() => setIsFocused(true)}
                                     onBlur={() => setIsFocused(false)}
                                     onKeyDown={(e) => e.key === 'Enter' && handleRemix()}
                                     placeholder="Paste_Reel_Link..."
                                     className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-700 font-mono caret-transparent z-10"
                                 />
                                 
                                 {/* Custom Block Cursor */}
                                 {isFocused && (
                                     <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="absolute h-5 w-2.5 bg-acid-lime pointer-events-none"
                                        style={{ 
                                            left: `calc(1.5rem + ${inputText.length}ch)` // Approximate char width positioning
                                        }}
                                     />
                                 )}
                             </div>

                             {inputText && (
                                 <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={handleRemix}
                                    className="mt-8 self-start px-4 py-1 bg-zinc-800 hover:bg-zinc-700 text-acid-lime text-xs uppercase tracking-widest border border-zinc-700 transition-colors"
                                 >
                                     [ RUN REMIX ]
                                 </motion.button>
                             )}
                         </div>
                    )}

                    {/* PROCESSING STATE WITH JUICE */}
                    {step === "processing" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                             
                             <div className="w-full max-w-sm space-y-2 text-left">
                                <div className="text-acid-lime text-xs uppercase tracking-widest flex justify-between">
                                    <span>Compiling Neural Extract...</span>
                                    <span>[ <TextScramble text="100%" duration={1.5} /> ]</span>
                                </div>
                                {/* PROGRESS BAR */}
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        className="h-full bg-acid-lime shadow-[0_0_15px_#bdff00]"
                                    />
                                </div>
                             </div>

                             <div className="text-zinc-600 text-xs font-mono opacity-50 space-y-1">
                                 <div><TextScramble text="> Optimizing hook structure..." duration={0.5} /></div>
                                 <div className="delay-300"><TextScramble text="> Identifying viral triggers..." duration={0.8} /></div>
                                 <div className="delay-700"><TextScramble text="> Formatting output..." duration={1.2} /></div>
                             </div>
                        </div>
                    )}

                    {/* RESULT STATE */}
                    {step === "result" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            
                            <div className="space-y-4 border-l-2 border-acid-lime pl-4">
                                <div>
                                    <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">HOOK DETECTED</span>
                                    <p className="text-white text-lg">&quot;Stop scrolling if you want to fix your engagement right now.&quot;</p>
                                </div>
                                
                                <div>
                                    <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">FRAMEWORK</span>
                                    <p className="text-zinc-400">&quot;Most creators fail because they ignore the first 3 seconds. Here is the exact framework used by the top 1% to retain viewers...&quot;</p>
                                </div>

                                <div>
                                     <span className="text-zinc-500 uppercase text-xs tracking-widest block mb-1">OPTIMIZED CTA</span>
                                     <p className="text-acid-lime">&quot;Comment <span className="underline decoration-acid-lime/50">SCRIPT</span> and I&apos;ll send you the template.&quot;</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-zinc-800/50">
                                <button 
                                    onClick={handleCopy}
                                    className="text-white hover:text-acid-lime text-xs uppercase tracking-widest transition-colors"
                                >
                                    {copied ? "> COPIED TO CLIPBOARD" : "> COPY SCRIPT"}
                                </button>
                                <button 
                                    onClick={() => { setStep("input"); setInputText(""); }}
                                    className="text-zinc-600 hover:text-zinc-400 text-xs uppercase tracking-widest transition-colors ml-auto"
                                >
                                    [ RESET SESSION ]
                                </button>
                            </div>

                        </motion.div>
                    )}

                </div>
            </div>
            
            {/* Helper Inputs */}
            {step === "input" && (
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 opacity-70 hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => setInputText("instagram.com/reel/viral_1")} 
                        className="text-xs font-mono text-zinc-500 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1"
                    >
                        example_1.reels
                    </button>
                    <button 
                         onClick={() => setInputText("tiktok.com/@creator/hook")} 
                         className="text-xs font-mono text-zinc-500 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1"
                    >
                        example_2.tiktok
                    </button>
                </div>
            )}
            
        </div>
      </div>
    </section>
  );
}
