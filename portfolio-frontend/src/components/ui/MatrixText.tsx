'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

interface MatrixTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function MatrixText({
  text,
  className = '',
  delay = 0,
  duration = 800,
}: MatrixTextProps) {
  const [displayText, setDisplayText] = useState('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      // Reduced-motion changes must replace animated text immediately after detection.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayText(text);
      return;
    }

    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const activeTime = elapsed - delay;
      const progress = Math.min(activeTime / duration, 1);
      
      // Calculate how many characters should be resolved
      const resolvedCount = Math.floor(progress * text.length);

      let currentText = '';
      for (let i = 0; i < text.length; i++) {
        if (i < resolvedCount || text[i] === ' ') {
          currentText += text[i];
        } else {
          currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(currentText);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [text, delay, duration, shouldReduceMotion]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      {displayText}
    </motion.span>
  );
}
