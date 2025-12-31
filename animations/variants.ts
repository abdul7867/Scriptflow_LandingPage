import { TRANSITION_DEFAULTS } from "./config";
import type { Variants } from "framer-motion";

export const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { duration: TRANSITION_DEFAULTS.duration.base, ease: TRANSITION_DEFAULTS.ease.smooth }
    },
    exit: { 
        opacity: 0,
        transition: { duration: TRANSITION_DEFAULTS.duration.fast } 
    }
};

export const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: TRANSITION_DEFAULTS.duration.base, ease: TRANSITION_DEFAULTS.ease.primary }
    }
};

export const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", ...TRANSITION_DEFAULTS.spring.base }
    }
};

export const glowPulseVariants: Variants = {
    idle: { opacity: 0.5, scale: 1 },
    active: { 
        opacity: [0.5, 1, 0.5], 
        scale: [1, 1.05, 1],
        transition: { 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
        }
    }
};

// Orchestration container
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};
