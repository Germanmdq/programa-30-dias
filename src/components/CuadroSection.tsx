import { Seccion, Rotulo, Revelar, Abertura } from './ui';

/* Neville's frame, shown as an abertura — the motif of the whole
   page is literally the thing he described doing. */
export function CuadroSection() {
  return (
    <Seccion>
      <Revelar>
        <Rotulo>Neville Goddard</Rotulo>
        <h2 className="mt-7 max-w-2xl font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">
          Tenía cuadros en su casa y entraba en ellos.
        </h2>
      </Revelar>

      <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Revelar delay={0.1}>
          <Abertura src="/videos/cuadro.mp4" ratio="aspect-[4/3]" />
        </Revelar>

        <Revelar delay={0.2}>
          <p className="text-[1.0625rem] leading-relaxed text-luz-baja">
            Caminaba con los personajes, se sentaba en la escena de playa, se
            sentaba junto al león en el desierto. Les daba vida.
          </p>
          <blockquote className="mt-9 border-l border-ambar/40 pl-6 font-display text-[1.375rem] leading-snug italic text-luz sm:text-[1.625rem]">
            Lo miras, lo contemplas y entras directamente en él. Te conviertes en
            parte de él.
          </blockquote>
          <p className="mt-9 text-[1.0625rem] leading-relaxed text-luz-baja">
            Pero él era él. La mayoría no logra hacer eso con un cuadro estático
            y pura fuerza imaginativa. Te pidieron que fabricaras la imagen más
            importante de tu vida solo, de memoria, con la mente agotada.
          </p>
        </Revelar>
      </div>
    </Seccion>
  );
}
