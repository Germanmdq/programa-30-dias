import { motion } from 'framer-motion';
import { Sparkles, MessageSquare } from 'lucide-react';

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
            x Realidad.
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
              src="/videos/A_person_moving_through_their.mp4"
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
            {/* Block 1 — "Cada día recibís" */}
            <div className="flex-1 p-8 md:p-10 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/50 block font-semibold">
                Cada día recibís
              </span>
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                Una lectura creada por mí para tu situación específica, el audio para escucharla, visualizaciones grabadas por mí con tu nombre y tu escena exacta, tus SATs antes de dormir, y tus afirmaciones personalizadas que te llegan por Telegram.
              </p>
            </div>

            {/* Horizontal divider */}
            <div className="mx-8 md:mx-10 border-t border-white/10" />

            {/* Block 2 — "Yo te acompaño" */}
            <div className="flex-1 p-8 md:p-10 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-xs uppercase tracking-widest text-white/50 block font-semibold">
                Yo te acompaño
              </span>
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                Cada actividad te llega por WhatsApp a la hora exacta — no tenés que recordar nada, no tenés que buscar nada. Todo llega a vos. Nos reunimos día por medio por Zoom para trabajar juntos lo que fue surgiendo en tu proceso.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
