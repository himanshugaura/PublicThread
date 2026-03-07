"use client";
import { useEffect, useRef } from "react";

const GrainOverlay = ({
  originX = 0.7,
  originY = 0.3,
  spread = 0.65,
  density = 0.6,
  alpha = 30,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current?.parentElement;
    const ctx = canvas.getContext("2d");

    const drawGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      const ox = width * originX;
      const oy = height * originY;
      const maxDist = Math.sqrt(width * width + height * height) * spread;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          const dx = x - ox;
          const dy = y - oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const strength = Math.max(0, 1 - dist / maxDist);
          const eased = strength * strength;

          if (eased < 0.01) continue;
          if (Math.random() > eased * density) continue;

          const val = Math.random() * 255;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = eased * alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const resize = () => {
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawGrain();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [originX, originY, spread, density, alpha]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full ${className}`}
      />
    </div>
  );
};

export default GrainOverlay;