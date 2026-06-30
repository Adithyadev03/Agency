import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Star/Particle definitions
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      pulseSpeed: number;
      phase: number;
    }

    const particles: Particle[] = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.12 + 0.05),
        speedX: (Math.random() * 0.1 - 0.05),
        alpha: Math.random() * 0.5 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse parallax variables
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.005;

      // Smooth cursor follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw waving cosmic aurora light beams
      ctx.save();
      const b1x = width * 0.3 + Math.sin(time) * 120;
      const b1y = height * 0.2 + Math.cos(time * 0.8) * 80;
      const b1rad = Math.min(width, height) * 0.6;
      
      const beamGrad1 = ctx.createRadialGradient(b1x, b1y, 0, b1x, b1y, b1rad);
      beamGrad1.addColorStop(0, "rgba(99, 102, 241, 0.05)"); // Indigo
      beamGrad1.addColorStop(0.5, "rgba(147, 51, 234, 0.02)"); // Purple
      beamGrad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = beamGrad1;
      ctx.beginPath();
      ctx.arc(b1x, b1y, b1rad, 0, Math.PI * 2);
      ctx.fill();

      const b2x = width * 0.7 + Math.cos(time * 1.1) * 140;
      const b2y = height * 0.75 + Math.sin(time * 0.9) * 100;
      const b2rad = Math.min(width, height) * 0.7;

      const beamGrad2 = ctx.createRadialGradient(b2x, b2y, 0, b2x, b2y, b2rad);
      beamGrad2.addColorStop(0, "rgba(168, 85, 247, 0.05)"); // Fuchsia
      beamGrad2.addColorStop(0.5, "rgba(59, 130, 246, 0.025)"); // Blue
      beamGrad2.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = beamGrad2;
      ctx.beginPath();
      ctx.arc(b2x, b2y, b2rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Volumetric lighting cone following cursor slightly (luxury agency highlight)
      ctx.save();
      const followX = mouseX;
      const followY = mouseY;
      const followRadius = Math.min(width, height) * 0.45;
      
      const cursorSpotGrad = ctx.createRadialGradient(followX, followY, 10, followX, followY, followRadius);
      cursorSpotGrad.addColorStop(0, "rgba(139, 92, 246, 0.035)");
      cursorSpotGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.01)");
      cursorSpotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = cursorSpotGrad;
      ctx.beginPath();
      ctx.arc(followX, followY, followRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Draw ambient grid lines with parallax
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const offsetX = (mouseX * 0.02) % gridSize;
      const offsetY = (mouseY * 0.02) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 4. Update and draw floating star particles
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      particles.forEach((p) => {
        p.phase += p.pulseSpeed;
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around borders
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Mouse Parallax offset
        const pX = p.x + (mouseX - width / 2) * 0.012;
        const pY = p.y + (mouseY - height / 2) * 0.012;

        const dynamicAlpha = Math.max(0.1, p.alpha * (0.6 + Math.sin(p.phase) * 0.4));
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional star twinkle halo
        if (p.size > 1.4 && dynamicAlpha > 0.4) {
          ctx.fillStyle = `rgba(147, 51, 234, ${dynamicAlpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(pX, pY, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
}
