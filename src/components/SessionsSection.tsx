import { motion } from 'framer-motion';

const sessions = [
  {
    num: '01',
    title: 'Desarmar la presión',
    description: 'Qué te frena, qué te da ansiedad, qué estás pidiendo realmente debajo de lo que decís que querés.',
  },
  {
    num: '02',
    title: 'Llegar a la sensación',
    description: 'Removida la urgencia, aparece: el alivio, la certeza, la calma. Sin esto, cualquier escena es decoración.',
  },
  {
    num: '03',
    title: 'Aislar el momento',
    description: 'Un solo instante: el que implica que todo lo demás ya sucedió.',
  },
  {
    num: '04',
    title: 'Los detalles sensoriales',
    description: 'La hora, el clima, la luz, la temperatura, qué tenés en las manos, qué se escucha, qué está pasando.',
  },
  {
    num: '05',
    title: 'Validación',
    description: 'Te muestro la escena antes de producirla. Si no te devuelve la sensación exacta, la cambiamos.',
  },
];

export const SessionsSection = () => {
  return (
    <section id="como-funciona" className="py-20 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-accent block mb-4 font-semibold"
          >
            EL PROCESO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light text-white tracking-tight mb-6"
          >
            Cinco sesiones individuales conmigo.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            No es un formulario. Son cinco encuentros por videollamada donde trabajamos juntos
            hasta encontrar la sensación y el momento que la contiene.
          </motion.p>
        </div>

        {/* List of Sessions */}
        <div className="border-t border-white/5 divide-y divide-white/5 mb-16">
          {sessions.map((session, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="py-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              {/* Number */}
              <div className="font-instrument italic text-5xl md:text-6xl text-accent leading-none select-none shrink-0 md:w-20">
                {session.num}
              </div>
              
              {/* Content */}
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-medium text-white tracking-wide">
                  {session.title}
                </h3>
                <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">
                  {session.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center font-instrument italic text-xl md:text-2xl text-accent animate-pulse"
        >
          Entrega: 21 días desde la primera sesión.
        </motion.div>
      </div>
    </section>
  );
};
