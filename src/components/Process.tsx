import { motion } from "motion/react";
import { ArrowDown, Check, Sparkles } from "lucide-react";
import { PROCESS_STEPS } from "../data";

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background radial spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] left-[10%] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto z-10 relative select-none">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            OUR STRATEGIC ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            The Production Pipeline
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            A highly structured, transparent development sequence engineered to eliminate guesswork and guarantee premium results.
          </p>
        </div>

        {/* Vertical/Stacked Roadmap Cards */}
        <div className="relative space-y-12">
          {PROCESS_STEPS.map((step, idx) => {
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <div key={step.step} className="relative">
                {/* Visual connecting arrow indicator between cards */}
                {!isLast && (
                  <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-30">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-indigo-400" />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 rounded-3xl glass-panel border border-white/5 hover:border-purple-500/20 shadow-2xl relative group overflow-hidden"
                >
                  {/* Subtle animated light strip on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                  {/* Left block: Step Number and Titles */}
                  <div className="md:col-span-4 flex items-start gap-4">
                    {/* Big glowing numbers */}
                    <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 select-none">
                      {step.step}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-400 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Center block: Description */}
                  <div className="md:col-span-4 flex items-center">
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>

                  {/* Right block: Action Deliverables list */}
                  <div className="md:col-span-4 p-4 rounded-2xl bg-[#09090c] border border-white/5 flex flex-col justify-center">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      Key Deliverables
                    </span>
                    
                    <ul className="space-y-1.5">
                      {step.deliverables.map((del) => (
                        <li key={del} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-[10px] font-medium text-zinc-300 tracking-wide truncate">
                            {del}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
