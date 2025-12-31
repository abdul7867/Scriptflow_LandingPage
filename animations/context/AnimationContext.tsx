"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react";

/**
 * Animation Stages:
 * - idle: Waiting for animation to start
 * - transferring: Data beam animation playing (Phone -> Terminal)
 * - processing: Terminal showing step-by-step processing
 * - success: Script generated and displayed
 */
export type AnimationStage = 'idle' | 'transferring' | 'processing' | 'success';

interface AnimationContextType {
    stage: AnimationStage;
    triggerShare: () => void;
    handleBeamComplete: () => void;
    reset: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// Timing constants
const PROCESSING_DURATION_MS = 3500;  // Terminal processing time (Slower)
const SUCCESS_DISPLAY_MS = 10000;     // How long to show success state (10s for reading)
const INITIAL_DELAY_MS = 2500;        // Delay before first auto-play

export function AnimationProvider({ children }: { children: ReactNode }) {
    const [stage, setStage] = useState<AnimationStage>('idle');
    const isFirstRun = useRef(true);

    // STEP 1: Trigger transfer (can be manual or auto)
    const triggerShare = useCallback(() => {
        if (stage !== 'idle') return;
        console.log('[Animation] IDLE -> TRANSFERRING');
        setStage('transferring');
    }, [stage]);

    // STEP 2: Beam animation completes
    const handleBeamComplete = useCallback(() => {
        console.log('[Animation] TRANSFERRING -> PROCESSING');
        setStage('processing');
    }, []);

    // Reset to idle
    const reset = useCallback(() => {
        console.log('[Animation] RESET -> IDLE');
        setStage('idle');
    }, []);

    // STEP 3: Auto-transition from processing to success
    useEffect(() => {
        if (stage === 'processing') {
            const timer = setTimeout(() => {
                console.log('[Animation] PROCESSING -> SUCCESS');
                setStage('success');
            }, PROCESSING_DURATION_MS);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    // STEP 4: Auto-reset after success (infinite loop)
    useEffect(() => {
        if (stage === 'success') {
            const timer = setTimeout(() => {
                console.log('[Animation] SUCCESS -> IDLE (loop)');
                setStage('idle');
            }, SUCCESS_DISPLAY_MS);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    // AUTO-PLAY: Start animation automatically on mount
    useEffect(() => {
        if (stage === 'idle') {
            const delay = isFirstRun.current ? INITIAL_DELAY_MS : 2500;
            isFirstRun.current = false;
            
            const timer = setTimeout(() => {
                console.log('[Animation] Auto-triggering animation');
                setStage('transferring');
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    return (
        <AnimationContext.Provider value={{ stage, triggerShare, handleBeamComplete, reset }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimationContext() {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error("useAnimationContext must be used within AnimationProvider");
    }
    return context;
}
