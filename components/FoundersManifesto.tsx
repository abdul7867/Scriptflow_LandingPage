"use client";

import { Playfair_Display, Inter } from 'next/font/google';
import { motion } from 'framer-motion';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic', 'normal'] });
const inter = Inter({ subsets: ['latin'] });

export default function FoundersManifesto() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Glow Effect behind the paper */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className={`relative max-w-2xl mx-auto bg-[#f4f4f0] text-zinc-900 p-8 md:p-12 rounded-sm shadow-2xl rotate-1 ${inter.className}`}>
        
        {/* Paper Header */}
        <h2 className={`${playfair.className} italic text-4xl md:text-5xl font-bold mb-8 text-black tracking-tight`}>
          Why I built this.
        </h2>

        {/* Story Paragraphs */}
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-zinc-800">
          <p>
            I spent <strong>hours</strong> staring at a blank Google Sheet and generic GPT scripts. I saw creators blowing up with simple videos while mine were <span className="line-through decoration-pink-500 decoration-2 text-zinc-500 decoration-wavy">ignored, flat, and painful</span>.
          </p>

          <p>
            I thought I had to be a creative genius to go viral. I was wrong. I just needed the right <strong>structure</strong>. The top 1% don&apos;t guess. They see what works, and they <span className="bg-[#ccff00] px-1 font-medium text-black">remix the psychology</span> behind it.
          </p>

          <p>
            So I built ScriptFlow. You don&apos;t need to be a copywriter. You just need to spot a winner. We take the viral DNA from a hit video and inject <em>your</em> idea into it. It&apos;s not stealing. It&apos;s <span className="bg-black text-white px-2 py-0.5 font-bold rounded-sm text-base align-middle">engineering</span>.
          </p>
        </div>

        {/* The "Callout" Bar */}
        <div className="mt-10 border-l-4 border-[#ccff00] pl-6 italic text-zinc-600">
          &quot;I&apos;m looking for <span className="font-bold text-black">100 creators</span> to test this beta. No gurus, just builders who want to crack the code.&quot;
        </div>

        {/* Footer: Founder Left, Signature Right */}
        <div className="mt-12 pt-8 border-t border-zinc-300 flex items-center justify-between">
          {/* Founder Label - Left */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Founder</p>
            <p className={`${playfair.className} text-2xl md:text-3xl italic text-black`}>Rehman</p>
          </div>
          
          {/* Animated Signature - Right */}
          <div className="w-40 md:w-48 h-14 md:h-16 relative">
            <svg viewBox="0 0 200 60" className="w-full h-full">
              {/* "R" letter */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                d="M 15 50 L 15 15 Q 40 15, 40 28 Q 40 38, 20 40 L 45 55"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* "ehman" flowing script */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                d="M 50 35 Q 55 25, 65 35 Q 70 42, 75 35 Q 80 28, 90 35 Q 95 40, 100 35 L 105 30 Q 110 25, 115 35 Q 120 42, 130 35 Q 140 28, 150 38"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Underline flourish */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 1.8 }}
                d="M 20 55 Q 80 52, 160 48"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
            <span className="sr-only">Rehman (Founder)</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}
