"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IPhoneMockupProps {
  step?: number;
}

export default function IPhoneMockup({ step = 0 }: IPhoneMockupProps) {
  const isExtracting = step === 2; // 4s Mark

  return (
    <div className="relative group perspective-1000">
      <motion.div
        whileHover={{ rotateY: -5, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-[300px] h-[600px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Titanium Frame */}
        <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-700 p-[6px] shadow-2xl ring-1 ring-white/10 z-20 pointer-events-none">
            <div className="absolute inset-[6px] bg-black rounded-[44px] overflow-hidden">
                 <div className="absolute inset-0 rounded-[44px] border border-black/50 z-20 pointer-events-none" />
            </div>
        </div>

        {/* Physical Buttons */}
        <div className="absolute top-24 -left-[8px] w-[8px] h-8 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-40 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-56 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-44 -right-[8px] w-[8px] h-20 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-r-md border-r border-zinc-500 shadow-lg" />

        {/* Dynamic Island */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-[60] flex items-center justify-center gap-2 px-2 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0f0f0f]" />
        </div>

        {/* Screen Content */}
        <div className="absolute inset-[12px] rounded-[38px] bg-[#050505] overflow-hidden relative font-mono select-none z-10">
            
            {/* WIREFRAME GRID BACKGROUND */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" 
                 style={{ 
                     backgroundImage: `
                        linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px)
                     `, 
                     backgroundSize: "40px 40px",
                     border: "1px dashed rgba(0, 255, 0, 0.3)" 
                 }} 
            />

            {/* DATA LAYERS (Stacked Panes) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                
                {/* Pane 3: Audio Data (Blue) - Bottom */}
                <motion.div 
                    className="absolute w-[80%] h-32 bg-blue-900/20 border border-blue-500/50 rounded-xl backdrop-blur-sm flex items-center justify-center overflow-hidden"
                    animate={isExtracting ? { x: 400, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "backIn" }}
                    style={{ zIndex: 10, top: "55%" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-60">
                         {[...Array(15)].map((_, i) => (
                             <motion.div 
                                key={i}
                                className="w-1 bg-blue-500"
                                animate={{ height: ["20%", "80%", "30%"] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                             />
                         ))}
                    </div>
                    <span className="absolute top-2 left-2 text-[8px] text-blue-400 font-bold uppercase tracking-wider">Audio_Layer</span>
                </motion.div>

                {/* Pane 2: Pacing Data (Green) - Middle */}
                <motion.div 
                    className="absolute w-[80%] h-32 bg-lime-900/20 border border-lime-500/50 rounded-xl backdrop-blur-sm flex items-center justify-center overflow-hidden"
                    animate={isExtracting ? { x: 400, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "backIn" }}
                    style={{ zIndex: 20, top: "40%" }}
                >
                    {/* Graph Visual */}
                    <svg className="w-full h-full p-2 opacity-60" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <motion.path 
                            d="M0,50 L10,40 L20,45 L30,20 L40,30 L50,10 L60,25 L70,5 L80,20 L90,10 L100,0"
                            fill="none"
                            stroke="#84cc16"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <path d="M0,50 L100,50 L100,50 L0,50" fill="url(#grad-green)" opacity="0.2" />
                    </svg>
                    <span className="absolute top-2 left-2 text-[8px] text-lime-400 font-bold uppercase tracking-wider">Pacing_Graph</span>
                </motion.div>

                {/* Pane 1: Hook Data (Red) - Top */}
                <motion.div 
                    className="absolute w-[80%] h-32 bg-red-900/20 border border-red-500/50 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center gap-2"
                    animate={isExtracting ? { x: 400, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0, ease: "backIn" }}
                    style={{ zIndex: 30, top: "25%" }}
                >
                    <div className="text-2xl font-bold text-red-500 tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        &lt; 3.0s
                    </div>
                    <div className="text-[10px] text-red-400 uppercase tracking-widest font-semibold">Retention Alert</div>
                    <span className="absolute top-2 left-2 text-[8px] text-red-400 font-bold uppercase tracking-wider">Hook_Log</span>
                </motion.div>

            </div>

            {/* SCANNER OVERLAY */}
            <div className="absolute inset-0 z-40 pointer-events-none">
                {/* The Beam Line */}
                <motion.div 
                    className="absolute w-full h-[2px] bg-lime-500 shadow-[0_0_20px_#84cc16]"
                    animate={isExtracting ? { 
                        top: "50%", 
                        height: "100%", 
                        opacity: 0,
                        backgroundColor: "#FFFFFF" // Flash White
                    } : { 
                        top: ["0%", "100%", "0%"],
                        opacity: 1
                    }}
                    transition={isExtracting ? {
                         duration: 0.3
                    } : {
                         duration: 3, 
                         repeat: Infinity, 
                         ease: "easeInOut" 
                    }}
                />
                
                {/* Status Text inside Scanner */}
                 <div className="absolute bottom-6 left-0 w-full text-center">
                    <span className={cn(
                        "text-[10px] font-bold tracking-[0.2em] transition-colors duration-300",
                        isExtracting ? "text-white" : "text-lime-500/80"
                    )}>
                        {isExtracting ? "EXTRACTING LAYERS..." : "SCANNING SOURCE..."}
                    </span>
                 </div>
            </div>

            {/* Overlay Gradient for Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-50" />
        </div>
      </motion.div>
    </div>
  );
}
