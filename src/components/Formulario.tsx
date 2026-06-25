import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const Formulario = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    creenciasPersonales: '',
    amorActual: '',
    dineroActual: '',
    saludActual: '',
    amorDeseado: '',
    dineroDeseado: '',
    saludDeseado: '',
    metasAdicionales: '',
    horarioManana: '',
    horarioMediodia: '',
    horarioTarde: '',
    horarioNoche: '',
  });

  const goHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email ingresado no es válido';
    }

    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'El WhatsApp es obligatorio';
    if (!formData.creenciasPersonales.trim()) {
      newErrors.creenciasPersonales = 'Este campo es obligatorio para tu diagnóstico';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate meditation times
    const newErrors: Record<string, string> = {};
    if (!formData.horarioManana) newErrors.horarioManana = 'Requerido';
    if (!formData.horarioMediodia) newErrors.horarioMediodia = 'Requerido';
    if (!formData.horarioTarde) newErrors.horarioTarde = 'Requerido';
    if (!formData.horarioNoche) newErrors.horarioNoche = 'Requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.submit;
      return next;
    });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Ocurrió un error al procesar el registro');
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error registrando alumno:', err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || 'Error de conexión. Por favor intentá de nuevo.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] as const },
    }),
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-6 flex flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
        
        <header className="max-w-3xl w-full mx-auto mb-10 z-10" />

        <main className="max-w-md w-full mx-auto flex-1 z-10 flex flex-col justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl space-y-6 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            
            <h1 className="text-3xl font-light tracking-tight text-white leading-tight">
              Listo. Te mandamos un email con tu <span className="font-instrument italic text-white/95">acceso</span>.
            </h1>
            
            <p className="text-white/60 font-light text-base leading-relaxed">
              Revisá tu bandeja de entrada (y la carpeta de spam si no lo encontrás). Nos vemos pronto.
            </p>

            <div className="pt-6 w-full flex flex-col gap-4">
              <a
                href={`https://wa.me/542236151152?text=${encodeURIComponent(
                  `Hola Germán, ya completé mi formulario de diagnóstico y registro.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer w-full"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                Chatear por WhatsApp
              </a>
              <button
                onClick={goHome}
                className="text-sm font-medium text-white/50 hover:text-white/80 transition-colors duration-300 underline underline-offset-4 cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="max-w-3xl w-full mx-auto mt-10 z-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      {/* Header with back navigation */}
      <header className="max-w-3xl w-full mx-auto mb-10 z-10">
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto flex-1 z-10 flex flex-col justify-center">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl relative">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                Paso {step} de 2
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                {step === 1 ? (
                  <>
                    Quién sos <span className="font-instrument italic text-white/95">hoy</span>
                  </>
                ) : (
                  <>
                    Qué querés <span className="font-instrument italic text-white/95">obtener</span>
                  </>
                )}
              </h1>
            </div>
            {/* Step badges */}
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                  step === 1
                    ? 'bg-white text-black border-white'
                    : 'bg-white/10 text-white/70 border-white/10'
                }`}
              >
                1
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                  step === 2
                    ? 'bg-white text-black border-white'
                    : 'bg-white/10 text-white/70 border-white/10'
                }`}
              >
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait" custom={step}>
              {step === 1 ? (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-6">
                    Por favor, completá los siguientes datos básicos y contame sobre tu situación actual. Esto me ayudará a diseñar tu plan personalizado de 30 días.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className={`bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full ${
                          errors.nombre ? 'border-red-500/50' : 'border-white/10'
                        }`}
                      />
                      {errors.nombre && (
                        <span className="text-xs text-red-400 mt-1 block">{errors.nombre}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Ej. juan@correo.com"
                        className={`bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full ${
                          errors.email ? 'border-red-500/50' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">
                        WhatsApp (con código de país) *
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        placeholder="Ej. +5491112345678"
                        className={`bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full ${
                          errors.whatsapp ? 'border-red-500/50' : 'border-white/10'
                        }`}
                      />
                      {errors.whatsapp && (
                        <span className="text-xs text-red-400 mt-1 block">{errors.whatsapp}</span>
                      )}
                    </div>
                  </div>

                  {/* Creencias personales */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 font-semibold block mb-2">
                      ¿Cuáles son tus creencias actuales sobre vos mismo/a? *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.creenciasPersonales}
                      onChange={(e) => handleInputChange('creenciasPersonales', e.target.value)}
                      placeholder="Contame qué creés que podés y qué no podés lograr, tu autoconcepto actual..."
                      className={`bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none ${
                        errors.creenciasPersonales ? 'border-red-500/50' : 'border-white/10'
                      }`}
                    />
                    {errors.creenciasPersonales && (
                      <span className="text-xs text-red-400 mt-1 block">
                        {errors.creenciasPersonales}
                      </span>
                    )}
                  </div>

                  {/* Amor */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      ¿Cómo es tu situación actual en el Amor / Relaciones?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.amorActual}
                      onChange={(e) => handleInputChange('amorActual', e.target.value)}
                      placeholder="Bloqueos, patrones repetitivos, cómo te sentís con respecto a los vínculos..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Dinero */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      ¿Cómo es tu situación actual con el Dinero / Abundancia?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.dineroActual}
                      onChange={(e) => handleInputChange('dineroActual', e.target.value)}
                      placeholder="Miedos, deudas, creencias de escasez, tu relación con el trabajo y el dinero..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Salud */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      ¿Cómo es tu situación actual con la Salud / Concepto físico?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.saludActual}
                      onChange={(e) => handleInputChange('saludActual', e.target.value)}
                      placeholder="Vitalidad, energía, tu autocrítica física, dolores o bloqueos mentales..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Controls */}
                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer w-full md:w-auto"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  custom={2}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 text-left"
                >
                  <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-6">
                    Ahora describí las escenas y estados ideales que deseás manifestar. No pienses en el *cómo*, enfocate puramente en el resultado final de tu deseo cumplido.
                  </p>

                  {/* Amor Deseado */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      Tu escena ideal en el Amor
                    </label>
                    <textarea
                      rows={3}
                      value={formData.amorDeseado}
                      onChange={(e) => handleInputChange('amorDeseado', e.target.value)}
                      placeholder="Describí una escena en primera persona y tiempo presente que implique que ya estás con la persona o en la relación deseada..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Dinero Deseado */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      Tu escena ideal en el Dinero / Abundancia
                    </label>
                    <textarea
                      rows={3}
                      value={formData.dineroDeseado}
                      onChange={(e) => handleInputChange('dineroDeseado', e.target.value)}
                      placeholder="¿Cuánto dinero estás ganando? ¿Cómo te sentís siendo abundante? Describí tu escena presente..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Salud Deseada */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      Tu escena ideal en la Salud / Bienestar
                    </label>
                    <textarea
                      rows={3}
                      value={formData.saludDeseado}
                      onChange={(e) => handleInputChange('saludDeseado', e.target.value)}
                      placeholder="Cómo te sentís físicamente, tu nivel de paz mental, tu cuerpo ideal vibrando en salud plena..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Horarios de Meditación */}
                  <div className="space-y-4 pt-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 block font-semibold border-b border-white/5 pb-2">
                      Horarios de Meditación *
                    </label>
                    <p className="text-white/40 font-light text-xs -mt-2">
                      Seleccioná la hora exacta aproximada en la que vas a hacer tus meditaciones diarias:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Mañana */}
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1 font-semibold">
                          Mañana
                        </label>
                        <input
                          type="time"
                          value={formData.horarioManana}
                          onChange={(e) => handleInputChange('horarioManana', e.target.value)}
                          className={`bg-white/5 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full cursor-pointer ${
                            errors.horarioManana ? 'border-red-500/50' : 'border-white/10'
                          }`}
                        />
                        {errors.horarioManana && (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioManana}</span>
                        )}
                      </div>

                      {/* Mediodía */}
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1 font-semibold">
                          Mediodía
                        </label>
                        <input
                          type="time"
                          value={formData.horarioMediodia}
                          onChange={(e) => handleInputChange('horarioMediodia', e.target.value)}
                          className={`bg-white/5 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full cursor-pointer ${
                            errors.horarioMediodia ? 'border-red-500/50' : 'border-white/10'
                          }`}
                        />
                        {errors.horarioMediodia && (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioMediodia}</span>
                        )}
                      </div>

                      {/* Tarde */}
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1 font-semibold">
                          Tarde
                        </label>
                        <input
                          type="time"
                          value={formData.horarioTarde}
                          onChange={(e) => handleInputChange('horarioTarde', e.target.value)}
                          className={`bg-white/5 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full cursor-pointer ${
                            errors.horarioTarde ? 'border-red-500/50' : 'border-white/10'
                          }`}
                        />
                        {errors.horarioTarde && (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioTarde}</span>
                        )}
                      </div>

                      {/* Noche */}
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1 font-semibold">
                          Noche
                        </label>
                        <input
                          type="time"
                          value={formData.horarioNoche}
                          onChange={(e) => handleInputChange('horarioNoche', e.target.value)}
                          className={`bg-white/5 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full cursor-pointer ${
                            errors.horarioNoche ? 'border-red-500/50' : 'border-white/10'
                          }`}
                        />
                        {errors.horarioNoche && (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioNoche}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metas Adicionales */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold">
                      Comentarios o metas específicas
                    </label>
                    <textarea
                      rows={2}
                      value={formData.metasAdicionales}
                      onChange={(e) => handleInputChange('metasAdicionales', e.target.value)}
                      placeholder="Cualquier otro detalle que consideres clave trabajar durante estos 30 días..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none"
                    />
                  </div>

                  {/* Submit Error banner */}
                  {errors.submit && (
                    <div className="text-red-400 text-sm font-light text-left w-full p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                      {errors.submit}
                    </div>
                  )}

                  {/* Controls */}
                  <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed group w-full md:w-auto py-4"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Volver al Paso 1
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 disabled:bg-white/70 transition-all duration-300 font-semibold px-10 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer w-full md:w-auto disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Enviar y chatear
                          <MessageCircle className="w-4 h-4 fill-black" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </main>
    </div>
  );
};
