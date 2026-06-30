import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, Instagram, Send, CheckCircle, ArrowUpRight, Sparkles, Linkedin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "new-site", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background floating particles local engine
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    const count = 25;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate real server delivery
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactGateways = [
    {
      name: "WhatsApp Hotdesk",
      label: "+91 83019 91822",
      description: "Chat directly with Adithyadev for immediate advice",
      href: "https://wa.me/918301991822",
      icon: MessageCircle,
      color: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30",
    },
    {
      name: "Studio Direct Email",
      label: "adithyadevm4@gmail.com",
      description: "Send project briefs and official inquiry requests",
      href: "mailto:adithyadevm4@gmail.com",
      icon: Mail,
      color: "text-blue-400 border-blue-500/10 hover:border-blue-500/30",
    },
    {
      name: "LinkedIn Connection",
      label: "Adithyadev M. on LinkedIn",
      description: "Connect professionally and explore network insights",
      href: "https://www.linkedin.com/in/adithyadev-m-057aa1371/",
      icon: Linkedin,
      color: "text-sky-400 border-sky-500/10 hover:border-sky-500/30",
    },
    {
      name: "Instagram Channel",
      label: "@adithyadev_._",
      description: "Explore fresh visual updates and creative draft posts",
      href: "https://instagram.com/adithyadev_._",
      icon: Instagram,
      color: "text-pink-400 border-pink-500/10 hover:border-pink-500/30",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto z-10 relative select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Block: Copy & Gateway Cards */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
              ESTABLISH CONNECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2 mb-6">
              Let's Engineer Your Vision
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
              Have an objective, or looking for strategic advice? Choose a preferred communications channel below, or lodge a formal brief via the contact portal.
            </p>

            {/* Floating Gateway Cards */}
            <div className="space-y-4">
              {contactGateways.map((gate) => (
                <motion.a
                  key={gate.name}
                  href={gate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className={`block p-5 rounded-2xl bg-zinc-950/40 border backdrop-blur-md transition-all duration-300 group clickable ${gate.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                        <gate.icon className="w-5 h-5 text-indigo-400" />
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-white tracking-wide">
                          {gate.name}
                        </h4>
                        <p className="text-sm font-bold text-zinc-300 font-mono mt-0.5">
                          {gate.label}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-sans mt-1.5 leading-tight">
                          {gate.description}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Block: Interactive Form Panel */}
          <div className="lg:col-span-7 relative rounded-3xl p-6 md:p-8 glass-panel shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center">
            {/* Local Particle Canvas */}
            <canvas
              ref={particleCanvasRef}
              className="absolute inset-0 pointer-events-none opacity-50 z-0"
            />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Sandra Bell"
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="sandra@brand.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Project Niche Selector */}
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                          Project Classification
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-zinc-300 text-xs focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="new-site">Brand New Custom Website Build</option>
                          <option value="redesign">Complete Strategic Redesign Overhaul</option>
                          <option value="consultation">Bespoke Architectural Audit</option>
                          <option value="maintenance">On-demand Technical Maintenance</option>
                        </select>
                      </div>

                      {/* Message body */}
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
                          Project Objectives & Brief
                        </label>
                        <textarea
                          required
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Provide details about your business objectives, preferred timeline, or style preferences..."
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Large Animated Send Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#050505] hover:bg-zinc-200 hover:shadow-xl hover:shadow-white/5 active:scale-95 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group clickable ml-auto"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-[#050505]/20 border-t-[#050505] rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            <span>Dispatch Project Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  /* Form Submission confirmation overlay */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>

                    <h3 className="text-3xl font-display font-extrabold text-white mb-2">
                      Transmission Confirmed
                    </h3>
                    
                    <p className="text-sm text-indigo-400 font-medium font-mono mb-4">
                      TRANSMITTED SECURELY TO: adithyadevm4@gmail.com
                    </p>

                    <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-sans mb-8">
                      Thank you <strong className="text-white">{formData.name}</strong>. Your project brief has been logged. Adithyadev M. will reply with proposed consultation dates shortly.
                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", projectType: "new-site", message: "" });
                      }}
                      className="px-6 py-2.5 rounded-full border border-white/10 hover:border-purple-500/30 text-xs font-semibold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors clickable"
                    >
                      Lodge Another Brief
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
