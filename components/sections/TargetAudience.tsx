"use client";

import { motion } from "framer-motion";
import ArchetypeCard from "@/components/cards/ArchetypeCard";
import FacelessCreator from "@/components/illustrations/FacelessCreator";
import FounderCoach from "@/components/illustrations/FounderCoach";
import TheCurator from "@/components/illustrations/TheCurator";

// Custom animated icons for each persona
const FacelessIcon = () => (
  <motion.svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5"
    whileHover="hover"
    initial="idle"
  >
    {/* Hoodie silhouette */}
    <motion.path
      d="M12 2C8 2 5 5 5 8v6c0 4 2 6 2 6h10s2-2 2-6V8c0-3-3-6-7-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-acid-lime"
      variants={{
        idle: { opacity: 0.7 },
        hover: { opacity: 1 }
      }}
    />
    {/* Question mark face */}
    <motion.text
      x="12" y="14"
      textAnchor="middle"
      fontSize="8"
      className="fill-acid-lime font-bold"
      variants={{
        idle: { opacity: 0.5 },
        hover: { opacity: 1, scale: 1.2 }
      }}
    >
      ?
    </motion.text>
    {/* Audio bars overlay */}
    {[0, 1, 2].map((i) => (
      <motion.rect
        key={i}
        x={9 + i * 3}
        y={18}
        width="1.5"
        rx="0.5"
        className="fill-acid-lime"
        variants={{
          idle: { height: 2 },
          hover: { height: [2, 4, 2] }
        }}
        transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </motion.svg>
);

const FounderIcon = () => (
  <motion.svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5"
    whileHover="hover"
    initial="idle"
  >
    {/* Microphone */}
    <motion.rect
      x="9" y="4" width="6" height="10" rx="3"
      className="fill-acid-magenta/80 stroke-acid-magenta"
      strokeWidth="1"
      variants={{
        idle: { opacity: 0.7 },
        hover: { opacity: 1 }
      }}
    />
    <motion.path
      d="M6 11v2c0 3 2.5 5 6 5s6-2 6-5v-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-acid-magenta"
    />
    <motion.line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" className="text-acid-magenta" />
    {/* Crown */}
    <motion.path
      d="M7 4l2-2 3 1.5 3-1.5 2 2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-yellow-400"
      variants={{
        idle: { opacity: 0, y: 2 },
        hover: { opacity: 1, y: 0 }
      }}
    />
  </motion.svg>
);

const CuratorIcon = () => (
  <motion.svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5"
    whileHover="hover"
    initial="idle"
  >
    {/* Stacked layers */}
    {[0, 1, 2].map((i) => (
      <motion.rect
        key={i}
        x={4 + i * 0.5}
        y={6 + i * 5}
        width={16 - i}
        height="5"
        rx="1"
        className={i === 2 ? "fill-acid-lime/90" : "fill-acid-lime/40"}
        stroke="currentColor"
        strokeWidth="0.5"
        variants={{
          idle: { x: 4 + i * 0.5 },
          hover: { x: [4 + i * 0.5, 6 + i * 0.5, 4 + i * 0.5] }
        }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      />
    ))}
    {/* Sparkle */}
    <motion.circle
      cx="18" cy="6" r="2"
      className="fill-acid-lime"
      variants={{
        idle: { scale: 0, opacity: 0 },
        hover: { scale: 1, opacity: 1 }
      }}
    />
  </motion.svg>
);

const personas = [
  {
    title: "The Faceless Creator",
    description: "Remix viral audio into faceless scripts that captivate millions.",
    subtitle: "No face, no problem",
    icon: FacelessIcon,
    illustration: FacelessCreator,
    highlightColor: "#bdff00",
    stats: "10x faster script generation"
  },
  {
    title: "The Founder / Coach",
    description: "Turn trending formats into authority content that builds trust.",
    subtitle: "Thought leadership, simplified",
    icon: FounderIcon,
    illustration: FounderCoach,
    highlightColor: "#d946ef",
    stats: "3x engagement boost"
  },
  {
    title: "The Curator",
    description: "Batch produce 30 scripts in 30 minutes. Scale your content empire.",
    subtitle: "Volume meets quality",
    icon: CuratorIcon,
    illustration: TheCurator,
    highlightColor: "#bdff00",
    stats: "30 scripts/hour"
  },
];

export default function TargetAudience() {
  return (
    <section className="w-full bg-brand-dark py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-acid-magenta/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-acid-lime/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-acid-lime/30 bg-acid-lime/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-acid-lime animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-acid-lime uppercase">
              Creator Archetypes
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white"
          >
            Built for the <span className="text-acid-lime">New Wave</span> of Creators
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            ScriptFlow adapts to your specific content strategy. 
            <span className="text-white"> Choose your archetype.</span>
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {personas.map((persona, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <ArchetypeCard
                icon={persona.icon}
                title={persona.title}
                description={persona.description}
                highlightColor={persona.highlightColor}
              >
                {/* Illustration Injection */}
                {persona.illustration && <persona.illustration />}
              </ArchetypeCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 text-sm">
            Hover over the cards to see your future content in action ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
