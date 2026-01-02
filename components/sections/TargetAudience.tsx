"use client";

import { motion } from "framer-motion";
import { Ghost, Mic, Layers } from "lucide-react";

import ArchetypeCard from "@/components/cards/ArchetypeCard";
import FacelessCreator from "@/components/illustrations/FacelessCreator";
import FounderCoach from "@/components/illustrations/FounderCoach";
import TheCurator from "@/components/illustrations/TheCurator";

const personas = [
  {
    title: "The Faceless Creator",
    description: "Remix viral audio into faceless scripts.",
    icon: Ghost,
    illustration: FacelessCreator,
    highlightColor: "#bdff00"
  },
  {
    title: "The Founder / Coach",
    description: "Turn trending formats into authority content.",
    icon: Mic,
    illustration: FounderCoach,
    highlightColor: "#d946ef"
  },
  {
    title: "The Curator",
    description: "Batch produce 30 scripts in 30 minutes.",
    icon: Layers,
    illustration: TheCurator,
    highlightColor: "#bdff00"
  },
];

export default function TargetAudience() {
  return (
    <section className="w-full bg-brand-dark py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid-magenta/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
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
            <ArchetypeCard
              key={i}
              icon={persona.icon}
              title={persona.title}
              description={persona.description}
              highlightColor={persona.highlightColor}
            >
               {/* Illustration Injection */}
               {persona.illustration && <persona.illustration />}
            </ArchetypeCard>
          ))}
        </div>
      </div>
    </section>
  );
}
