import { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-sala text-luz">
      {isFormulario ? (
        <Formulario />
      ) : (
        <>
          <Navbar onScrollTo={handleScrollTo} />
          <HeroSection />
          <AboutSection />
          <ProblemaSection />
          <CuadroSection />
          <TiempoSection />
          <SesionesSection />
          <ExperienciaSection />
          <FAQSection />
          <CTASection />
        </>
      )}

      <footer className="border-t border-borde px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[0.75rem] tracking-[0.14em] uppercase text-luz-baja/70">
          <span>Control de la Imagen</span>
          <span>© {new Date().getFullYear()} Germán González</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
