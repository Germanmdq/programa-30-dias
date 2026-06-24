import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FeaturedVideoSection = () => {
  return (
    <section id="como-funciona" className="py-16 px-6 bg-black relative">
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
            <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">
              Cómo funciona
            </span>
            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed">
              Primero me contás quién sos ahora — tus creencias reales sobre vos mismo/a, el dinero, el amor, la salud.
            </p>
            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
              Con eso armo tu plan completo de 30 días, personalizado para vos. Nos reunimos día por medio para trabajar juntos lo que fue surgiendo.
            </p>
            <div className="pt-4">
              <a
                href="https://wa.me/542236151152?text=Quiero%20ingresar%20al%20acompa%C3%B1amiento%20individual%20de%2030%20d%C3%ADas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                Quiero entrar
              </a>
            </div>
          </div>

          {/* Video */}
          <div className="w-full lg:w-[400px] aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden relative">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4#t=0.1"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
