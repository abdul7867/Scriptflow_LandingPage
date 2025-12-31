"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

// Audience Member Component
const AudienceMember = ({ row, index, totalInRow }: { row: number, index: number, totalInRow: number }) => {
    // Calculate delay based on row (distance from mic)
    const delay = row * 0.15 + (index * 0.02); // Slight stagger within row too
    
    // Arc offset calculation (simple approximation)
    // We want rows to curve slightly.
    // Center element (index ~ equal to half total) is highest.
    // Elements at edges are lower.
    const midPoint = (totalInRow - 1) / 2;
    const distFromCenter = Math.abs(index - midPoint);
    const yOffset = distFromCenter * 4; // Curve down at edges

    return (
        <motion.div
            style={{ 
                y: yOffset, // Static arc positioning
            }}
            variants={{
                idle: { 
                    scale: 0.8, 
                    color: "#52525b", // zinc-600
                    textShadow: "0px 0px 0px transparent",
                    y: yOffset // Reset pos
                },
                hover: { 
                    scale: 1.1, 
                    color: "#f0abfc", // A light purple/white mix
                    textShadow: "0px 0px 8px #d946ef", // magenta-500 glow
                    y: yOffset - 10, // Pop up
                    transition: {
                        delay: delay,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }
                }
            }}
            className="relative"
        >
            <div className="p-1.5 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-white/5">
                <User className="w-4 h-4" fill="currentColor" />
            </div>
            
            {/* Active Notification Indicator */}
            <motion.div 
                variants={{
                    idle: { scale: 0, opacity: 0 },
                    hover: { 
                        scale: 1, 
                        opacity: 1,
                        transition: { delay: delay + 0.1, duration: 0.2 }
                    }
                }}
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]"
            />
        </motion.div>
    );
};

export default function FounderCoach() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-0 relative overflow-visible">
        
        {/* Signal Rings (Behind Mic) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center pointer-events-none overflow-hidden">
             {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-[-50px] w-[100px] h-[100px] rounded-full border border-acid-magenta/30"
                    
                    variants={{
                        idle: { 
                            scale: 1,
                            opacity: 0 
                        },
                        hover: {
                            scale: [1, 6],
                            opacity: [0.8, 0],
                            borderWidth: ["2px", "0px"],
                            transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: i * 0.4
                            }
                        }
                    }}
                />
             ))}
        </div>

        {/* Audience Grid - 3 Rows in an "Arc" structure */}
        {/* We stack them absolute or flex to control layers easily */}
        <div className="mb-16 flex flex-col items-center gap-3 z-10 w-full px-8">
            
            {/* Row 3 (Furthest/Top) - 7 Users */}
            <div className="flex justify-center gap-4">
                {[...Array(7)].map((_, i) => (
                    <AudienceMember key={`r3-${i}`} row={3} index={i} totalInRow={7} />
                ))}
            </div>

            {/* Row 2 (Middle) - 5 Users */}
            <div className="flex justify-center gap-6">
                {[...Array(5)].map((_, i) => (
                    <AudienceMember key={`r2-${i}`} row={2} index={i} totalInRow={5} />
                ))}
            </div>

            {/* Row 1 (Closest/Bottom) - 3 Users */}
            <div className="flex justify-center gap-8">
                {[...Array(3)].map((_, i) => (
                    <AudienceMember key={`r1-${i}`} row={1} index={i} totalInRow={3} />
                ))}
            </div>
        </div>

        {/* Microphone (Source) */}
        <div className="absolute bottom-0 z-20">
            <motion.div 
                className="relative"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Glow Backdrop */}
                <motion.div 
                    className="absolute inset-0 bg-acid-magenta/40 blur-xl rounded-full"
                    variants={{
                        idle: { opacity: 0.4, scale: 0.8 },
                        hover: { 
                            opacity: [0.6, 1, 0.6], 
                            scale: [1, 1.2, 1],
                            transition: { duration: 0.5, repeat: Infinity } 
                        }
                    }}
                />

                {/* Mic Shape */}
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none" className="drop-shadow-2xl">
                    {/* Stand */}
                    <path d="M30 70 V 100" stroke="#52525b" strokeWidth="4" />
                    <path d="M15 100 H 45" stroke="#52525b" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Body */}
                    <rect x="15" y="10" width="30" height="50" rx="15" fill="#18181b" stroke="#d946ef" strokeWidth="2" />
                    <path d="M20 20 H 40" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.5" />
                    <path d="M20 30 H 40" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.5" />
                    <path d="M20 40 H 40" stroke="#d946ef" strokeWidth="1" strokeOpacity="0.5" />
                    
                    {/* Active Light */}
                    <motion.circle 
                        cx="30" cy="50" r="3" 
                        fill="#d946ef"
                        variants={{
                            idle: { opacity: 0.5 },
                            hover: { opacity: 1, boxShadow: "0 0 10px #d946ef" }
                        }}
                    />
                </svg>
            </motion.div>
        </div>

    </div>
  );
}
