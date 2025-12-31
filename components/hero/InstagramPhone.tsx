"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    MessageCircle, 
    MoreHorizontal, 
    Music2,
    Home,
    Search,
    PlusSquare,
    Clapperboard,
    Signal,
    Wifi,
    Battery,
    ChevronDown,
    Camera,
    Volume2,
    VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ShareButton from './ShareButton';

interface InstagramPhoneProps {
    className?: string;
    shareButtonRef?: React.Ref<HTMLButtonElement>;
    isTransferring?: boolean;
    onShareClick?: () => void;
}

export default function InstagramPhone({ 
    className, 
    shareButtonRef,
    isTransferring = false,
    onShareClick
}: InstagramPhoneProps) {
    const [currentTime, setCurrentTime] = useState("");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            setCurrentTime(`${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
        };
        updateTime();
    }, []);

    // Ensure video plays
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, []);

    // Toggle mute
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        // OUTER FRAME
        <div className={cn(
            "relative select-none transform-gpu",
            "p-[8px] rounded-[3.8rem]", // Thicker bezel, larger radius
            "bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#3a3a3a]",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_50px_-10px_rgba(0,0,0,0.6)]",
            className
        )}>
            {/* INNER SHELL */}
            <div className={cn(
                "relative w-[360px] h-[740px] rounded-[3.5rem] overflow-hidden", // Larger screen
                "ring-1 ring-inset ring-white/10",
                "bg-black"
            )}>
                {/* === REAL VIDEO BACKGROUND === */}
                <div className="absolute inset-0 bg-black z-0">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src="/instagramTalkingHead.mp4"
                        playsInline
                        loop
                        muted={isMuted}
                        autoPlay
                    />
                    
                    {/* Gradient Overlay for Text Readability - Bottom only */}
                    <div className="absolute inset-x-0 bottom-0 h-[380px] bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                    
                    {/* Top gradient for status bar */}
                    <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black/60 to-transparent z-10" />
                </div>

                {/* === MUTE/UNMUTE BUTTON (Top Right, Pushed Down) === */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-[100px] right-5 z-[60] w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer"
                >
                    {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-white" />
                    ) : (
                        <Volume2 className="w-3.5 h-3.5 text-white" />
                    )}
                </motion.button>

                {/* === TOP STATUS BAR === */}
                <div className="absolute top-0 inset-x-0 h-14 z-50 flex justify-between items-end pb-2 px-7 text-white font-medium tracking-wide">
                    <span className="text-[15px]">{currentTime}</span>
                    <div className="flex items-center gap-1.5 opacity-90">
                        <Signal className="w-4 h-4" strokeWidth={2.5} />
                        <Wifi className="w-4 h-4" strokeWidth={2.5} />
                        <Battery className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                </div>

                {/* === REELS HEADER === */}
                <div className="absolute top-14 inset-x-0 z-40 flex justify-between items-center px-5 pt-1">
                    <span className="text-white text-[22px] font-bold tracking-tight drop-shadow-md">Reels</span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Camera className="w-7 h-7 text-white drop-shadow-md cursor-pointer" strokeWidth={2} />
                    </motion.div>
                </div>

                {/* === RIGHT SIDE ACTIONS === */}
                <div className="absolute right-5 bottom-[120px] z-50 flex flex-col items-center gap-5"> 
                    {/* Like */}
                    <motion.div 
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2} />
                        <span className="text-white text-[12px] font-medium drop-shadow-md">34.5K</span>
                    </motion.div>
                    
                    {/* Comment */}
                    <motion.div 
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2} />
                        <span className="text-white text-[12px] font-medium drop-shadow-md">367</span>
                    </motion.div>
                    
                    {/* Share Button (Trigger) */}
                    <motion.div 
                        className="flex flex-col items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ShareButton
                            ref={shareButtonRef}
                            onClick={onShareClick}
                            isActive={isTransferring}
                            className="!p-0"
                        />
                        <span className="text-white text-[12px] font-medium drop-shadow-md">Share</span>
                    </motion.div>

                    {/* More */}
                    <motion.div 
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MoreHorizontal className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2} />
                    </motion.div>

                    {/* Music Disc */}
                    <motion.div 
                        className="mt-1 w-8 h-8 rounded-md border-2 border-white overflow-hidden shadow-lg bg-black"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                            alt="Music" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* === BOTTOM INFO === */}
                <div className="absolute left-5 bottom-[75px] z-50 w-[72%] flex flex-col items-start gap-3">
                    {/* User Profile Row */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                            <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                                className="w-full h-full rounded-full object-cover border-2 border-black"
                                alt="Profile"
                            />
                        </div>
                        <span className="text-white font-semibold text-[14px] drop-shadow-md">alex_hormozi_ai</span>
                        <motion.button 
                            className="px-3 py-1 rounded-md border border-white/40 bg-transparent text-white text-[12px] font-semibold"
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Follow
                        </motion.button>
                    </div>

                    {/* Caption */}
                    <p className="text-white text-[13px] leading-snug drop-shadow-sm">
                        Stop scrolling if you want to fix your engagement. 🛑 <span className="text-white/60">#ai #growth</span>
                    </p>
                    
                    {/* Audio Ticker */}
                    <div className="flex items-center gap-2">
                        <Music2 className="w-3 h-3 text-white flex-shrink-0" />
                        <div className="overflow-hidden max-w-[180px]">
                            <motion.p 
                                className="text-white text-[12px] whitespace-nowrap"
                                animate={{ x: [0, -100, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                Original Audio - alex_hormozi_ai
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* === BOTTOM NAV === */}
                <div className="absolute bottom-0 inset-x-0 h-[65px] z-50 flex justify-around items-center px-4 pb-3 pt-2 bg-black border-t border-white/5">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Home className="w-6 h-6 text-white" strokeWidth={2} />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Search className="w-6 h-6 text-white/50" strokeWidth={2} />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <PlusSquare className="w-6 h-6 text-white/50" strokeWidth={2} />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Clapperboard className="w-6 h-6 text-white" strokeWidth={2} />
                    </motion.div>
                    <motion.div 
                        className="w-6 h-6 rounded-full overflow-hidden border-2 border-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                            alt="profile" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* === BORDER GLOW ON TRANSFER === */}
                <AnimatePresence>
                    {isTransferring && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 pointer-events-none z-[70] rounded-[3rem] border-[4px] border-acid-lime shadow-[0_0_50px_rgba(189,255,0,0.5)]"
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

