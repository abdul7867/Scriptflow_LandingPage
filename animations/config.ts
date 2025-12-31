import type { BezierDefinition } from "framer-motion";

export const TRANSITION_DEFAULTS = {
    duration: {
        fast: 0.2,
        base: 0.4,
        slow: 0.8,
        ultraSlow: 1.5,
    },
    ease: {
        primary: [0.32, 0.72, 0, 1] as BezierDefinition,
        smooth: [0.4, 0, 0.2, 1] as BezierDefinition,
        elastic: [0.6, -0.05, 0.01, 0.99] as BezierDefinition,
    },
    spring: {
        tight: { stiffness: 400, damping: 25 },
        base: { stiffness: 200, damping: 20 },
        gentle: { stiffness: 100, damping: 20 },
    }
};

export const MOTION_CONFIG = {
    reducedMotion: "user",
};
