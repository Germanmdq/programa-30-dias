import { Seccion, Encabezado, Abertura, Revelar } from './ui';

export function CuadroSection() {
  return (
    <Seccion>
      <Revelar>
        <Encabezado
          rotulo="Neville Goddard"
          titulo="Tenía cuadros en su casa y entraba en ellos."
          apoyo="Caminaba con los personajes, se sentaba en la escena de playa, se sentaba junto al león en el desierto. Les daba vida."
        />

        <div className="mt-14">
          <Abertura src="/videos/cuadro.mp4" ratio="aspect-video" />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-10">
          <blockquote className="t-sub md:col-span-7">
            «Lo miras, lo contemplas y entras directamente en él. Te conviertes en
            parte de él.»
          </blockquote>
          <p className="t-cuerpo md:col-span-5 self-end">
            Pero él era él. La mayoría no logra hacer eso con un cuadro estático
            y pura fuerza imaginativa. Te pidieron que fabricaras la imagen más
            importante de tu vida solo, de memoria, con la mente agotada.
          </p>
        </div>
      </Revelar>
    </Seccion>
  );
}
