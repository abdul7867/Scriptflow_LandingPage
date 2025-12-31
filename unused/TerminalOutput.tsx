import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TerminalState = 'idle' | 'generating' | 'complete';

interface TerminalOutputProps {
    state: TerminalState;
}

const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(({ state }, ref) => {
    
    // Typewriter effect state
    const [displayedScript, setDisplayedScript] = useState({ hook: "", body: "", cta: "" });
    
    const finalScript = {
        hook: "Stop scrolling if you want to fix your engagement right now.",
        body: "Most creators fail because they ignore the first 3 seconds. Here is the framework used by the top 1%...",
        cta: "Comment SCRIPT and I'll send you the template."
    };

    // Effect to handle typewriter animation
    useEffect(() => {
        if (state === 'complete') {
            // Reset text
            setDisplayedScript({ hook: "", body: "", cta: "" });

            let currentHook = "";
            let currentBody = "";
            let currentCta = "";
            
            // Sequential typing logic
            // 1. Type Hook
            let i = 0;
            const typeHook = setInterval(() => {
                if (i < finalScript.hook.length) {
                    currentHook += finalScript.hook[i];
                    setDisplayedScript(prev => ({ ...prev, hook: currentHook }));
                    i++;
                } else {
                    clearInterval(typeHook);
                    // 2. Type Body
                    let j = 0;
                    const typeBody = setInterval(() => {
                        if (j < finalScript.body.length) {
                            currentBody += finalScript.body[j];
                            setDisplayedScript(prev => ({ ...prev, body: currentBody }));
                            j++;
                        } else {
                            clearInterval(typeBody);
                            // 3. Type CTA
                            let k = 0;
                            const typeCta = setInterval(() => {
                                if (k < finalScript.cta.length) {
                                    currentCta += finalScript.cta[k];
                                    setDisplayedScript(prev => ({ ...prev, cta: currentCta }));
                                    k++;
                                } else {
                                    clearInterval(typeCta);
                                }
                            }, 20); // CTA speed
                        }
                    }, 10); // Body speed
                }
            }, 30); // Hook speed
            
            return () => {
                clearInterval(typeHook);
            };
        }
    }, [state]);

    return (
        <motion.div 
            layout 
            className="w-full max-w-xl bg-brand-glass/90 backdrop-blur-xl border border-brand-border rounded-xl overflow-hidden shadow-2xl flex flex-col"
            style={{ transformStyle: "preserve-3d" }}
            animate={state === 'generating' ? {
                rotateY: [0, 360],
                borderColor: ["#3f3f46", "#BDFF00", "#d946ef", "#BDFF00", "#3f3f46"],
                boxShadow: [
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
                    "0 0 40px rgba(189,255,0,0.5)", 
                    "0 0 40px rgba(217,70,239,0.5)", 
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                ]
            } : {
                rotateY: 0,
                borderColor: "#3f3f46",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
        >
            {/* Header */}
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <div className="ml-auto text-[10px] text-zinc-500 font-mono tracking-widest opacity-50">
                    TERMINAL_V2
                </div>
            </div>

            {/* Body */}
            <div className="p-6 font-mono text-sm relative min-h-[150px]" ref={ref}>
                <AnimatePresence mode="wait">
                    
                    {/* STATE 1: IDLE */}
                    {state === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-zinc-500"
                        >
                            <span className="text-brand-neon mr-2">➜</span>
                            Waiting for input<span className="animate-pulse">_</span>
                        </motion.div>
                    )}

                    {/* STATE 2: GENERATING */}
                    {state === 'generating' && (
                         <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-brand-neon"
                        >
                            <div className="mb-2">
                                <span className="text-zinc-400">Processing source...</span>
                            </div>
                           
                           {/* Loading Bar Animation */}
                           <div className="h-2 bg-zinc-800 rounded-full overflow-hidden w-64 max-w-full">
                                <motion.div 
                                    className="h-full bg-brand-neon"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                                />
                           </div>
                           
                           <div className="mt-4 text-xs text-zinc-600">
                               analyzing_hooks.exe... <br/>
                               extracting_patterns.json...
                           </div>
                        </motion.div>
                    )}

                    {/* STATE 3: COMPLETE */}
                    {state === 'complete' && (
                         <motion.div
                            key="complete"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            {/* Hook */}
                            <div>
                                <span className="text-[10px] uppercase text-zinc-600 tracking-wider mb-1 block">
                                    // HOOK
                                </span>
                                <p className="text-[#FFD700] font-bold">
                                    {displayedScript.hook}
                                </p>
                            </div>

                            {/* Body */}
                            <div>
                                <span className="text-[10px] uppercase text-zinc-600 tracking-wider mb-1 block">
                                    // BODY
                                </span>
                                <p className="text-zinc-300 leading-relaxed">
                                    {displayedScript.body}
                                </p>
                            </div>

                            {/* CTA */}
                            <div>
                                <span className="text-[10px] uppercase text-zinc-600 tracking-wider mb-1 block">
                                    // CTA
                                </span>
                                <p className="text-brand-neon font-bold">
                                    {displayedScript.cta}
                                </p>
                            </div>

                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ delay: 3 }}
                                className="pt-2"
                            >
                                <span className="animate-pulse text-brand-neon inline-block align-middle">
                                    ▋
                                </span>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </motion.div>
    );
});

TerminalOutput.displayName = 'TerminalOutput';

export default TerminalOutput;
