import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const CTA_VIDEO_URL = '/videos/problema.mp4';

export const CTASection = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background video */}
      <video
        src={`${CTA_VIDEO_URL}#t=0.1`}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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
          ¿Qué pasaría si te entrego tu deseo cumplido en tres dimensiones?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-base md:text-xl text-white/60 font-light tracking-wide"
        >
          Adentro de ese momento, no sentirlo sería imposible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <a
            href="https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-10 py-5 rounded-full text-base tracking-wide shadow-2xl cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            Escribime ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};
