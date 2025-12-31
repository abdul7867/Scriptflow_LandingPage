"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchetypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string; 
  children?: React.ReactNode; 
  className?: string;
  highlightColor?: string; // e.g. "#bdff00" or "#d946ef"
}

export default function ArchetypeCard({
  icon: Icon,
  title,
  description,
  gradient,
  children,
  className,
  highlightColor = "#bdff00" // Default Acid Lime
}: ArchetypeCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      whileTap="hover" // Mobile responsiveness
      viewport={{ once: true }}
      variants={{
        hover: { 
            scale: 1.02,
            boxShadow: `0 20px 40px -10px ${highlightColor}4D` // 30% opacity hex approximation
        }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative h-[450px] w-full rounded-[32px] overflow-hidden backdrop-blur-[40px] bg-opacity-80 transition-all duration-300",
        // Background: Deep Black with opacity
        "bg-[#050505]",
        className
      )}
    >
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')] bg-repeat mix-blend-overlay" />

        {/* 1px Inner Glowing Rim (Gradient Border) - Base State */}
        <div 
            className="absolute inset-0 rounded-[32px] z-20 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300" 
            style={{
                padding: "1px",
                background: "linear-gradient(to bottom right, rgba(189, 255, 0, 0.3), rgba(255, 0, 255, 0.1))",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
            }}
        />

        {/* 1px Inner Glowing Rim - HOVER STATE (Solid Highlight Color) */}
        <div 
            className="absolute inset-0 rounded-[32px] z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
            style={{
                border: `1px solid ${highlightColor}`,
                boxShadow: `inset 0 0 20px ${highlightColor}20`
            }}
        />
        
        {/* Ambient Light Source (Top-Left Radial Glow) */}
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(132,204,22,0.1)_0%,transparent_70%)] blur-[60px] pointer-events-none z-0" />

        {/* Internal Layout Grid */}
        <div className="relative z-10 h-full grid grid-rows-[30%_70%]">
            
            {/* Top Zone: Content (30%) */}
            <div className="px-8 pt-8 flex flex-col items-start gap-4">
                 {/* Glowing Icon Square */}
                <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                        backgroundColor: `${highlightColor}1A`, // 10% opacity
                        border: `1px solid ${highlightColor}33`, // 20% opacity
                        boxShadow: `0 0 15px ${highlightColor}1A`
                    }}
                >
                    <Icon className="w-6 h-6" style={{ color: highlightColor }} />
                </div>

                <div className="space-y-2">
                     <h3 className="font-heading font-bold text-2xl text-white tracking-wide">
                        {title}
                     </h3>
                     <p className="font-sans text-zinc-400 text-sm leading-relaxed font-light">
                        {description}
                     </p>
                </div>
            </div>

            {/* Bottom Zone: Illustration Stage (70%) */}
            <div className="relative w-full h-full border-t border-white/5 bg-white/[0.02] overflow-hidden group-hover:bg-white/[0.04] transition-colors duration-500">
                 {/* Subtle Grid for Stage */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* Content Injection */}
                {children}
            </div>
        </div>
    </motion.div>
  );
}
