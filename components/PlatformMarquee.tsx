"use client";

import { motion } from "framer-motion";

const platforms = [
  {
    name: "Instagram",
    color: "text-zinc-700", // Base color, but handled via animation
    isPulsing: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    color: "hover:text-white",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M5.5 5.5v13h13v-13h-13zm11 11h-9v-9h9v9z" fillOpacity="0" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Abstract representation of CapCut */}
      </svg>
    ),
  },
  {
    name: "VN Video Editor",
    color: "hover:text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M7 7h2.5l3.5 6 3.5-6H19v10h-2.5v-6l-3.5 6h-2l-3.5-6v6H7V7z" />
      </svg>
    ),
  },
  {
    name: "Premiere Pro",
    color: "hover:text-[#9999FF]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
         <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
         <text x="5" y="15" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">Pr</text>
      </svg>
    ),
  },
];

export default function PlatformMarquee() {
  return (
    <section className="w-full pb-20 pt-0 bg-transparent flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-8">
            <p className="font-mono text-xs md:text-sm text-zinc-600 tracking-[0.2em] uppercase">
                Works with your workflow:
            </p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="flex items-center gap-12 md:gap-20 px-4 flex-wrap justify-center"
            >
                {platforms.map((platform) => (
                    <motion.div 
                        key={platform.name}
                        className={`transition-colors duration-300 ${platform.color} cursor-default`}
                        title={platform.name}
                        animate={platform.isPulsing ? {
                            color: ["#3f3f46", "#E1306C", "#3f3f46"],
                        } : {}}
                        transition={platform.isPulsing ? {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } : {}}
                    >
                        {/* Static className base color fallback */}
                        <div className={platform.isPulsing ? "" : "text-zinc-700"}>
                             {platform.icon}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
  );
}
