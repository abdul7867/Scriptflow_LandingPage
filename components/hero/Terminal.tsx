"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Sparkles, Zap, Copy, CheckCheck, Mic, Clapperboard, Type, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type TerminalStatus = "idle" | "processing" | "success";

interface TerminalProps {
    status: TerminalStatus;
    className?: string;
}

const PROCESS_STEPS = [
    { id: 1, text: "Reel received", icon: "📥" },
    { id: 2, text: "Analyzing hook pattern", icon: "🔍" },
    { id: 3, text: "Generating script", icon: "✍️" },
];

const SCRIPT_CONTENT = {
    hook: {
        time: "0:00",
        visual: "Close-up. Snap head to camera. Glitched \"ERROR\" effect.",
        audio: "You have been lied to about \"Hard Work.\"",
        overlay: "STOP WORKING HARD."
    },
    body: {
        time: "0:05-0:18",
        visual: "Split screen: Manual coding vs AI generating instantly. Then relaxed pose with coffee.",
        audio: "The top 1% don't write better code. They stopped writing it. In video games, you win by finding cheat codes.",
        overlay: "1% vs 99% → FIND THE CHEAT CODE."
    },
    climax: {
        time: "0:18-0:25",
        visual: "Screen record: Linear vs Exponential growth graph. Direct eye contact.",
        audio: "Hard work is linear. Leverage is exponential. Stop being an NPC. Build the engine.",
        overlay: "LINEAR vs EXPONENTIAL"
    },
    cta: {
        time: "0:25",
        visual: "Point at camera.",
        audio: "Stop being an NPC. Build the engine.",
        overlay: "COMMENT \"GLITCH\""
    }
};

export default function Terminal({ status, className }: TerminalProps) {
    const [stepIndex, setStepIndex] = useState(0);
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    useEffect(() => {
        if (status === "processing") {
            setStepIndex(0);
            const interval = setInterval(() => {
                setStepIndex((prev) => {
                    if (prev < PROCESS_STEPS.length) return prev + 1;
                    return prev;
                });
            }, 700); // Slightly slower for better visibility
            return () => clearInterval(interval);
        } else if (status === "idle") {
            setStepIndex(0);
        }
    }, [status]);

    const handleCopy = (section: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    return (
        <motion.div 
            layout
            className={cn(
                "w-full max-w-xl flex flex-col",
                "rounded-2xl border bg-[#0c0c0c] backdrop-blur-xl",
                "shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)]",
                "overflow-hidden",
                status === "success" 
                    ? "border-acid-lime/40 shadow-[0_8px_60px_-15px_rgba(189,255,0,0.2)]" 
                    : "border-white/[0.08]",
                className
            )}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* === HEADER === */}
            <div className="h-11 border-b border-white/[0.06] flex items-center px-4 justify-between bg-white/[0.02] shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-acid-lime" />
                    <span>ScriptFlow AI</span>
                </div>
                <div className="w-16" />
            </div>

            {/* === CONTENT AREA (Auto-resizing) === */}
            <div className="relative font-sans">
                <AnimatePresence mode="wait">
                    
                    {/* === IDLE STATE === */}
                    {status === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex flex-col items-center justify-center text-center p-8 min-h-[200px]"
                        >
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-acid-lime/10 via-acid-lime/5 to-transparent flex items-center justify-center mb-4 border border-acid-lime/20"
                            >
                                <Zap className="w-6 h-6 text-acid-lime/60" />
                            </motion.div>
                            <p className="text-zinc-400 text-sm font-medium">Ready for input</p>
                            <p className="text-zinc-600 text-xs mt-1">Waiting for reel...</p>
                        </motion.div>
                    )}

                    {/* === PROCESSING STATE === */}
                    {status === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="p-5 space-y-3"
                        >
                            {PROCESS_STEPS.map((step, idx) => {
                                const isCompleted = idx < stepIndex;
                                const isActive = idx === stepIndex;
                                const isPending = idx > stepIndex;

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ 
                                            opacity: isPending ? 0.4 : 1, 
                                            x: 0 
                                        }}
                                        transition={{ duration: 0.4, delay: idx * 0.15 }}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-500",
                                            "bg-white/[0.03] border",
                                            isActive && "bg-white/[0.06] border-acid-lime/30 shadow-[0_0_20px_-5px_rgba(189,255,0,0.15)]",
                                            isCompleted && "border-white/5",
                                            isPending && "border-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-9 h-9 flex items-center justify-center shrink-0 rounded-lg transition-all duration-300",
                                            isActive && "bg-acid-lime/10",
                                            isCompleted && "bg-white/5",
                                            isPending && "bg-white/[0.02]"
                                        )}>
                                            {isCompleted ? (
                                                <Check className="w-5 h-5 text-acid-lime" strokeWidth={3} />
                                            ) : isActive ? (
                                                <Loader2 className="w-5 h-5 animate-spin text-acid-lime" />
                                            ) : (
                                                <span className="text-lg opacity-40">{step.icon}</span>
                                            )}
                                        </div>
                                        
                                        <span className={cn(
                                            "text-sm font-medium transition-colors duration-300",
                                            isActive && "text-white",
                                            isCompleted && "text-zinc-400",
                                            isPending && "text-zinc-600"
                                        )}>
                                            {step.text}
                                            {isActive && (
                                                <motion.span
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="ml-1 text-acid-lime"
                                                >_</motion.span>
                                            )}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* === SUCCESS STATE (Auto-resize, no scroll) === */}
                    {status === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="p-5"
                        >
                            {/* Header Badge */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-acid-lime/10 border border-acid-lime/30 mb-5"
                            >
                                <Sparkles className="w-4 h-4 text-acid-lime" />
                                <span className="text-xs font-bold uppercase tracking-wider text-acid-lime">Script Generated</span>
                            </motion.div>

                            {/* Script Content - Structured Layout */}
                            <div className="rounded-xl bg-[#080808] border border-white/[0.05] overflow-hidden divide-y divide-white/[0.04]">
                                
                                {/* HOOK Section */}
                                <ScriptBlock
                                    label="HOOK"
                                    time={SCRIPT_CONTENT.hook.time}
                                    overlay={SCRIPT_CONTENT.hook.overlay}
                                    audio={SCRIPT_CONTENT.hook.audio}
                                    visual={SCRIPT_CONTENT.hook.visual}
                                    delay={0.5}
                                    variant="hook"
                                    onCopy={() => handleCopy('hook', SCRIPT_CONTENT.hook.audio)}
                                    isCopied={copiedSection === 'hook'}
                                />
                                
                                {/* BODY Section */}
                                <ScriptBlock
                                    label="BODY"
                                    time={SCRIPT_CONTENT.body.time}
                                    overlay={SCRIPT_CONTENT.body.overlay}
                                    audio={SCRIPT_CONTENT.body.audio}
                                    visual={SCRIPT_CONTENT.body.visual}
                                    delay={0.7}
                                    variant="body"
                                    onCopy={() => handleCopy('body', SCRIPT_CONTENT.body.audio)}
                                    isCopied={copiedSection === 'body'}
                                />
                                
                                {/* CLIMAX Section */}
                                <ScriptBlock
                                    label="CLIMAX"
                                    time={SCRIPT_CONTENT.climax.time}
                                    overlay={SCRIPT_CONTENT.climax.overlay}
                                    audio={SCRIPT_CONTENT.climax.audio}
                                    visual={SCRIPT_CONTENT.climax.visual}
                                    delay={0.9}
                                    variant="climax"
                                    onCopy={() => handleCopy('climax', SCRIPT_CONTENT.climax.audio)}
                                    isCopied={copiedSection === 'climax'}
                                />
                                
                                {/* CTA Section */}
                                <ScriptBlock
                                    label="CTA"
                                    time={SCRIPT_CONTENT.cta.time}
                                    overlay={SCRIPT_CONTENT.cta.overlay}
                                    audio={SCRIPT_CONTENT.cta.audio}
                                    visual={SCRIPT_CONTENT.cta.visual}
                                    delay={1.1}
                                    variant="cta"
                                    onCopy={() => handleCopy('cta', SCRIPT_CONTENT.cta.overlay)}
                                    isCopied={copiedSection === 'cta'}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* === BOTTOM ACCENT === */}
            <motion.div 
                className={cn(
                    "h-[2px] shrink-0 bg-gradient-to-r from-transparent to-transparent",
                    status === 'success' ? "via-acid-lime/60" : "via-white/10"
                )}
                animate={{ opacity: status === 'success' ? 1 : 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            />
        </motion.div>
    );
}

// === SCRIPT BLOCK COMPONENT (Refined & Compact V2) ===
function ScriptBlock({ 
    label, 
    time,
    overlay,
    audio,
    visual,
    delay, 
    variant = "body",
    onCopy,
    isCopied
}: { 
    label: string;
    time: string;
    overlay: string;
    audio: string;
    visual: string;
    delay: number;
    variant?: "hook" | "body" | "climax" | "cta";
    onCopy: () => void;
    isCopied: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
        hook: {
            label: "text-[#FF2E2E] bg-[#FF2E2E]/10 border-[#FF2E2E]/20",
            border: "border-l-[#FF2E2E]",
            glow: "shadow-[inset_20px_0_40px_-20px_rgba(255,46,46,0.1)]", 
        },
        body: {
            label: "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/20",
            border: "border-l-[#00F0FF]",
            glow: "shadow-[inset_20px_0_40px_-20px_rgba(0,240,255,0.1)]",
        },
        climax: {
            label: "text-[#D946EF] bg-[#D946EF]/10 border-[#D946EF]/20",
            border: "border-l-[#D946EF]",
            glow: "shadow-[inset_20px_0_40px_-20px_rgba(217,70,239,0.1)]",
        },
        cta: {
            label: "text-acid-lime bg-acid-lime/10 border-acid-lime/20",
            border: "border-l-acid-lime",
            glow: "shadow-[inset_20px_0_40px_-20px_rgba(189,255,0,0.1)]",
        }
    };

    const style = variantStyles[variant];

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className={cn(
                "relative group overflow-hidden transition-all duration-300",
                "border-l-[2px]", 
                style.border,
                "bg-black/40 hover:bg-white/[0.03]",
                style.glow
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-2.5 flex flex-col gap-2">
                
                {/* === HEADER: Badge & Time === */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "text-[8px] uppercase tracking-[0.15em] font-extrabold px-1.5 py-0.5 rounded border leading-none",
                            style.label
                        )}>
                            {label}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-500">
                            <Clock className="w-2.5 h-2.5 opacity-60" />
                            <span className="text-[9px] font-mono tabular-nums tracking-wide">{time}</span>
                        </div>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered || isCopied ? 1 : 0 }}
                        onClick={onCopy}
                        className={cn(
                            "p-0.5 rounded transition-colors",
                            isCopied 
                                ? "bg-acid-lime/20 text-acid-lime" 
                                : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {isCopied ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </motion.button>
                </div>

                {/* === MAIN CONTENT === */}
                <div className="grid gap-1.5">
                    
                    {/* OVERLAY (High Hierarchy) */}
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Type className="w-2.5 h-2.5" />
                            <span className="text-[8px] uppercase tracking-wider font-semibold">Overlay</span>
                        </div>
                        <p className="text-xs font-bold text-white leading-tight break-words pl-2 border-l border-white/10">
                            {overlay}
                        </p>
                    </div>

                    {/* DETAILS GRID (Audio & Visual) - Tighter */}
                    <div className="grid grid-cols-[1.5fr,1fr] gap-2 pt-1.5 border-t border-white/[0.04]">
                        
                        {/* Audio */}
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-zinc-500">
                                <Mic className="w-2.5 h-2.5" />
                                <span className="text-[8px] uppercase tracking-wider font-semibold">Audio</span>
                            </div>
                            <p className="text-[10px] text-zinc-300 leading-snug break-words">
                                {audio}
                            </p>
                        </div>

                        {/* Visual */}
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-zinc-500">
                                <Clapperboard className="w-2.5 h-2.5" />
                                <span className="text-[8px] uppercase tracking-wider font-semibold">Visual</span>
                            </div>
                            <p className="text-[9px] text-zinc-500 italic leading-snug break-words">
                                {visual}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
