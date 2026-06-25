import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const userTimezone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

const convertToArgentinaTime = (timeStr: string): string => {
  if (!timeStr) return '';
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const formatter = new Intl.DateTimeFormat('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formatter.format(date) + ' AR';
  } catch (e) {
    console.error('Timezone conversion error:', e);
    return timeStr;
  }
};

export const Formulario = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    
    // Step 1: Quién sos hoy
    quienSosHoy_frase: '',
    quienSosHoy_pensamiento: '',
    quienSosHoy_noGusta: '',
    quienSosHoy_nunca: '',
    quienSosHoy_siempre: '',
    quienSosHoy_cabeza: '',
    
    // Step 1: Dinero
    dinero_situacion: '',
    dinero_otros: '',
    dinero_sinPlata: '',
    dinero_mereces: '',
    
    // Step 1: Salud
    salud_cuerpo: '',
    salud_aceptado: '',
    salud_espejo: '',
    
    // Step 1: Amor y Vínculos
    amor_relaciones: '',
    amor_definicion: '',
    amor_mereces: '',
    
    // Step 1: Qué más define
    yoSoyHoy_pesa: '',
    yoSoyHoy_falta: '',
    yoSoyHoy_cuesta: '',
    
    // Step 2: Cómo te gustaría ser
    quienSosFuturo_frase: '',
    quienSosFuturo_pensamiento: '',
    quienSosFuturo_noGusta: '',
    quienSosFuturo_nunca: '',
    quienSosFuturo_siempre: '',
    quienSosFuturo_cabeza: '',
    
    // Step 2: Dinero
    dineroFuturo_situacion: '',
    dineroFuturo_otros: '',
    dineroFuturo_sinPlata: '',
    dineroFuturo_mereces: '',
    
    // Step 2: Salud
    saludFuturo_cuerpo: '',
    saludFuturo_aceptado: '',
    saludFuturo_espejo: '',
    
    // Step 2: Amor y Vínculos
    amorFuturo_relaciones: '',
    amorFuturo_definicion: '',
    amorFuturo_mereces: '',
    
    // Step 2: Qué más define
    yoSoyFuturo_pesa: '',
    yoSoyFuturo_falta: '',
    yoSoyFuturo_cuesta: '',
    
    // Horarios y Metas
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
    if (!formData.quienSosHoy_frase.trim()) {
      newErrors.quienSosHoy_frase = 'Esta pregunta inicial es obligatoria';
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

    // Validate Step 2 required fields
    const newErrors: Record<string, string> = {};
    if (!formData.quienSosFuturo_frase.trim()) {
      newErrors.quienSosFuturo_frase = 'Esta pregunta inicial es obligatoria';
    }
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

    // Formatting string sections for the Supabase schema and Germán's notification email
    const creenciasPersonalesFormatted = [
      `¿Cómo te describís a vos mismo/a en una frase?`,
      formData.quienSosHoy_frase || '(No respondido)',
      `¿Qué pensás que los demás piensan de vos realmente?`,
      formData.quienSosHoy_pensamiento || '(No respondido)',
      `¿Qué es lo que más no te gusta de vos?`,
      formData.quienSosHoy_noGusta || '(No respondido)',
      `¿Qué cosas decís que "nunca me pasan a mí"?`,
      formData.quienSosHoy_nunca || '(No respondido)',
      `¿Qué cosas decís que "siempre me pasan a mí"?`,
      formData.quienSosHoy_siempre || '(No respondido)',
      `¿Qué es lo que más repetís en tu cabeza sobre vos mismo/a?`,
      formData.quienSosHoy_cabeza || '(No respondido)',
      `¿Qué es lo que más te pesa en este momento?`,
      formData.yoSoyHoy_pesa || '(No respondido)',
      `¿Qué creés que te falta para ser feliz?`,
      formData.yoSoyHoy_falta || '(No respondido)',
      `¿Qué es lo que más te cuesta creer que puede cambiar?`,
      formData.yoSoyHoy_cuesta || '(No respondido)'
    ].join('\n\n');

    const dineroActualFormatted = [
      `¿Cómo describís tu situación económica ahora mismo?`,
      formData.dinero_situacion || '(No respondido)',
      `¿Qué pensás cuando ves que a otros les va bien económicamente?`,
      formData.dinero_otros || '(No respondido)',
      `¿Qué decís cuando no tenés plata?`,
      formData.dinero_sinPlata || '(No respondido)',
      `¿Creés que merecés tener dinero? ¿Por qué sí o por qué no?`,
      formData.dinero_mereces || '(No respondido)'
    ].join('\n\n');

    const saludActualFormatted = [
      `¿Cómo describís tu cuerpo ahora mismo?`,
      formData.salud_cuerpo || '(No respondido)',
      `¿Hay algo de tu salud que ya aceptaste como "así soy yo, no cambia"?`,
      formData.salud_aceptado || '(No respondido)',
      `¿Qué decís de tu cuerpo cuando te mirás al espejo?`,
      formData.salud_espejo || '(No respondido)'
    ].join('\n\n');

    const amorActualFormatted = [
      `¿Cómo están tus relaciones ahora — pareja, familia, amigos?`,
      formData.amor_relaciones || '(No respondido)',
      `¿Qué decís de vos mismo/a en el amor?`,
      formData.amor_definicion || '(No respondido)',
      `¿Creés que merecés una buena relación? ¿Por qué sí o por qué no?`,
      formData.amor_mereces || '(No respondido)'
    ].join('\n\n');

    // Deseadas/Futuro
    const creenciasDeseadasFormatted = [
      `¿Cómo te describís a vos mismo/a en una frase? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_frase || '(No respondido)',
      `¿Qué pensás que los demás piensan de vos realmente? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_pensamiento || '(No respondido)',
      `¿Qué es lo que más no te gusta de vos? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_noGusta || '(No respondido)',
      `¿Qué cosas decís que "nunca me pasan a mí"? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_nunca || '(No respondido)',
      `¿Qué cosas decís que "siempre me pasan a mí"? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_siempre || '(No respondido)',
      `¿Qué es lo que más repetís en tu cabeza sobre vos mismo/a? (Cómo te gustaría que fuera)`,
      formData.quienSosFuturo_cabeza || '(No respondido)',
      `¿Qué es lo que más te pesa en este momento? (Cómo te gustaría que fuera)`,
      formData.yoSoyFuturo_pesa || '(No respondido)',
      `¿Qué creés que te falta para ser feliz? (Cómo te gustaría que fuera)`,
      formData.yoSoyFuturo_falta || '(No respondido)',
      `¿Qué es lo que más te cuesta creer que puede cambiar? (Cómo te gustaría que fuera)`,
      formData.yoSoyFuturo_cuesta || '(No respondido)'
    ].join('\n\n');

    const dineroDeseadoFormatted = [
      `¿Cómo describís tu situación económica ahora mismo? (Cómo te gustaría que fuera)`,
      formData.dineroFuturo_situacion || '(No respondido)',
      `¿Qué pensás cuando ves que a otros les va bien económicamente? (Cómo te gustaría que fuera)`,
      formData.dineroFuturo_otros || '(No respondido)',
      `¿Qué decís cuando no tenés plata? (Cómo te gustaría que fuera)`,
      formData.dineroFuturo_sinPlata || '(No respondido)',
      `¿Creés que merecés tener dinero? ¿Por qué sí o por qué no? (Cómo te gustaría que fuera)`,
      formData.dineroFuturo_mereces || '(No respondido)'
    ].join('\n\n');

    const saludDeseadoFormatted = [
      `¿Cómo describís tu cuerpo ahora mismo? (Cómo te gustaría que fuera)`,
      formData.saludFuturo_cuerpo || '(No respondido)',
      `¿Hay algo de tu salud que ya aceptaste como "así soy yo, no cambia"? (Cómo te gustaría que fuera)`,
      formData.saludFuturo_aceptado || '(No respondido)',
      `¿Qué decís de tu cuerpo cuando te mirás al espejo? (Cómo te gustaría que fuera)`,
      formData.saludFuturo_espejo || '(No respondido)'
    ].join('\n\n');

    const amorDeseadoFormatted = [
      `¿Cómo están tus relaciones ahora — pareja, familia, amigos? (Cómo te gustaría que fuera)`,
      formData.amorFuturo_relaciones || '(No respondido)',
      `¿Qué decís de vos mismo/a en el amor? (Cómo te gustaría que fuera)`,
      formData.amorFuturo_definicion || '(No respondido)',
      `¿Creés que merecés una buena relación? ¿Por qué sí o por qué no? (Cómo te gustaría que fuera)`,
      formData.amorFuturo_mereces || '(No respondido)'
    ].join('\n\n');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          creenciasPersonales: creenciasPersonalesFormatted,
          amorActual: amorActualFormatted,
          dineroActual: dineroActualFormatted,
          saludActual: saludActualFormatted,
          creenciasDeseadas: creenciasDeseadasFormatted,
          amorDeseado: amorDeseadoFormatted,
          dineroDeseado: dineroDeseadoFormatted,
          saludDeseado: saludDeseadoFormatted,
          horarioMananaArg: convertToArgentinaTime(formData.horarioManana),
          horarioMediodiaArg: convertToArgentinaTime(formData.horarioMediodia),
          horarioTardeArg: convertToArgentinaTime(formData.horarioTarde),
          horarioNocheArg: convertToArgentinaTime(formData.horarioNoche),
          timezone: userTimezone,
        }),
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

  const inputClass = (hasError?: boolean) => 
    `bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 w-full resize-none ${
      hasError ? 'border-red-500/50' : 'border-white/10'
    }`;

  const labelClass = 'text-xs uppercase tracking-widest text-white/50 block mb-2 font-semibold';

  const sectionHeaderClass = 'text-base font-light tracking-wide text-white border-b border-white/5 pb-2 mb-4';

  const sectionCardClass = 'p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6';

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-6 flex flex-col justify-between relative overflow-hidden">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <header className="max-w-3xl w-full mx-auto mb-10 z-10">
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </button>
      </header>

      <main className="max-w-3xl w-full mx-auto flex-1 z-10 flex flex-col justify-center">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl relative">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
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
                    Cómo te gustaría <span className="font-instrument italic text-white/95">ser</span>
                  </>
                )}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                  step === 1 ? 'bg-white text-black border-white' : 'bg-white/10 text-white/70 border-white/10'
                }`}
              >
                1
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-500 ${
                  step === 2 ? 'bg-white text-black border-white' : 'bg-white/10 text-white/70 border-white/10'
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
                  className="space-y-8 text-left"
                >
                  {/* Introductory Card */}
                  <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 font-light text-white/70 text-sm md:text-base leading-relaxed space-y-4">
                    <p>Antes de arrancar necesito conocerte y saber quién sos.</p>
                    <p>Lo que vamos a cambiar es el <strong>"yo soy"</strong> — y para cambiarlo primero necesito saber exactamente cómo es el tuyo ahora.</p>
                    <p className="text-white/50 text-xs md:text-sm">Nadie te va a juzgar por lo que escribas acá. Pero necesito que seas supersincero/a. Cuanto más honesto/a seas, más poderoso va a ser el trabajo que hagamos juntos.</p>
                  </div>

                  {/* Datos Básicos Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>Datos Básicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className={labelClass}>Nombre Completo *</label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          placeholder="Ej. Juan Pérez"
                          className={inputClass(!!errors.nombre)}
                        />
                        {errors.nombre && <span className="text-xs text-red-400 mt-1 block">{errors.nombre}</span>}
                      </div>

                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Ej. juan@correo.com"
                          className={inputClass(!!errors.email)}
                        />
                        {errors.email && <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>}
                      </div>

                      <div>
                        <label className={labelClass}>WhatsApp *</label>
                        <PhoneInput
                          defaultCountry="ar"
                          value={formData.whatsapp}
                          onChange={(phone) => handleInputChange('whatsapp', phone)}
                          className="w-full"
                        />
                        {errors.whatsapp && <span className="text-xs text-red-400 mt-1 block">{errors.whatsapp}</span>}
                      </div>
                    </div>
                  </div>

                  {/* ¿Quién sos hoy? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Quién sos hoy?</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo te describís a vos mismo/a en una frase? *</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_frase}
                          onChange={(e) => handleInputChange('quienSosHoy_frase', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass(!!errors.quienSosHoy_frase)}
                        />
                        {errors.quienSosHoy_frase && <span className="text-xs text-red-400 mt-1 block">{errors.quienSosHoy_frase}</span>}
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué pensás que los demás piensan de vos realmente?</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_pensamiento}
                          onChange={(e) => handleInputChange('quienSosHoy_pensamiento', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué es lo que más no te gusta de vos?</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_noGusta}
                          onChange={(e) => handleInputChange('quienSosHoy_noGusta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué cosas decís que "nunca me pasan a mí"?</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_nunca}
                          onChange={(e) => handleInputChange('quienSosHoy_nunca', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué cosas decís que "siempre me pasan a mí"?</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_siempre}
                          onChange={(e) => handleInputChange('quienSosHoy_siempre', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué es lo que más repetís en tu cabeza sobre vos mismo/a?</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosHoy_cabeza}
                          onChange={(e) => handleInputChange('quienSosHoy_cabeza', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo estás con el dinero hoy? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con el dinero hoy?</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo describís tu situación económica ahora mismo?</label>
                        <textarea
                          rows={2}
                          value={formData.dinero_situacion}
                          onChange={(e) => handleInputChange('dinero_situacion', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué pensás cuando ves que a otros les va bien económicamente?</label>
                        <textarea
                          rows={2}
                          value={formData.dinero_otros}
                          onChange={(e) => handleInputChange('dinero_otros', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís cuando no tenés plata?</label>
                        <textarea
                          rows={2}
                          value={formData.dinero_sinPlata}
                          onChange={(e) => handleInputChange('dinero_sinPlata', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Creés que merecés tener dinero? ¿Por qué sí o por qué no?</label>
                        <textarea
                          rows={2}
                          value={formData.dinero_mereces}
                          onChange={(e) => handleInputChange('dinero_mereces', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo estás con tu salud hoy? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con tu salud hoy?</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo describís tu cuerpo ahora mismo?</label>
                        <textarea
                          rows={2}
                          value={formData.salud_cuerpo}
                          onChange={(e) => handleInputChange('salud_cuerpo', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Hay algo de tu salud que ya aceptaste como "así soy yo, no cambia"?</label>
                        <textarea
                          rows={2}
                          value={formData.salud_aceptado}
                          onChange={(e) => handleInputChange('salud_aceptado', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís de tu cuerpo cuando te mirás al espejo?</label>
                        <textarea
                          rows={2}
                          value={formData.salud_espejo}
                          onChange={(e) => handleInputChange('salud_espejo', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo estás con el amor y los vínculos hoy? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con el amor y los vínculos hoy?</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo están tus relaciones ahora — pareja, familia, amigos?</label>
                        <textarea
                          rows={2}
                          value={formData.amor_relaciones}
                          onChange={(e) => handleInputChange('amor_relaciones', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís de vos mismo/a en el amor?</label>
                        <textarea
                          rows={2}
                          value={formData.amor_definicion}
                          onChange={(e) => handleInputChange('amor_definicion', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Creés que merecés una buena relación? ¿Por qué sí o por qué no?</label>
                        <textarea
                          rows={2}
                          value={formData.amor_mereces}
                          onChange={(e) => handleInputChange('amor_mereces', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Qué más define tu "yo soy" hoy? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Qué más define tu "yo soy" hoy?</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Qué es lo que más te pesa en este momento?</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyHoy_pesa}
                          onChange={(e) => handleInputChange('yoSoyHoy_pesa', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué creés que te falta para ser feliz?</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyHoy_falta}
                          onChange={(e) => handleInputChange('yoSoyHoy_falta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué es lo que más te cuesta creer que puede cambiar?</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyHoy_cuesta}
                          onChange={(e) => handleInputChange('yoSoyHoy_cuesta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 rounded-full text-sm tracking-wide shadow-xl cursor-pointer w-full md:w-auto"
                    >
                      Continuar al Paso 2
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
                  className="space-y-8 text-left"
                >
                  {/* Introductory Card Step 2 */}
                  <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 font-light text-white/70 text-sm md:text-base leading-relaxed space-y-2">
                    <p>Ahora describí cómo te gustaría que fuera cada una de estas áreas.</p>
                    <p className="text-white/50 text-xs md:text-sm">Enfocá tu atención e intención en tu nuevo autoconcepto y en cómo te gustaría experimentar la realidad.</p>
                  </div>

                  {/* ¿Quién sos hoy? (Cómo te gustaría que fuera) Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Quién sos hoy? (Cómo te gustaría que fuera)</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo te describís a vos mismo/a en una frase? (Cómo te gustaría que fuera) *</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_frase}
                          onChange={(e) => handleInputChange('quienSosFuturo_frase', e.target.value)}
                          placeholder="Tu autoconcepto deseado..."
                          className={inputClass(!!errors.quienSosFuturo_frase)}
                        />
                        {errors.quienSosFuturo_frase && <span className="text-xs text-red-400 mt-1 block">{errors.quienSosFuturo_frase}</span>}
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué pensás que los demás piensan de vos realmente? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_pensamiento}
                          onChange={(e) => handleInputChange('quienSosFuturo_pensamiento', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué es lo que más no te gusta de vos? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_noGusta}
                          onChange={(e) => handleInputChange('quienSosFuturo_noGusta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué cosas decís que "nunca me pasan a mí"? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_nunca}
                          onChange={(e) => handleInputChange('quienSosFuturo_nunca', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué cosas decís que "siempre me pasan a mí"? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_siempre}
                          onChange={(e) => handleInputChange('quienSosFuturo_siempre', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>¿Qué es lo que más repetís en tu cabeza sobre vos mismo/a? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.quienSosFuturo_cabeza}
                          onChange={(e) => handleInputChange('quienSosFuturo_cabeza', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo te gustaría estar con el dinero? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con el dinero hoy? (Cómo te gustaría que fuera)</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo describís tu situación económica ahora mismo? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.dineroFuturo_situacion}
                          onChange={(e) => handleInputChange('dineroFuturo_situacion', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué pensás cuando ves que a otros les va bien económicamente? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.dineroFuturo_otros}
                          onChange={(e) => handleInputChange('dineroFuturo_otros', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís cuando no tenés plata? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.dineroFuturo_sinPlata}
                          onChange={(e) => handleInputChange('dineroFuturo_sinPlata', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Creés que merecés tener dinero? ¿Por qué sí o por qué no? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.dineroFuturo_mereces}
                          onChange={(e) => handleInputChange('dineroFuturo_mereces', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo te gustaría estar con tu salud? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con tu salud hoy? (Cómo te gustaría que fuera)</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo describís tu cuerpo ahora mismo? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.saludFuturo_cuerpo}
                          onChange={(e) => handleInputChange('saludFuturo_cuerpo', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Hay algo de tu salud que ya aceptaste como "así soy yo, no cambia"? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.saludFuturo_aceptado}
                          onChange={(e) => handleInputChange('saludFuturo_aceptado', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís de tu cuerpo cuando te mirás al espejo? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.saludFuturo_espejo}
                          onChange={(e) => handleInputChange('saludFuturo_espejo', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo te gustaría estar con el amor y los vínculos? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Cómo estás con el amor y los vínculos hoy? (Cómo te gustaría que fuera)</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Cómo están tus relaciones ahora — pareja, familia, amigos? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.amorFuturo_relaciones}
                          onChange={(e) => handleInputChange('amorFuturo_relaciones', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué decís de vos mismo/a en el amor? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.amorFuturo_definicion}
                          onChange={(e) => handleInputChange('amorFuturo_definicion', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Creés que merecés una buena relación? ¿Por qué sí o por qué no? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.amorFuturo_mereces}
                          onChange={(e) => handleInputChange('amorFuturo_mereces', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ¿Cómo te gustaría que fuera tu "yo soy" en el futuro? Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>¿Qué más define tu "yo soy" hoy? (Cómo te gustaría que fuera)</h3>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>¿Qué es lo que más te pesa en este momento? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyFuturo_pesa}
                          onChange={(e) => handleInputChange('yoSoyFuturo_pesa', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué creés que te falta para ser feliz? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyFuturo_falta}
                          onChange={(e) => handleInputChange('yoSoyFuturo_falta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>¿Qué es lo que más te cuesta creer que puede cambiar? (Cómo te gustaría que fuera)</label>
                        <textarea
                          rows={2}
                          value={formData.yoSoyFuturo_cuesta}
                          onChange={(e) => handleInputChange('yoSoyFuturo_cuesta', e.target.value)}
                          placeholder="Tu respuesta..."
                          className={inputClass()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Horarios de Reuniones por Llamada (15 min) Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>Horarios de reuniones por llamada (15 minutos) *</h3>
                    <p className="text-white/40 font-light text-xs -mt-2">
                      Seleccioná la hora aproximada (en tu hora local) en la que preferís que coordinemos las llamadas de 15 minutos:
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
                        {errors.horarioManana ? (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioManana}</span>
                        ) : (
                          formData.horarioManana && (
                            <span className="text-[9px] text-white/40 mt-0.5 block">
                              Equivale a: {convertToArgentinaTime(formData.horarioManana)}
                            </span>
                          )
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
                        {errors.horarioMediodia ? (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioMediodia}</span>
                        ) : (
                          formData.horarioMediodia && (
                            <span className="text-[9px] text-white/40 mt-0.5 block">
                              Equivale a: {convertToArgentinaTime(formData.horarioMediodia)}
                            </span>
                          )
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
                        {errors.horarioTarde ? (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioTarde}</span>
                        ) : (
                          formData.horarioTarde && (
                            <span className="text-[9px] text-white/40 mt-0.5 block">
                              Equivale a: {convertToArgentinaTime(formData.horarioTarde)}
                            </span>
                          )
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
                        {errors.horarioNoche ? (
                          <span className="text-[10px] text-red-400 mt-0.5 block">{errors.horarioNoche}</span>
                        ) : (
                          formData.horarioNoche && (
                            <span className="text-[9px] text-white/40 mt-0.5 block">
                              Equivale a: {convertToArgentinaTime(formData.horarioNoche)}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metas Adicionales Card */}
                  <div className={sectionCardClass}>
                    <h3 className={sectionHeaderClass}>Comentarios o metas específicas</h3>
                    <textarea
                      rows={2}
                      value={formData.metasAdicionales}
                      onChange={(e) => handleInputChange('metasAdicionales', e.target.value)}
                      placeholder="Cualquier otro detalle que consideres clave trabajar durante estos 30 días..."
                      className={inputClass()}
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
