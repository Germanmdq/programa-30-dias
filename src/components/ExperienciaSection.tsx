import { Seccion, Encabezado, Abertura, Revelar } from './ui';

export function ExperienciaSection() {
  return (
    <Seccion id="experiencia">
      <Revelar>
        <Encabezado
          rotulo="La experiencia"
          titulo="Te acostás. Auriculares. La luz se apaga. Y entrás."
          apoyo="No mirás la escena desde afuera: la habitás. Cada elemento está construido para que tu sistema nervioso la procese como algo que estás viviendo."
        />

        <div className="mt-16 flex flex-col gap-20">
          {/* Bloque 1 - Estás adentro, no mirando (Con Video) */}
          <div className="space-y-8">
            <Abertura src="/videos/inmersion.mp4" ratio="aspect-video" />
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7 flex items-baseline gap-4">
                <span className="text-[0.8125rem] font-medium tabular-nums text-ambar select-none">
                  01
                </span>
                <h3 className="t-sub text-luz">Estás adentro, no mirando</h3>
              </div>
              <p className="md:col-span-5 t-cuerpo">
                Todo construido desde tus ojos: la altura a la que mirás, el
                ángulo de tu cabeza, la distancia de tus manos a los objetos.
                Mirás para abajo y ves tus propias manos.
              </p>
            </div>
          </div>

          {/* Bloque 2 - Están ahí, con su voz (Sin Video) */}
          <div className="py-10 border-y border-borde/40">
            <div className="grid gap-6 md:grid-cols-12 md:gap-10 items-baseline">
              <div className="md:col-span-7 flex items-baseline gap-4">
                <span className="text-[0.8125rem] font-medium tabular-nums text-ambar select-none">
                  02
                </span>
                <h3 className="t-titulo text-luz">Están ahí, con su voz</h3>
              </div>
              <p className="md:col-span-5 t-cuerpo">
                Si en tu escena hay alguien, aparece con sus rasgos exactos y su
                voz real: su tono, su cadencia, su forma de respirar entre
                frases. Tu oído no duda ni un segundo.
              </p>
            </div>
          </div>

          {/* Bloque 3 - En tres dimensiones (Con Video) */}
          <div className="space-y-8">
            <Abertura src="/videos/visor.mp4" ratio="aspect-video" />
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7 flex items-baseline gap-4">
                <span className="text-[0.8125rem] font-medium tabular-nums text-ambar select-none">
                  03
                </span>
                <h3 className="t-sub text-luz">En tres dimensiones</h3>
              </div>
              <p className="md:col-span-5 t-cuerpo">
                Formato estereoscópico: cada ojo recibe una imagen distinta,
                como funciona la visión natural. No ves una pantalla, ves
                profundidad real. Las gafas te llegan a tu casa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-3xl">
          <p className="t-titulo text-luz">
            Adentro de ese momento,{' '}
            <span className="text-ambar font-semibold">
              no sentirlo sería imposible
            </span>
            .
          </p>
        </div>
      </Revelar>
    </Seccion>
  );
}
