"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // How much it tilts (default 15)
    perspective?: number; // default 1000
    glowOpacity?: number; // default 0.1
    disableHover?: boolean;
}

export default function TiltCard({
    children,
    className,
    intensity = 15,
    perspective = 1000,
    glowOpacity = 0.1,
    disableHover = false
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return to center
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

    // Parallax Shadow: Moves opposite to the tilt for depth
    const shadowX = useTransform(mouseX, [-0.5, 0.5], [20, -20]); 
    const shadowY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

    // Spotlight/Sheen effect position - moved to top level
    const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
    const sheenOpacity = useTransform(mouseX, [-0.5, 0, 0.5], [0, glowOpacity, 0]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || disableHover || shouldReduceMotion) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        // Normalized offsets (-0.5 to 0.5)
        const xPct = (mouseXRel / width) - 0.5;
        const yPct = (mouseYRel / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: "preserve-3d"
            }}
            className={cn("relative transition-transform", className)}
        >
             {/* Shadow Element (Parallax) */}
             {!shouldReduceMotion && (
                 <motion.div 
                    style={{ x: shadowX, y: shadowY, opacity: 0.4 }}
                    className="absolute inset-4 bg-black blur-[40px] rounded-[3rem] -z-10 pointer-events-none"
                 />
             )}

            {/* Content Container */}
            <div className="relative z-10 w-full h-full transform-style-3d">
                {children}

                {/* Specular Sheen / Glow Gradient */}
                {!disableHover && !shouldReduceMotion && (
                     <SheenOverlay 
                        sheenX={sheenX} 
                        sheenY={sheenY} 
                        sheenOpacity={sheenOpacity} 
                     />
                )}
            </div>
        </motion.div>
    );
}

// Separate component to avoid hook issues
function SheenOverlay({ 
    sheenX, 
    sheenY, 
    sheenOpacity 
}: { 
    sheenX: MotionValue<string>, 
    sheenY: MotionValue<string>,
    sheenOpacity: MotionValue<number>
}) {
    const background = useTransform(
        [sheenX, sheenY], 
        ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.8), transparent 60%)`
    );

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[inherit] z-50 overflow-hidden mix-blend-overlay"
            style={{
                opacity: sheenOpacity, 
                background
            }}
        />
    );
}

// Helper for pure drift animation (Background)
export function DriftingBackground() {
    return (
        <>
            <motion.div
                initial={{ x: "-50%", y: "-50%", opacity: 0.1 }}
                animate={{
                    x: ["-55%", "-45%", "-55%"],
                    y: ["-55%", "-45%", "-55%"],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-neon rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                initial={{ x: "50%", y: "50%", opacity: 0.05 }}
                animate={{
                    x: ["55%", "45%", "55%"],
                    y: ["55%", "45%", "55%"],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 2
                }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-acid-magenta rounded-full blur-[100px] pointer-events-none"
            />
        </>
    );
}
