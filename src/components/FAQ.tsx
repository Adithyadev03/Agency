import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-0 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[30%] left-0 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto z-10 relative select-none">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            COMMON INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            Clear, transparent answers concerning our customized development timeline, SEO optimization policies, and free design mockups.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "glass-panel-glow border-purple-500/20 bg-zinc-950/40"
                    : "glass-panel border-white/5 hover:border-white/10"
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 md:px-8 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    {/* Glowing indicator */}
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${
                      isOpen ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300"
                    }`} />
                    
                    <span className={`text-sm sm:text-base font-semibold transition-colors ${
                      isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Rotating Chevron icon */}
                  <div className={`p-1 rounded-full bg-white/5 border border-white/5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-purple-500/10 border-purple-500/20 text-purple-400" : "text-zinc-400"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanding Content Drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans border-t border-white/5 pt-4">
                        {faq.answer}
                        
                        {/* Inline Tag */}
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                            TOPIC CLASSIFICATION:
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px] font-mono text-indigo-400 uppercase">
                            <Sparkles className="w-2.5 h-2.5" />
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
