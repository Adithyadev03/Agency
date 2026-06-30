import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Motion values for lag-free positioning
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for elastic drag/trailing effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if mouse input is available
    const touchCheck = window.matchMedia("(any-hover: none)").matches;
    setIsTouchDevice(touchCheck);
    if (touchCheck) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Elevate scale if hover over clickable tags
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.getAttribute("role") === "button";
      
      setIsHoveringClickable(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Glow Follower */}
      <motion.div
        id="cursor-glow"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/30 bg-purple-500/5 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHoveringClickable ? 1.8 : 1,
          borderColor: isHoveringClickable ? "rgba(59, 130, 246, 0.5)" : "rgba(168, 85, 247, 0.3)",
          background: isHoveringClickable ? "rgba(59, 130, 246, 0.08)" : "rgba(168, 85, 247, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-500/50"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHoveringClickable ? 0.5 : 1,
        }}
      />
    </>
  );
}
