import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  Utensils,
  Stethoscope,
  GraduationCap,
  Compass,
  Zap,
  User,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";

// Dynamic Lucide icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Briefcase,
  Utensils,
  Stethoscope,
  GraduationCap,
  Compass,
  Zap,
  User,
  RefreshCw,
  ShieldCheck,
};

// Custom interactive 3D Tilting Card component
function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Convert to rotation limits (max 10 degrees tilt)
    const tiltX = (y / (height / 2)) * -8;
    const tiltY = (x / (width / 2)) * 8;

    setRotateX(tiltX);
    setRotateY(tiltY);

    // Glow position percentage (0-100)
    const glPercentX = ((e.clientX - rect.left) / width) * 100;
    const glPercentY = ((e.clientY - rect.top) / height) * 100;
    setGlowX(glPercentX);
    setGlowY(glPercentY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  const IconComponent = iconMap[service.iconName] || Briefcase;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative aspect-[4/5.2] sm:aspect-[4/4.8] lg:aspect-[4/5] rounded-3xl p-6 md:p-8 glass-panel-glow border border-white/5 hover:border-purple-500/20 overflow-hidden flex flex-col justify-between group cursor-pointer"
    >
      {/* Dynamic Cursor spotlight glow layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 120px at ${glowX}% ${glowY}%, rgba(139, 92, 246, 0.15), transparent 70%)`,
        }}
      />

      {/* Grid Pattern inside Card */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

      {/* Top Section: Icon and Badges */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Glowing Icon holder */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.accentColor} p-[1px] shadow-lg group-hover:scale-110 transition-transform duration-500`}
          >
            <div className="w-full h-full rounded-2xl bg-zinc-950 flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Optional Badge */}
          {service.badge && (
            <span
              style={{ transform: "translateZ(20px)" }}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono tracking-widest text-indigo-300 uppercase font-semibold"
            >
              <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3
          style={{ transform: "translateZ(25px)" }}
          className="text-xl font-display font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-colors"
        >
          {service.title}
        </h3>
        
        <p
          style={{ transform: "translateZ(15px)" }}
          className="text-xs text-zinc-400 leading-relaxed font-sans mb-6"
        >
          {service.description}
        </p>
      </div>

      {/* Bottom Section: Features bullets */}
      <div style={{ transform: "translateZ(10px)" }} className="border-t border-white/5 pt-4">
        <ul className="space-y-2">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-[10px] font-medium text-zinc-300 tracking-wide font-sans truncate">
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[30%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-20 select-none">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            WHAT WE DO BEST
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            Engineered Capabilities
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            We don't build generic static sites. We program custom growth platforms modeled for speed, authority, and concrete conversions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
