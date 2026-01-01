"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Smartphone } from "lucide-react";
import TiltCard from "./TiltCard";

const features = [
  {
    icon: <Smartphone className="w-8 h-8 text-acid-lime" />,
    title: "Viral Reverse-Engineering",
    description: "Our AI watches thousands of viral reels daily to understand exactly what hooks attention right now."
  },
  {
    icon: <Zap className="w-8 h-8 text-acid-magenta" />,
    title: "Instant Script Generation",
    description: "Get production-ready scripts in seconds, perfectly timed and formatted for high retention."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-brand-neon" />,
    title: "Originality Engine",
    description: "Never copy. We analyze patterns but generate completely unique angles tailored to your niche."
  }
];

export default function Features() {
  return (
    <section className="w-full py-32 bg-brand-dark overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/2 right-1/4 w-[500px] h-[500px] bg-acid-magenta/5 rounded-full blur-[100px]" />
        </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.15 }}
            >
              <TiltCard className="h-full rounded-2xl" intensity={10} glowOpacity={0.15}>
                <div className="h-full p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-acid-lime/50 transition-colors group">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-heading group-hover:text-acid-lime transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-light text-lg">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
