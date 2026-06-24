import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const CTA_VIDEO_URL = '/videos/A_woman_standing_at_the_edge_o.mp4';

export const CTASection = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background video */}
      <video
        src={CTA_VIDEO_URL}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      {/* Top & bottom gradients */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="font-instrument italic text-4xl md:text-7xl text-white leading-tight tracking-tight"
        >
          ¿Listo/a para comprobar que tu imaginación crea tu realidad?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-base md:text-xl text-white/60 font-light tracking-wide"
        >
          Cupos limitados. Programa individual. Resultados reales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <a
            href="https://wa.me/542236151152?text=Quiero%20entrar%20al%20programa"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass inline-flex items-center gap-3 text-white font-semibold px-10 py-5 rounded-full text-base tracking-wide hover:bg-white/10 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            Escribime ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};
