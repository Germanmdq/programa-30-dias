import { MessageCircle } from 'lucide-react';
import { Revelar, WHATSAPP } from './ui';

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-10 md:py-40">
      {/* Background Video */}
      <video
        src="/videos/problema.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sala via-sala/80 to-sala" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Revelar>
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            {/* Title - col-span-7 */}
            <h2 className="t-titulo md:col-span-7">
              ¿Qué pasaría si te entrego tu deseo cumplido en tres dimensiones?
            </h2>

            {/* Subtext and Button - col-span-5 */}
            <div className="md:col-span-5 self-end flex flex-col gap-8">
              <p className="t-cuerpo">
                La escena ya está construida. Te devuelve la sensación. Y llega
                sola. Por primera vez, lo que fallaba no está en tus manos.
              </p>
              <div>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-luz text-sala px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.01em] transition-opacity duration-300 hover:opacity-90"
                >
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.5} />
                  Escribime ahora
                </a>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
