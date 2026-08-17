import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Seccion, Rotulo, Revelar } from './ui';

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
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <Seccion id="preguntas">
      <Revelar>
        <Rotulo>Preguntas</Rotulo>
        <h2 className="mt-7 font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">
          Lo que suelen preguntarme.
        </h2>
      </Revelar>

      <div className="mt-14 max-w-3xl">
        {faqs.map((f, i) => (
          <Revelar key={f.q} delay={i * 0.04}>
            <div className="border-t border-borde">
              <button
                onClick={() => setAbierta(abierta === i ? null : i)}
                aria-expanded={abierta === i}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[1.0625rem] font-medium">{f.q}</span>
                <Plus
                  className={`h-4 w-4 shrink-0 text-ambar transition-transform duration-300 ${
                    abierta === i ? 'rotate-45' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <AnimatePresence initial={false}>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-7 text-[1rem] leading-relaxed text-luz-baja">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Revelar>
        ))}
        <div className="border-t border-borde" />
      </div>
    </Seccion>
  );
}
