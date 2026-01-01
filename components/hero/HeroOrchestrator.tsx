"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { AnimationProvider, useAnimationContext, AnimationStage } from "@/animations";
import Terminal, { TerminalStatus } from "./Terminal";
import InstagramPhone from "./InstagramPhone";
import HeroHeading from "./HeroHeading";
import TiltCard, { DriftingBackground } from "@/components/TiltCard";

/**
 * Maps global animation stage to Terminal status prop
 */
function mapStageToTerminalStatus(stage: AnimationStage): TerminalStatus {
    switch (stage) {
        case 'processing': return 'processing';
        case 'success': return 'success';
        default: return 'idle';
    }
}

/**
 * Inner content that consumes AnimationContext
 */
function HeroContent() {
    const { stage, triggerShare, handleBeamComplete } = useAnimationContext();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const shareBtnRef = useRef<HTMLButtonElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    
    // Terminal impact bump state
    const [terminalBump, setTerminalBump] = useState(false);

    const isTransferring = stage === 'transferring';
    const isAnimating = stage !== 'idle' && stage !== 'success';

    // Handle beam impact - trigger bump then complete
    const handleBeamImpact = React.useCallback(() => {
        setTerminalBump(true);
        setTimeout(() => {
            setTerminalBump(false);
            handleBeamComplete();
        }, 200);
    }, [handleBeamComplete]);

    // Simulate transfer delay (since Beam is removed)
    React.useEffect(() => {
        if (isTransferring) {
            const timer = setTimeout(() => {
                handleBeamImpact();
            }, 1000); // 1s transfer time
            return () => clearTimeout(timer);
        }
    }, [isTransferring, handleBeamImpact]);

    // Wrapper to add logging
    const handleShareClick = React.useCallback(() => {
        triggerShare();
    }, [triggerShare]);

    return (
        <div className="w-full relative overflow-hidden bg-brand-black pt-10 pb-16 lg:pt-16 lg:pb-24">
            {/* === AMBIENT ATMOSPHERE === */}
            
            {/* Noise texture */}
            <div className="bg-noise" />
            
            {/* Drifting gradient orbs */}
            <DriftingBackground />
            
            {/* Pulsing ambient glow - breathes life into the void */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-neon rounded-full blur-[150px] pointer-events-none"
                animate={{ 
                    opacity: [0.06, 0.12, 0.06],
                    scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            
            {/* Secondary accent glow */}
            <motion.div 
                className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-acid-magenta rounded-full blur-[120px] pointer-events-none"
                animate={{ 
                    opacity: [0.03, 0.06, 0.03],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                
                {/* --- HERO TEXT CONTENT --- */}
                <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 lg:mb-20 relative z-20 flex flex-col items-center text-center">
                    
                    {/* Scarcity Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-white/5 mb-6 hover:bg-white/10 transition-colors cursor-default"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                        <span className="text-sm font-medium text-zinc-300">
                            High Demand: <span className="text-white font-bold">4 Spots Left</span>
                        </span>
                    </motion.div>

                    {/* Hero Heading */}
                    <HeroHeading />

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 md:mt-10"
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-acid-lime text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_30px_rgba(189,255,0,0.4)] hover:shadow-[0_0_40px_rgba(189,255,0,0.6)] transition-shadow"
                        >
                            <span className="relative z-10">Join the First 100</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
                            
                            {/* Shimmer Effect */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                            />
                        </motion.button>
                    </motion.div>
                </div>

                {/* --- HERO DEMO SECTION --- */}
                <div 
                    ref={containerRef}
                    className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 items-center relative"
                    style={{ perspective: 1000 }}
                >
                    {/* Left: Instagram Phone */}
                    <motion.div 
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                        animate={{ 
                            opacity: stage === 'success' ? 0.5 : 1,
                            scale: stage === 'success' ? 0.98 : 1
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <TiltCard 
                            className="rounded-[3rem]" 
                            intensity={8} 
                            disableHover={isAnimating}
                        >
                            <InstagramPhone 
                                shareButtonRef={shareBtnRef}
                                isTransferring={isTransferring}
                                onShareClick={handleShareClick}
                            />
                        </TiltCard>
                    </motion.div>

                    {/* Right: Terminal */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-start w-full relative">
                        {/* Success Glow */}
                        {stage === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-acid-lime/15 blur-[80px] -z-10 rounded-full"
                            />
                        )}

                        <motion.div 
                            ref={terminalRef} 
                            className="w-full"
                            animate={{ 
                                scale: terminalBump ? 1.02 : 1,
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 15 
                            }}
                        >
                            <TiltCard 
                                className="rounded-2xl" 
                                intensity={4}
                                disableHover={isAnimating}
                            >
                                <Terminal status={mapStageToTerminalStatus(stage)} />
                            </TiltCard>
                        </motion.div>
                    </div>

                    {/* Beam Animation - REMOVED */}
                    {/* Since beam is gone, we manually trigger the impact after a short delay */}
                </div>
            </div>
        </div>
    );
}

/**
 * HeroOrchestrator
 * 
 * Wraps the hero content in AnimationProvider to provide global animation state.
 * This is the ONLY place where AnimationProvider should be used.
 */
export default function HeroOrchestrator() {
    return (
        <AnimationProvider>
            <HeroContent />
        </AnimationProvider>
    );
}
