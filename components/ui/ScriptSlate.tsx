import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScriptSlateProps {
  phase: "phone" | "flight" | "editor";
  children?: ReactNode;
}

export const ScriptSlate = ({ phase, children }: ScriptSlateProps) => {
  const isEditor = phase === "editor";

  return (
    <div className="relative w-full max-w-[320px] h-[500px] perspective-1000 flex items-center justify-center">
      
      {/* 2. Future Reel Wireframe (Background) */}
      <motion.div
        className="absolute top-0 right-[-40px] w-[200px] h-[350px] border-2 border-dashed border-white/20 rounded-3xl z-0"
        initial={{ opacity: 0, x: 0, rotateY: 0 }}
        animate={isEditor ? { opacity: 0.3, x: 20, rotateY: -10 } : { opacity: 0, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ transformOrigin: "left center" }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 border border-white/20 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
        
        {/* Placeholder UI Elements in Wireframe */}
        <div className="absolute bottom-8 right-4 flex flex-col gap-4 items-center opacity-30">
            <div className="w-6 h-6 rounded-full border border-white" />
            <div className="w-6 h-6 rounded-full border border-white" />
            <div className="w-6 h-6 rounded-full border border-white" />
        </div>
      </motion.div>


      {/* 1. Holographic Script Slate (Foreground) */}
      <motion.div
        className="relative z-10 w-[280px] h-[450px] bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, rotateY: 10, rotateX: 5 }}
        animate={isEditor ? { opacity: 1, rotateY: -10, rotateX: 5 } : { opacity: 0.5, rotateY: 10, rotateX: 5 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glass Glare */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-acid-lime">Generated Script</span>
        </div>

        {/* Content - Particles Land Here */}
        <div className="flex-1 overflow-visible relative flex flex-col gap-1">
            {children}
            
            {/* Optional Overlay Text if fully processed? Loop logic might need Reset */}
             {isEditor && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center space-y-8"
                >
                     {/* Just simple headers to indicate structure over the bars */}
                     <span className="text-[10px] text-zinc-500 font-bold uppercase block bg-black/50 w-fit px-1">Hook</span>
                     <span className="text-[10px] text-zinc-500 font-bold uppercase block bg-black/50 w-fit px-1 mt-10">Body</span>
                     <span className="text-[10px] text-zinc-500 font-bold uppercase block bg-black/50 w-fit px-1 mt-10">CTA</span>
                </motion.div>
             )}
        </div>

        {/* Scanline */}
        <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-acid-lime/50 shadow-[0_0_15px_#BDFF00]"
            animate={isEditor ? { top: ["0%", "100%"] } : { top: "0%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};
