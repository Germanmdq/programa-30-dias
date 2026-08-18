import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

/* ── Seccion ─────────────────────────────────────────────── */
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
    <section id={id} className={`px-6 py-24 md:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

/* ── Rotulo ── */
export function Rotulo({ children }: { children: ReactNode }) {
  return <span className="t-rotulo block mb-6">{children}</span>;
}

/* ── Encabezado ── */
export function Encabezado({
  rotulo,
  titulo,
  apoyo,
}: {
  rotulo: string;
  titulo: ReactNode;
  apoyo: ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Rotulo>{rotulo}</Rotulo>
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <h2 className="t-titulo md:col-span-7">{titulo}</h2>
        <p className="t-cuerpo md:col-span-5 self-end">{apoyo}</p>
      </div>
    </div>
  );
}

/* ── Abertura ────────────────────────────────────────────── */
export function Abertura({
  src,
  ratio = 'aspect-video',
  className = '',
}: {
  src: string;
  ratio?: string;
  className?: string;
}) {
  const [revelado, setRevelado] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setRevelado(true)}
      viewport={{ once: true, margin: '-80px' }}
      className={`abertura ${revelado ? 'revelado' : ''} ${className}`}
    >
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
    </motion.div>
  );
}

/* ── Revelar ── */
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Boton ── */
export function Boton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full bg-luz text-sala px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.01em] transition-opacity duration-300 hover:opacity-90"
    >
      {children}
    </a>
  );
}

export const WHATSAPP =
  'https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen';
