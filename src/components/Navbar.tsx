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
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        fijo ? 'bg-sala/80 backdrop-blur-xl border-b border-borde/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 md:px-10">
        <a href="/" className="flex items-center gap-2.5 select-none">
          <Eye className="h-4.5 w-4.5 text-ambar" strokeWidth={2.5} />
          <span className="text-[0.8125rem] font-semibold tracking-[0.2em] uppercase text-luz">
            Control de la Imagen
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {enlaces.map((e) => (
            <button
              key={e.id}
              onClick={() => onScrollTo(e.id)}
              className="text-[0.875rem] font-medium text-luz-baja transition-colors duration-300 hover:text-luz cursor-pointer"
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
