"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TheCurator() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
        
        {/* The Stack Container */}
        <div className="relative w-32 h-40">
            
            {/* Bottom Card */}
            <motion.div
                className="absolute inset-0 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-xl"
                style={{ rotate: -5, y: 10, scale: 0.9 }}
                variants={{
                    idle: { y: 10, rotate: -5, borderColor: "#3f3f46" }, // zinc-700
                    hover: { 
                        y: 0, 
                        rotate: -2, 
                        borderColor: "#bdff00", // Neon Lime
                        backgroundColor: "#1a2e05", // Very dark lime
                        transition: { duration: 0.3 } 
                    }
                }}
            />

            {/* Middle Card */}
            <motion.div
                className="absolute inset-0 bg-zinc-800 border-2 border-zinc-600 rounded-lg shadow-xl flex items-center justify-center"
                style={{ rotate: 5, y: 5, scale: 0.95 }}
                variants={{
                    idle: { y: 5, rotate: 5, borderColor: "#52525b" }, // zinc-600
                    hover: { 
                        y: 0, 
                        rotate: 2, 
                        borderColor: "#bdff00",
                        backgroundColor: "#1a2e05", 
                        transition: { duration: 0.3, delay: 0.05 } 
                    }
                }}
            >
               {/* Lines representing text */}
               <div className="w-16 space-y-2 opacity-20">
                    <div className="h-1 bg-white rounded-full w-full" />
                    <div className="h-1 bg-white rounded-full w-2/3" />
               </div>
            </motion.div>

            {/* Top Card (Active) */}
            <motion.div
                className="absolute inset-0 bg-zinc-900 border-2 border-zinc-500 rounded-lg shadow-2xl flex flex-col items-center justify-center gap-2"
                style={{ rotate: 0, y: 0 }}
                animate={{ y: [0, -8, 0] }} // Float animation
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                variants={{
                    idle: { 
                        y: 0, 
                        borderColor: "#71717a", // zinc-500
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
                    }, 
                    hover: { 
                        y: 0, // Compress down
                        rotate: 0,
                        borderColor: "#bdff00",
                        boxShadow: "0 0 20px rgba(189, 255, 0, 0.3)",
                        backgroundColor: "#000000",
                        transition: { duration: 0.3, delay: 0.1 } 
                    }
                }}
            >
                <FileText className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
                <div className="w-12 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#bdff00]" 
                        variants={{
                            idle: { width: "30%" },
                            hover: { width: "100%", transition: { duration: 0.4 } }
                        }}
                    />
                </div>
            </motion.div>

        </div>

        {/* Caption */}
        <motion.div 
            className="absolute bottom-4 font-mono text-[10px] text-[#bdff00] bg-[#bdff00]/10 px-2 py-0.5 rounded border border-[#bdff00]/20"
            variants={{
                idle: { opacity: 0, y: 5 },
                hover: { opacity: 1, y: 0 }
            }}
        >
            BATCH_READY
        </motion.div>

    </div>
  );
}
