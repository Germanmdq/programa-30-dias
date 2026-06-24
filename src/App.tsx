import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedVideoSection } from './components/FeaturedVideoSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Formulario } from './components/Formulario';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isFormulario = currentPath === '/formulario';

  return (
    <div className="bg-black text-white min-h-screen relative font-sans selection:bg-white selection:text-black">
      {/* Subtle background glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.01] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/[0.01] blur-[120px]" />
      </div>

      <div className="relative z-10">
        {isFormulario ? (
          <Formulario />
        ) : (
          <>
            <Navbar onScrollTo={handleScrollTo} />
            <HeroSection />
            <AboutSection />
            <FeaturedVideoSection />
            <PhilosophySection />
            <ServicesSection />
            <FAQSection />
            <CTASection />
          </>
        )}

        <footer className="border-t border-white/5 py-12 px-6 text-center text-xs text-white/30 tracking-widest uppercase">
          © {new Date().getFullYear()} Germán González · Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}

export default App;
