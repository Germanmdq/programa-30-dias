import { motion } from 'framer-motion';
import { Frame, Sparkles } from 'lucide-react';

export const PhilosophySection = () => {
  return (
    <section className="py-16 px-6 bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white">
            <span className="font-instrument italic text-white/95 mr-4">Imaginación</span>
            × Tecnología.
          </h2>
        </motion.div>

        {/* Two-column layout: video left, two text blocks right */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch">

          {/* ── LEFT COLUMN: video ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 liquid-glass rounded-3xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <video
              src="/videos/cuadro.mp4#t=0.1"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* ── RIGHT COLUMN: two stacked text blocks ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 liquid-glass rounded-3xl flex flex-col"
          >
            {/* Block 1 — Neville */}
            <div className="flex-1 p-8 md:p-10 space-y-4 text-left">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Frame className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-xs uppercase tracking-widest text-accent block font-semibold">
                NEVILLE TENÍA CUADROS
              </span>
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                Tenía cuadros en las paredes de su casa y contaba que entraba en ellos: caminaba con
                los personajes, se sentaba en la escena de playa, se sentaba junto al león. Les daba
                vida. "Lo miras, lo contemplas y entras directamente en él. Te conviertes en parte
                de él."
              </p>
            </div>

            {/* Horizontal divider */}
            <div className="mx-8 md:mx-10 border-t border-white/10" />

            {/* Block 2 — Y hoy */}
            <div className="flex-1 p-8 md:p-10 space-y-4 text-left">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-xs uppercase tracking-widest text-accent block font-semibold">
                Y HOY
              </span>
              <div className="text-base md:text-lg text-white/80 font-light leading-relaxed space-y-4">
                <p>
                  Meses, incluso años de estudio para generar nuestra imagen y sentirla. Practicando
                  técnicas, intentando cada noche sostener una escena que se deshacía.
                </p>
                <p>
                  Y hoy la tecnología lo pone en nuestras manos. A eso le llamo buen uso de la tecnología.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
