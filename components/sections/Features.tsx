"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ScanEye, Sparkles, Zap, SlidersHorizontal } from "lucide-react";

// Interactive Component for Vibe Control
const VibeCheck = () => {
    const [chaos, setChaos] = useState(80);

    return (
        <div className="w-full mt-8 bg-black/40 rounded-2xl p-6 border border-white/10 backdrop-blur-md relative overflow-hidden group/slider">
            {/* Background Gradient */}
            <div 
                className="absolute inset-0 opacity-20 transition-opacity duration-500"
                style={{ 
                    background: `linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(189, 255, 0, ${chaos / 150}))` 
                }} 
            />

            {/* Labels */}
            <div className="flex justify-between text-xs font-mono mb-4 font-bold tracking-wider relative z-10">
                <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">PROFESSIONAL</span>
                <span className="text-acid-lime drop-shadow-[0_0_10px_rgba(189,255,0,0.5)]">UNHINGED / VIRAL</span>
            </div>

            {/* Functional Slider */}
            <div className="relative h-12 flex items-center mb-6">
                {/* Track */}
                <div className="absolute w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-acid-lime"
                        style={{ width: `${chaos}%` }}
                    />
                </div>
                {/* Input Range (Invisible but Functional) */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={chaos}
                    onChange={(e) => setChaos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                
                {/* Visual Thumb */}
                <motion.div 
                    className="absolute h-8 w-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center border-4 border-black z-10 pointer-events-none"
                    style={{ left: `calc(${chaos}% - 16px)` }}
                >
                    <div className="w-2 h-2 bg-black rounded-full" />
                </motion.div>
            </div>

            {/* Dynamic Preview */}
            <div className="relative min-h-[60px] bg-black/50 rounded-xl p-4 border border-white/5 flex items-center justify-center text-center">
                 <AnimatePresence mode="wait">
                    <motion.p
                        key={chaos > 60 ? "viral" : "pro"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="font-medium text-lg text-white leading-tight"
                    >
                        {chaos > 60 ? (
                            <>
                                &quot;Stop working hard. <span className="text-acid-lime font-bold bg-acid-lime/10 px-1 rounded">It&apos;s ruining your life.</span> Here&apos;s why.&quot;
                            </>
                        ) : (
                            <>
                                &quot;Here are 3 tips for <span className="text-blue-400 font-bold bg-blue-500/10 px-1 rounded">better productivity</span> at work.&quot;
                            </>
                        )}
                    </motion.p>
                 </AnimatePresence>
            </div>
        </div>
    )
}

const features = [
  {
    title: "AI Video Forensics",
    description:
      "Our AI breaks down viral hits frame-by-frame, extracting the exact pacing, hooks, and psychology that make them work.",
    icon: ScanEye,
  },
  {
    title: "Chaos Control",
    description:
      "Don't sound like a bot. Dial in your chaos level to match your unique voice.",
    icon: SlidersHorizontal,
    component: <VibeCheck />
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

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="w-full bg-brand-dark py-32 md:py-48 px-4 relative overflow-hidden">
      
      {/* Background Ambience - Connection to Hero/Demo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-acid-lime/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-acid-magenta/50 to-transparent" />
        
        {/* Blobs */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-acid-lime/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-acid-magenta/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Editorial Heading */}
      <div className="max-w-4xl mx-auto text-center mb-32 relative z-10">
        <h2 className="font-serif italic text-4xl md:text-7xl text-white/90">
          How ScriptFlow Works
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        
        {/* Mobile: Straight Line */}
        <div className="absolute md:hidden left-[20px] top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
        <motion.div 
            style={{ scaleY: pathLength }}
            className="absolute md:hidden left-[20px] top-0 bottom-0 w-[2px] bg-acid-lime origin-top rounded-full z-0 shadow-[0_0_15px_rgba(189,255,0,0.6)]"
        />

        {/* Desktop: Curved Connector Stream */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none -top-12 -bottom-12">
            <svg 
              className="w-full h-full drop-shadow-[0_0_15px_rgba(189,255,0,0.8)]" 
              viewBox="0 0 100 160" 
              preserveAspectRatio="none"
            >
                 <defs>
                   <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                     <stop offset="0%" stopColor="#BDFF00" />
                     <stop offset="30%" stopColor="#FFFFFF" />
                     <stop offset="60%" stopColor="#FF00FF" />
                     <stop offset="100%" stopColor="#BDFF00" />
                   </linearGradient>
                 </defs>
                 
                 {/* Connection from Top (Hero) */}
                 <path d="M 50 0 L 50 10" stroke="url(#fiberGradient)" strokeWidth="4" strokeOpacity="0.5" />

                 <motion.path
                    d="M 50 10 C 50 20, 20 20, 20 40 C 20 60, 80 60, 80 80 C 80 100, 20 100, 20 120 C 20 140, 80 140, 80 160"
                    fill="none"
                    stroke="url(#fiberGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength }}
                    className="opacity-80"
                 />
            </svg>
        </div>

        <div className="space-y-40">
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
                {/* Connector Dot */}
                <div 
                  className="hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 z-10 bg-brand-dark rounded-full border border-white/20 p-1"
                  style={{ left: isLeft ? "20%" : "80%", transform: "translate(-50%, -50%)" }}
                >
                    <div className="w-full h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
                </div>
                
                {/* Mobile Dot */}
                <div className="md:hidden absolute left-[20px] top-0 w-4 h-4 -translate-x-[7px] z-10">
                   <div className="w-full h-full bg-brand-dark border-2 border-acid-lime rounded-full shadow-[0_0_10px_rgba(189,255,0,0.5)]" />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"}`}>
                    <div className="relative group p-8 rounded-3xl bg-[#050505]/60 backdrop-blur-[24px] border border-transparent border-t-white/10 hover:border-acid-lime transition-all duration-500 overflow-hidden">
                        {/* Radioactive Core */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,255,0,0.1)_0%,transparent_70%)] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className={`relative inline-flex items-center gap-4 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} mb-5`}>
                            <div className="p-3.5 rounded-xl bg-lime-500/20 text-lime-400 shadow-xl border border-lime-500/10">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="font-sans text-lg text-zinc-400 leading-relaxed max-w-lg relative z-10">
                            {feature.description}
                        </p>
                        
                        {/* Interactive Component Injection */}
                        {feature.component && (
                            <div className="w-full text-left mt-6 relative z-10">
                                {feature.component}
                            </div>
                        )}
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
