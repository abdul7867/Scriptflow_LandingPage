"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import { useRef } from "react";

export default function TheCurator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Mouse coords relative to center
    x.set(e.clientX - rect.left - centerX);
    y.set(e.clientY - rect.top - centerY);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  // Rotation Physics
  // RotateY is controlled by X position (left/right) -> neg/pos
  // RotateX is controlled by Y position (up/down) -> pos/neg (inverted)
  const rotateX = useTransform(y, [-100, 100], [25, -25]); 
  const rotateY = useTransform(x, [-100, 100], [-25, 25]);

  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  return (
    <div 
        ref={containerRef}
        className="w-full h-full flex flex-col items-center justify-center relative perspective-1000 cursor-move"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
        
        {/* The Stack Container */}
        <motion.div 
            className="relative w-32 h-40"
            style={{ 
                rotateX: smoothRotateX, 
                rotateY: smoothRotateY,
                transformStyle: "preserve-3d"
            }}
        >
            
            {/* Bottom Card */}
            <motion.div
                className="absolute inset-0 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-xl"
                style={{ 
                    z: -40, 
                    rotateZ: -5,
                    y: 10,
                    scale: 0.9 
                }}
            />

            {/* Middle Card */}
            <motion.div
                className="absolute inset-0 bg-zinc-800 border-2 border-zinc-600 rounded-lg shadow-xl flex items-center justify-center"
                style={{ 
                    z: -20, 
                    rotateZ: 5,
                    y: 5, 
                    scale: 0.95 
                }}
            >
               <div className="w-16 space-y-2 opacity-20">
                    <div className="h-1 bg-white rounded-full w-full" />
                    <div className="h-1 bg-white rounded-full w-2/3" />
               </div>
            </motion.div>

            {/* Top Card (Active) */}
            <motion.div
                className="absolute inset-0 bg-zinc-900 border-2 border-zinc-500 hover:border-acid-lime hover:bg-black transition-colors duration-300 rounded-lg shadow-2xl flex flex-col items-center justify-center gap-2"
                style={{ 
                    z: 0
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none" />
                
                <FileText className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                <div className="w-12 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#bdff00]" 
                        animate={{ width: ["30%", "80%", "30%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>

        </motion.div>

        {/* Caption */}
        <motion.div 
            className="absolute bottom-4 font-mono text-[10px] text-[#bdff00] bg-[#bdff00]/10 px-2 py-0.5 rounded border border-[#bdff00]/20"
            style={{ z: 20 }}
        >
            BATCH_READY
        </motion.div>

    </div>
  );
}
