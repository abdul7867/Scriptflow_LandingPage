import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DataShardProps {
  id: number;
  color: string;
  phase: "phone" | "flight" | "editor";
  index: number;
}

export const DataShard = ({ id, color, phase, index }: DataShardProps) => {
  // Determine Layout Variants based on Phase
  // But purely relying on layoutId for position morphing.
  // We use styled components or classes for the visual shape changes.

  const isPhone = phase === "phone";
  const isFlight = phase === "flight";
  const isEditor = phase === "editor";

  // Phone: Square-ish, Grid position (handled by parent grid)
  // Flight: Circle/Dot, Random offset (handled by parent container or margin?)
  // Editor: Long bar (handled by parent flex/grid)
  
  return (
    <motion.div
        layoutId={`shard-${id}`}
        className={cn(
            "rounded-[2px] backdrop-blur-sm transition-colors duration-500",
            isPhone && `opacity-60 ${color}`, // Specific section colors
            isFlight && "bg-acid-lime opacity-100 shadow-[0_0_15px_#BDFF00]", // Neon Lime Swarm
            isEditor && "bg-zinc-800/80 opacity-50" // Grey Script Lines
        )}
        initial={false}
        animate={{
            scale: isPhone ? [1, 0.95, 1] : isFlight ? 0.5 : 1, // Breathing type animation
            borderRadius: isFlight ? "50%" : "2px",
            // Flight specific random wobble could be added here if not using layout
        }}
        transition={{
            layout: { duration: 0.8, ease: "backOut" }, // Smooth Morph
            scale: { duration: 2, repeat: isPhone ? Infinity : 0 },
            backgroundColor: { duration: 0.5 }
        }}
        style={{
             width: isEditor ? "100%" : "100%", // In grid/flex, width fills cell
             height: isEditor ? "8px" : "100%",
             marginBottom: isEditor ? "8px" : "0",
        }}
    />
  );
};
