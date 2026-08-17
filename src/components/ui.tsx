import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── Sección ───────────────────────────────────────────────
   Consistent vertical rhythm and one strong left margin.
   Nothing on this page is centered: centred display type is
   the default answer, and the subject is a room you look into
   from one side. */
export function Seccion({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-28 md:px-12 md:py-40 lg:px-20 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ── Rótulo ── the only amber text on the page */
export function Rotulo({ children }: { children: ReactNode }) {
  return <span className="rotulo block">{children}</span>;
}

/* ── Abertura ──────────────────────────────────────────────
   THE SIGNATURE. A video is never a "media block": it is a
   lit opening in a dark room, and its light falls on the page.
   Posters are omitted deliberately — the first frame of these
   clips is near-black, so there is nothing to flash. */
export function Abertura({
  src,
  ratio = 'aspect-video',
  className = '',
}: {
  src: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={`abertura ${className}`}>
      <div className={`marco ${ratio}`}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/* ── Revelar ── scroll reveal, one shape used everywhere */
export function Revelar({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Boton ── bone white on dark. No amber fills anywhere. */
export function Boton({
  children,
  href,
  variant = 'solido',
}: {
  children: ReactNode;
  href: string;
  variant?: 'solido' | 'linea';
}) {
  const base =
    'inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[0.9375rem] font-medium transition-colors duration-300';
  const estilos =
    variant === 'solido'
      ? 'bg-luz text-sala hover:bg-white'
      : 'border border-borde text-luz hover:border-luz/40';
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${estilos}`}>
      {children}
    </a>
  );
}

export const WHATSAPP =
  'https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen';
