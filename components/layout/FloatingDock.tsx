"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScarcity } from "@/lib/useScarcity";
import { useSignup } from "@/context/SignupContext";

export default function FloatingDock() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const { spots, isFlashing } = useScarcity();
  const { openSignupModal } = useSignup();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 md:bottom-8 left-1/2 z-50 origin-center"
        >
          <div 
             className={`flex items-center gap-3 md:gap-4 pl-3 md:pl-4 pr-1 py-1.5 rounded-full backdrop-blur-md border shadow-2xl ring-1 ring-black/5 transition-colors duration-500 ${
                 isFlashing ? "bg-red-500/90 border-red-400" : "bg-zinc-900/80 border-white/10"
             }`}
          >
            <div className="flex items-center gap-2 md:gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className={`text-xs md:text-sm font-medium transition-colors ${isFlashing ? "text-white" : "text-zinc-200"}`}>
                 <span className="hidden sm:inline">Beta Access: </span><span className="text-white font-bold">{spots} spots left</span>
              </span>
            </div>

            <button 
              onClick={openSignupModal}
              className="group flex items-center gap-2 px-4 py-2 bg-acid-lime hover:bg-lime-400 text-black text-xs font-bold rounded-full transition-all"
            >
              Join Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
