"use client";

import { motion } from "framer-motion";

/**
 * Chaos Control Icon
 * Animated sliders with energy waves showing tone adjustment
 */
export default function ChaosControlIcon() {
    return (
        <motion.div 
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover="hover"
            initial="idle"
        >
            {/* Background Energy Waves */}
            <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden"
                variants={{
                    idle: { opacity: 0.3 },
                    hover: { opacity: 0.6 }
                }}
            >
                {/* Energy Wave Lines */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[2px] bg-gradient-to-r from-blue-500 via-acid-lime to-acid-magenta"
                        style={{
                            top: `${30 + i * 20}%`,
                            left: 0,
                            right: 0,
                        }}
                        variants={{
                            idle: { 
                                scaleX: 0.3,
                                opacity: 0.3,
                                x: 0 
                            },
                            hover: {
                                scaleX: [0.3, 1, 0.3],
                                opacity: [0.3, 0.8, 0.3],
                                x: [0, 5, 0],
                            }
                        }}
                        transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Slider Bars */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 relative z-10">
                {/* Bar 1 - Left */}
                <motion.rect
                    x="3" y="5" width="2" height="14" rx="1"
                    className="fill-white/30"
                />
                <motion.rect
                    x="3" y="12" width="2" rx="1"
                    className="fill-acid-lime"
                    variants={{
                        idle: { height: 7, y: 12 },
                        hover: { 
                            height: [7, 12, 5, 7],
                            y: [12, 7, 14, 12],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="4" r="2.5"
                    className="fill-white stroke-acid-lime"
                    strokeWidth="1"
                    variants={{
                        idle: { cy: 12 },
                        hover: { 
                            cy: [12, 8, 14, 12],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Bar 2 - Center */}
                <motion.rect
                    x="11" y="5" width="2" height="14" rx="1"
                    className="fill-white/30"
                />
                <motion.rect
                    x="11" y="8" width="2" rx="1"
                    className="fill-acid-magenta"
                    variants={{
                        idle: { height: 11, y: 8 },
                        hover: { 
                            height: [11, 6, 14, 11],
                            y: [8, 13, 5, 8],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.circle
                    cx="12" r="2.5"
                    className="fill-white stroke-acid-magenta"
                    strokeWidth="1"
                    variants={{
                        idle: { cy: 9 },
                        hover: { 
                            cy: [9, 14, 6, 9],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />

                {/* Bar 3 - Right */}
                <motion.rect
                    x="19" y="5" width="2" height="14" rx="1"
                    className="fill-white/30"
                />
                <motion.rect
                    x="19" y="10" width="2" rx="1"
                    className="fill-blue-400"
                    variants={{
                        idle: { height: 9, y: 10 },
                        hover: { 
                            height: [9, 14, 7, 9],
                            y: [10, 5, 12, 10],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.circle
                    cx="20" r="2.5"
                    className="fill-white stroke-blue-400"
                    strokeWidth="1"
                    variants={{
                        idle: { cy: 10 },
                        hover: { 
                            cy: [10, 6, 13, 10],
                        }
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
            </svg>

            {/* Sparks on hover */}
            <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-acid-lime rounded-full"
                variants={{
                    idle: { scale: 0, opacity: 0 },
                    hover: { 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
            />
        </motion.div>
    );
}
