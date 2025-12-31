import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlchemyPrismProps {
  hitType: "heart" | "audio" | "visual" | null;
}

export const AlchemyPrism = ({ hitType }: AlchemyPrismProps) => {
  const controls = useAnimation();

  // Handle Flash Reaction
  useEffect(() => {
    if (hitType === "heart") {
      controls.start({
        boxShadow: ["0 0 20px rgba(189, 255, 0, 0.1)", "0 0 50px rgba(239, 68, 68, 0.8)", "0 0 20px rgba(189, 255, 0, 0.1)"],
        backgroundColor: ["rgba(255,255,255,0.05)", "rgba(239, 68, 68, 0.2)", "rgba(255,255,255,0.05)"],
        transition: { duration: 0.3 }
      });
    } else if (hitType === "audio") {
      controls.start({
        boxShadow: ["0 0 20px rgba(189, 255, 0, 0.1)", "0 0 50px rgba(59, 130, 246, 0.8)", "0 0 20px rgba(189, 255, 0, 0.1)"],
        backgroundColor: ["rgba(255,255,255,0.05)", "rgba(59, 130, 246, 0.2)", "rgba(255,255,255,0.05)"],
        transition: { duration: 0.3 }
      });
    } else if (hitType === "visual") {
       controls.start({
        boxShadow: ["0 0 20px rgba(189, 255, 0, 0.1)", "0 0 50px rgba(255, 255, 255, 0.8)", "0 0 20px rgba(189, 255, 0, 0.1)"],
        backgroundColor: ["rgba(255,255,255,0.05)", "rgba(255, 255, 255, 0.2)", "rgba(255,255,255,0.05)"],
        transition: { duration: 0.3 }
      });
    }
  }, [hitType, controls]);

  const faceStyle = "absolute w-full h-full border border-acid-lime/30 bg-white/5 backdrop-blur-sm flex items-center justify-center";

  return (
    <div className="relative w-40 h-40 flex items-center justify-center perspective-1000">
      <motion.div
        className="relative w-24 h-24 preserve-3d"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cube Faces */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "translate-z-[48px]")} 
        /> {/* Front */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "-translate-z-[48px] rotate-y-180")} 
        /> {/* Back */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "-translate-x-[48px] rotate-y-90")} 
        /> {/* Left */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "translate-x-[48px] -rotate-y-90")} 
        /> {/* Right */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "-translate-y-[48px] rotate-x-90")} 
        /> {/* Top */}
        <motion.div 
            animate={controls}
            className={cn(faceStyle, "translate-y-[48px] -rotate-x-90")} 
        /> {/* Bottom */}
        
        {/* Core Glow */}
        <div className="absolute inset-0 bg-acid-lime/20 blur-xl rounded-full transform scale-50 animate-pulse" />
      </motion.div>
    </div>
  );
};
