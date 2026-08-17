import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FeaturedVideoSection = () => {
  return (
    <section id="el-problema" className="py-16 px-6 bg-black relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 min-h-[500px]"
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">
              EL PROBLEMA
            </span>
            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed">
              Te dijeron que visualices. Y lo intentaste, mil veces.
            </p>
            <div className="text-base md:text-lg text-white/50 font-light leading-relaxed space-y-4">
              <p>
                Pero la mente se satura. Genera versiones borrosas, incompletas, que cambian cada vez.
                Y al rato estás de vuelta en el loop de siempre: la duda, la urgencia, el "¿por qué no me funciona?".
              </p>
              <p>
                No es un problema tuyo. Es una falla de método que lleva décadas sin resolverse.
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent text-black hover:bg-accent/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                Quiero resolverlo
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[400px] aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/5">
            <img
              src="/images/el_problema.png"
              alt="Mente saturada visualizando"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
