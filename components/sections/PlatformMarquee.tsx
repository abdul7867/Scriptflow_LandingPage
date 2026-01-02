"use client";

import { motion } from "framer-motion";

// ScriptFlow service capabilities - what the AI decodes
const capabilities = [
  {
    name: "Hook Analysis",
    description: "First 3 seconds",
    icon: (
      <motion.svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {/* Hook shape with pulse */}
        <motion.path
          d="M20 5 L20 20 Q20 30 10 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-acid-lime"
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="10" cy="30" r="4"
          className="fill-acid-lime"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Scan lines */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1="25" y1={10 + i * 8} x2="35" y2={10 + i * 8}
            stroke="currentColor"
            strokeWidth="2"
            className="text-acid-lime/50"
            animate={{ opacity: [0.2, 0.8, 0.2], x1: [25, 28, 25] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.svg>
    ),
  },
  {
    name: "Pacing Decoder",
    description: "Rhythm & Flow",
    icon: (
      <motion.svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {/* Audio waveform bars */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={5 + i * 7}
            y={20}
            width="5"
            rx="2"
            className="fill-acid-lime"
            animate={{
              height: [8, 20, 12, 18, 8],
              y: [20, 10, 15, 12, 20],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    ),
  },
  {
    name: "Viral Triggers",
    description: "Psychology Patterns",
    icon: (
      <motion.svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {/* Brain/neural network */}
        <motion.circle
          cx="20" cy="20" r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-acid-magenta"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Neural nodes */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 20 + Math.cos(rad) * 12;
          const y = 20 + Math.sin(rad) * 12;
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="3"
              className="fill-acid-magenta"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          );
        })}
        {/* Center pulse */}
        <motion.circle
          cx="20" cy="20" r="5"
          className="fill-acid-magenta"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.svg>
    ),
  },
  {
    name: "Voice Clone",
    description: "Your Unique Style",
    icon: (
      <motion.svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {/* Microphone with waves */}
        <motion.rect
          x="15" y="8" width="10" height="16" rx="5"
          className="fill-acid-lime stroke-acid-lime"
          strokeWidth="1"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.path
          d="M10 20 Q10 32 20 32 Q30 32 30 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-acid-lime"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.line
          x1="20" y1="32" x2="20" y2="36"
          stroke="currentColor"
          strokeWidth="2"
          className="text-acid-lime"
        />
        {/* Sound waves - hidden on mobile for cleaner look */}
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M${32 + i * 3} 15 Q${35 + i * 3} 20 ${32 + i * 3} 25`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-acid-lime/60 hidden sm:block"
            animate={{ opacity: [0, 0.8, 0], x: [0, 2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.svg>
    ),
  },
  {
    name: "CTA Optimizer",
    description: "Engagement Boost",
    icon: (
      <motion.svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
        {/* Target with arrow */}
        <motion.circle
          cx="20" cy="20" r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/30"
        />
        <motion.circle
          cx="20" cy="20" r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/50"
        />
        <motion.circle
          cx="20" cy="20" r="5"
          className="fill-acid-lime"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Rising arrow */}
        <motion.path
          d="M30 25 L35 10 L25 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-acid-lime"
          animate={{ y: [0, -3, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.svg>
    ),
  },
];

export default function PlatformMarquee() {
  return (
    <div className="w-full py-10 sm:py-12 md:py-16 flex flex-col items-center justify-center overflow-hidden relative z-20 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black px-4">
      
      {/* Ambient glow - smaller on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[150px] sm:h-[180px] md:h-[200px] bg-acid-lime/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]" />
      </div>
      
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-acid-lime font-bold"
          >
            AI-Powered Script Engine
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white"
          >
            What ScriptFlow <span className="text-acid-lime">Decodes</span>
          </motion.h3>
        </div>
        
        {/* Capability Cards - Responsive Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full"
        >
          {capabilities.map((capability, index) => (
            <motion.div 
              key={capability.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.03, 
                y: -3,
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-acid-lime/50 hover:bg-acid-lime/5 transition-all duration-300 cursor-default"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-acid-lime/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
              
              {/* Icon */}
              <div className="text-acid-lime group-hover:drop-shadow-[0_0_10px_rgba(189,255,0,0.5)] transition-all duration-300">
                {capability.icon}
              </div>
              
              {/* Text */}
              <div className="text-center">
                <p className="font-heading font-bold text-xs sm:text-sm md:text-base text-white group-hover:text-acid-lime transition-colors leading-tight">
                  {capability.name}
                </p>
                <p className="text-[10px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors mt-0.5 sm:mt-1 hidden sm:block">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="w-20 sm:w-24 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-acid-lime/50 to-transparent"
        />
      </div>
    </div>
  );
}
