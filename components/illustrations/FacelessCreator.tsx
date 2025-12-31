"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Animated Counter Component
function ViewsCounter() {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (latest > 1000000) return (latest / 1000000).toFixed(1) + "M+";
        if (latest > 1000) return Math.floor(latest / 1000) + "k";
        return Math.floor(latest).toString().padStart(6, "0"); // Pad keeping 000,000 look mostly implied
    });
    
    // We need a render-able state or direct motion value usage. 
    // Framer motion values can be rendered directly in modern versions, but simple text requires a ref or state wrapper usually if strict string.
    // However, simplest here is to just toggle logic on hover parent.
    
    return (
        <motion.div 
            variants={{
                idle: { color: "#a1a1aa" }, // zinc-400
                hover: { color: "#bef202" } // acid-lime
            }}
            onHoverStart={() => {
                animate(count, 1200000, { duration: 1.5, ease: "circOut" });
            }}
            onHoverEnd={() => {
                count.set(0);
            }}
            className="font-mono text-xs tracking-widest font-bold"
        >
           VIEWS: <motion.span>{rounded}</motion.span>
        </motion.div>
    );
}

// WaveformBar Component
const WaveformBar = ({ index }: { index: number }) => {
    // Randomize "Active" scale for each bar slightly to look organic
    const randomScale = 1.5 + Math.random(); 

    return (
        <motion.div
            className="w-1.5 bg-zinc-600 rounded-full origin-bottom"
            style={{ height: 20 }} // Base height
            variants={{
                idle: { 
                    scaleY: 0.5 + Math.random() * 0.5,
                    backgroundColor: "#52525b", // zinc-600
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.1
                    }
                },
                hover: { 
                    scaleY: [1, randomScale, 1], // Pulse scale
                    backgroundColor: "#bef202", // acid-lime
                    boxShadow: "0 0 10px #bef202",
                    transition: {
                        duration: 0.2, // Fast EDM tempo
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.05,
                        ease: "easeInOut"
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
                    stroke="#bef202"
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
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] flex items-center justify-center gap-[2px] overflow-hidden">
                {[...Array(9)].map((_, i) => (
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
