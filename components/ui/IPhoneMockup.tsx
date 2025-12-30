"use client";

import { motion } from "framer-motion";
import { Link, Heart, MessageCircle, Share2, MoreHorizontal, ArrowLeft, Music } from "lucide-react";

export default function IPhoneMockup() {
  return (
    <div className="relative group perspective-1000">
      <motion.div
        whileHover={{ rotateY: -10, rotateX: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-[300px] h-[600px]"
        style={{
            transformStyle: "preserve-3d",
        }}
      >
        {/* Titanium Frame (Gradient Border Wrapper) */}
        <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-700 p-[6px] shadow-2xl ring-1 ring-white/10">
            {/* Inner Black Body */}
            <div className="absolute inset-[6px] bg-black rounded-[44px] overflow-hidden">
                 <div className="absolute inset-0 rounded-[44px] border border-black/50 z-20 pointer-events-none" />
            </div>
        </div>

        {/* Buttons (Metallic Gradient) */}
        {/* Silent Switch */}
        <div className="absolute top-24 -left-[8px] w-[8px] h-8 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        {/* Volume Up */}
        <div className="absolute top-40 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        {/* Volume Down */}
        <div className="absolute top-56 -left-[8px] w-[8px] h-12 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-l-md border-l border-zinc-500 shadow-lg" />
        {/* Power Button */}
        <div className="absolute top-44 -right-[8px] w-[8px] h-20 bg-gradient-to-b from-zinc-600 to-zinc-500 rounded-r-md border-r border-zinc-500 shadow-lg" />

        {/* Dynamic Island */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-[60] flex items-center justify-center gap-2 px-2 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" /> {/* Camera/Sensor reflection */}
        </div>

        {/* Screen Content - IG Reel Interface */}
        <div className="absolute inset-[12px] rounded-[38px] bg-zinc-900 overflow-hidden">
            
            {/* Background Video Simulator */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale mix-blend-overlay scale-110" />
                <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"
                />
            </div> 

            {/* TOP UI */}
            <div className="absolute top-12 left-0 w-full px-4 flex items-center justify-between z-40 text-white">
                <ArrowLeft className="w-6 h-6 stroke-2" />
                <span className="font-bold text-lg drop-shadow-md">Reels</span>
                <div className="w-6 h-6" /> {/* Spacer */}
            </div>

            {/* RIGHT SIDE UI */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-40 items-center">
                {[
                    { icon: Heart, label: "1.2M", fill: true },
                    { icon: MessageCircle, label: "4.5k", fill: false },
                    { icon: Share2, label: "Share", fill: false },
                    { icon: MoreHorizontal, label: "", fill: false }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <item.icon 
                            className={`w-7 h-7 text-white stroke-[2px] drop-shadow-lg ${item.fill ? "fill-red-500 text-red-500" : ""}`} 
                        />
                        {item.label && <span className="text-[11px] font-medium text-white drop-shadow-md">{item.label}</span>}
                    </div>
                ))}
            </div>

            {/* BOTTOM UI */}
            <div className="absolute left-4 bottom-8 z-40 max-w-[75%] pointer-events-none">
                <div className="flex items-center gap-3 mb-3">
                     <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-zinc-800 border-2 border-black" />
                     </div>
                     <span className="text-white text-sm font-semibold drop-shadow-md">viral_sensation</span>
                     <button className="px-3 py-1 rounded-lg border border-white/30 text-white text-xs font-semibold backdrop-blur-sm">Follow</button>
                </div>
                <div className="space-y-1.5 opacity-90">
                    <div className="h-3 w-full bg-white/20 rounded-full backdrop-blur-sm" />
                    <div className="h-3 w-2/3 bg-white/20 rounded-full backdrop-blur-sm" />
                </div>
                <div className="flex items-center gap-2 mt-4 text-white/80">
                    <Music className="w-3 h-3 animate-spin" />
                    <div className="h-3 w-32 bg-white/10 rounded-full" />
                </div>
            </div>

            {/* LASER SCANNER ANIMATION */}
            <motion.div
                className="absolute left-0 w-full h-[2px] bg-acid-lime shadow-[0_0_20px_rgba(189,255,0,0.8)] z-30"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 4, 
                    ease: "linear"
                }}
            >
                <div className="absolute w-full h-20 bg-gradient-to-b from-acid-lime/20 to-transparent -translate-y-full transform rotate-180" />
            </motion.div>
        </div>

        {/* PASTE LINK Overlay (Hover State) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] z-[70] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             {/* Only interactive when visible, but simple hover implies interaction */}
             <div className="flex flex-col items-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-20 h-20 rounded-full bg-acid-lime flex items-center justify-center shadow-[0_0_40px_rgba(189,255,0,0.5)]">
                    <Link className="w-10 h-10 text-black" />
                </div>
                <div className="text-center">
                    <span className="font-heading font-bold text-white text-2xl tracking-wider block">PASTE LINK</span>
                    <span className="text-zinc-400 text-sm font-mono mt-1 block">To Analyze Structures</span>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
