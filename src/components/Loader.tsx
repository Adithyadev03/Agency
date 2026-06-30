import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = ["PREPARING SPACE", "TRANSLATING IDEAS", "ENGINEERING PERFECTION", "ESTABLISHING CHANNELS", "RAVENS DEV READY"];

  useEffect(() => {
    // Staggered text change
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 450);

    // Fast loading count
    const duration = 1600; // ms
    const intervalTime = 16; // ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 4;
        if (next >= 100) {
          clearInterval(timer);
          clearInterval(textInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="luxury-loader"
        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-between p-8 md:p-16 select-none"
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Top Header info */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          <div>ADITHYADEV M. // NIT ROURKELA</div>
          <div className="hidden sm:block">PREMIUM WEB AGENCY ©2026</div>
        </div>

        {/* Center count and text */}
        <div className="flex flex-col items-center gap-6">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-white flex items-center gap-3"
            >
              RAVENS<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-sans">.DEV</span>
            </motion.h1>
          </div>

          {/* Subtext reveal */}
          <div className="h-6 flex items-center justify-center">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono tracking-widest text-indigo-400"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </div>
        </div>

        {/* Bottom Progress details */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              INITIALIZING INTERFACE ENGINE
            </div>
            <div className="text-5xl sm:text-7xl font-mono font-medium text-white tracking-tighter">
              {Math.min(100, Math.floor(progress)).toString().padStart(3, "0")}%
            </div>
          </div>
          
          {/* Progress bar line */}
          <div className="w-full h-[1px] bg-zinc-900 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
