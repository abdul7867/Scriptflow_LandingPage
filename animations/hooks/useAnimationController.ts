import { useAnimation } from "framer-motion";

/**
 * Wrapper hook for Framer Motion's useAnimation.
 * Allows for future extension or globally pausing animations.
 */
export function useAnimationController() {
    const controls = useAnimation();
    return controls;
}
