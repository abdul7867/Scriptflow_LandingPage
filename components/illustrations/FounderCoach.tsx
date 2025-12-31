"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Crown } from "lucide-react";
import { useRef } from "react";

// Gravity Dot Component
const GravityDot = ({ 
    cx, 
    cy, 
    mouseX, 
    mouseY 
}: { 
    cx: number, 
    cy: number, 
    mouseX: any, 
    mouseY: any 
}) => {
    // Physical Pull Calculation
    const x = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 0;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Physics: Magnetism
        const maxDist = 150; // Range of influence
        if (dist > maxDist) return 0; 
        
        // Stronger pull when closer
        const pull = Math.pow((1 - dist / maxDist), 2) * 40; // Max 40px pull
        return (dx / dist) * pull;
    });

    const y = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 0;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 150) return 0;
        const pull = Math.pow((1 - dist / 150), 2) * 40;
        return (dy / dist) * pull;
    });

    // Color/Glow Reaction
    const color = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return "rgba(82, 82, 91, 0.3)"; // zinc-600 @ 30%
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Threshold for "Activation"
        return dist < 100 ? "#d946ef" : "rgba(82, 82, 91, 0.3)"; // acid-magenta vs dim grey
    });

    const scale = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 1;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < 100 ? 1.5 : 1;
    });

    // Smooth out the movement
    const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

    return (
        <motion.div
            className="absolute rounded-full flex items-center justify-center bg-zinc-900 border border-white/5"
            style={{ 
                left: cx - 12, // Center the 24px dot
                top: cy - 12,
                x: smoothX, 
                y: smoothY,
                width: 24,
                height: 24,
                scale
            }}
        >
            <motion.div style={{ color }}>
                <User strokeWidth={1.5} className="w-3 h-3" />
            </motion.div>
        </motion.div>
    );
};

export default function FounderCoach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(9999); // Off-screen initially
  const mouseY = useMotionValue(9999);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(9999);
    mouseY.set(9999); // Release magnets
  };

  // Generate Grid of 20 dots (5 cols x 4 rows)
  const cols = 5;
  const rows = 4;
  const width = 300; // Estimated container width availability
  const height = 240;
  
  const dots = [];
  const xGap = width / (cols + 1);
  const yGap = height / (rows + 1);

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
        dots.push({ x: c * xGap, y: r * yGap });
    }
  }

  return (
    <div 
        ref={containerRef}
        className="w-full h-full relative overflow-hidden group flex items-center justify-center cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
        {/* The Grid of Gravity Dots */}
        <div className="relative w-[300px] h-[240px]">
             {dots.map((dot, i) => (
                 <GravityDot 
                    key={i} 
                    cx={dot.x} 
                    cy={dot.y} 
                    mouseX={mouseX} 
                    mouseY={mouseY} 
                 />
             ))}

            {/* The Founder Icon (Magnet Center) - follows cursor or static? 
                Request says: "Center a larger 'Founder Icon' (The Magnet)". 
                It also says "Track mouse... If mouse is close to a dot, move dot towards mouse".
                This implies the MOUSE is the magnet. The Founder Icon visually represents the user/magnet?
                Or is the Founder Icon static in center, and dots attracted to it?
                "As you move your mouse... audience swarms or follows YOUR cursor."
                So Mouse = Magnet.
                The "Center a larger 'Founder Icon'" might just be decor or the "Avatar".
                Actually, usually "Founder" archetype implies YOU are the founder. 
                Let's make the "Founder Icon" follow the mouse? 
                "Center a larger Founder Icon" - "Center" usually implies static placement.
                But "The Magnet" title suggests it is the force.
                If I move mouse, and dots follow mouse, and Founder Icon is the magnet... Founder Icon should probably track mouse too, acting as the cursor.
            */}
            <motion.div
                className="absolute pointer-events-none z-30"
                style={{ 
                    x: mouseX, 
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            >
                {/* Visual Representation of the "Founder Magnet" */}
                {/* Only visible when interacting? Or always? Prompt says "Center a larger..." implied static layout usually, but physics implies mouse.
                    Let's try: A static faint "throne" in center, but the 'Active Founder' is the cursor using the "Crown" icon.
                */}
                 <div className="w-16 h-16 rounded-full bg-acid-magenta/10 border border-acid-magenta/50 blur-sm absolute inset-0 animate-pulse" />
                 <div className="relative flex items-center justify-center w-12 h-12 bg-black border border-acid-magenta rounded-full shadow-[0_0_30px_#d946ef]">
                    <Crown className="w-6 h-6 text-acid-magenta" strokeWidth={1.5} />
                 </div>
            </motion.div>
        
        </div>
        
        {/* Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            BUILD_YOUR_TRIBE
        </div>

    </div>
  );
}
