import { motion } from "motion/react";
import { ArrowRight, Sparkles, Shield, Trophy, Activity } from "lucide-react";
import LaptopCanvas from "./LaptopCanvas";
import BackgroundCanvas from "./BackgroundCanvas";
import CountUp from "./CountUp";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Stats Counters data
  const stats = [
    { value: "2+", label: "Premium Projects", icon: Trophy, color: "text-purple-400" },
    { value: "99%", label: "Lighthouse Performance", icon: Activity, color: "text-emerald-400" },
    { value: "100%", label: "Happy Clients", icon: Shield, color: "text-blue-400" },
  ];

  // Headline words for staggered reveal
  const headlineWords = "Building Digital Experiences That Grow Businesses.".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden bg-[#050505]"
    >
      {/* 100% Interactive Living Background Canvas */}
      <BackgroundCanvas />

      {/* Subtle overlay shading for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left: Headline & Description */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start select-none">
          {/* Elite badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono font-medium text-indigo-300 tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            Bespoke Web Studio
          </motion.div>

          {/* Headline with elegant word-by-word fade */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.15] max-w-2xl"
          >
            {headlineWords.map((word, idx) => {
              if (word.toLowerCase().includes("experiences")) {
                return (
                  <motion.span
                    variants={wordVariants}
                    key={idx}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-glow text-shimmer mr-2 sm:mr-3"
                  >
                    {word}{" "}
                  </motion.span>
                );
              }
              return (
                <motion.span
                  variants={wordVariants}
                  key={idx}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="text-zinc-400 text-base sm:text-lg font-sans max-w-xl mb-8 leading-relaxed"
          >
            We design premium websites that help businesses attract more customers, build trust, and grow online.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("#portfolio")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#050505] font-semibold text-sm hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/5 group clickable glow-btn"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("#free-preview")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/30 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group clickable glow-btn"
            >
              <span>Get Free Website Preview</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:animate-ping" />
            </motion.button>
          </motion.div>

          {/* Animated Statistics */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full border-t border-white/5 pt-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 + idx * 0.15, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center lg:items-start group/stat cursor-default"
              >
                <div className="flex items-center gap-1.5 mb-1 text-zinc-500">
                  {/* Dynamic icon entry rotation & draw-in effect */}
                  <motion.div
                    initial={{ rotate: -90, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + idx * 0.15 }}
                    className="p-1 rounded-md bg-white/0 group-hover/stat:bg-white/5 transition-colors"
                  >
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color} transition-transform duration-300 group-hover/stat:scale-110`} />
                  </motion.div>
                  <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:block">
                    {stat.label.split(" ")[0]}
                  </span>
                </div>
                
                <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                  <CountUp value={stat.value} />
                </span>
                
                <span className="text-[9px] sm:text-[10px] text-zinc-500 tracking-wide font-sans text-center lg:text-left">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Custom 3D Laptop Graphic */}
        <div className="lg:col-span-5 w-full flex items-center justify-center select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md lg:max-w-none relative"
          >
            <LaptopCanvas />
          </motion.div>
        </div>
      </div>

      {/* Elegant scroll bottom prompt with interactive glowing ring / mouse layout */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full border border-zinc-500 flex justify-center p-1"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 rounded-full bg-indigo-400"
          />
        </motion.div>
      </div>
    </section>
  );
}

