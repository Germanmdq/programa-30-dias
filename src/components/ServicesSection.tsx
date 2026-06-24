import { motion } from 'framer-motion';
import { Heart, Coins, Activity } from 'lucide-react';

const cards = [
  {
    tag: 'Amor',
    icon: <Heart className="w-5 h-5 text-red-400" />,
    title: 'Relaciones y vínculos',
    description:
      'Trabajamos las creencias que te separan de la pareja, el vínculo o la relación que querés. Sin teoría — con trabajo real sobre tu yo soy.',
    video: '/videos/A_woman_sitting_alone_at_a_tab.mp4#t=0.1',
  },
  {
    tag: 'Dinero',
    icon: <Coins className="w-5 h-5 text-amber-400" />,
    title: 'Prosperidad y abundancia',
    description:
      'Identificamos qué creés sobre vos mismo/a y el dinero, y lo cambiamos desde adentro. En 30 días empezás a ver cómo tu realidad económica se mueve.',
    video: '/videos/A_man_walking_confidently_thro.mp4#t=0.1',
  },
  {
    tag: 'Salud',
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    title: 'Bienestar y autoconcepto',
    description:
      'Reconfiguramos tu estado mental de salud y vitalidad. Alineamos tu cuerpo físico con la asunción del bienestar pleno y la paz mental.',
    video: '/videos/Sin_título.mp4#t=0.1',
  },
];

export const ServicesSection = () => {
  return (
    <section id="preguntas" className="py-20 px-6 bg-black relative">
      <div className="max-w-6xl mx-auto text-left">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-3 font-semibold">
              Las tres áreas
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Qué trabajamos
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-light text-sm">
            La transformación real no es teórica. Es la asunción práctica y diaria de un
            nuevo autoconcepto en cada aspecto de tu vida.
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
              {/* Video cover */}
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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
                <p className="text-sm text-white/50 font-light leading-relaxed mt-auto">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
