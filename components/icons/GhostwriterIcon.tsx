"use client";

import { motion } from "framer-motion";

/**
 * Ghostwriter Mode Icon
 * A magical pen with sparkles and ink trails showing AI rewriting
 */
export default function GhostwriterIcon() {
    return (
        <motion.div 
            className="relative w-10 h-10 flex items-center justify-center"
            whileHover="hover"
            initial="idle"
        >
            {/* Floating Sparkles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${15 + Math.random() * 40}%`,
                        left: `${20 + Math.random() * 60}%`,
                    }}
                    variants={{
                        idle: { opacity: 0, scale: 0 },
                        hover: {
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -15],
                            rotate: [0, 180],
                        }
                    }}
                    transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.2,
                        ease: "easeOut" 
                    }}
                >
                    <svg viewBox="0 0 10 10" className="w-2 h-2">
                        <polygon 
                            points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" 
                            className="fill-acid-lime"
                        />
                    </svg>
                </motion.div>
            ))}

            {/* Ghost Aura */}
            <motion.div
                className="absolute inset-0 rounded-full bg-acid-lime/10 blur-md"
                variants={{
                    idle: { opacity: 0, scale: 0.8 },
                    hover: { 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.2, 0.8],
                    }
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Icon */}
            <motion.svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 relative z-10"
                variants={{
                    idle: { rotate: 0 },
                    hover: { 
                        rotate: [-5, 5, -5],
                        transition: { duration: 0.3, repeat: Infinity }
                    }
                }}
            >
                {/* Pen Body */}
                <motion.path
                    d="M12 19l7-7 3 3-7 7-3-3z"
                    className="fill-acid-lime stroke-acid-lime"
                    strokeWidth="1"
                    variants={{
                        idle: { fillOpacity: 0.3 },
                        hover: { fillOpacity: [0.3, 0.8, 0.3] }
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.path
                    d="M18 13l-1.5-7.5L3 3l2.5 13.5L13 18l5-5z"
                    className="fill-white/90 stroke-white"
                    strokeWidth="0.5"
                />
                <motion.path
                    d="M2 21l3.5-3.5"
                    className="stroke-acid-lime"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    variants={{
                        idle: { pathLength: 1 },
                        hover: { 
                            pathLength: [0, 1, 0],
                        }
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Pen Tip Glow */}
                <motion.circle
                    cx="2" cy="21" r="1.5"
                    className="fill-acid-lime"
                    variants={{
                        idle: { opacity: 0.5, scale: 1 },
                        hover: { 
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.5, 1],
                        }
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            </motion.svg>

            {/* Ink Trail */}
            <motion.div
                className="absolute bottom-0 left-1/4 w-[60%] h-[2px] bg-gradient-to-r from-acid-lime via-white to-transparent"
                variants={{
                    idle: { scaleX: 0, opacity: 0 },
                    hover: { 
                        scaleX: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                    }
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: "left" }}
            />
        </motion.div>
    );
}
