"use client";

import { motion } from "framer-motion";

/**
 * AI Video Forensics Icon
 * A scanning eye with pulsing rings and data streams
 */
export default function ScanForensicsIcon() {
    return (
        <motion.div 
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover="hover"
            initial="idle"
        >
            {/* Outer Scanning Rings */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-acid-lime/30"
                variants={{
                    idle: { scale: 1, opacity: 0.3 },
                    hover: { 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute inset-0 rounded-full border border-acid-lime/20"
                variants={{
                    idle: { scale: 1.2, opacity: 0.2 },
                    hover: { 
                        scale: [1.2, 1.8, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Core Eye */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 relative z-10">
                {/* Eye Outline */}
                <motion.path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-acid-lime"
                    variants={{
                        idle: { pathLength: 1 },
                        hover: { 
                            pathLength: [0, 1],
                            transition: { duration: 0.5 }
                        }
                    }}
                />
                
                {/* Iris */}
                <motion.circle
                    cx="12"
                    cy="12"
                    r="3"
                    className="fill-acid-lime"
                    variants={{
                        idle: { scale: 1 },
                        hover: { 
                            scale: [1, 1.3, 1],
                            transition: { duration: 0.3, repeat: Infinity }
                        }
                    }}
                />
                
                {/* Scan Lines */}
                <motion.line
                    x1="12" y1="4" x2="12" y2="20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-acid-lime"
                    variants={{
                        idle: { opacity: 0 },
                        hover: { 
                            opacity: [0, 0.8, 0],
                            x1: [8, 16, 8],
                            x2: [8, 16, 8],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </svg>

            {/* Data Particles */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-acid-lime rounded-full"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 20}%`,
                    }}
                    variants={{
                        idle: { opacity: 0, scale: 0 },
                        hover: {
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -10, -20],
                        }
                    }}
                    transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                    }}
                />
            ))}
        </motion.div>
    );
}
