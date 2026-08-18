import { Seccion, Encabezado, Abertura, Revelar } from './ui';

export function ProblemaSection() {
  return (
    <Seccion id="problema">
      <Revelar>
        <Encabezado
          rotulo="El problema"
          titulo="Te dijeron que visualices. Y lo intentaste, mil veces."
          apoyo="Pero la mente se satura. Genera versiones borrosas, incompletas, que cambian cada vez. Y al rato estás de vuelta en el loop de siempre: la duda, la urgencia, el «¿por qué no me funciona?»."
        />

        <div className="mt-14">
          <Abertura src="/videos/problema.mp4" ratio="aspect-video" />
        </div>

        <div className="mt-14 max-w-2xl">
          <p className="t-sub">
            No es un problema tuyo. Es una falla de método que lleva décadas sin
            resolverse.
          </p>
        </div>
      </Revelar>
    </Seccion>
  );
}
