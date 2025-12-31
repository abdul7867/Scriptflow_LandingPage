"use client";

import { motion, useMotionValue, useVelocity, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
const WaveformBar = ({ index, speed }: { index: number, speed: any }) => {
    // Transform speed into height. 
    // Max height 100%, idle 10%.
    // Adding randomness based on index to create "wave"
    
    // Physics: The faster the mouse, the taller the bar
    const height = useTransform(speed, (s: number) => {
        // s (speed) typically ranges 0 to 2000+
        const normalizedSpeed = Math.min(s / 1000, 1); // 0 to 1
        
        // Random multiplier for this bar to keep it looking like audio
        const randomFactor = 0.5 + Math.random(); 
        
        // Base hum is 15%. Max spike is 100%
        const barHeight = 15 + (normalizedSpeed * 85 * randomFactor);
        return Math.min(barHeight, 100) + "%";
    });

    const backgroundColor = useTransform(speed, (s: number) => {
        return s > 100 ? "#bdff00" : "#3f3f46"; // Highlight when moving
    });

    // Spring for smooth bounce back
    const smoothHeight = useSpring(height, { stiffness: 300, damping: 20 });

    return (
        <motion.div
            className="w-1 rounded-full origin-bottom"
            style={{ 
                height: smoothHeight, 
                backgroundColor 
            }}
        />
    );
};

export default function FacelessCreator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  const speed = useTransform([velocityX, velocityY], ([vx, vy]: any[]) => {
      // Cast to number to avoid TS error
      const vX = vx as number;
      const vY = vy as number;
      return Math.sqrt(vX * vX + vY * vY);
  });
  
  // Smooth speed for less jittery UI
  const smoothSpeed = useSpring(speed, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
      // We track velocity based on changes.
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
  };

  return (
    <div 
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-end pb-8 relative cursor-crosshair"
        onMouseMove={handleMouseMove}
    >
        
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
                />
                
                {/* Hollow Face / Mask Area */}
                <circle cx="100" cy="90" r="35" fill="#000000" />
            </svg>

            {/* The Brain / Waveform (Absolute Positioned inside the Face) */}
            {/* The Reactive Waveform (20 Bars) */}
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] flex items-end justify-center gap-[1px] overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <WaveformBar key={i} index={i} speed={smoothSpeed} />
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
