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
    // Physical Force Calculation
    const x = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 0;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Physics: Repulsion (Magnetism)
        const maxDist = 120; // Range of influence
        if (dist > maxDist) return 0; 
        
        // Repel: Move away from mouse
        // Force calculation: Stronger when closer 
        const force = Math.max(0, (maxDist - dist) / maxDist); // 0 to 1
        const power = -40; // Negative for repulsion (move away from mouse)
        
        // Direction vector (dx/dist, dy/dist) * power * force
        return (dx / dist) * power * force;
    });

    const y = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 0;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 120;
        if (dist > maxDist) return 0;

        const force = Math.max(0, (maxDist - dist) / maxDist);
        const power = -40;

        return (dy / dist) * power * force;
    });

    // Color/Glow Reaction
    const color = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return "rgba(82, 82, 91, 0.3)"; 
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        return dist < 120 ? "#d946ef" : "rgba(82, 82, 91, 0.3)";
    });

    const scale = useTransform([mouseX, mouseY], ([mx, my]) => {
        if (typeof mx !== 'number' || typeof my !== 'number') return 1;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Slightly shrink when being pushed away? Or grow? Let's grow slightly
        return dist < 120 ? 1.2 : 1;
    });

    // Physics: "Dragging through water" -> High Damping, Lower Stiffness
    const smoothX = useSpring(x, { stiffness: 100, damping: 20, mass: 1.5 });
    const smoothY = useSpring(y, { stiffness: 100, damping: 20, mass: 1.5 });

    return (
        <motion.div
            className="absolute rounded-full flex items-center justify-center bg-zinc-900 border border-white/5"
            style={{ 
                left: cx - 12, 
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
