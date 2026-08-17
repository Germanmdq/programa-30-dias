import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const enlaces = [
  { label: 'El problema', id: 'problema' },
  { label: 'Cómo funciona', id: 'sesiones' },
  { label: 'La experiencia', id: 'experiencia' },
  { label: 'Preguntas', id: 'preguntas' },
];

export function Navbar({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const [fijo, setFijo] = useState(false);

  useEffect(() => {
    const onScroll = () => setFijo(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500 ${
        fijo ? 'bg-sala/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <a href="/" className="flex items-center gap-2.5">
          <Eye className="h-4 w-4 text-ambar" strokeWidth={2} />
          <span className="text-[0.8125rem] font-semibold tracking-[0.2em] uppercase">
            Control de la Imagen
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {enlaces.map((e) => (
            <button
              key={e.id}
              onClick={() => onScrollTo(e.id)}
              className="text-[0.875rem] text-luz-baja transition-colors duration-300 hover:text-luz"
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
