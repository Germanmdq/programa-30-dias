import { Seccion, Revelar } from './ui';

/* The objection-killer: this is not a shortcut, it is a tool that
   did not exist. Type-only, full width, no media — the page needs
   a breath between two video sections. */
export function TiempoSection() {
  return (
    <Seccion className="border-y border-borde bg-sala-alta">
      <Revelar>
        <h2 className="max-w-4xl font-display text-[1.875rem] leading-[1.15] sm:text-[2.5rem] md:text-[3rem]">
          Meses. Incluso años de estudio para generar nuestra imagen y sentirla.
        </h2>
        <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-luz-baja">
          Practicando técnicas, leyendo, intentando cada noche sostener una
          escena que se deshacía.
        </p>
        <div className="filo mt-12 max-w-md" />
        <p className="mt-10 max-w-2xl font-display text-[1.5rem] leading-snug text-ambar sm:text-[1.875rem]">
          Y hoy la tecnología lo pone en nuestras manos. A eso le llamo buen uso
          de la tecnología.
        </p>
      </Revelar>
    </Seccion>
  );
}
