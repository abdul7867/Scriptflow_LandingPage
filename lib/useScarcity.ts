"use client";

import { useState, useEffect } from "react";

export function useScarcity() {
  const [spots, setSpots] = useState(47);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // 1. Initialize from LocalStorage
    const saved = localStorage.getItem("scriptflow_spots");
    if (saved) {
      setSpots(parseInt(saved, 10));
    } else {
      localStorage.setItem("scriptflow_spots", "47");
    }

    // 2. Random Decrement Loop
    let timeout: NodeJS.Timeout;

    const scheduleNext = () => {
      // Random delay between 45s and 90s
      const delay = Math.random() * (90000 - 45000) + 45000;
      
      timeout = setTimeout(() => {
        setSpots((prev) => {
          const next = Math.max(3, prev - 1); // Don't go below 3
          
          if (next !== prev) {
             localStorage.setItem("scriptflow_spots", next.toString());
             setIsFlashing(true);
             setTimeout(() => setIsFlashing(false), 500); // 0.5s flash
          }
          return next;
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => clearTimeout(timeout);
  }, []);

  return { spots, isFlashing };
}
