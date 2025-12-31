"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

export default function FacelessCreator() {
  return (
    <motion.div 
        className="w-full h-full flex flex-col items-center justify-center relative group"
        whileHover="hover"
        initial="idle"
    >
        
        {/* 1. The Illustration (Hoodie made of Bars) */}
        <motion.div 
            className="relative w-[300px] h-[300px] drop-shadow-[0_0_0px_rgba(189,255,0,0)]"
            variants={{
                idle: { scale: 1 },
                hover: { 
                    scale: [1, 1.05, 1], // The "Bass" Beat
                    filter: "drop-shadow(0 0 20px #BDFF00)",
                    transition: { 
                        scale: { duration: 0.2, repeat: Infinity, repeatType: "reverse" },
                        filter: { duration: 0.1 }
                    }
                }
            }}
        >
            {/* SVG Definition for Clip Path */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="hoodie-clip" clipPathUnits="objectBoundingBox">
                        {/* Normalized path (approximate conversion of 200x200 to 0..1) */}
                        {/* Original: M100,30 C130,30 150,50 160,80 C165,95 170,110 180,180 L20,180 C30,110 35,95 40,80 C50,50 70,30 100,30 Z */}
                        {/* 200 width, 200 height. division by 200. */}
                        {/* 100->0.5, 30->0.15 */}
                        <path d="M0.5,0.15 
                                 C0.65,0.15 0.75,0.25 0.8,0.4 
                                 C0.825,0.475 0.85,0.55 0.9,0.9 
                                 L0.1,0.9 
                                 C0.15,0.55 0.175,0.475 0.2,0.4 
                                 C0.25,0.25 0.35,0.15 0.5,0.15 Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* Bar Container with Clip Path */}
            <div 
                className="w-full h-full flex items-end justify-center gap-[2px] overflow-hidden"
                style={{ clipPath: "url(#hoodie-clip)" }}
            >
                {/* 30 Bars */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <WaveformBar key={i} index={i} />
                ))}
            </div>

        </motion.div>

        {/* 2. Context: Views Badge */}
        <motion.div 
            className="absolute bottom-4 bg-black/80 px-4 py-2 rounded-full border border-acid-lime/30 backdrop-blur-md shadow-lg"
            variants={{
                idle: { scale: 1, borderColor: "rgba(189, 255, 0, 0.3)" },
                hover: { 
                    scale: 1.1, 
                    borderColor: "#bdff00",
                    boxShadow: "0 0 15px rgba(189, 255, 0, 0.5)"
                }
            }}
        >
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-sm tracking-widest font-bold text-white">
                    VIEWS: <CountUp start={1000000} end={1240500} duration={2.5} separator="," formattingFn={(n: number) => (n/1000000).toFixed(1) + "M+"} />
                </span>
             </div>
        </motion.div>

    </motion.div>
  );
}

// --- Subcomponent: Individual Bar ---
const WaveformBar = ({ index }: { index: number }) => {
    // Randomize initial phase for organic look
    const randomDelay = Math.random();
    
    return (
        <motion.div 
            className="w-full bg-gradient-to-t from-green-900 via-acid-lime to-white"
            style={{ 
                transformOrigin: "bottom",
                borderRadius: "2px"
            }}
            variants={{
                idle: { 
                    height: ["30%", "60%", "30%"],
                    filter: "brightness(1)",
                    transition: {
                        duration: 0.75,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.025, // Wave effect
                    }
                },
                hover: { 
                    height: ["40%", "90%", "40%"], // Taller spikes
                    filter: "brightness(1.5)",
                    transition: {
                        duration: 0.15, // Fast frantic beat
                        repeat: Infinity,
                        ease: "easeIn", // Schnappy
                        delay: index * 0.01 // Tighter wave
                        // Or just random? "Spike aggressively"
                    }
                }
            }}
        />
    )
}
