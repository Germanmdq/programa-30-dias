import { Globe } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export const Navbar = ({ onScrollTo }: NavbarProps) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Globe className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300 animate-pulse" />
          <span className="text-sm font-semibold tracking-widest uppercase text-white/90 group-hover:text-white transition-colors duration-300">
            Germán González
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => onScrollTo('el-programa')} 
            className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            El programa
          </button>
          <button 
            onClick={() => onScrollTo('como-funciona')} 
            className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            Cómo funciona
          </button>
          <button 
            onClick={() => onScrollTo('preguntas')} 
            className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            Preguntas
          </button>
        </nav>
      </div>
    </header>
  );
};
