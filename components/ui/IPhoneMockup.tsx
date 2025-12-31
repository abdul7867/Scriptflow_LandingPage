"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Heart, MessageCircle, Share2, MoreHorizontal, ArrowLeft, Music, Send, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IPhoneMockup() {
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 8.5-Second Loop Sequence (Synchronized)
  useEffect(() => {
    const runSequence = () => {
      // 0.0s: Reset Everything
      setLiked(false);
      setShareOpen(false);
      setCopied(false);

      // 2.5s: Like Interaction
      setTimeout(() => {
        setLiked(true);
      }, 2500);

      // 3.5s: Share Interaction (Open Menu)
      setTimeout(() => {
        setShareOpen(true);
      }, 3500);

      // 4.5s: Copy Interaction (Close Menu, Show Toast)
      setTimeout(() => {
        setShareOpen(false); // Close menu
        setCopied(true);     // Trigger Toast
        // "Data Transfer" triggers here essentially
      }, 4500);

      // 6.5s: Hide Toast (Cleanup)
      setTimeout(() => {
        setCopied(false);
      }, 6500);
    };

    runSequence();
    const interval = setInterval(runSequence, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group perspective-1000">
      <motion.div
        whileHover={{ rotateY: -10, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-[300px] h-[600px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Titanium Frame */}
        <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-700 p-[6px] shadow-2xl ring-1 ring-white/10">
            <div className="absolute inset-[6px] bg-black rounded-[44px] overflow-hidden">
                 <div className="absolute inset-0 rounded-[44px] border border-black/50 z-20 pointer-events-none" />
            </div>
        </div>

        {/* Physical Buttons */}
        <div className="absolute top-24 -left-[8px] w-[8px] h-8 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-40 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-56 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        <div className="absolute top-44 -right-[8px] w-[8px] h-20 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-r-md border-r border-zinc-500 shadow-lg" />

        {/* Dynamic Island */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-[60] flex items-center justify-center gap-2 px-2 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen Content */}
        <div className="absolute inset-[12px] rounded-[38px] bg-zinc-900 overflow-hidden relative font-sans">
            
            {/* Video Background */}
            <div className="absolute inset-0 bg-black rounded-[32px] overflow-hidden z-0">
                <video
                    src="/placeholder-reel.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover rounded-[32px] opacity-90"
                />
                 {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
            </div>

            {/* Top Bar */}
            <div className="absolute top-12 left-0 w-full px-4 flex items-center justify-between z-40 text-white drop-shadow-md">
                <ArrowLeft className="w-6 h-6 stroke-2" />
                <span className="font-bold text-lg">Reels</span>
                <div className="w-6 h-6" />
            </div>

            {/* Toast Notification (Link Copied) */}
            <AnimatePresence>
                {copied && (
                    <motion.div 
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute top-16 left-4 right-4 z-[90] flex items-center gap-3 p-3 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center pb-0.5">
                            <span className="text-green-500 text-lg">✓</span>
                        </div>
                        <span className="text-white font-medium text-sm">Link Copied</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Right Action Bar */}
            <div className="absolute right-4 bottom-28 flex flex-col gap-6 z-40 items-center">
                {/* Like Button */}
                <div className="flex flex-col items-center gap-1 group/btn">
                    <motion.div
                        animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Heart 
                            className={cn(
                                "w-7 h-7 stroke-[2.5px] drop-shadow-lg transition-colors duration-300",
                                liked ? "fill-red-500 text-red-500" : "text-white"
                            )} 
                        />
                    </motion.div>
                    <span className="text-[11px] font-medium text-white drop-shadow-md">{liked ? "1.2M" : "1.2M"}</span>
                </div>

                {/* Comment Button */}
                <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-7 h-7 text-white stroke-[2.5px] drop-shadow-lg" />
                    <span className="text-[11px] font-medium text-white drop-shadow-md">4.5k</span>
                </div>

                {/* Share Button (Target for 3.5s) */}
                <div className="flex flex-col items-center gap-1">
                     <Send className="w-7 h-7 text-white stroke-[2.5px] drop-shadow-lg -rotate-45 translate-x-1" />
                     <span className="text-[11px] font-medium text-white drop-shadow-md">Share</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <MoreHorizontal className="w-7 h-7 text-white stroke-[2.5px] drop-shadow-lg" />
                </div>
            </div>

            {/* Bottom Info Area */}
            <div className="absolute left-4 bottom-8 z-40 max-w-[75%] pointer-events-none text-white">
                <div className="flex items-center gap-3 mb-2">
                     <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 p-[2px]">
                        <img 
                            src="https://github.com/shadcn.png" 
                            alt="Avatar" 
                            className="w-full h-full rounded-full border-2 border-black object-cover"
                        />
                     </div>
                     <span className="text-sm font-semibold drop-shadow-md">viral_creator</span>
                     <button className="px-3 py-1 rounded-lg border border-white/30 text-white text-xs font-semibold backdrop-blur-sm ml-2">Follow</button>
                </div>
                
                <div className="space-y-1">
                    <p className="text-sm font-medium drop-shadow-md leading-tight">
                        This hook is insane... <span className="text-white/70">#viral #growth</span>
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-3 text-white/90">
                    <Music className="w-3 h-3 animate-spin" />
                    <div className="text-xs marquee-container overflow-hidden whitespace-nowrap w-32">
                        <span className="marquee-content">Original Audio - viral_creator</span>
                    </div>
                </div>
            </div>

            {/* Share Menu Sheet */}
            <AnimatePresence>
                {shareOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        
                        {/* Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-white/10 rounded-t-3xl z-[80] p-4 space-y-4"
                        >
                            {/* Handle */}
                            <div className="mx-auto w-12 h-1 bg-white/20 rounded-full" />

                            {/* Quick Actions */}
                            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-white/5">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-white">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400">Share</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 relative">
                                    {/* Copy Interaction Target (4.5s) */}
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-white ring-2 ring-acid-lime/50">
                                        <Copy className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400">Copy Link</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-white">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400">SMS</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-white">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400">More</span>
                                </div>
                            </div>
                            
                            <div className="h-8" /> {/* Spacer */}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Ghost Finger (Animation Coordinator) */}
            <motion.div
                className="absolute w-5 h-5 rounded-full bg-white/50 z-[100] pointer-events-none backdrop-blur-[2px] shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                animate={{
                    // 10s Loop Keyframes
                    x:    ["50%", "50%", "88%", "88%", "88%", "88%",  "88%",  "88%",   "40%",  "40%",  "40%",   "40%",  "50%"], 
                    y:    ["50%", "50%", "60%", "60%", "60%", "75%",  "75%",  "75%",   "85%",  "85%",  "85%",   "120%", "50%"],
                    scale: [1,     1,     1,     0.8,   1,     1,      0.8,    1,       1,      0.8,    1,       1,      1], 
                    opacity: [0,   0.8,   1,     1,     1,     1,      1,      1,       1,      1,      1,       0,      0]
                }}
                transition={{
                    duration: 10,
                    // Times:
                    // 0.0: Start
                    // 0.2: Move Start (2s)
                    // 0.25: Tap Like (2.5s)
                    // 0.28: Release Like (2.8s)
                    // 0.32: Move to Share (3.2s)
                    // 0.35: Tap Share (3.5s)
                    // 0.38: Release Share (3.8s)
                    // 0.42: Move to Copy (4.2s)
                    // 0.45: Tap Copy (4.5s)
                    // 0.48: Release Copy (4.8s)
                    // 0.55: Move Away (5.5s)
                    // 0.60: Hide (6.0s)
                    // 1.00: End
                    times: [0, 0.2, 0.25, 0.25, 0.28, 0.32, 0.35, 0.38, 0.42, 0.45, 0.48, 0.55, 1],
                    ease: "easeInOut",
                    repeat: Infinity
                }}
                style={{ 
                    x: "-50%", 
                    y: "-50%",
                    left: 0,
                    top: 0
                }}
            />

        </div>
      </motion.div>
    </div>
  );
}
