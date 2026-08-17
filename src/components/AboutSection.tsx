import { Seccion, Rotulo, Revelar } from './ui';

/* The thesis of the whole offer, given a page of its own.
   No media here on purpose: after the hero footage, silence. */
export function AboutSection() {
  return (
    <Seccion>
      <Revelar>
        <Rotulo>Lo que nadie te dijo</Rotulo>
        <h2 className="mt-7 max-w-3xl font-display text-[2.25rem] leading-[1.08] tracking-[-0.01em] sm:text-[3.25rem] md:text-[4rem]">
          No es la imagen lo que crea.
          <br />
          Es la <em className="italic text-ambar">sensación</em>.
        </h2>
        <div className="filo mt-12 max-w-md" />
        <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-luz-baja">
          La imagen es el vehículo. Lo que imprime la realidad en tu biología es
          lo que sentís mientras la mirás. Podés armar la escena perfecta: si no
          te devuelve la sensación, no pasa nada.
        </p>
      </Revelar>
    </Seccion>
  );
}
