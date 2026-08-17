import { MessageCircle } from 'lucide-react';
import { Revelar, WHATSAPP } from './ui';

/* Closing frame: the room again, dark, with the offer sitting in it.
   Same footage as the problem section, now read differently. */
export function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-36 md:px-12 md:py-48 lg:px-20">
      <video
        src="/videos/problema.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sala via-sala/85 to-sala/40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Revelar>
          <h2 className="max-w-3xl font-display text-[2.25rem] leading-[1.08] sm:text-[3.25rem] md:text-[3.75rem]">
            ¿Qué pasaría si te entrego tu deseo cumplido en{' '}
            <em className="italic text-ambar">tres dimensiones</em>?
          </h2>
          <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-luz-baja">
            La escena ya está construida. Te devuelve la sensación. Y llega sola.
            Por primera vez, lo que fallaba no está en tus manos.
          </p>
          <div className="mt-11">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-luz px-8 py-4 text-[0.9375rem] font-medium text-sala transition-colors duration-300 hover:bg-white"
            >
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2} />
              Escribime ahora
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
