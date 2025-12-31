"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function GlobalSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. The Vignette Glow (Static) */}
      <div className="fixed inset-0 pointer-events-none z-[45] select-none">
          {/* Dark Edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000000_120%)] opacity-80" />
          
          {/* Top Right Magenta Tint */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_top_right,_rgba(255,0,255,0.08),_transparent_70%)]" />
          
          {/* Bottom Center Lime Tint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[radial-gradient(circle_at_bottom,_rgba(189,255,0,0.08),_transparent_70%)]" />
      </div>

      {/* 2. The Cursor Trail (Glow Follower) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0 rounded-full mix-blend-overlay"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </>
  );
}
