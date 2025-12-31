"use client";

import { motion } from "framer-motion";

export default function FoundersManifesto() {
  return (
    <section className="w-full py-24 px-4 bg-brand-dark flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full bg-[#F5F5F0] text-zinc-900 p-12 md:p-16 rounded-sm shadow-2xl relative overflow-hidden"
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none mix-blend-multiply" />
        
        <div className="relative z-10 flex flex-col gap-8">
            <div className="w-12 h-1 bg-acid-lime mb-4" />
            
            <h2 className="font-serif italic text-5xl md:text-6xl leading-tight">
                Why I built this.
            </h2>
            
            <div className="space-y-6 font-sans text-xl md:text-2xl leading-relaxed text-zinc-800 font-medium">
                <p>
                    I spent 3 years trying to grow on Instagram. I had the ideas, but my scripts were <span className="line-through decoration-acid-magenta decoration-2 text-zinc-400">boring</span>.
                </p>
                <p>
                    I built ScriptFlow to fix my own problem. It&apos;s not just another AI wrapper—it&apos;s the tool I wished I had day one.
                </p>
                <p>
                    I&apos;m looking for <span className="bg-acid-lime/20 px-1 rounded-sm">100 creators</span> to help me refine it. No bots, just us building something great.
                </p>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-300 flex items-center justify-between">
                <div className="font-heading font-bold uppercase tracking-widest text-sm text-zinc-500">
                    Founder
                </div>
                {/* Signature - SVG Implementation */}
                <div className="w-48 h-16 relative text-zinc-900">
                    <svg viewBox="0 0 150 60" className="w-full h-full stroke-current fill-none stroke-2">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            d="M 10 40 Q 30 10, 50 40 T 90 30 T 130 40" 
                        />
                        {/* A very abstract, scribbly signature path */}
                         <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                            d="M 20 45 L 140 35" 
                            className="stroke-1 opacity-50"
                        />
                    </svg>
                    <span className="sr-only">Alex (Founder)</span>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
}
