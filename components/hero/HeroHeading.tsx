"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * HeroHeading Component
 * 
 * Animated reveal sequence:
 * 1. "Your scripts are boring" appears
 * 2. "boring" gets crossed out
 * 3. "viral-ready" fades in
 */
export default function HeroHeading() {
    return (
        <div className="w-full space-y-8 md:space-y-10">
            {/* 
                PRIMARY HEADLINE - Animated Reveal
            */}
            <h1 className="font-heading font-black text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-[-0.04em] leading-[1] text-white">
                {/* Line 1: "Your scripts are" */}
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="block"
                >
                    Your scripts are
                </motion.span>

                {/* Line 2: "boring" → crossed → "viral-ready" */}
                <span className="block mt-3 md:mt-4">
                    {/* "boring" - appears first, then gets strikethrough */}
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="relative inline-block text-zinc-500"
                    >
                        boring
                        {/* Strikethrough line animates across */}
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: 1.0, ease: "easeInOut" }}
                            className="absolute left-0 top-1/2 w-full h-[3px] sm:h-[4px] md:h-[5px] bg-pink-500/70 origin-left"
                            style={{ transform: "translateY(-50%)" }}
                        />
                    </motion.span>

                    {/* Space */}
                    <span>{' '}</span>

                    {/* "viral-ready" - fades in after strikethrough */}
                    <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#a8ff00] to-[#ccff00] animate-gradient-x"
                    >
                        viral-ready.
                    </motion.span>
                </span>
            </h1>

            {/* 
                SUBHEADLINE - Value Proposition
            */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
                className="text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] text-zinc-400 leading-[1.5] max-w-2xl mx-auto font-light"
            >
                Paste any viral video link. We&apos;ll{' '}
                <span className="text-white font-normal">extract the psychology</span>{' '}
                that made it blow up—and{' '}
                <span className="text-[#ccff00] font-medium">inject it into your idea</span>.
            </motion.p>

            {/* 
                TERTIARY - The Differentiator
            */}
            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-md mx-auto tracking-wide"
            >
                Not a copy. Not a template.{' '}
                <span className="text-zinc-400 font-medium">Engineered virality</span>.
            </motion.p>
        </div>
    );
}
