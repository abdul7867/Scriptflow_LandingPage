import { useReducedMotion } from "framer-motion";

export function useReducedMotionPreference() {
    const shouldReduce = useReducedMotion();
    return shouldReduce ?? false;
}
