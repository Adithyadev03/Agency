import { motion } from "motion/react";
import { TECHNOLOGIES } from "../data";

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto z-10 relative select-none">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            OUR TECHNICAL ARMORY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            The Technology Stack
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            We use industry-leading frameworks, edge hosting environments, and advanced animation engines to construct bleeding-edge visual systems.
          </p>
        </div>

        {/* Floating Badges Cloud container */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {TECHNOLOGIES.map((tech, idx) => {
            // Give each badge a slightly different random float behavior using CSS variables or Framer motion properties
            const randomDuration = 4 + (idx % 3) * 1.5;
            const randomDelay = (idx % 4) * 0.4;

            return (
              <motion.div
                key={tech.name}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: randomDelay,
                }}
                whileHover={{
                  scale: 1.15,
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  backgroundColor: "rgba(168, 85, 247, 0.05)",
                  boxShadow: "0 0 25px rgba(168, 85, 247, 0.2)",
                  y: -12,
                }}
                className="px-5 py-3 rounded-2xl glass-panel border border-white/5 flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[130px] shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {/* Tech Name */}
                <span className="text-sm font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  {tech.name}
                </span>

                {/* Subcategory Label */}
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  {tech.category}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Technical standards overview info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 border-t border-white/5 pt-12 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">SEMANTIC</div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-0.5">HTML5 Engine</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">COMPILER</div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-0.5">Vite + Bundlers</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">CDN</div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-0.5">Edge Cloud Deploy</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">WCAG 2.1</div>
            <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase mt-0.5">Accessible code</div>
          </div>
        </div>
      </div>
    </section>
  );
}
