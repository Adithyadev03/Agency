import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#050505]/75 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center gap-1.5 group clickable"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-xl font-display font-bold tracking-tight text-white">
              STUDIO<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-sans">.DEV</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform duration-300" />
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -1 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-sans font-medium text-zinc-400 hover:text-white transition-colors tracking-wide relative py-1 group clickable"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Call To Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#portfolio");
              }}
              className="text-xs font-sans font-medium text-zinc-300 hover:text-white transition-colors py-2 px-4 clickable"
            >
              View Work
            </motion.a>
            
            <motion.a
              href="#free-preview"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#free-preview");
              }}
              className="relative group px-4 py-2 rounded-full overflow-hidden flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white glass-panel-glow border border-white/15 hover:border-purple-500/30 transition-all duration-300 clickable glow-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              <span>Free Website Preview</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-zinc-300 hover:text-white transition-colors focus:outline-none clickable"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center p-8 lg:hidden"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Links Stack */}
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-2xl font-display font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* CTA in Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.4 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <a
                href="#free-preview"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#free-preview");
                }}
                className="w-full max-w-xs py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-sm font-semibold text-center text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all duration-300 clickable"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Website Preview</span>
              </a>
              
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs tracking-wider uppercase font-mono mt-2 clickable"
              >
                CLOSE MENU
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
