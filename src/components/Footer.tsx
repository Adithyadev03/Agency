import React from "react";
import { Sparkles, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollUp = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="relative bg-[#050505] border-t border-white/5 pt-16 pb-12 px-6"
    >
      <div className="max-w-7xl mx-auto z-10 relative select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-white/5">
          {/* Logo brand and subtitle */}
          <div className="md:col-span-6 text-center md:text-left">
            <a
              href="#"
              onClick={scrollUp}
              className="inline-flex items-center gap-1.5 group clickable mb-3"
            >
              <span className="text-xl font-display font-bold tracking-tight text-white">
                STUDIO<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-sans">.DEV</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform duration-300" />
            </a>
            
            <p className="text-zinc-500 text-xs max-w-sm mt-1 leading-relaxed">
              Premium web engineering and strategic digital solutions custom-crafted for ambitious brands. Founded by Adithyadev M., NIT Rourkela.
            </p>
          </div>

          {/* Social connections */}
          <div className="md:col-span-6 flex flex-wrap justify-center md:justify-end items-center gap-6">
            <a
              href="mailto:adithyadevm4@gmail.com"
              className="text-xs font-mono font-medium text-zinc-500 hover:text-white transition-colors clickable"
            >
              EMAIL
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
            <a
              href="https://wa.me/918301991822"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-zinc-500 hover:text-white transition-colors clickable"
            >
              WHATSAPP
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
            <a
              href="https://www.linkedin.com/in/adithyadev-m-057aa1371/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-zinc-500 hover:text-white transition-colors clickable"
            >
              LINKEDIN
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
            <a
              href="https://instagram.com/adithyadev_._"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-zinc-500 hover:text-white transition-colors clickable"
            >
              INSTAGRAM
            </a>
            <span className="w-1 h-1 rounded-full bg-zinc-800 hidden sm:block" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-zinc-500 hover:text-white transition-colors clickable"
            >
              GITHUB
            </a>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono tracking-wide text-zinc-600 uppercase">
              STUDIO DEV © {currentYear} // ALL RIGHTS RESERVED
            </p>
            <p className="text-[9px] font-mono text-zinc-700 tracking-wider">
              NIT ROURKELA, ODISHA, INDIA // HANDCRAFTED WITH PRECISION
            </p>
          </div>

          {/* Back to top clicker */}
          <button
            onClick={scrollUp}
            className="group p-2.5 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-purple-500/20 text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-2 clickable"
            aria-label="Back to Top"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase">
              Back to Top
            </span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
