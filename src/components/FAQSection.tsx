import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Seccion, Encabezado, Revelar } from './ui';

const faqs = [
  {
    q: '¿Necesito comprar algo?',
    a: 'No. Las gafas tridimensionales te llegan a tu domicilio incluidas. Solo necesitás tu celular y auriculares.',
  },
  {
    q: '¿Cuánto tarda?',
    a: '21 días desde la primera sesión hasta la entrega de tu pieza.',
  },
  {
    q: '¿Qué información necesitás de mí?',
    a: 'Depende de tu escena. Te lo pido en la sesión 4, cuando ya sabemos qué necesita.',
  },
  {
    q: '¿Cómo son las sesiones?',
    a: 'Encuentros individuales por videollamada. Cinco en total.',
  },
  {
    q: '¿Sirve si tengo Meta Quest o Apple Vision Pro?',
    a: 'Sí. Tu pieza es compatible con los dos y no necesitás instalar ninguna aplicación.',
  },
  {
    q: '¿Y si no me gusta la escena?',
    a: 'En la sesión 5 te la muestro antes de producirla. Si no te devuelve la sensación exacta, la cambiamos.',
  },
  {
    q: '¿Hay cupos limitados?',
    a: 'Sí. Cada pieza se construye a mano para una sola persona, así que trabajo con muy pocas a la vez.',
  },
];

export function FAQSection() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <Seccion id="preguntas">
      <Revelar>
        <Encabezado
          rotulo="Preguntas"
          titulo="Lo que suelen preguntarme."
          apoyo="Si te queda alguna duda que no está acá, escribime y te la respondo."
        />

        <div className="mt-14 max-w-5xl">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-t border-borde">
              <button
                onClick={() => setAbierta(abierta === i ? null : i)}
                aria-expanded={abierta === i}
                className="grid w-full grid-cols-12 gap-6 py-6 text-left items-center cursor-pointer select-none"
              >
                <span className="col-span-7 text-[1.0625rem] font-medium tracking-[-0.02em] text-luz">
                  {f.q}
                </span>
                <div className="col-span-5 flex justify-end items-center">
                  <Plus
                    className={`h-4.5 w-4.5 text-ambar transition-transform duration-300 ${
                      abierta === i ? 'rotate-45' : ''
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-6 md:gap-10">
                      <p className="col-span-7 pb-7 t-cuerpo">{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="border-t border-borde" />
        </div>
      </Revelar>
    </Seccion>
  );
}
