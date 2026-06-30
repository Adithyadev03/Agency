import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Send, Compass, CheckCircle } from "lucide-react";

export default function FreePreview() {
  const [businessType, setBusinessType] = useState("business");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const businessOptions = [
    { value: "business", label: "Business Portfolio" },
    { value: "restaurant", label: "Restaurant / Diner" },
    { value: "clinic", label: "Clinic / Medical" },
    { value: "interior", label: "Interior Design" },
    { value: "landing", label: "High-convert Page" },
  ];

  const getMailtoUrl = () => {
    const businessLabel = businessOptions.find(opt => opt.value === businessType)?.label || businessType;
    const subject = `Free Website Concept Request for ${businessName}`;
    const body = `Hello Ravens.dev!

I would like to request a free homepage design concept for my business.

*Business Name:* ${businessName}
*Target Niche/Objective:* ${businessLabel}
*Contact Email:* ${email}

Please let me know if you need any additional brand collateral (logos, style guides, references) to prepare the high-fidelity concept.

Best regards,
${businessName}`;
    return `mailto:adithyadevm2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !businessName) return;

    setLoading(true);
    const mailtoUrl = getMailtoUrl();

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Attempt to automatically trigger the mailto client open
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.error("Failed to automatically launch email client", err);
      }
    }, 1200);
  };

  return (
    <section
      id="free-preview"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-[10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[30%] left-[10%] w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto z-10 relative select-none">
        {/* Massive premium lead card */}
        <div className="rounded-3xl glass-panel-glow border border-white/10 p-8 md:p-12 relative overflow-hidden text-center md:text-left">
          {/* Decorative spotlight effect inside */}
          <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  {/* Left block copy */}
                  <div className="md:col-span-7">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-mono tracking-widest text-purple-300 uppercase mb-4">
                      <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                      Risk-Free Concept Offer
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4 leading-tight">
                      Get a Free Homepage Design Before You Decide
                    </h2>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                      We'll create a custom homepage concept for your business so you can see the high-performance design quality before committing. No credit cards or contracts required.
                    </p>

                    <div className="space-y-2 text-zinc-500 text-xs font-mono">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Completed in 3-5 business days</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Compass className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Custom tailored draft based on niche</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block interaction form */}
                  <div className="md:col-span-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Business Name Field */}
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5 text-left">
                          Business Name
                        </label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. CareFirst Dental Clinic"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Email/WhatsApp Field */}
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5 text-left">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Business Niche Selector */}
                      <div>
                        <label className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5 text-left">
                          Project Objective
                        </label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-zinc-300 text-xs focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                        >
                          {businessOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Giant glowing submit button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white tracking-widest uppercase shadow-xl shadow-indigo-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group clickable"
                      >
                        {loading ? (
                          <div className="w-4.5 h-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            <span>Request Free Design Draft</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Success screen state */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center justify-center text-center animate-fade-in"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>

                <h3 className="text-3xl font-display font-extrabold text-white mb-2">
                  Draft Draft Formatted!
                </h3>
                
                <p className="text-sm text-indigo-400 font-medium font-mono mb-4 tracking-wider">
                  PREPARED TO DISPATCH TO: adithyadevm2@gmail.com
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed font-sans mb-8">
                  Your homepage mockup request for <strong className="text-white">{businessName}</strong> has been formatted as an email draft. If your email application didn't open automatically, click the button below to send it now!
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={getMailtoUrl()}
                    className="px-8 py-3.5 rounded-full bg-white text-[#050505] hover:bg-zinc-200 hover:shadow-xl hover:shadow-white/5 active:scale-95 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group clickable glow-btn"
                  >
                    <Send className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
                    <span>Launch Mail Client</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                      setBusinessName("");
                    }}
                    className="px-6 py-3.5 rounded-full border border-white/10 hover:border-purple-500/30 text-xs font-semibold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors clickable"
                  >
                    Request Another Design Draft
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
