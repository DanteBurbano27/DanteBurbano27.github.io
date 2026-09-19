
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastDrawTime = 0;
    // ~24 fps to save CPU
    const fpsInterval = 1000 / 24;

    const chars = "01AI DATA +*/<>{}[]01";
    
    let columns: number;
    let drops: number[] = [];
    let fontSize: number;

    const initMatrix = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const isMobile = window.innerWidth < 768;
      // Reduce density on mobile as requested (50-70% less density means bigger font/less columns)
      fontSize = isMobile ? 24 : 16;
      
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        // start drops at random positions so they do not fall together
        drops[x] = Math.random() * -100;
      }
    };

    initMatrix();

    // Use resize observer for smooth handling without too many re-inits
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initMatrix, 200);
    };
    window.addEventListener("resize", handleResize);

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastDrawTime < fpsInterval) return;
      lastDrawTime = currentTime;

      // Dark background with some transparency to leave trails
      ctx.fillStyle = "rgba(3, 5, 3, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Skip some columns randomly for an organic look
        if (Math.random() > 0.95) continue;
        
        const text = chars.charAt(Math.floor(Math.random() * chars.length));

        // Use different greens 
        const colorVal = Math.random();
        if (colorVal > 0.9) {
          ctx.fillStyle = "#00FF41";
        } else if (colorVal > 0.7) {
          ctx.fillStyle = "#00E676";
        } else {
          ctx.fillStyle = "#39FF14"; // primary
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduceMotion, isVisible]);

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 z-0 bg-cyber-bg pointer-events-none" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none opacity-[0.4]"
      style={{
        maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)"
      }}
    />
  );
}


