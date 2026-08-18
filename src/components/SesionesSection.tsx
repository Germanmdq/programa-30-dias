import { Seccion, Encabezado, Revelar } from './ui';

const sesiones = [
  {
    num: '01',
    titulo: 'Desarmar la presión',
    desc: 'Qué te frena, qué te da ansiedad, qué estás pidiendo realmente debajo de lo que decís que querés.',
  },
  {
    num: '02',
    titulo: 'Llegar a la sensación',
    desc: 'Removida la urgencia, aparece: el alivio, la certeza, la calma. Sin esto, cualquier escena es decoración.',
  },
  {
    num: '03',
    titulo: 'Aislar el momento',
    desc: 'Un solo instante: el que implica que todo lo demás ya sucedió.',
  },
  {
    num: '04',
    titulo: 'Los detalles sensoriales',
    desc: 'La hora, el clima, la luz, la temperatura, qué tenés en las manos, qué se escucha, qué está pasando.',
  },
  {
    num: '05',
    titulo: 'Validación',
    desc: 'Te muestro la escena antes de producirla. Si no te devuelve la sensación exacta, la cambiamos.',
  },
];

export function SesionesSection() {
  return (
    <Seccion id="sesiones" className="border-y border-borde bg-sala-alta">
      <Revelar>
        <Encabezado
          rotulo="Cómo funciona"
          titulo="Cinco sesiones individuales conmigo."
          apoyo="No es un formulario. Son cinco encuentros por videollamada donde trabajamos juntos hasta encontrar la sensación y el momento que la contiene."
        />

        <ol className="mt-14">
          {sesiones.map((s) => (
            <li
              key={s.num}
              className="grid gap-3 border-t border-borde py-7 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-7 flex items-baseline gap-4">
                <span className="text-[0.8125rem] font-medium tabular-nums text-ambar select-none">
                  {s.num}
                </span>
                <span className="text-[1.1875rem] font-medium tracking-[-0.02em] text-luz">
                  {s.titulo}
                </span>
              </div>
              <p className="md:col-span-5 t-cuerpo">{s.desc}</p>
            </li>
          ))}
          <li className="border-t border-borde" />
        </ol>

        <div className="mt-10">
          <p className="text-[1.0625rem] text-luz-baja font-medium">
            Entrega:{' '}
            <span className="text-ambar font-semibold">21 días</span> desde la
            primera sesión.
          </p>
        </div>
      </Revelar>
    </Seccion>
  );
}
