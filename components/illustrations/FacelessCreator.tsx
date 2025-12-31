"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

// Animated Counter Component
function ViewsCounter() {
    return (
        <div className="font-mono text-xs tracking-widest font-bold text-zinc-400 group-hover:text-acid-lime transition-colors duration-300">
           VIEWS: <CountUp start={0} end={1200000} duration={2} separator="," formattingFn={(n: number) => n >= 1000000 ? (n/1000000).toFixed(1) + "M+" : n + ""} />
        </div>
    );
}

// WaveformBar Component
// WaveformBar Component
const WaveformBar = ({ index }: { index: number }) => {
    // Chaos Mode Randoms
    const r1 = Math.random() * 100 + "%";
    const r2 = Math.random() * 100 + "%";
    const r3 = Math.random() * 100 + "%";
    
    // Gradient Palette (Neon Lime, Magenta)
    const activeColor = ["#bdff00", "#a3e635", "#d946ef", "#bdff00"]; 

    return (
        <motion.div
            className="w-1 bg-zinc-700 rounded-full origin-bottom"
            variants={{
                idle: { 
                    height: ["10%", "20%", "10%"],
                    backgroundColor: "#3f3f46", // zinc-700
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.1, // Sine wave flow
                        ease: "easeInOut"
                    }
                },
                hover: { 
                    height: ["10%", r1, r2, r3, "50%"], 
                    backgroundColor: activeColor,
                    boxShadow: ["0 0 0px #bdff00", "0 0 10px #bdff00"],
                    transition: {
                        duration: 0.2, // Chaos Speed (4x normal)
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: Math.random() * 0.2, // Random start
                        ease: "linear"
                    }
                }
            }}
        />
    );
};

export default function FacelessCreator() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-8 relative">
        
        {/* Container for the Bust */}
        <div className="relative w-48 h-48">
            
            {/* The Silhouette SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#27272a" />{/* zinc-800 */}
                        <stop offset="100%" stopColor="#09090b" />{/* zinc-950 */}
                    </linearGradient>
                </defs>
                
                {/* Hoodie Shape */}
                <motion.path 
                    d="M100,30 
                       C130,30 150,50 160,80 
                       C165,95 170,110 180,180 
                       L20,180 
                       C30,110 35,95 40,80 
                       C50,50 70,30 100,30 Z" 
                    fill="url(#hoodie-grad)"
                    stroke="#bdff00"
                    strokeWidth="2"
                    variants={{
                        idle: { pathLength: 0, opacity: 0.8 },
                        hover: { pathLength: 1, opacity: 1 }
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                
                {/* Hollow Face / Mask Area */}
                <circle cx="100" cy="90" r="35" fill="#000000" />
            </svg>

            {/* The Brain / Waveform (Absolute Positioned inside the Face) */}
            {/* The Reactive Waveform (20 Bars) */}
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] flex items-end justify-center gap-[1px] overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <WaveformBar key={i} index={i} />
                ))}
            </div>

        </div>

        {/* Digital Ticker */}
        <div className="mt-4 bg-black/50 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm">
            <ViewsCounter />
        </div>

    </div>
  );
}
