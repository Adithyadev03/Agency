import { motion } from "motion/react";
import { Check, GraduationCap, MapPin, Code, Sparkles, Binary } from "lucide-react";

export default function AboutFounder() {
  const highlights = [
    "Fast & Responsive",
    "Mobile Optimized",
    "SEO Ready",
    "Modern UI/UX",
    "Ongoing Support",
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-[#050505] border-t border-white/5"
    >
      {/* Background radial blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center lg:text-left mb-16 select-none gsap-blur-reveal">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            THE FORCE BEHIND THE STUDIO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            Meet the Founder
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Premium Portrait Box */}
          <div className="lg:col-span-5 flex justify-center gsap-scale-reveal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-3xl"
            >
              {/* Animated Rotating Glowing Border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 opacity-70 blur-md animate-pulse" />

              {/* Portrait container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center">
                {/* Techy abstract programmer photo */}
                <img
                  src="/profile.jpeg"
                  alt="Adithyadev M."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-[1.15] brightness-[0.85] hover:grayscale-0 transition-all duration-700"
                />

                {/* Glass card overlay inside photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">
                      Available for Projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating tech elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 px-4 py-2 rounded-2xl glass-panel-glow border border-white/10 flex items-center gap-2 shadow-2xl"
              >
                <Code className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono text-zinc-300">Clean Code</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-16 -left-6 px-4 py-2 rounded-2xl glass-panel-glow border border-white/10 flex items-center gap-2 shadow-2xl"
              >
                <Binary className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-mono text-zinc-300">Analytics driven</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Copy & Info */}
          <div className="lg:col-span-7 flex flex-col select-none gsap-slide-left">
            {/* Founder details */}
            <div className="mb-6">
              <h3 className="text-4xl font-display font-bold text-white tracking-tight">
                Adithyadev M.
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Founder & Lead Web Developer
                </span>
                
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden sm:block" />
                
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>NIT Rourkela</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Rourkela, India</span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                "I founded this studio with one simple goal—build websites that don't just look beautiful, but actually help businesses grow.
              </p>
              <p>
                Every project is crafted with performance, modern design, responsiveness, and user experience in mind. Whether it's a local business or a growing brand, my focus is creating websites that leave a lasting impression.
              </p>
              <p className="border-l-2 border-purple-500/50 pl-4 py-1 italic bg-purple-500/3 rounded-r-lg text-zinc-300">
                As a Chemical Engineering student at NIT Rourkela, I combine analytical thinking with creative design to deliver professional digital experiences."
              </p>
            </div>

            {/* Checklist of guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 mb-8 border-t border-white/5 pt-6">
              {highlights.map((hl) => (
                <div key={hl} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-300 font-sans">{hl}</span>
                </div>
              ))}
            </div>

            {/* Signature effect */}
            <div className="flex flex-col items-start pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">
                EXECUTIVE SIGN-OFF
              </span>
              
              {/* Handcrafted animated SVG signature representing "Adithyadev" */}
              <div className="h-16 w-48 relative overflow-hidden flex items-center justify-start text-zinc-300">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 160 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-90"
                >
                  <motion.path
                    d="M10 25C25 10 30 12 35 25C40 38 45 35 50 20C55 5 58 10 65 30C72 50 78 40 85 22C92 4 95 18 100 28C105 38 110 32 115 22C120 12 125 15 130 25C135 35 140 30 150 15"
                    stroke="url(#sig-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.path
                    d="M45 42C75 40 100 38 140 32"
                    stroke="rgba(168, 85, 247, 0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
                  />
                  <defs>
                    <linearGradient id="sig-gradient" x1="10" y1="25" x2="150" y2="15" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
