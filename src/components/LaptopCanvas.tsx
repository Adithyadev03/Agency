import { useEffect, useRef, useState } from "react";

export default function LaptopCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized coordinates from -1 to 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse((prev) => ({ ...prev, targetX: x, targetY: y }));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotationY = 0;
    let hingeAngle = 1.95; // Opening angle (radians) - approx 110 degrees
    let targetHingeAngle = 1.95;

    // Define 3D laptop geometry
    const w = 2.4; // Laptop width
    const d = 1.6; // Laptop depth
    const h = 1.5; // Screen height
    const baseT = 0.08; // Base thickness

    // Define 3D point types
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    interface ProjectedPoint {
      x: number;
      y: number;
      valid: boolean;
      z2?: number; // raw z after rotation for depth calculation
    }

    // Floating objects type definition
    interface FloatingObject {
      type: "cube" | "sphere" | "ring" | "ui" | "particle";
      x: number;
      y: number;
      z: number;
      size: number;
      speedY: number;
      speedRot: number;
      phase: number;
      color: string;
      glowColor: string;
    }

    // Custom distinct floating shapes in 3D around the laptop
    const floatingObjects: FloatingObject[] = [
      { type: "cube", x: -2.0, y: 0.7, z: 0.3, size: 0.16, speedY: 0.6, speedRot: 0.4, phase: 0.1, color: "rgba(168, 85, 247, 0.25)", glowColor: "rgba(168, 85, 247, 0.7)" },
      { type: "sphere", x: 1.9, y: -0.6, z: 0.9, size: 0.14, speedY: 0.5, speedRot: 0.5, phase: 1.8, color: "rgba(59, 130, 246, 0.3)", glowColor: "rgba(59, 130, 246, 0.8)" },
      { type: "ring", x: -1.6, y: -0.8, z: 0.6, size: 0.25, speedY: 0.4, speedRot: 0.3, phase: 3.2, color: "rgba(139, 92, 246, 0.4)", glowColor: "rgba(139, 92, 246, 0.7)" },
      { type: "ui", x: 1.8, y: 0.8, z: -0.4, size: 0.32, speedY: 0.7, speedRot: 0.2, phase: 4.6, color: "rgba(59, 130, 246, 0.15)", glowColor: "rgba(59, 130, 246, 0.6)" },
      { type: "particle", x: -0.8, y: 1.3, z: -1.0, size: 0.05, speedY: 0.9, speedRot: 0.8, phase: 2.1, color: "rgba(168, 85, 247, 0.6)", glowColor: "rgba(168, 85, 247, 0.9)" },
      { type: "particle", x: 0.9, y: 1.1, z: 1.2, size: 0.04, speedY: 0.8, speedRot: 0.9, phase: 5.3, color: "rgba(59, 130, 246, 0.6)", glowColor: "rgba(59, 130, 246, 0.9)" },
      { type: "sphere", x: -2.3, y: -0.1, z: -0.6, size: 0.11, speedY: 0.55, speedRot: 0.45, phase: 2.8, color: "rgba(147, 51, 234, 0.25)", glowColor: "rgba(147, 51, 234, 0.75)" },
      { type: "cube", x: 2.2, y: 0.2, z: -0.8, size: 0.15, speedY: 0.65, speedRot: 0.35, phase: 1.2, color: "rgba(59, 130, 246, 0.2)", glowColor: "rgba(59, 130, 246, 0.7)" },
    ];

    // Scale and projection parameters
    const cameraZ = 4.5;

    // Setup High-DPI canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Dynamic state inside loop
    let currentX = 0;
    let currentY = 0;
    let localTime = 0;

    const render = () => {
      localTime += 0.012;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      currentX += (mouse.targetX - currentX) * 0.08;
      currentY += (mouse.targetY - currentY) * 0.08;

      // Base auto-rotation plus mouse parallax
      rotationY = localTime * 0.18 + currentX * 0.35;
      const rotationX = 0.22 + currentY * 0.15; // slight downward tilt

      // Smooth hinge animation on hover
      targetHingeAngle = isHovered ? 1.82 : 1.95; // slightly close or open more
      hingeAngle += (targetHingeAngle - hingeAngle) * 0.08;

      // Floating / Bobbing effect
      const bobY = Math.sin(localTime * 1.8) * 0.07;

      // Projection function
      const scale = Math.min(width, height) * 0.75;
      const project = (p: Point3D): ProjectedPoint => {
        // 1. Rotate about X-axis (tilt)
        let x1 = p.x;
        let y1 = p.y * Math.cos(rotationX) - p.z * Math.sin(rotationX);
        let z1 = p.y * Math.sin(rotationX) + p.z * Math.cos(rotationX);

        // 2. Rotate about Y-axis (spin)
        let x2 = x1 * Math.cos(rotationY) + z1 * Math.sin(rotationY);
        let y2 = y1;
        let z2 = -x1 * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        // Translate camera
        const finalZ = z2 + cameraZ;
        if (finalZ <= 0.1) return { x: 0, y: 0, valid: false, z2: z2 };

        // Perspective projection
        const px = (x2 * scale) / finalZ + width / 2;
        const py = -(y2 * scale) / finalZ + height / 2 + 25; // offset down slightly
        return { x: px, y: py, valid: true, z2: z2 };
      };

      // Helper to draw a filled polygon
      const drawPoly = (points: ProjectedPoint[], fillStyle: string | CanvasGradient, strokeStyle?: string, lineWidth = 1) => {
        if (points.some((p) => !p.valid)) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();
        if (strokeStyle) {
          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      };

      // Define vertices of the base (bottom case) with vertical floating (bobY)
      const basePoints: Point3D[] = [
        { x: -w / 2, y: -baseT + bobY, z: 0 }, // 0: back left bottom
        { x: w / 2, y: -baseT + bobY, z: 0 },  // 1: back right bottom
        { x: w / 2, y: -baseT + bobY, z: d },  // 2: front right bottom
        { x: -w / 2, y: -baseT + bobY, z: d }, // 3: front left bottom
        { x: -w / 2, y: bobY, z: 0 },      // 4: back left top
        { x: w / 2, y: bobY, z: 0 },       // 5: back right top
        { x: w / 2, y: bobY, z: d },       // 6: front right top
        { x: -w / 2, y: bobY, z: d },      // 7: front left top
      ];

      // Keyboard area inset on the top of the base
      const kw = w * 0.85;
      const kd = d * 0.45;
      const kStart = d * 0.45;
      const kbPoints: Point3D[] = [
        { x: -kw / 2, y: bobY, z: kStart },
        { x: kw / 2, y: bobY, z: kStart },
        { x: kw / 2, y: bobY, z: kStart + kd },
        { x: -kw / 2, y: bobY, z: kStart + kd },
      ];

      // Trackpad inset on the base
      const tw = w * 0.3;
      const td = d * 0.25;
      const tStart = d * 0.1;
      const trackpadPoints: Point3D[] = [
        { x: -tw / 2, y: bobY, z: tStart },
        { x: tw / 2, y: bobY, z: tStart },
        { x: tw / 2, y: bobY, z: tStart + td },
        { x: -tw / 2, y: bobY, z: tStart + td },
      ];

      // Screen points. Screen rotates around hinge (z=0, y=0)
      const sPoints: Point3D[] = [
        { x: -w / 2, y: bobY, z: 0 }, // 0: hinge left
        { x: w / 2, y: bobY, z: 0 },  // 1: hinge right
        // top right rotated
        {
          x: w / 2,
          y: h * Math.sin(hingeAngle) + bobY,
          z: -h * Math.cos(hingeAngle),
        },
        // top left rotated
        {
          x: -w / 2,
          y: h * Math.sin(hingeAngle) + bobY,
          z: -h * Math.cos(hingeAngle),
        },
      ];

      // Screen inner area (the display panel itself)
      const border = 0.08;
      const innerW = w - border * 2;
      const innerH = h - border * 2;
      const displayPoints: Point3D[] = [
        {
          x: -innerW / 2,
          y: border * Math.sin(hingeAngle) + bobY,
          z: -border * Math.cos(hingeAngle),
        },
        {
          x: innerW / 2,
          y: border * Math.sin(hingeAngle) + bobY,
          z: -border * Math.cos(hingeAngle),
        },
        {
          x: innerW / 2,
          y: (border + innerH) * Math.sin(hingeAngle) + bobY,
          z: -(border + innerH) * Math.cos(hingeAngle),
        },
        {
          x: -innerW / 2,
          y: (border + innerH) * Math.sin(hingeAngle) + bobY,
          z: -(border + innerH) * Math.cos(hingeAngle),
        },
      ];

      // Project all vertices
      const projBase = basePoints.map(project);
      const projKb = kbPoints.map(project);
      const projTrackpad = trackpadPoints.map(project);
      const projScreen = sPoints.map(project);
      const projDisplay = displayPoints.map(project);

      // We'll prepare 3D objects with depth tracking (z2) for Painter's sorting.
      // Laptop center depth is roughly at z2 of center of the base:
      const laptopCenter = project({ x: 0, y: bobY, z: d / 2 });
      const laptopDepth = laptopCenter.z2 || 0;

      // Helper to render individual floating shapes
      const drawFloatingObject = (obj: FloatingObject) => {
        const dynY = obj.y + Math.sin(localTime * obj.speedY + obj.phase) * 0.18 + bobY * 0.5;
        const dynX = obj.x + Math.sin(localTime * 0.2 + obj.phase) * 0.08;
        const dynZ = obj.z + Math.cos(localTime * 0.15 + obj.phase) * 0.08;

        const proj = project({ x: dynX, y: dynY, z: dynZ });
        if (!proj.valid || proj.z2 === undefined) return;

        const pSize = Math.max(2, (obj.size * scale) / (proj.z2 + cameraZ));

        // Glass Cube rendering
        if (obj.type === "cube") {
          const hs = obj.size * 0.7;
          const rotAngle = localTime * obj.speedRot + obj.phase;
          
          // Local rotated 8 vertices of a cube
          const localVerts: Point3D[] = [
            { x: -hs, y: -hs, z: -hs }, { x: hs, y: -hs, z: -hs },
            { x: hs, y: hs, z: -hs }, { x: -hs, y: hs, z: -hs },
            { x: -hs, y: -hs, z: hs }, { x: hs, y: -hs, z: hs },
            { x: hs, y: hs, z: hs }, { x: -hs, y: hs, z: hs }
          ];

          // Rotate locally on Y and X, then translate to dynamic position
          const rotatedVerts = localVerts.map(v => {
            // Y-rot
            let x1 = v.x * Math.cos(rotAngle) - v.z * Math.sin(rotAngle);
            let z1 = v.x * Math.sin(rotAngle) + v.z * Math.cos(rotAngle);
            // X-rot
            let y2 = v.y * Math.cos(rotAngle * 0.5) - z1 * Math.sin(rotAngle * 0.5);
            let z2 = v.y * Math.sin(rotAngle * 0.5) + z1 * Math.cos(rotAngle * 0.5);
            
            return {
              x: dynX + x1,
              y: dynY + y2,
              z: dynZ + z2
            };
          });

          const projCube = rotatedVerts.map(project);
          
          // Draw glass facets
          ctx.save();
          ctx.lineJoin = "round";
          
          // Back faces
          drawPoly([projCube[4], projCube[5], projCube[6], projCube[7]], "rgba(255,255,255,0.01)", "rgba(255, 255, 255, 0.05)", 0.5);
          drawPoly([projCube[0], projCube[1], projCube[5], projCube[4]], "rgba(255,255,255,0.01)", "rgba(255, 255, 255, 0.05)", 0.5);
          
          // Front faces (more glowing)
          drawPoly([projCube[0], projCube[1], projCube[2], projCube[3]], obj.color, obj.glowColor, 1);
          drawPoly([projCube[1], projCube[2], projCube[6], projCube[5]], "rgba(255,255,255,0.02)", obj.glowColor, 0.7);
          drawPoly([projCube[2], projCube[3], projCube[7], projCube[6]], "rgba(255,255,255,0.02)", obj.glowColor, 0.7);
          drawPoly([projCube[3], projCube[0], projCube[4], projCube[7]], "rgba(255,255,255,0.02)", obj.glowColor, 0.7);
          
          ctx.restore();
        }

        // Spherical glow object
        else if (obj.type === "sphere") {
          const sGrad = ctx.createRadialGradient(
            proj.x - pSize * 0.25, proj.y - pSize * 0.25, pSize * 0.05,
            proj.x, proj.y, pSize
          );
          sGrad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
          sGrad.addColorStop(0.3, obj.color);
          sGrad.addColorStop(0.85, "rgba(10, 10, 15, 0.85)");
          sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = sGrad;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pSize, 0, 2 * Math.PI);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Thin Glowing Ring
        else if (obj.type === "ring") {
          ctx.save();
          ctx.translate(proj.x, proj.y);
          ctx.rotate(localTime * 0.4 + obj.phase);
          
          const rx = pSize * 1.4;
          const ry = pSize * 0.4;
          
          // Outer glow ring
          ctx.strokeStyle = obj.glowColor;
          ctx.lineWidth = 2;
          ctx.shadowColor = obj.glowColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
          ctx.stroke();

          // Sharp inner ring
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
          ctx.stroke();

          ctx.restore();
        }

        // Holographic miniature UI card
        else if (obj.type === "ui") {
          const uw = pSize * 1.5;
          const uh = pSize * 0.9;
          
          ctx.save();
          ctx.shadowColor = "rgba(59, 130, 246, 0.15)";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "rgba(10, 10, 18, 0.75)";
          ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
          ctx.lineWidth = 1;
          
          ctx.beginPath();
          ctx.roundRect(proj.x - uw / 2, proj.y - uh / 2, uw, uh, 4);
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Drawing decorative neon mock statistics inside glass card
          ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
          ctx.fillRect(proj.x - uw * 0.38, proj.y - uh * 0.24, uw * 0.35, 2.5);
          
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.fillRect(proj.x - uw * 0.38, proj.y - uh * 0.02, uw * 0.76, 1.5);
          ctx.fillRect(proj.x - uw * 0.38, proj.y + uh * 0.18, uw * 0.5, 1.5);
          
          // Miniature flashing status light
          ctx.fillStyle = (Math.floor(localTime * 4) % 2 === 0) ? "rgba(147, 51, 234, 0.9)" : "rgba(59, 130, 246, 0.9)";
          ctx.beginPath();
          ctx.arc(proj.x + uw * 0.34, proj.y - uh * 0.24, 2.2, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        }

        // Soft glowing particle
        else if (obj.type === "particle") {
          const rad = pSize * 2.5;
          const pGrad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, rad);
          pGrad.addColorStop(0, obj.color);
          pGrad.addColorStop(0.3, "rgba(139, 92, 246, 0.35)");
          pGrad.addColorStop(1, "rgba(0,0,0,0)");
          
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, rad, 0, 2 * Math.PI);
          ctx.fill();
        }
      };

      // 1. Render BACKGROUND objects (depth: z2 > laptopDepth)
      floatingObjects.forEach(obj => {
        const dynY = obj.y + Math.sin(localTime * obj.speedY + obj.phase) * 0.18 + bobY * 0.5;
        const dynX = obj.x + Math.sin(localTime * 0.2 + obj.phase) * 0.08;
        const dynZ = obj.z + Math.cos(localTime * 0.15 + obj.phase) * 0.08;
        const tempProj = project({ x: dynX, y: dynY, z: dynZ });
        if (tempProj.valid && tempProj.z2 !== undefined && tempProj.z2 > laptopDepth) {
          drawFloatingObject(obj);
        }
      });

      // 2. Render Laptop Shadow (scaled gently with bobY for realistic floating weight)
      const centerProj = project({ x: 0, y: -baseT + bobY, z: d / 2 });
      if (centerProj.valid) {
        // As the laptop floats higher, the shadow spreads and fades out
        const heightScale = 1 + bobY * 1.5; // range roughly 0.9 to 1.1
        const shadowRadius = Math.max(0.001, scale * 0.62 * heightScale);
        const shadowOpacityMax = 0.28 / (heightScale * heightScale);
        const shadowOpacityMid = 0.09 / heightScale;

        const grd = ctx.createRadialGradient(
          centerProj.x,
          centerProj.y + 12,
          Math.min(10, shadowRadius * 0.3),
          centerProj.x,
          centerProj.y + 12,
          shadowRadius
        );
        grd.addColorStop(0, `rgba(139, 92, 246, ${shadowOpacityMax})`);
        grd.addColorStop(0.5, `rgba(59, 130, 246, ${shadowOpacityMid})`);
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(centerProj.x, centerProj.y + 15, shadowRadius, Math.max(0.001, scale * 0.12 * heightScale), 0, 0, 2 * Math.PI);
        ctx.fill();
      }

      // 3. Draw laptop base body
      const baseGrad = ctx.createLinearGradient(0, height / 2, width, height / 2);
      baseGrad.addColorStop(0, "rgba(12, 12, 18, 0.96)");
      baseGrad.addColorStop(0.5, "rgba(22, 22, 34, 0.96)");
      baseGrad.addColorStop(1, "rgba(8, 8, 12, 0.96)");

      // Bottom face
      drawPoly([projBase[0], projBase[1], projBase[2], projBase[3]], "rgba(8, 8, 10, 0.92)");
      // Front face
      drawPoly([projBase[3], projBase[2], projBase[6], projBase[7]], "rgba(16, 16, 22, 0.96)", "rgba(59, 130, 246, 0.2)");
      // Left face
      drawPoly([projBase[0], projBase[3], projBase[7], projBase[4]], "rgba(12, 12, 18, 0.96)", "rgba(255, 255, 255, 0.04)");
      // Right face
      drawPoly([projBase[1], projBase[2], projBase[6], projBase[5]], "rgba(10, 10, 14, 0.96)", "rgba(255, 255, 255, 0.04)");
      // Base top face
      drawPoly([projBase[4], projBase[5], projBase[6], projBase[7]], baseGrad, "rgba(255, 255, 255, 0.07)", 1);

      // Keyboard tray & Keys
      drawPoly(projKb, "rgba(6, 6, 10, 0.95)", "rgba(147, 51, 234, 0.12)", 1);
      
      // Keyboard grids
      if (!projKb.some(p => !p.valid)) {
        ctx.strokeStyle = "rgba(139, 92, 246, 0.06)";
        ctx.lineWidth = 0.5;
        const keyLinesCount = 5;
        for (let i = 1; i < keyLinesCount; i++) {
          const t = i / keyLinesCount;
          const leftX = projKb[0].x + (projKb[3].x - projKb[0].x) * t;
          const leftY = projKb[0].y + (projKb[3].y - projKb[0].y) * t;
          const rightX = projKb[1].x + (projKb[2].x - projKb[1].x) * t;
          const rightY = projKb[1].y + (projKb[2].y - projKb[1].y) * t;
          ctx.beginPath();
          ctx.moveTo(leftX, leftY);
          ctx.lineTo(rightX, rightY);
          ctx.stroke();
        }
      }

      // Trackpad
      drawPoly(projTrackpad, "rgba(20, 20, 30, 0.35)", "rgba(255, 255, 255, 0.05)", 1);

      // Draw screen back lid
      drawPoly(projScreen, "rgba(10, 10, 14, 0.96)", "rgba(255, 255, 255, 0.06)", 1);

      // Draw screen display panel (inside content)
      if (!projDisplay.some((p) => !p.valid)) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(projDisplay[0].x, projDisplay[0].y);
        ctx.lineTo(projDisplay[1].x, projDisplay[1].y);
        ctx.lineTo(projDisplay[2].x, projDisplay[2].y);
        ctx.lineTo(projDisplay[3].x, projDisplay[3].y);
        ctx.closePath();
        ctx.clip();

        // Screen background gradient (dark cyberpunk theme)
        const screenGrad = ctx.createLinearGradient(
          projDisplay[0].x,
          projDisplay[0].y,
          projDisplay[2].x,
          projDisplay[2].y
        );
        screenGrad.addColorStop(0, "#06050b");
        screenGrad.addColorStop(0.5, "#0b0918");
        screenGrad.addColorStop(1, "#030306");
        ctx.fillStyle = screenGrad;
        ctx.fillRect(0, 0, width, height);

        // Render abstract beautiful mock dashboard website
        const centerX = (projDisplay[0].x + projDisplay[2].x) / 2;
        const centerY = (projDisplay[0].y + projDisplay[2].y) / 2;
        const dispW = projDisplay[1].x - projDisplay[0].x;
        const dispH = projDisplay[3].y - projDisplay[0].y;

        // Draw an elegant pulsing neon circle in the center representing website logo or status
        const pulseRadius = Math.max(0.001, dispW * 0.18 + Math.sin(localTime * 2.5) * 5);
        const pulseGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius * 1.5);
        pulseGrad.addColorStop(0, "rgba(147, 51, 234, 0.15)");
        pulseGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.05)");
        pulseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = pulseGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius * 1.5, 0, 2 * Math.PI);
        ctx.fill();

        // Browser Header Bar mockup
        ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        const barH = dispH * 0.1;
        ctx.beginPath();
        ctx.moveTo(projDisplay[0].x, projDisplay[0].y);
        ctx.lineTo(projDisplay[1].x, projDisplay[1].y);
        ctx.lineTo(projDisplay[1].x + (projDisplay[2].x - projDisplay[1].x) * 0.1, projDisplay[1].y + (projDisplay[2].y - projDisplay[1].y) * 0.1);
        ctx.lineTo(projDisplay[0].x + (projDisplay[3].x - projDisplay[0].x) * 0.1, projDisplay[0].y + (projDisplay[3].y - projDisplay[0].y) * 0.1);
        ctx.closePath();
        ctx.fill();

        // Browser Window Dots (red, yellow, green)
        const dotOffset = dispW * 0.03;
        ctx.fillStyle = "rgba(239, 68, 68, 0.6)"; // Red
        ctx.beginPath();
        ctx.arc(projDisplay[0].x + dotOffset, projDisplay[0].y + barH * 0.5, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "rgba(245, 158, 11, 0.6)"; // Yellow
        ctx.beginPath();
        ctx.arc(projDisplay[0].x + dotOffset * 1.7, projDisplay[0].y + barH * 0.5, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "rgba(16, 185, 129, 0.6)"; // Green
        ctx.beginPath();
        ctx.arc(projDisplay[0].x + dotOffset * 2.4, projDisplay[0].y + barH * 0.5, 2, 0, 2 * Math.PI);
        ctx.fill();

        // Website UI mockup blocks
        ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 0.5;

        // Draw Left Card (Sidemenu)
        ctx.beginPath();
        ctx.rect(projDisplay[0].x + dispW * 0.05, projDisplay[0].y + dispH * 0.15, dispW * 0.22, dispH * 0.8);
        ctx.fill();
        ctx.stroke();

        // Draw Top-right Stat Card
        ctx.beginPath();
        ctx.rect(projDisplay[0].x + dispW * 0.32, projDisplay[0].y + dispH * 0.15, dispW * 0.3, dispH * 0.3);
        ctx.fill();
        ctx.stroke();

        // Draw Top-far-right Stat Card
        ctx.beginPath();
        ctx.rect(projDisplay[0].x + dispW * 0.65, projDisplay[0].y + dispH * 0.15, dispW * 0.3, dispH * 0.3);
        ctx.fill();
        ctx.stroke();

        // Draw Main Bottom Chart Card
        ctx.beginPath();
        ctx.rect(projDisplay[0].x + dispW * 0.32, projDisplay[0].y + dispH * 0.5, dispW * 0.63, dispH * 0.45);
        ctx.fill();
        ctx.stroke();

        // Draw elegant glowing chart lines inside main chart card
        ctx.strokeStyle = "rgba(168, 85, 247, 0.65)"; // Purple
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const startChartX = projDisplay[0].x + dispW * 0.35;
        const startChartY = projDisplay[0].y + dispH * 0.85;
        const chartStep = dispW * 0.09;
        ctx.moveTo(startChartX, startChartY);
        for (let i = 1; i <= 6; i++) {
          const val = Math.sin(localTime * 1.8 + i * 1.2) * (dispH * 0.12) + (dispH * 0.1);
          ctx.lineTo(startChartX + i * chartStep, startChartY - val);
        }
        ctx.stroke();

        // Secondary blue line chart
        ctx.strokeStyle = "rgba(59, 130, 246, 0.65)"; // Blue
        ctx.beginPath();
        ctx.moveTo(startChartX, startChartY - 10);
        for (let i = 1; i <= 6; i++) {
          const val = Math.cos(localTime * 1.5 + i * 0.8) * (dispH * 0.09) + (dispH * 0.15);
          ctx.lineTo(startChartX + i * chartStep, startChartY - val);
        }
        ctx.stroke();

        // Reflections sweeping across the screen display for luxury finish
        const glarePos = ((localTime * 0.15) % 2.5) - 0.8; // moves from left to right
        const glareGrd = ctx.createLinearGradient(
          projDisplay[0].x + dispW * glarePos, projDisplay[0].y,
          projDisplay[0].x + dispW * (glarePos + 0.35), projDisplay[0].y
        );
        glareGrd.addColorStop(0, "rgba(255,255,255,0)");
        glareGrd.addColorStop(0.5, "rgba(255,255,255,0.06)");
        glareGrd.addColorStop(1, "rgba(255,255,255,0)");
        
        ctx.fillStyle = glareGrd;
        ctx.beginPath();
        ctx.moveTo(projDisplay[0].x + dispW * glarePos, projDisplay[0].y);
        ctx.lineTo(projDisplay[0].x + dispW * (glarePos + 0.35), projDisplay[0].y);
        ctx.lineTo(projDisplay[3].x + dispW * (glarePos + 0.15), projDisplay[3].y);
        ctx.lineTo(projDisplay[3].x + dispW * (glarePos - 0.2), projDisplay[3].y);
        ctx.closePath();
        ctx.fill();

        // Text Skeletons
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(projDisplay[0].x + dispW * 0.36, projDisplay[0].y + dispH * 0.22, dispW * 0.15, 3);
        ctx.fillStyle = "rgba(59, 130, 246, 0.7)"; 
        ctx.fillRect(projDisplay[0].x + dispW * 0.36, projDisplay[0].y + dispH * 0.3, dispW * 0.08, 5);

        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(projDisplay[0].x + dispW * 0.69, projDisplay[0].y + dispH * 0.22, dispW * 0.15, 3);
        ctx.fillStyle = "rgba(168, 85, 247, 0.7)"; 
        ctx.fillRect(projDisplay[0].x + dispW * 0.69, projDisplay[0].y + dispH * 0.3, dispW * 0.1, 5);

        // Sidebar List
        for (let j = 0; j < 5; j++) {
          ctx.fillStyle = j === 0 ? "rgba(147, 51, 234, 0.25)" : "rgba(255, 255, 255, 0.03)";
          ctx.fillRect(
            projDisplay[0].x + dispW * 0.08,
            projDisplay[0].y + dispH * 0.22 + j * dispH * 0.13,
            dispW * 0.16,
            dispH * 0.08
          );
        }

        ctx.restore();
      }

      // Draw screen front bezels
      drawPoly(projScreen, "rgba(0, 0, 0, 0)", "rgba(59, 130, 246, 0.12)", 2);
      
      // Camera dot
      const camProj = project({
        x: 0,
        y: h * Math.sin(hingeAngle) - border * 0.5 * Math.sin(hingeAngle) + bobY,
        z: -h * Math.cos(hingeAngle) + border * 0.5 * Math.cos(hingeAngle),
      });
      if (camProj.valid) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
        ctx.beginPath();
        ctx.arc(camProj.x, camProj.y, 1.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Bottom screen logo
      const logoProj = project({
        x: 0,
        y: border * 0.5 * Math.sin(hingeAngle) + bobY,
        z: -border * 0.5 * Math.cos(hingeAngle),
      });
      if (logoProj.valid) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.font = '6px "JetBrains Mono"';
        ctx.textAlign = "center";
        ctx.fillText("DEVSTUDIO", logoProj.x, logoProj.y + 2);
      }

      // 4. Render FOREGROUND objects (depth: z2 <= laptopDepth)
      floatingObjects.forEach(obj => {
        const dynY = obj.y + Math.sin(localTime * obj.speedY + obj.phase) * 0.18 + bobY * 0.5;
        const dynX = obj.x + Math.sin(localTime * 0.2 + obj.phase) * 0.08;
        const dynZ = obj.z + Math.cos(localTime * 0.15 + obj.phase) * 0.08;
        const tempProj = project({ x: dynX, y: dynY, z: dynZ });
        if (tempProj.valid && tempProj.z2 !== undefined && tempProj.z2 <= laptopDepth) {
          drawFloatingObject(obj);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mouse, isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouse({ x: 0, y: 0, targetX: 0, targetY: 0 });
      }}
    >
      {/* Dynamic ambient halo behind laptop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[150px] md:h-[200px] bg-purple-600/10 blue-glow rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:bg-purple-600/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[250px] h-[100px] md:h-[150px] bg-blue-600/10 purple-glow rounded-full blur-[60px] pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:bg-blue-600/15" />

      {/* Actual 3D Canvas rendering */}
      <canvas
        ref={canvasRef}
        id="rotating-laptop"
        className="w-full h-full block z-10"
        style={{ maxWidth: "550px", maxHeight: "450px" }}
      />

      {/* Floating Interaction Tips */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 border border-white/5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-gray-400 uppercase pointer-events-none backdrop-blur-sm shadow-xl flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        Move Cursor to Tilt & Explore
      </div>
    </div>
  );
}

