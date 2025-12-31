import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GhostReelProps {
  children?: ReactNode;
}

export const GhostReel = ({ children }: GhostReelProps) => {
  return (
    <div className="relative w-[280px] h-[500px] perspective-1000">
       <motion.div
        className="relative w-full h-full rounded-[40px] border-[4px] border-zinc-800 bg-black shadow-2xl overflow-hidden"
        style={{
          transform: "rotateY(15deg) rotateX(5deg)",
          transformStyle: "preserve-3d",
        }}
        animate={{
             boxShadow: ["0 0 20px rgba(0,0,0,0.5)", "0 0 40px rgba(0,0,0,0.8)", "0 0 20px rgba(0,0,0,0.5)"]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50 flex items-center justify-center gap-2 border border-zinc-800/50">
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
           <div className="w-1 h-1 rounded-full bg-zinc-800" />
        </div>

        {/* Screen Content Area */}
        <div className="absolute inset-0 pt-14 px-4 pb-8 z-10 flex flex-col">
           {children}
        </div>

        {/* Glass Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-40" />
      </motion.div>
    </div>
  );
};

