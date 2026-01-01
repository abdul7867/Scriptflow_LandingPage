"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchetypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode; 
  className?: string;
  highlightColor?: string; // e.g. "#bdff00" or "#d946ef"
}

export default function ArchetypeCard({
  icon: Icon,
  title,
  description,
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
        "group relative h-[450px] w-full rounded-[32px] overflow-hidden transition-all duration-300",
        "bg-black/40 backdrop-blur-xl border border-white/10",
        className
      )}
    >
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')] bg-repeat mix-blend-overlay" />

        {/* Hover Glow & Border Effect */}
        <motion.div 
            className="absolute inset-0 rounded-[32px] z-20 pointer-events-none"
            variants={{
                hover: { 
                    borderColor: "rgba(163, 230, 53, 0.5)", // lime-400/50
                    boxShadow: "0 0 30px -5px rgba(189,255,0,0.2)"
                }
            }}
            style={{
                borderWidth: "1px",
                borderColor: "rgba(163, 230, 53, 0)" // Initially transparent, handled by variants or class if needed, but here we animate it on top or replace the base border? 
                // Actually, simpler to apply hover styles to the main container or an overlay. 
                // The main container has `border border-white/10`. On hover we want to CHANGE that.
                // Framer motion on the parent `className` is hard.
                // Let's use this absolute div to be the "Highlight Border" that fades in.
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
             <div className="absolute inset-0 rounded-[32px] border border-lime-400/50 shadow-[0_0_30px_-5px_rgba(189,255,0,0.2)]" />
        </motion.div>
        
        {/* Ambient Light Source (Top-Left Radial Glow) */}
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(132,204,22,0.1)_0%,rgba(132,204,22,0)_70%)] blur-[60px] pointer-events-none z-0" />

        {/* Internal Layout Grid */}
        <div className="relative z-10 h-full grid grid-rows-[30%_70%]">
            
            {/* Top Zone: Content (30%) */}
            <div className="px-6 md:px-8 pt-8 flex flex-col items-start gap-4">
                 {/* Glowing Icon Square */}
                <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                        backgroundColor: `${highlightColor}1A`, // 10% opacity
                        border: `1px solid ${highlightColor}33`, // 20% opacity
                        boxShadow: `0 0 15px ${highlightColor}1A`
                    }}
                >
                    <Icon className="w-6 h-6" style={{ color: highlightColor }} strokeWidth={1.5} />
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
