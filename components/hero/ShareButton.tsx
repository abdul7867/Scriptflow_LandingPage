"use client";

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
}

/**
 * ShareButton Component
 * 
 * A prominent, accessible button that triggers the main animation flow.
 * - Visible glow when active (transferring state)
 * - Keyboard accessible (Enter/Space)
 * - Uses forwardRef for AnimatedBeam coordinate tracking
 */
const ShareButton = forwardRef<HTMLButtonElement, ShareButtonProps>(
    ({ onClick, isActive = false, className }, ref) => {
        
        const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            console.log('[ShareButton] Click event fired!');
            console.log('[ShareButton] onClick prop exists:', !!onClick);
            if (onClick) {
                console.log('[ShareButton] Calling onClick handler');
                onClick();
            } else {
                console.log('[ShareButton] ERROR: onClick is undefined!');
            }
        };

        return (
            <div className="relative">
                {/* Active Glow Effect */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            key="glow"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.8 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-acid-lime/60 blur-xl rounded-full pointer-events-none"
                        />
                    )}
                </AnimatePresence>
                
                {/* Use regular button with ref, wrap motion effects differently */}
                <button
                    ref={ref}
                    onClick={handleClick}
                    type="button"
                    aria-label="Share this reel to generate a script"
                    className={cn(
                        "relative z-10 p-2 rounded-full outline-none focus:ring-2 focus:ring-acid-lime/50 transition-all duration-200 cursor-pointer",
                        "hover:scale-110 active:scale-90",
                        isActive 
                            ? "text-acid-lime drop-shadow-[0_0_12px_rgba(189,255,0,1)]" 
                            : "text-white hover:text-acid-lime/80",
                        className
                    )}
                >
                    <Send className="w-6 h-6 rotate-12" strokeWidth={2} />
                </button>
            </div>
        );
    }
);

ShareButton.displayName = "ShareButton";

export default ShareButton;
