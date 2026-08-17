import { Seccion, Rotulo, Revelar } from './ui';

/* Numbered because it genuinely is a sequence: each session only
   works once the previous one has happened. */
const sesiones = [
  {
    titulo: 'Desarmar la presión',
    texto:
      'Qué te frena, qué te da ansiedad, qué estás pidiendo realmente debajo de lo que decís que querés.',
  },
  {
    titulo: 'Llegar a la sensación',
    texto:
      'Removida la urgencia, aparece: el alivio, la certeza, la calma. Sin esto, cualquier escena es decoración.',
  },
  {
    titulo: 'Aislar el momento',
    texto: 'Un solo instante: el que implica que todo lo demás ya sucedió.',
  },
  {
    titulo: 'Los detalles sensoriales',
    texto:
      'La hora, el clima, la luz, la temperatura, qué tenés en las manos, qué se escucha, qué está pasando.',
  },
  {
    titulo: 'Validación',
    texto:
      'Te muestro la escena antes de producirla. Si no te devuelve la sensación exacta, la cambiamos.',
  },
];

export function SesionesSection() {
  return (
    <Seccion id="sesiones" className="border-y border-borde bg-sala-alta">
      <Revelar>
        <Rotulo>Cómo funciona</Rotulo>
        <h2 className="mt-7 max-w-2xl font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">
          Cinco sesiones individuales conmigo.
        </h2>
        <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-luz-baja">
          No es un formulario. Son cinco encuentros por videollamada donde
          trabajamos juntos hasta encontrar la sensación y el momento que la
          contiene.
        </p>
      </Revelar>

      <ol className="mt-16">
        {sesiones.map((s, i) => (
          <Revelar key={s.titulo} delay={i * 0.06}>
            <li className="grid gap-4 border-t border-borde py-9 sm:grid-cols-[5rem_1fr] sm:gap-8">
              <span className="font-display text-[2rem] leading-none text-ambar">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[1.25rem] font-medium">{s.titulo}</h3>
                <p className="mt-2.5 max-w-lg text-[1rem] leading-relaxed text-luz-baja">
                  {s.texto}
                </p>
              </div>
            </li>
          </Revelar>
        ))}
      </ol>

      <Revelar>
        <p className="mt-12 text-[1.0625rem] text-luz">
          Entrega: <span className="text-ambar">21 días</span> desde la primera
          sesión.
        </p>
      </Revelar>
    </Seccion>
  );
}
