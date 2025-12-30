"use client";

import { motion } from "framer-motion";
import { Ghost, Mic, Layers, ArrowRight } from "lucide-react";

const personas = [
  {
    title: "The Faceless Creator",
    description: "Remix viral audio into faceless scripts.",
    icon: Ghost,
    gradient: "from-zinc-500 to-white",
  },
  {
    title: "The Founder / Coach",
    description: "Turn trending formats into authority content.",
    icon: Mic,
    gradient: "from-blue-500 to-acid-magenta",
  },
  {
    title: "The Curator",
    description: "Batch produce 30 scripts in 30 minutes.",
    icon: Layers,
    gradient: "from-acid-lime to-green-400",
  },
];

export default function TargetAudience() {
  return (
    <section className="w-full bg-brand-dark py-24 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid-magenta/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-3xl md:text-5xl text-white"
          >
            Built for the New Wave of Creators.
          </motion.h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            ScriptFlow adapts to your specific content strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl bg-[#050505]/60 backdrop-blur-[24px] border border-transparent border-t-white/10 hover:border-acid-lime transition-all duration-300 overflow-hidden"
            >
               {/* Radioactive Core */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,255,0,0.15)_0%,transparent_60%)] blur-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative h-full p-8 flex flex-col items-start gap-6 z-10">
                
                {/* Glow Box Icon */}
                <div className="w-14 h-14 rounded-xl bg-lime-500/20 flex items-center justify-center border border-lime-500/10 group-hover:scale-110 transition-all duration-300">
                   <persona.icon className="w-7 h-7 text-lime-400" />
                </div>

                <div className="space-y-3 relative z-10">
                    <h3 className="font-heading font-bold text-2xl text-white group-hover:text-acid-lime transition-colors">
                        {persona.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed font-light text-base">
                        {persona.description}
                    </p>
                </div>

                <div className="mt-auto pt-2 flex items-center gap-2 text-sm font-bold text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Start Creating</span>
                    <ArrowRight className="w-4 h-4 text-acid-lime" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
