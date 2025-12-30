"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScanEye, Sparkles, Zap } from "lucide-react";

const features = [
  {
    title: "AI Video Forensics",
    description:
      "Our AI breaks down viral hits frame-by-frame, extracting the exact pacing, hooks, and psychology that make them work.",
    icon: ScanEye,
  },
  {
    title: "Ghostwriter Mode",
    description:
      "It doesn't just copy. It rewrites the concept in YOUR unique voice, ensuring you never sound like a bot.",
    icon: Sparkles,
  },
  {
    title: "60-Second Workflow",
    description:
      "From blank page to finished script in under a minute. Stop overthinking and start filming.",
    icon: Zap,
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="w-full bg-brand-dark py-32 md:py-48 px-4 relative overflow-hidden">
      
      {/* Editorial Heading */}
      <div className="max-w-4xl mx-auto text-center mb-32 relative z-10">
        <h2 className="font-serif italic text-4xl md:text-7xl text-white/90">
          How ScriptFlow Works
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        
        {/* Mobile: Straight Line (Left Aligned) */}
        <div className="absolute md:hidden left-[20px] top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
        <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute md:hidden left-[20px] top-0 bottom-0 w-[2px] bg-brand-orange origin-top rounded-full z-0 shadow-[0_0_15px_#FF5500]"
        />

        {/* Desktop: Curved SVG Path */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
            <svg 
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]" 
              viewBox="0 0 100 105" 
              preserveAspectRatio="none"
            >
                 <defs>
                   <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                     <stop offset="0%" stopColor="#FF5500" />
                     <stop offset="50%" stopColor="#FF0080" />
                     <stop offset="100%" stopColor="#7928CA" />
                   </linearGradient>
                 </defs>
                 <motion.path
                    d="M 50 0 C 50 15, 20 15, 20 35 C 20 55, 80 55, 80 70 C 80 85, 50 85, 50 105"
                    fill="none"
                    stroke="url(#fiberGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength }}
                 />
            </svg>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20%", once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                    isLeft ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Connector Dot - Explicitly positioned to match SVG peaks (20% and 80%) */}
                <div 
                  className="hidden md:block absolute top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                  style={{ left: isLeft ? "20%" : "80%", transform: "translate(-50%, -50%)" }}
                >
                    <div className="w-full h-full bg-brand-dark border-2 border-brand-orange rounded-full shadow-[0_0_15px_#FF5500]" />
                </div>
                
                {/* Mobile Dot */}
                <div className="md:hidden absolute left-[20px] top-0 w-4 h-4 -translate-x-[7px] z-10">
                   <div className="w-full h-full bg-brand-dark border-2 border-brand-orange rounded-full shadow-[0_0_10px_#FF5500]" />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? "md:pr-32 md:text-right" : "md:pl-32 md:text-left"}`}>
                    <div className="flex flex-col gap-4">
                        <div className={`inline-flex items-center gap-3 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
                            <div className="p-3 rounded-lg bg-surface border border-glass-border text-brand-orange bg-white/5">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading font-bold text-2xl md:text-4xl text-white uppercase tracking-tight">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="font-sans text-lg text-zinc-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>

                {/* Empty Side for Grid Balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
