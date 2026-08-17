import { Seccion, Rotulo, Revelar, Abertura } from './ui';

const bloques = [
  {
    video: '/videos/inmersion.mp4',
    titulo: 'Estás adentro, no mirando',
    texto:
      'Todo construido desde tus ojos: la altura a la que mirás, el ángulo de tu cabeza, la distancia de tus manos a los objetos. Mirás para abajo y ves tus propias manos.',
  },
  {
    video: '/videos/presencia.mp4',
    titulo: 'Están ahí, con su voz',
    texto:
      'Si en tu escena hay alguien, aparece con sus rasgos exactos y su voz real: su tono, su cadencia, su forma de respirar entre frases. Tu oído no duda ni un segundo.',
  },
  {
    video: '/videos/visor.mp4',
    titulo: 'En tres dimensiones',
    texto:
      'Formato estereoscópico: cada ojo recibe una imagen distinta, como funciona la visión natural. No ves una pantalla, ves profundidad real. Las gafas te llegan a tu casa.',
  },
];

/* Three aberturas stacked full-width and alternated, not three cards
   in a row. Cards-in-a-row is the reflex; here each one gets the room
   a lit opening needs, and the eye travels left-right-left. */
export function ExperienciaSection() {
  return (
    <Seccion id="experiencia">
      <Revelar>
        <Rotulo>La experiencia</Rotulo>
        <h2 className="mt-7 max-w-2xl font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">
          Te acostás. Auriculares. La luz se apaga. Y entrás.
        </h2>
      </Revelar>

      <div className="mt-20 flex flex-col gap-24 md:gap-32">
        {bloques.map((b, i) => (
          <div
            key={b.titulo}
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Revelar>
              <Abertura src={b.video} />
            </Revelar>
            <Revelar delay={0.12}>
              <span className="font-display text-[1.75rem] text-borde">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-[1.75rem] leading-tight sm:text-[2.125rem]">
                {b.titulo}
              </h3>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-luz-baja">
                {b.texto}
              </p>
            </Revelar>
          </div>
        ))}
      </div>

      <Revelar delay={0.1}>
        <p className="mt-24 max-w-2xl font-display text-[1.625rem] leading-snug text-luz sm:text-[2.125rem]">
          Adentro de ese momento, <em className="italic text-ambar">no sentirlo
          sería imposible</em>.
        </p>
      </Revelar>
    </Seccion>
  );
}
