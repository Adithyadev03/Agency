import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Gauge,
  Smartphone,
  TrendingUp,
  DollarSign,
  Shield,
  HeartHandshake,
} from "lucide-react";
import { WHY_CHOOSE_US } from "../data";
import { WhyReason } from "../types";

// Lucide icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Gauge,
  Smartphone,
  TrendingUp,
  DollarSign,
  Shield,
  HeartHandshake,
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto z-10 relative select-none">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            WHY PARTNER WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            The Competitive Edge
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            We merge analytical engineering rigor with world-class agency design quality to generate tangible results.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative">
          {/* Central Vertical Line (hidden on tiny screens, left-aligned on mobile, centered on desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-20 md:-translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24">
            {WHY_CHOOSE_US.map((reason, idx) => {
              const IconComponent = iconMap[reason.iconName] || Sparkles;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={reason.id}
                  className="relative flex flex-col md:flex-row items-stretch"
                >
                  {/* Icon Node Indicator on the timeline line */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="w-9 h-9 rounded-full bg-[#050505] border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:border-purple-500/50 transition-colors"
                    >
                      <IconComponent className="w-4.5 h-4.5 text-indigo-400" />
                    </motion.div>
                  </div>

                  {/* Left Side (Desktop: displays details for Even, metrics for Odd) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right flex flex-col md:justify-center items-start md:items-end">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                      >
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md md:ml-auto">
                          {reason.description}
                        </p>
                      </motion.div>
                    ) : (
                      /* Big glowing metric representing result focus */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start md:items-end mb-4 md:mb-0"
                      >
                        <span className="text-4xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-tighter">
                          {reason.metric}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                          {reason.metricLabel}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Spacer for central layout alignment */}
                  <div className="hidden md:block w-0" />

                  {/* Right Side (Desktop: displays metrics for Even, details for Odd) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 flex flex-col justify-center items-start">
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                      >
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
                          {reason.description}
                        </p>
                      </motion.div>
                    ) : (
                      /* Big glowing metric representing result focus */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start mb-4 md:mb-0"
                      >
                        <span className="text-4xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tighter">
                          {reason.metric}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-1">
                          {reason.metricLabel}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
