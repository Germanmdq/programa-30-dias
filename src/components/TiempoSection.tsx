import { Seccion, Revelar } from './ui';

export function TiempoSection() {
  return (
    <Seccion className="border-y border-borde bg-sala-alta">
      <Revelar>
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <h2 className="t-titulo md:col-span-7">
            Meses. Incluso años de estudio para generar nuestra imagen y sentirla.
          </h2>
          <p className="t-cuerpo md:col-span-5 self-end">
            Practicando técnicas, leyendo, intentando cada noche sostener una
            escena que se deshacía.
          </p>
        </div>

        <div className="mt-14 max-w-3xl">
          <p className="t-sub text-ambar">
            Y hoy la tecnología lo pone en nuestras manos. A eso le llamo buen
            uso de la tecnología.
          </p>
        </div>
      </Revelar>
    </Seccion>
  );
}
