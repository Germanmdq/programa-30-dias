import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const ThreeDScene = React.lazy(() => import('./ThreeDScene'));

export const ExperienceSection = () => {
  return (
    <section id="la-experiencia" className="py-20 px-6 bg-black relative">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-accent block mb-4 font-semibold"
          >
            LA EXPERIENCIA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light text-white tracking-tight"
          >
            No estás mirando la escena. Estás adentro.
          </motion.h2>
        </div>

        {/* 3D Canvas container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="liquid-glass rounded-3xl h-[500px] w-full relative flex items-center justify-center overflow-hidden mb-6 border border-white/5"
        >
          <Suspense fallback={
            <div className="flex flex-col items-center gap-4">
              <span className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-white/40 uppercase tracking-widest font-light">Cargando experiencia...</span>
            </div>
          }>
            <ThreeDScene />
          </Suspense>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs text-white/40 uppercase tracking-widest font-medium"
        >
          Arrastrá con el dedo
        </motion.p>
      </div>
    </section>
  );
};
