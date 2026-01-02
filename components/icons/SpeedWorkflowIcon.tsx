"use client";

import { motion } from "framer-motion";

/**
 * 60-Second Workflow Icon
 * A lightning bolt with speed lines and a timer ring
 */
export default function SpeedWorkflowIcon() {
    return (
        <motion.div 
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover="hover"
            initial="idle"
        >
            {/* Timer Ring */}
            <motion.svg
                viewBox="0 0 40 40"
                className="absolute inset-0 w-full h-full"
            >
                {/* Background Ring */}
                <circle
                    cx="20" cy="20" r="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/10"
                />
                
                {/* Progress Ring */}
                <motion.circle
                    cx="20" cy="20" r="17"
                    fill="none"
                    stroke="url(#timerGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="107"
                    style={{ transformOrigin: "center" }}
                    variants={{
                        idle: { 
                            strokeDashoffset: 107,
                            rotate: -90 
                        },
                        hover: { 
                            strokeDashoffset: [107, 0],
                            rotate: -90,
                        }
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                
                <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#BDFF00" />
                        <stop offset="50%" stopColor="#00FF94" />
                        <stop offset="100%" stopColor="#BDFF00" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Speed Lines */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-[2px] bg-gradient-to-r from-acid-lime to-transparent"
                    style={{
                        width: `${8 + i * 3}px`,
                        top: `${25 + i * 12}%`,
                        left: `-${5 + i * 5}px`,
                        rotate: `${-10 + i * 5}deg`,
                    }}
                    variants={{
                        idle: { opacity: 0, x: 10 },
                        hover: {
                            opacity: [0, 1, 0],
                            x: [20, -10],
                        }
                    }}
                    transition={{ 
                        duration: 0.4, 
                        repeat: Infinity,
                        delay: i * 0.1,
                    }}
                />
            ))}

            {/* Lightning Bolt */}
            <motion.svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 relative z-10"
                variants={{
                    idle: { scale: 1 },
                    hover: {
                        scale: [1, 1.2, 1],
                    }
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
            >
                <motion.path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    className="fill-acid-lime stroke-acid-lime"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                    variants={{
                        idle: { fillOpacity: 0.8 },
                        hover: { 
                            fillOpacity: [0.8, 1, 0.8],
                            filter: [
                                "drop-shadow(0 0 2px #BDFF00)",
                                "drop-shadow(0 0 8px #BDFF00)",
                                "drop-shadow(0 0 2px #BDFF00)",
                            ]
                        }
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                />
            </motion.svg>

            {/* Flash Effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-acid-lime"
                variants={{
                    idle: { opacity: 0, scale: 0 },
                    hover: {
                        opacity: [0, 0.4, 0],
                        scale: [0.5, 1.5, 0.5],
                    }
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* "60s" Badge */}
            <motion.div
                className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-black border border-acid-lime/50 rounded text-[6px] font-mono font-bold text-acid-lime"
                variants={{
                    idle: { opacity: 0.7, scale: 1 },
                    hover: { 
                        opacity: 1,
                        scale: [1, 1.1, 1],
                    }
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                60s
            </motion.div>
        </motion.div>
    );
}
