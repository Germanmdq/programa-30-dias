import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from './ui';

const Haz = React.lazy(() => import('./three/Haz'));

export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-sala select-none">
      {/* Background Video */}
      <video
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Volumetric Beam (Lazy Loaded) */}
      <Suspense fallback={null}>
        <Haz />
      </Suspense>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-sala via-sala/55 to-sala/25" />

      {/* Loading Eyelids (Párpados) */}
      <motion.div
        initial={{ height: '50%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 z-20 w-full bg-sala"
      />
      <motion.div
        initial={{ height: '50%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 z-20 w-full bg-sala"
      />

      {/* Grid Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex h-full items-end px-6 pb-20 md:px-10 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 md:grid-cols-12 md:gap-10 w-full items-end"
        >
          {/* Title - col-span-8 */}
          <h1 className="t-display md:col-span-8">
            Nos convertimos en lo que contemplamos.
          </h1>

          {/* Subtext and Button - col-span-4 */}
          <div className="md:col-span-4 self-end flex flex-col gap-8">
            <p className="t-cuerpo">
              Construyo la escena de tu deseo cumplido y te la entrego terminada. En primera persona. En tres dimensiones.
            </p>
            <div>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-luz text-sala px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.01em] transition-opacity duration-300 hover:opacity-90"
              >
                <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.5} />
                Quiero mi escena
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
