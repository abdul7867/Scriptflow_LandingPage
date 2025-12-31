"use client";

import React, { useEffect, useState, RefObject, useCallback } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

interface AnimatedBeamProps {
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLElement>;
  isActive: boolean;
  onComplete?: () => void;
}

/**
 * AnimatedBeam Component - Refined & Smooth
 * 
 * Draws a single, high-quality gradient stream.
 * Slowed down duration: 2.5s
 */
export default function AnimatedBeam({
  fromRef,
  toRef,
  containerRef,
  isActive,
  onComplete,
}: AnimatedBeamProps) {
  const [pathData, setPathData] = useState({ d: "M0 0", length: 0 });
  const progress = useMotionValue(0);

  const updatePath = useCallback(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) return;

    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Start from RIGHT EDGE of Share button (Clean exit)
    const startX = fromRect.right - containerRect.left + 12; // +12px offset
    const startY = fromRect.top - containerRect.top + fromRect.height / 2;
    
    // End at CENTER of Terminal (Script Container area)
    const endX = toRect.left - containerRect.left + toRect.width / 2;
    const endY = toRect.top - containerRect.top + toRect.height / 2;

    // Adjusted Curve Factors
    // Exit horizontally from phone, enter horizontally into terminal
    const dist = endX - startX;
    const cp1X = startX + (dist * 0.4); // Control point 1: Push out to right
    const cp1Y = startY;                // Keep horizontal at start
    
    // Control point 2: approach terminal
    const cp2X = endX - (dist * 0.4);
    const cp2Y = endY;

    const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    
    // Approximate curve length
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 1.3;
    
    setPathData({ d, length });
  }, [fromRef, toRef, containerRef]);

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);
    // Slight delay to ensure layout is settled
    const t = setTimeout(updatePath, 100);
    return () => {
      window.removeEventListener("resize", updatePath);
      clearTimeout(t);
    };
  }, [updatePath]);

  // Recalculate when active
  useEffect(() => {
    if (isActive) {
      updatePath();
    }
  }, [isActive, updatePath]);

  // Animate Beam
  useEffect(() => {
    if (isActive && pathData.length > 0) {
      progress.set(0);
      
      const controls = animate(progress, 1, {
        duration: 2.5, // Slow, deliberate transfer
        ease: "easeInOut", // Smooth start and end
        onComplete: () => {
          if (onComplete) {
            onComplete();
          }
        }
      });

      return () => controls.stop();
    }
  }, [isActive, progress, onComplete, pathData.length]);

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-[100] overflow-visible"
    >
      <defs>
        {/* Simple Glow Filter */}
        <filter id="smooth-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse">
           <stop offset="0%" stopColor="#BDFF00" stopOpacity="0" />
           <stop offset="50%" stopColor="#BDFF00" stopOpacity="1" />
           <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* 1. Idle Path (Barely Visible) */}
      <path
        d={pathData.d}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 8"
      />

      {/* 2. Active Beam (Single Smooth Stroke) */}
      {isActive && (
        <motion.path
          d={pathData.d}
          fill="none"
          stroke="url(#beam-gradient)" // Use gradient
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#smooth-glow)"
          initial={{ 
            strokeDasharray: pathData.length,
            strokeDashoffset: pathData.length 
          }}
          animate={{ 
            strokeDashoffset: 0 
          }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* 3. Leading Particle (Optional 'Head' if desired, kept subtle) */}
       {isActive && (
        <motion.circle
            r="3"
            fill="white"
            filter="url(#smooth-glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            style={{ offsetPath: `path('${pathData.d}')` }}
        />
       )}
    </svg>
  );
}
