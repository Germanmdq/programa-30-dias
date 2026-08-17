import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const HERO_VIDEO_URL = '/videos/cuadro.mp4';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fadeTo = (target: number, durationMs: number) => {
    const video = videoRef.current;
    if (!video) return;
    const start = video.style.opacity === '' ? 0 : parseFloat(video.style.opacity);
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      video.style.opacity = String(start + (target - start) * progress);
      if (progress < 1) requestAnimationFrame(tick);
    };
    video.style.opacity = String(start); // safety initialization
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = '0';

    const onCanPlay = () => { video.play().catch(() => {}); fadeTo(1, 500); };
    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && parseFloat(video.style.opacity) > 0) fadeTo(0, 500);
    };
    const onEnded = () => {
      video.style.opacity = '0';
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black pt-[18vh] px-6">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: 'none' }}
      />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-white/70">Cupos limitados</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl tracking-tight text-white mb-8 font-light leading-none"
        >
          Nos convertimos en lo que{' '}
          <span className="font-instrument italic text-white/95 relative inline-block px-1">contemplamos</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-8 leading-relaxed"
        >
          La primera prótesis perceptiva: fabrico la imagen de tu deseo cumplido y te la entrego terminada, en tres dimensiones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://wa.me/542236151152?text=Quiero%20mi%20escena%20de%20Control%20de%20la%20Imagen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            Quiero mi escena
          </a>
        </motion.div>
      </div>
    </section>
  );
};
