import { useEffect, useState } from "react";


interface TextScrambleProps {
  text: string;
  duration?: number;
  className?: string;
}

export const TextScramble = ({ text, duration = 1.5, className }: TextScrambleProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animateText = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);

      if (progress < 1) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            // Character is resolved if progress > (index / text length)
            // But we want resolving to look like it flows from left to right somewhat or randomly?
            // User requested "randomly replace".
            // Let's use a simple probability: if progress > random threshold for this char, show real char.
            // Wait, standard scramble is usually left-to-right or just pure random. 
            // Let's do left-to-right resolve.
            
            if ((i / text.length) < progress) {
                result += text[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        setDisplayedText(result);
        animationFrameId = requestAnimationFrame(animateText);
      } else {
        setDisplayedText(text);
      }
    };

    animationFrameId = requestAnimationFrame(animateText);
    return () => cancelAnimationFrame(animationFrameId);
  }, [text, duration]);

  return <span className={className}>{displayedText}</span>;
};
