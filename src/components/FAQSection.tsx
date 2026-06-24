import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: '¿Necesito experiencia previa?',
    a: 'No. El programa está diseñado para cualquier persona, sea la primera vez que trabajás con la imaginación o lleves años haciéndolo.',
  },
  {
    q: '¿Cómo me anoto?',
    a: 'Por WhatsApp. Me escribís, me contás tu situación, y coordinamos el arranque.',
  },
  {
    q: '¿Cuándo arrancamos?',
    a: 'En 24-48 horas de que me contás quién sos y armo tu plan.',
  },
  {
    q: '¿Cuándo son las reuniones?',
    a: 'Día por medio — los días que acordemos según tu disponibilidad.',
  },
  {
    q: '¿Hay cupos limitados?',
    a: 'Sí. Trabajo con pocas personas a la vez para garantizar atención individual real.',
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
          <span className="text-xs uppercase tracking-widest text-white/50 block mb-4 font-semibold">
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
