"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Instagram, Check } from "lucide-react"; // Icons
import { cn } from "@/lib/utils";

// --- Types & Constants ---
// 0: Scroll Feed
// 1: Copy Link
// 2: Transfer (Flight)
// 3: Explosion & Generate
type StoryStep = 0 | 1 | 2 | 3;

// Step Durations (ms)
const DURATIONS = {
  0: 2000, // Scroll Feed
  1: 1000, // Copy Link (Click & Toast) - Reduced to sync with tick > launch
  2: 1200, // Transfer (Flight)
  3: 5000, // Explosion & Generate
};

export default function HeroDirector() {
  const [step, setStep] = useState<StoryStep>(0);

  // --- The Timeline Engine ---
  useEffect(() => {
    const duration = DURATIONS[step];
    const timer = setTimeout(() => {
      setStep((prev) => (prev === 3 ? 0 : prev + 1) as StoryStep);
    }, duration);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full h-[650px] relative overflow-hidden bg-black" style={{ perspective: "1200px" }}>
      {/* --- The Lighting Rig --- */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Floor Reflection */}
         <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-lime-500/10 to-transparent blur-xl z-0" />
         
         {/* Global Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-50 mix-blend-multiply" />
      </div>

      {/* --- 3D Stage Content --- */}
      <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
        <Layout step={step} />
      </div>
    </div>
  );
}

// --- Layout Orchestrator ---
const Layout = ({ step }: { step: StoryStep }) => {
  return (
    <div className="relative w-full max-w-6xl h-full flex items-center justify-center gap-20">
      {/* 0. Global Connectors */}
      <DataCable step={step} />

      {/* 1. The Active Source (iPhone) */}
      <ActiveSourcePhone step={step} />

      {/* 2. The Bridge (Action Layer: Capsule & Cursor) */}
      <div className="absolute inset-0 pointer-events-none z-50">
         <SharePayload step={step} />
         <GhostCursor step={step} />
      </div>

      {/* 3. The Output Agent (Desktop) */}
      <DesktopStage step={step} />
    </div>
  );
};

// --- 0. DATA CABLE (Global Connector) ---
function DataCable({ step }: { step: StoryStep }) {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <defs>
                <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3f3f46" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
                </linearGradient>
            </defs>
            
            {/* Base Idle Line */}
            <line 
                x1="calc(50% - 260px)" 
                y1="calc(50% + 110px)"
                x2="calc(50% + 220px)"
                y2="calc(50% - 80px)"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="opacity-10"
            />

            {/* Active Transfer Beam removed as per request */}
        </svg>
    )
}

// --- GHOST CURSOR ---
function GhostCursor({ step }: { step: StoryStep }) {
  // Coordinates relative to center
  // Share Button (Phone Bottom Right): -240, 160
  // Desktop Input: 220, -80
  
  const variants = {
    0: { opacity: 0, x: -400, y: 300, scale: 1 },         // Off-screen
    1: { opacity: 1, x: -240, y: 160, scale: 0.8 },       // Click Share (Step 1)
    2: { opacity: 1, x: 220, y: -80, scale: 1 },          // Move to Input (Step 2)
    3: { opacity: 0, x: 220, y: -20, scale: 1 },          // Fades out (Step 3)
  };

  return (
    <motion.div
        animate={step as any} 
        variants={variants as any}
        transition={{ 
            duration: 0.5, 
            ease: "circOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/20 backdrop-blur ring-1 ring-white/50 z-50 flex items-center justify-center shadow-lg"
    >
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
    </motion.div>
  );
}

// --- SHARE PAYLOAD (The "flow" share icon) ---
function SharePayload({ step }: { step: StoryStep }) {
    return (
        <AnimatePresence>
            {/* Step 2: Flight from Phone to Desktop */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 1, x: -240, y: 160, scale: 1, rotate: -45 }} // Spawn at Share Button position
                    animate={{ opacity: 1, x: 220, y: -80, scale: 0.5, rotate: 0 }}   // Fly into Input
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8, ease: "backIn" }} // "Taking off" feel
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none"
                >
                    {/* The Glowing Icon */}
                    <motion.div 
                        className="relative"
                        animate={{ rotate: 360 }} // Slight spin during flight for effect
                        transition={{ duration: 0.8, ease: "linear" }}
                    >
                        <Send className="w-6 h-6 text-acid-lime fill-acid-lime" />
                        <div className="absolute inset-0 bg-acid-lime blur-md opacity-60" />
                    </motion.div>

                    {/* Trailing Beam */}
                    <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 100, opacity: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-l from-acid-lime to-transparent origin-right blur-[2px]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- 1. ACTIVE SOURCE PHONE ---

function ActiveSourcePhone({ step }: { step: StoryStep }) {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    if (step === 1) {
        setShowTick(true);
        // Tick stays for 850ms, leaving ~150ms as "Green Share" before launch (at 1000ms)
        const timer = setTimeout(() => setShowTick(false), 850);
        return () => clearTimeout(timer);
    } else {
        setShowTick(false);
    }
  }, [step]);

  const variants = {
    idle: { rotateY: 12, rotateX: 5, scale: 0.9, x: 0 },
    active: { rotateY: 12, rotateX: 5, scale: 0.95, x: 0 },
  };

  return (

    <motion.div
      animate={step === 1 ? "active" : "idle"}
      variants={variants}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="relative z-20"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* --- THE CHASSIS --- */}
      <div className="relative w-[300px] h-[600px] rounded-[3.5rem] bg-black border-[6px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Glass Edge Shadow */}
        <div className="absolute inset-0 rounded-[3.2rem] pointer-events-none z-50 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />

        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 rounded-full bg-black z-40 flex items-center justify-center gap-2">
           <div className="w-16 h-4 rounded-full bg-[#111]" />
        </div>

        {/* --- SCREEN CONTENT --- */}
        <div className="w-full h-full relative overflow-hidden bg-[#0A0A0A] font-sans flex flex-col">
            
            {/* 1. SCROLLING FEED (The Content) */}
            <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -200] }}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    className="flex flex-col gap-1"
                >
                    {/* Full Screen Vertical Video Style Feed */}
                    {[1, 2].map((i) => (
                        <div key={i} className="w-full h-[600px] bg-zinc-900/40 relative border-b border-white/5">
                            {/* Abstract Video Content */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                            <div className="absolute bottom-20 left-4 right-16 space-y-2">
                                <div className="w-3/4 h-3 bg-white/10 rounded-full" />
                                <div className="w-1/2 h-3 bg-white/10 rounded-full" />
                            </div>
                        </div>
                    ))}
                </motion.div>
                
                {/* Vignette Overlay for realism */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* 2. UI LAYER (Reels Style) */}
            <div className="absolute inset-0 z-30 pointer-events-none p-4 pb-8 flex flex-col justify-between">
                
                {/* Top Bar */}
                <div className="flex justify-between items-center pt-2 px-2">
                     <span className="text-white font-bold text-lg">Reels</span>
                     <Instagram className="text-white w-6 h-6" />
                </div>

                {/* Right Sidebar Actions */}
                <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
                    {/* Like */}
                    <div className="flex flex-col items-center gap-1">
                        <Heart className="w-7 h-7 text-white stroke-[2px]" />
                        <span className="text-white text-[11px] font-medium tracking-tight">42.5K</span>
                    </div>
                    
                    {/* Comment */}
                    <div className="flex flex-col items-center gap-1">
                        <MessageCircle className="w-7 h-7 text-white stroke-[2px]" />
                        <span className="text-white text-[11px] font-medium tracking-tight">892</span>
                    </div>

                    {/* Share (Trigger) */}
                    <div className="relative pointer-events-auto">
                        <motion.div 
                            animate={step === 1 ? { scale: 0.9 } : { scale: 1 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="relative w-7 h-7 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {showTick ? (
                                        <motion.div
                                            key="tick"
                                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Check className="w-7 h-7 text-acid-lime stroke-[3px]" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="send"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: step === 2 ? 0 : 1 }} // Hide when flying (Step 2)
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Send 
                                                className={cn(
                                                    "w-7 h-7 stroke-[2px] transform -rotate-12 translate-x-0.5 transition-colors duration-300",
                                                    (step === 1) ? "text-acid-lime fill-acid-lime" : "text-white"
                                                )} 
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <span className={cn(
                                "text-[11px] font-medium tracking-tight transition-colors duration-300",
                                step === 1 ? "text-acid-lime" : "text-white"
                            )}>Share</span>
                        </motion.div>
                        
                        {/* Radioactive Pulse Ring on Click */}
                        <AnimatePresence>
                            {step === 1 && (
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.6, opacity: 0.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 -m-1.5 rounded-full border-2 border-acid-lime box-content"
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    
                    {/* More Menu */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 flex items-center justify-center gap-[3px]">
                             <div className="w-1 h-1 bg-white rounded-full" />
                             <div className="w-1 h-1 bg-white rounded-full" />
                             <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Bottom Source Info */}
                <div className="text-white space-y-3 mb-2 px-2">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 ring-1 ring-white/10" />
                        <span className="font-semibold text-sm tracking-wide">viral_creator</span>
                        <div className="px-2 py-0.5 rounded-md border border-white/20 backdrop-blur-md bg-white/5 text-[10px] font-medium">
                            Follow
                        </div>
                    </div>
                    <div className="text-sm opacity-90 max-w-[80%] leading-relaxed font-light">
                       POV: You finally found the secret tool... <span className="text-white/50">more</span>
                    </div>
                </div>
            </div>



        </div>
      </div>
      
      {/* Label */}
      <div className="absolute -bottom-16 left-0 right-0 text-center">
         <p className="text-zinc-500/50 font-mono text-[10px] tracking-[0.3em] uppercase">Input: Reels Feed</p>
      </div>
    </motion.div>
  );
}

// --- 2. DESKTOP AGENT (Target) ---
function DesktopStage({ step }: { step: StoryStep }) {
   const isExploding = step === 3;
   const isPaste = step >= 2;

   return (
     <motion.div
       animate={{
          rotateY: -12, // Updated: Faces phone more naturally
          rotateX: 5,
          x: step >= 2 ? 0 : 40,
          scale: step >= 3 ? 1 : 0.9,
          opacity: step >= 2 ? 1 : 0.4
       }}
       transition={{ type: "spring", stiffness: 60, damping: 20 }}
       className="relative z-10 w-[400px] h-[350px]"
       style={{ transformStyle: "preserve-3d" }}
     >
        {/* AMBIENT GLOW */}
        <div className={cn(
             "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-acid-lime blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 mix-blend-screen",
             isExploding ? "opacity-30" : "opacity-0"
        )} />

        {/* Start Ambient Dim Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-acid-lime/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* --- HOLOGRAPHIC TERMINAL CONTAINER --- */}
        {/* Gradient Border Wrapper */}
        <div className="w-full h-full rounded-xl p-[2px] bg-gradient-to-br from-acid-magenta to-acid-lime shadow-[0_0_30px_-5px_rgba(132,204,22,0.15)] relative z-10">
            
            {/* Inner Black Box */}
            <div className="w-full h-full bg-black rounded-[10px] overflow-hidden flex flex-col relative">
                
                {/* Header (Traffic Lights) */}
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <div className="ml-auto text-[10px] text-zinc-500 font-mono tracking-widest opacity-50">TERMINAL_V2</div>
                </div>
                
                {/* Dashboard Content */}
                <div className="flex-1 p-8 relative flex flex-col font-mono justify-center">
                   
                   {/* 1. INPUT INTERACTION (Visible Steps 0-2) */}
                   <AnimatePresence mode="wait">
                     {!isExploding && (
                        <motion.div 
                            key="input-form"
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }} // Increased blur for dissolve
                            transition={{ duration: 0.3 }}
                            className="space-y-8 mt-2"
                        >
                             {/* Input Field */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-acid-lime/70 font-bold block ml-1">
                                    &gt; Enter Source
                                </label>
                                
                                {/* Huge Terminal Input with Pulsing Ready State */}
                                <div className={cn(
                                    "min-h-[60px] flex items-center relative gap-2 px-3 py-1 transition-all duration-300 rounded-lg",
                                    step < 2 ? "border-2 border-dashed border-white/10 animate-[pulse_3s_ease-in-out_infinite]" : "border-0"
                                )}>
                                     <span className="text-zinc-600 text-3xl select-none animate-pulse">_</span>
                                    
                                    {isPaste ? (
                                        <motion.span 
                                           initial={{ opacity: 0, x: -10 }} 
                                           animate={{ opacity: 1, x: 0 }} 
                                           className="text-white font-mono text-2xl tracking-tight font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] truncate"
                                        >
                                            instagram.com/reel...
                                        </motion.span>
                                    ) : (
                                        <span className="text-zinc-800 font-mono text-2xl truncate">Waiting...</span>
                                    )}
                                </div>
                                
                                {/* Underline (Scanning Line) - Only active during paste/processing */}
                                <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden">
                                     <motion.div 
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-acid-lime to-transparent w-1/2"
                                     />
                                </div>
                            </div>

                            {/* Generate Button */}
                            <motion.div>
                                <button
                                   className={cn(
                                       "w-full h-14 rounded-lg font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 border-0 outline-none",
                                       step >= 2 
                                         ? "bg-acid-lime text-black shadow-[0_0_30px_rgba(132,204,22,0.6)] scale-[1.02] hover:scale-[1.05]" 
                                         : "bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed"
                                   )}
                                >
                                       GENERATE SCRIPT
                                </button>
                            </motion.div>
                        </motion.div>
                     )}
                   </AnimatePresence>

                   {/* 2. PARTICLE EXPLOSION (Step 3) */}
                   {isExploding && (
                       <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-[300px] z-50 pointer-events-none overflow-visible">
                           {/* Explosive Amount: 50 Particles */}
                           {Array.from({ length: 50 }).map((_, i) => (
                               <Particle key={i} i={i} />
                           ))}
                       </div>
                   )}

                   {/* 3. SCRIPT REVEAL (Step 3) */}
                   {isExploding && (
                       <motion.div 
                          key="script-result"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="absolute inset-0 p-8 pt-10 space-y-5 bg-black/80 backdrop-blur-md rounded-b-[10px]"
                       >
                           {/* Hook Section */}
                           <motion.div 
                               initial={{ y: -10, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: 0.6 }}
                           >
                               <span className="bg-acid-lime text-black px-1.5 py-0.5 font-bold text-[10px] tracking-wider mb-2 inline-block">HOOK</span>
                               <h3 className="text-white text-sm font-bold leading-relaxed">
                                   "Stop scrolling if you want to fix your engagement right now."
                               </h3>
                           </motion.div>

                           {/* Body Section */}
                           <motion.div 
                               initial={{ y: -10, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: 0.8 }}
                           >
                               <span className="text-zinc-500 text-[10px] tracking-widest font-bold mb-1 block">BODY</span>
                               <p className="text-zinc-400 text-xs leading-relaxed">
                                   Most creators fail because they ignore the first 3 seconds. Here is the framework used by the top 1%...
                               </p>
                           </motion.div>

                           {/* CTA Section */}
                           <motion.div 
                               initial={{ y: -10, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: 1.0 }}
                               className="pt-2 border-t border-white/10"
                           >
                               <span className="text-zinc-500 text-[10px] tracking-widest font-bold mb-1 block">CTA</span>
                               <p className="text-acid-magenta text-xs font-bold font-sans">
                                   "Comment <span className="underline">SCRIPT</span> and I'll send you the template."
                               </p>
                           </motion.div>
                       </motion.div>
                   )}
                </div>
            </div>
        
        </div>
        
        <div className="absolute -bottom-12 left-0 right-0 text-center">
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase opacity-50">Output Protocol</p>
        </div>
     </motion.div>
   );
}

// --- Particle Subcomponent ---
const Particle = ({ i }: { i: number }) => {
    // Deterministic random physics based on index
    const r1 = (i * 13) % 100 / 100; // 0-1
    const r2 = (i * 29) % 100 / 100; // 0-1
    
    // Spread X: -150 to 150
    const startX = (r1 - 0.5) * 300;
    
    // Start Y: High up (dissolved input area)
    const startY = 0;
    
    // End Y: Rains down significantly
    const endY = 200 + (r2 * 100);

    return (
        <motion.div
           initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
           animate={{ 
               y: endY, 
               scale: [0, 1.5, 0], // Grow then shrink like a droplet
               opacity: [0, 1, 0], // Fade in then out
           }}
           transition={{ duration: 0.8 + (r2 * 0.4), ease: "easeIn", delay: r2 * 0.2 }}
           className="absolute top-0 left-1/2 w-[2px] h-[8px] bg-acid-lime shadow-[0_0_8px_#BDFF00] rounded-full"
        />
    );
};
