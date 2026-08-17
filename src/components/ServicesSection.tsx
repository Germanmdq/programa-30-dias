import { motion } from 'framer-motion';
import { Eye, Users, Layers, MessageCircle } from 'lucide-react';

const cards = [
  {
    tag: 'Inmersión',
    icon: <Eye className="w-5 h-5 text-accent" />,
    title: 'Estás adentro, no mirando',
    description:
      'Todo construido desde tus ojos: la altura a la que mirás, el ángulo de tu cabeza, la distancia de tus manos a los objetos. Mirás para abajo y ves tus propias manos.',
    image: '/images/inmersion_pov.png',
  },
  {
    tag: 'Presencia',
    icon: <Users className="w-5 h-5 text-accent" />,
    title: 'Están ahí, con su voz',
    description:
      'Si en tu escena hay alguien, aparece con sus rasgos exactos y su voz real clonada — su tono, su cadencia, su forma de respirar entre frases. Tu oído no duda ni un segundo.',
    image: '/images/presencia_voz.png',
  },
  {
    tag: 'Profundidad',
    icon: <Layers className="w-5 h-5 text-accent" />,
    title: 'En tres dimensiones',
    description:
      'Formato estereoscópico: cada ojo recibe una imagen distinta, como funciona la visión natural. No ves una pantalla, ves profundidad real. Las gafas te llegan a tu casa.',
    image: '/images/profundidad_gafas.png',
  },
];

export const ServicesSection = () => {
  return (
    <section id="que-recibis" className="py-20 px-6 bg-black relative">
      <div className="max-w-6xl mx-auto text-left">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent block mb-3 font-semibold">
              QUÉ RECIBÍS
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              La experiencia completa
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-light text-sm">
            Cada pieza se construye para una sola persona. Nada es genérico, nada es de catálogo.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden flex flex-col group hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* Image cover */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Text content */}
              <div className="p-8 flex flex-col flex-1 gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-white/5 text-xs text-white/70 border border-white/10">
                    {card.tag}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-white/90 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {card.description}
                </p>
                <div className="pt-2 mt-auto">
                  <a
                    href="https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full text-xs tracking-wide hover:bg-white/10 transition-all duration-300 shadow-md cursor-pointer w-fit"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Quiero mi escena
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
