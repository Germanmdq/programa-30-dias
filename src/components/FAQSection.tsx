import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus } from 'lucide-react';

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
    q: '¿Qué necesito darme?',
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

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section className="py-20 px-6 bg-black relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-accent block mb-4 font-semibold">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Lo que suelen preguntar
          </h2>
        </motion.div>

        {/* Accordion items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="liquid-glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between px-8 py-6 text-left group cursor-pointer"
                aria-expanded={openIdx === idx}
              >
                <span className="text-base md:text-lg font-light text-white/90 group-hover:text-white transition-colors pr-8">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300"
                  style={{ transform: openIdx === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <Plus className="w-4 h-4 text-white/60" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <p className="px-8 pb-6 text-sm md:text-base text-white/55 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
