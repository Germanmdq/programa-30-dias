import { Seccion, Rotulo, Revelar, Abertura } from './ui';

export function ProblemaSection() {
  return (
    <Seccion id="problema">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Revelar>
          <Rotulo>El problema</Rotulo>
          <h2 className="mt-7 font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">
            Te dijeron que visualices.
            <br />
            Y lo intentaste, mil veces.
          </h2>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-luz-baja">
            Pero la mente se satura. Genera versiones borrosas, incompletas, que
            cambian cada vez. Y al rato estás de vuelta en el loop de siempre:
            la duda, la urgencia, el «¿por qué no me funciona?».
          </p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-luz">
            No es un problema tuyo. Es una falla de método que lleva décadas sin
            resolverse.
          </p>
        </Revelar>

        <Revelar delay={0.15}>
          <Abertura src="/videos/problema.mp4" ratio="aspect-[4/5]" />
        </Revelar>
      </div>
    </Seccion>
  );
}
