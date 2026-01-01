"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSignup } from "@/context/SignupContext";

export default function Footer() {
  const { openSignupModal } = useSignup();

  return (
    <footer className="w-full py-24 px-4 bg-gradient-to-b from-canvas to-zinc-950 flex flex-col items-center justify-center border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
        <h2 className="font-heading font-bold text-4xl md:text-6xl text-white tracking-tight leading-tight">
          Only 100 spots <br className="hidden md:block" />
          <span className="text-zinc-500">for this cohort.</span>
        </h2>

        <motion.button
          onClick={openSignupModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-bold text-xl rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10">Claim My Spot</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        </motion.button>

        <div className="flex flex-col items-center gap-8 mt-12 w-full">
          <div className="w-full h-px bg-white/10 max-w-[200px]" />
          <div className="flex items-center gap-8 text-sm text-zinc-600 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
          <p className="text-xs text-zinc-800">
            © {new Date().getFullYear()} ScriptFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
