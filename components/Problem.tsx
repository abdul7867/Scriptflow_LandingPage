"use client";

import { motion } from "framer-motion";

export default function Problem() {
  const lineVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="w-full py-48 bg-brand-dark flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
          className="flex flex-col items-center space-y-2 md:space-y-4"
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h2 variants={lineVariants} className="font-heading font-bold text-5xl md:text-8xl text-white tracking-tighter uppercase">
              The Content
            </motion.h2>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
             <motion.h2 variants={lineVariants} className="font-heading font-bold text-5xl md:text-8xl text-white tracking-tighter uppercase relative">
              Treadmill is <span className="font-serif italic font-normal text-brand-orange">Broken.</span>
            </motion.h2>
          </div>
          
          {/* Spacer */}
          <div className="h-16 md:h-24" />

          {/* Body Text */}
          <div className="overflow-hidden">
            <motion.p variants={lineVariants} className="font-sans text-xl md:text-3xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              You spend hours scrolling for inspiration,
            </motion.p>
          </div>
          <div className="overflow-hidden">
             <motion.p variants={lineVariants} className="font-sans text-xl md:text-3xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              but when you open your script editor,
             </motion.p>
          </div>
          <div className="overflow-hidden">
             <motion.p variants={lineVariants} className="font-sans text-xl md:text-3xl text-white font-normal max-w-2xl leading-relaxed">
               your mind goes <span className="font-serif italic text-white underline decoration-zinc-700 decoration-1 underline-offset-4">blank.</span>
             </motion.p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
