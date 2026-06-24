import { motion } from 'framer-motion';

export const AboutSection = () => {
  return (
    <section id="el-programa" className="py-20 px-6 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-white/50 block mb-6 font-semibold"
        >
          El programa
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-6xl tracking-tight text-white font-light leading-snug md:leading-normal"
        >
          No es un curso. Es trabajo{' '}
          <span className="font-instrument italic text-white/95 px-1">real</span>
          , individual, con seguimiento diario.
        </motion.h2>
      </div>
    </section>
  );
};
