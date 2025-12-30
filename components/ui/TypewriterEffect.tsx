"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  textColor?: string;
}

export const TypewriterEffect = ({ 
  text, 
  className = "", 
  delay = 0,
  duration = 2,
  textColor = "text-zinc-300"
}: TypewriterEffectProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Split text into characters
  const characters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: duration / characters.length, 
        delayChildren: delay 
      }
    })
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      display: "inline-block", 
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      display: "none",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block whitespace-pre-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
            key={index} 
            variants={child} 
            className={textColor}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
