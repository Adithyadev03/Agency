import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Layers, CheckCircle, X, ChevronRight, Sparkles, Gauge } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";
import { Project } from "../types";

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="portfolio"
      className="relative py-24 px-6 bg-[#050505] border-t border-white/5"
    >
      {/* Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative select-none">
        {/* Section Header */}
        <div className="text-center mb-20 gsap-blur-reveal">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">
            SELECTED CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mt-2 tracking-tight">
            Our Digital Works
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4">
            Bespoke platforms engineered for outstanding visual authority, flawless responsive integrity, and elite performance scores.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-32">
          {PORTFOLIO_PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? "" : "lg:flex lg:flex-row-reverse"
                }`}
              >
                {/* Visual Showcase (Desktop, Tablet, Mobile frames) */}
                <div className="lg:col-span-7 relative w-full aspect-[16/10] bg-zinc-950/40 rounded-3xl p-4 md:p-8 border border-white/5 shadow-2xl overflow-hidden group gsap-scale-reveal">
                  {/* Backdrop reflection shine */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* 1. Desktop Frame */}
                  <div className="relative w-[85%] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group-hover:scale-[1.02] transition-transform duration-700">
                    {/* Browser header bar */}
                    <div className="w-full h-5 md:h-7 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between px-3">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-red-500/60" />
                        <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-yellow-500/60" />
                        <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500/60" />
                      </div>
                      <div className="bg-white/5 px-4 py-0.5 rounded text-[8px] md:text-[10px] font-mono text-zinc-500 truncate max-w-[50%]">
                        {project.liveUrl}
                      </div>
                      <div className="w-4" />
                    </div>
                    {/* Screen screenshot */}
                    <img
                      src={project.imageDesktop}
                      alt={`${project.title} Desktop`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 2. Tablet Frame (Overlapping Bottom Right/Left) */}
                  <div
                    className={`absolute bottom-4 ${
                      isEven ? "right-4 md:right-12" : "left-4 md:left-12"
                    } w-[35%] aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 z-10 group-hover:translate-y-[-10px] transition-transform duration-500`}
                  >
                    <img
                      src={project.imageTablet}
                      alt={`${project.title} Tablet`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 3. Mobile Frame (Overlapping Far Corner) */}
                  <div
                    className={`absolute bottom-6 ${
                      isEven ? "right-[30%] md:right-[38%]" : "left-[30%] md:left-[38%]"
                    } w-[16%] aspect-[9/19] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 z-20 group-hover:scale-105 transition-transform duration-500`}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-zinc-950 rounded-full z-10" />
                    <img
                      src={project.imageMobile}
                      alt={`${project.title} Mobile`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover mt-1"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className={`lg:col-span-5 flex flex-col items-start ${isEven ? 'gsap-slide-left' : 'gsap-slide-right'}`}>
                  {/* Category tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-4">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    {project.category}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-3xl font-display font-extrabold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  
                  {/* Project Subtitle */}
                  <p className="text-sm font-medium text-indigo-400 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Project Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Lighthouse Scores indicators */}
                  <div className="flex items-center gap-3 w-full mb-6 py-4 px-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Gauge className="w-5 h-5 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                          Lighthouse Audit
                        </span>
                        <span className="text-xs font-bold text-emerald-400 font-mono">
                          {project.performanceScore}/100 Performance
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${project.performanceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium text-zinc-400 bg-zinc-900 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Trigger Buttons */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-white text-[#050505] hover:bg-zinc-200 active:scale-95 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 clickable"
                    >
                      <span>View Case Study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full border border-white/10 hover:border-purple-500/30 hover:bg-white/5 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 clickable"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Lightbox Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel-glow border border-white/10 p-6 md:p-8 rounded-3xl text-left shadow-2xl custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors clickable"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Contents */}
              <div className="select-none pr-4">
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                  CASE STUDY BREAKDOWN
                </span>
                
                <h3 className="text-3xl font-display font-extrabold text-white mt-1 mb-2">
                  {activeProject.title}
                </h3>
                
                <p className="text-sm text-zinc-400 mb-6 font-medium italic">
                  {activeProject.subtitle}
                </p>

                {/* Core statistics / meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-5 bg-zinc-950/60 border border-white/5 rounded-2xl mb-8">
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      Client
                    </span>
                    <span className="text-xs font-semibold text-zinc-300">
                      {activeProject.caseStudy.client}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      Timeline
                    </span>
                    <span className="text-xs font-semibold text-zinc-300">
                      {activeProject.caseStudy.timeline}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      Lighthouse Score
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {activeProject.performanceScore}/100
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      SEO Score
                    </span>
                    <span className="text-xs font-bold text-indigo-400 font-mono">
                      {activeProject.seoScore}/100
                    </span>
                  </div>
                </div>

                {/* Detailed Narrative sections */}
                <div className="space-y-6">
                  {/* Challenge */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      The Challenge
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                      {activeProject.caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      The Solution
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                      {activeProject.caseStudy.solution}
                    </p>
                  </div>

                  {/* Results list */}
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Strategic Outcomes
                    </h4>
                    <ul className="space-y-2.5">
                      {activeProject.caseStudy.results.map((result, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-zinc-300 text-sm font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Modal CTA */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-1">
                    {activeProject.technologies.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-500">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      const contactEl = document.querySelector("#contact");
                      if (contactEl) {
                        contactEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors clickable"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Inquire About Similar Work</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
