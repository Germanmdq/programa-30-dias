import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProblemaSection } from './components/ProblemaSection';
import { CuadroSection } from './components/CuadroSection';
import { TiempoSection } from './components/TiempoSection';
import { SesionesSection } from './components/SesionesSection';
import { ExperienciaSection } from './components/ExperienciaSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Formulario } from './components/Formulario';

const Aura = React.lazy(() => import('./components/three/Aura'));

function DivisorLuz() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] w-full origin-center"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(217, 151, 90, 0.35) 50%, transparent 100%)',
      }}
    />
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleScrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isFormulario = currentPath.replace(/\/$/, '') === '/formulario';

  return (
    <div className="min-h-screen bg-sala text-luz relative overflow-x-hidden">
      {/* Background Aura Canvas (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Aura />
      </Suspense>

      {isFormulario ? (
        <Formulario />
      ) : (
        <>
          <Navbar onScrollTo={handleScrollTo} />
          <HeroSection />
          <DivisorLuz />
          <AboutSection />
          <DivisorLuz />
          <ProblemaSection />
          <DivisorLuz />
          <CuadroSection />
          <DivisorLuz />
          <TiempoSection />
          <DivisorLuz />
          <SesionesSection />
          <DivisorLuz />
          <ExperienciaSection />
          <DivisorLuz />
          <FAQSection />
          <DivisorLuz />
          <CTASection />
        </>
      )}

      <footer className="border-t border-borde px-6 py-12 md:px-10 bg-sala">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 text-[0.75rem] tracking-[0.14em] uppercase text-luz-baja/70">
          <span>Control de la Imagen</span>
          <span>© {new Date().getFullYear()} Germán González</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
