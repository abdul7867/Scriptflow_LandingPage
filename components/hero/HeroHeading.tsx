"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * HeroHeading Component
 * 
 * High-impact typography with:
 * - Dominant command line (large, bold)
 * - Gradient accent on key word
 * - Subordinate explanatory line
 * - Left-aligned for asymmetric visual hierarchy
 */
export default function HeroHeading() {
    return (
        <div className="w-full">
            {/* 
                DOMINANT LINE
                - Desktop: text-7xl to text-8xl for maximum impact
                - Mobile: text-4xl to text-5xl
                - Tight tracking and leading for compressed power
            */}
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] tracking-[-0.04em] leading-[0.9] text-white"
            >
                <span className="block">STOP GUESSING.</span>
                <span className="block mt-1 md:mt-2">
                    START GOING{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid-lime via-emerald-400 to-acid-lime animate-gradient-x">
                        VIRAL.
                    </span>
                </span>
            </motion.h1>

            {/* 
                SUBORDINATE LINE
                - Softer weight and color
                - Generous line height for readability
                - Constrained width
            */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
                The AI tool that writes your scripts in seconds so you can focus on creating.
            </motion.p>
        </div>
    );
}
