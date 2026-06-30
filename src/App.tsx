import { useState } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutFounder from "./components/AboutFounder";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import Technologies from "./components/Technologies";
import FreePreview from "./components/FreePreview";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f7] font-sans antialiased overflow-x-hidden">
      {/* Luxury Animated Loader */}
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}

function MainContent() {
  // Mount the GSAP ScrollTrigger engine for the entire page
  useScrollAnimations();

  return (
    <div className="relative z-10 w-full">
      {/* Custom Lag-Free Cursor Follower */}
      <CustomCursor />

      {/* Premium Glass Header Bar */}
      <Navbar />

      {/* Core Visual Pages */}
      <main>
        <Hero />
        <AboutFounder />
        <Portfolio />
        <Services />
        <WhyChooseUs />
        <Process />
        <Technologies />
        <FreePreview />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Minimalist Footnotes */}
      <Footer />
    </div>
  );
}

