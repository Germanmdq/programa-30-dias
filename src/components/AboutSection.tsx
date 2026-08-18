import React, { Suspense } from 'react';
import { Seccion, Rotulo, Revelar } from './ui';

const Lente = React.lazy(() => import('./three/Lente'));

export function AboutSection() {
  return (
    <Seccion>
      <Revelar>
        <div className="grid gap-6 md:grid-cols-12 md:gap-10 items-center">
          {/* Left Text Block (columns 1 to 7) */}
          <div className="md:col-span-7">
            <Rotulo>Lo que nadie te dijo</Rotulo>
            <h2 className="t-titulo mt-6">
              No es la imagen lo que crea.
              <br />
              Es la <span className="text-ambar">sensación</span>.
            </h2>
            <div className="h-[1px] bg-borde my-8 w-1/3" />
            <p className="t-cuerpo max-w-xl">
              La imagen es el vehículo. Lo que imprime la realidad en tu
              biología es lo que sentís mientras la mirás. Podés armar la
              escena perfecta: si no te devuelve la sensación, no pasa nada.
            </p>
          </div>

          {/* Interactive Lens Block (columns 8 to 12) */}
          <div className="md:col-span-5 w-full flex justify-center md:justify-end">
            <Suspense fallback={<div className="h-[300px] md:h-[420px] w-full" />}>
              <Lente />
            </Suspense>
          </div>
        </div>
      </Revelar>
    </Seccion>
  );
}
