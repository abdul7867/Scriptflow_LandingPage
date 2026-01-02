/**
 * Standardized Animation Constants
 * Use these across all components for consistent animations
 */

// Standard easing functions
export const EASE = {
  // Smooth entrance/exit
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Spring-like bounce
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  // Standard ease out
  out: "easeOut" as const,
  // Standard ease in-out
  inOut: "easeInOut" as const,
};

// Standard durations (in seconds)
export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Standard delays (in seconds)
export const DELAY = {
  none: 0,
  short: 0.1,
  normal: 0.2,
  medium: 0.3,
  long: 0.5,
};

// Standard spring configurations
export const SPRING = {
  // Bouncy, playful
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  // Smooth, natural
  smooth: { type: "spring" as const, stiffness: 300, damping: 30 },
  // Stiff, snappy
  snappy: { type: "spring" as const, stiffness: 500, damping: 35 },
  // Slow, heavy
  slow: { type: "spring" as const, stiffness: 200, damping: 40 },
};

// Standard fade-in variants
export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: DURATION.medium, ease: EASE.out }
  },
};

// Standard fade-up variants
export const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE.smooth }
  },
};

// Standard stagger container
export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: DELAY.short,
    },
  },
};

// Standard hover scale
export const HOVER_SCALE = {
  scale: 1.02,
  transition: { duration: DURATION.fast, ease: EASE.out },
};

// Standard tap scale
export const TAP_SCALE = {
  scale: 0.98,
};

// Viewport settings for scroll animations
export const VIEWPORT = {
  once: true,
  margin: "-10%" as const,
};

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
