"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Link, 
    Copy, 
    Check, 
    X,
    MessageCircle,
    Mail,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareInteractionProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: () => void;
}

// Spring configuration for iOS-like feel (bouncy but controlled)
const springConfig = {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
    mass: 0.8
};

export default function ShareInteraction({ isOpen, onClose, onAction }: ShareInteractionProps) {
    const [actionState, setActionState] = useState<"idle" | "loading" | "success">("idle");

    const handleCopyLink = async () => {
        if (actionState !== "idle") return;

        // 1. Start loading
        setActionState("loading");

        // Simulate processing time (e.g. generating link or clipboard op)
        setTimeout(() => {
            // 2. Show Success
            setActionState("success");
            
            // 3. Trigger parent action (start the global flow)
            setTimeout(() => {
                onAction();
                // Close sheet after brief delay or let parent handle it
                // We'll let parent close it or keep it open for a moment
                setTimeout(onClose, 500);
            }, 800);
        }, 1200); // 1.2s loading time
    };

    // Reset state when closed
    React.useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => setActionState("idle"), 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Share Sheet */}
                    <motion.div
                        className="absolute bottom-0 inset-x-0 bg-[#1C1C1E] rounded-t-[20px] z-[70] overflow-hidden flex flex-col max-h-[70%]"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={springConfig}
                    >
                        {/* Handle Bar */}
                        <div className="w-full flex justify-center pt-3 pb-2">
                            <div className="w-10 h-1 bg-zinc-600 rounded-full" />
                        </div>

                        {/* Search / People (Mock) */}
                        <div className="px-4 py-4 border-b border-white/5 space-y-4">
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                                        <div className="w-14 h-14 rounded-full bg-zinc-700 mx-auto" />
                                        <div className="w-10 h-2 bg-zinc-700/50 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions List */}
                        <div className="p-4 space-y-2">
                            {/* Copy Link Action Button */}
                            <motion.button
                                onClick={handleCopyLink}
                                className={cn(
                                    "w-full h-14 rounded-xl flex items-center justify-between px-4 font-semibold text-sm transition-colors overflow-hidden relative",
                                    actionState === "success" 
                                        ? "bg-green-500 text-white" 
                                        : "bg-[#2C2C2E] text-white active:bg-[#3A3A3C]"
                                )}
                                whileTap={actionState === "idle" ? { scale: 0.98 } : {}}
                            >
                                <div className="flex items-center gap-3 relative z-10">
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {actionState === "success" ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                            >
                                                <Check className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="link-icon"
                                                initial={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Link className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    <span>
                                        {actionState === "idle" && "Copy Link"}
                                        {actionState === "loading" && "Copying..."}
                                        {actionState === "success" && "Copied"}
                                    </span>
                                </div>

                                {/* Loading Spinner Wrapper */}
                                {actionState === "loading" && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                         <Spinner />
                                    </div>
                                )}
                            </motion.button>
                            
                            {/* Generic Other Actions (Visual Only) */}
                            <div className="h-14 rounded-xl bg-[#2C2C2E] flex items-center px-4 text-white text-sm font-semibold gap-3 opacity-50">
                                <MessageCircle className="w-5 h-5" />
                                <span>Share via details...</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Simple SVG Spinner
const Spinner = () => (
    <motion.svg
        className="w-5 h-5 text-white/50"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
    >
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="30 60"
        />
    </motion.svg>
);
