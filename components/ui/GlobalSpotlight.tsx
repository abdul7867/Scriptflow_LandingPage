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
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 rounded-full mix-blend-screen"
      style={{
        background: "radial-gradient(circle, rgba(132, 204, 22, 0.05) 0%, rgba(217, 70, 239, 0.05) 50%, transparent 80%)", // Lime to Magenta low opacity
        left: smoothX,
        top: smoothY,
        x: "-50%",
        y: "-50%"
      }}
    />
  );
}
