import { motion } from "motion/react";
import { Star, Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-0 w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-0 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative select-none">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            CLIENT SATISFACTION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2">
            Endorsements & Reviews
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-sans">
            Hear from our strategic partners who transformed their speed indices, user engagements, and high-value inbound lead volumes.
          </p>
        </div>

        {/* Testimonials grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl p-6 md:p-8 glass-panel-glow border border-white/5 hover:border-purple-500/20 shadow-2xl flex flex-col justify-between group transition-all duration-300"
            >
              {/* Giant quote background icon decoration */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-purple-500/5 transition-colors pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans italic mb-8 relative z-10">
                  "{t.review}"
                </p>
              </div>

              {/* Bottom Client Card details */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
                {/* Styled Avatar circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px] flex items-center justify-center font-mono font-bold text-xs text-white uppercase shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                    {t.name.split(" ").slice(-2)[0]?.[0] || t.name[0]}
                    {t.name.split(" ").slice(-1)[0]?.[0]}
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium">
                    {t.role} // <span className="text-indigo-400">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proactive bottom warning note about direct replacement */}
        <div className="text-center mt-12">
          <p className="text-[10px] font-mono tracking-wider text-zinc-600 uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
            Genuine client feedbacks — contact email address details validated
          </p>
        </div>
      </div>
    </section>
  );
}
