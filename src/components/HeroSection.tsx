import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from './ui';

const HERO_VIDEO = '/videos/hero.mp4';

/* ── HeroSection ───────────────────────────────────────────
   The page opens the way the product does: two bands retract
   up and down, like eyelids. It is the one orchestrated moment
   on the page, and it is the thesis — this thing is seen from
   inside a body, not watched from a seat.
   Text sits low-left, so the footage owns the frame. */
export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      <video
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* legibility: dark from the bottom-left, where the type lives */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sala via-sala/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-sala via-transparent to-sala/40" />

      {/* párpados */}
      <motion.div
        initial={{ height: '50%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 z-20 w-full bg-sala"
      />
      <motion.div
        initial={{ height: '50%' }}
        animate={{ height: 0 }}
        transition={{ duration: 1.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 z-20 w-full bg-sala"
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-[3rem] leading-[0.95] tracking-[-0.02em] sm:text-[4.5rem] md:text-[5.5rem]">
            Nos convertimos
            <br />
            en lo que{' '}
            <em className="italic text-ambar">contemplamos</em>.
          </h1>

          <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-luz-baja">
            Construyo la escena de tu deseo cumplido y te la entrego terminada.
            En primera persona. En tres dimensiones.
          </p>

          <div className="mt-10">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-luz px-7 py-3.5 text-[0.9375rem] font-medium text-sala transition-colors duration-300 hover:bg-white"
            >
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
              Quiero mi escena
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
