"use client";

import { motion } from "framer-motion";
import { Settings, Check } from "lucide-react";

export default function TheCurator() {
  return (
    <div className="w-full h-full flex items-center justify-around px-4 relative overflow-visible">

      {/* LEFT: Messy Input Stack */}
      <div className="relative w-12 h-16 flex flex-col justify-end gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-8 h-8 rounded-md border border-white/10 shadow-sm
              ${i === 0 ? "bg-blue-500/80 -rotate-12 translate-x-2" : 
                i === 1 ? "bg-purple-500/80 rotate-6 -translate-x-1" : 
                "bg-zinc-500/80 rotate-3"
              }`}
            variants={{
              idle: { x: 0, opacity: 1, scale: 1 },
              hover: { 
                x: [0, 60], // Move to center
                y: [0, 10], // Slight funnel down
                scale: [1, 0], // Shrink into machine
                opacity: [1, 0],
                transition: {
                   duration: 2,
                   repeat: Infinity,
                   delay: i * 0.1, // Stagger slightly so they don't look like one block
                   times: [0, 0.4] 
                }
              }
            }}
          />
        ))}
      </div>

      {/* CENTER: The Machine */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Hydraulic Press Head */}
        <motion.div 
            className="w-16 h-20 bg-zinc-800 rounded-lg border border-white/20 flex flex-col items-center justify-end pb-2 overflow-hidden relative"
            variants={{
                idle: { y: 0 },
                hover: { 
                    y: [0, 4, 0], // Shake/Press
                    borderColor: ["rgba(255,255,255,0.2)", "#bef202", "rgba(255,255,255,0.2)"],
                    transition: { duration: 2, times: [0.4, 0.5, 0.6], repeat: Infinity }
                }
            }}
        >
             {/* Internal Glow */}
             <motion.div 
                className="absolute inset-0 bg-acid-lime/20 blur-md"
                variants={{
                    idle: { opacity: 0 },
                    hover: { opacity: [0, 1, 0], transition: { duration: 2, times: [0.4, 0.5, 0.6], repeat: Infinity } }
                }}
             />

             {/* Gears */}
             <div className="flex gap-1 mb-2">
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 >
                     <Settings className="w-6 h-6 text-zinc-500" />
                 </motion.div>
                 <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 >
                     <Settings className="w-5 h-5 text-zinc-600 mt-2" />
                 </motion.div>
             </div>
        </motion.div>
        
        {/* Base Platform */}
        <div className="w-20 h-2 bg-zinc-700 rounded-full mt-1" />
      </div>

      {/* RIGHT: Clean Output */}
      <div className="relative w-16 h-16 flex items-center">
          <motion.div
             className="w-12 h-12 bg-[#bef202] rounded-lg border-2 border-white shadow-[0_0_20px_#bef202] flex items-center justify-center"
             variants={{
                idle: { x: -40, opacity: 0, scale: 0 },
                hover: {
                    x: [-40, 20], // Shoot out from center
                    opacity: [0, 1, 1, 0], // Fade in then reset
                    scale: [0.5, 1, 1, 0.5],
                    transition: {
                        duration: 2,
                        repeat: Infinity,
                        times: [0.55, 0.7, 0.85, 1], // Appear after press
                        ease: "circOut"
                    }
                }
             }}
          >
              <Check className="w-8 h-8 text-black stroke-[3px]" />
          </motion.div>
      </div>

      {/* Connecting Path Line (Visual Aid) */}
      <div className="absolute top-[60%] left-[20%] right-[20%] h-[2px] bg-white/5 -z-10" />

    </div>
  );
}
