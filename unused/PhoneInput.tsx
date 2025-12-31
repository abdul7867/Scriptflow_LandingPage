import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

interface PhoneInputProps {
  isActive?: boolean;
  videoSrc?: string;
  onClick?: () => void;
}

const PhoneInput = forwardRef<HTMLButtonElement, PhoneInputProps>(
  ({ isActive = false, videoSrc = '/placeholder-reel.mp4', onClick }, ref) => {
    return (
      <div className="relative w-[320px] aspect-[9/16] border-4 border-[#1a1a1a] rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 shadow-2xl bg-black">
        {/* Video Background */}
        <video
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          muted
          loop
          autoPlay
          playsInline
        />

        {/* Scan Line Effect */}
        <motion.div
            className="absolute left-0 right-0 h-[2px] bg-brand-neon z-20 shadow-[0_0_15px_rgba(189,255,0,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        >
             {/* Emitting Particles from Scanner */}
            {isActive && Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ opacity: 0, y: 0, x: `${Math.random() * 100}%` }}
                    animate={{ 
                        opacity: [1, 0], 
                        y: [-20, -60], // Float up from line
                        x: `${Math.random() * 100}%` 
                    }}
                    transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeOut" 
                    }}
                />
            ))}
        </motion.div>

        {/* Raw Data Particles (Ambient) */}
        <div className="absolute inset-0 pointer-events-none z-10">
            {isActive && Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                    key={`ambient-${i}`}
                    className="absolute w-[2px] h-[2px] bg-white/40"
                    style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%` 
                    }}
                    animate={{ 
                        y: [0, -100], 
                        opacity: [0, 0.8, 0] 
                    }}
                    transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Share Button Trigger */}
        <motion.button
          ref={ref}
          onClick={onClick}
          className={`absolute bottom-20 right-4 p-2 bg-transparent transition-colors duration-300 z-30 ${
            isActive ? 'text-brand-neon shadow-neon-glow' : 'text-white'
          }`}
          whileTap={{ scale: 0.9 }}
          aria-label="Share"
        >
          <Share2 className="w-8 h-8" strokeWidth={1.5} />
        </motion.button>
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
