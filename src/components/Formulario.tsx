import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export const Formulario = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    deseo: '',
    escena: '',
    personas: '',
    disponibilidad: '',
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email ingresado no es válido';
    }

    if (!formData.whatsapp.trim() || formData.whatsapp.length < 7) {
      newErrors.whatsapp = 'El WhatsApp es obligatorio';
    }
    
    if (!formData.deseo.trim()) {
      newErrors.deseo = 'Esta pregunta es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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
      console.error('Error registrando formulario:', err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || 'Error de conexión. Por favor intentá de nuevo.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) => 
    `bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all duration-300 w-full resize-none ${
      hasError ? 'border-red-500/50' : 'border-white/10'
    }`;

  const labelClass = 'text-xs uppercase tracking-widest text-accent block mb-2 font-semibold';
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
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-light tracking-tight text-white leading-tight">
              Registro <span className="font-instrument italic text-accent">recibido</span>.
            </h1>
            <p className="text-white/60 font-light text-base leading-relaxed">
              Germán va a revisar tu información y se va a poner en contacto con vos pronto para comenzar.
            </p>
            <div className="pt-6 w-full flex flex-col gap-4">
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
          
          {/* Header */}
          <div className="mb-8 border-b border-white/5 pb-6">
            <span className="text-xs uppercase tracking-widest text-accent block mb-2 font-semibold">
              Formulario de Escena
            </span>
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
              Control de la <span className="font-instrument italic text-white/95">Imagen</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={sectionCardClass}>
              {/* Nombre */}
              <div className="text-left">
                <label className={labelClass}>Nombre y apellido *</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className={inputClass(!!errors.nombre)}
                />
                {errors.nombre && <span className="text-xs text-red-400 mt-1 block">{errors.nombre}</span>}
              </div>

              {/* Email y Whatsapp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
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

                <div className="text-left">
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

              {/* Deseo */}
              <div className="text-left">
                <label className={labelClass}>¿Qué querés que ya esté resuelto? *</label>
                <textarea
                  rows={3}
                  value={formData.deseo}
                  onChange={(e) => handleInputChange('deseo', e.target.value)}
                  placeholder="Describí tu deseo o meta que querés ver manifestado..."
                  className={inputClass(!!errors.deseo)}
                />
                {errors.deseo && <span className="text-xs text-red-400 mt-1 block">{errors.deseo}</span>}
              </div>

              {/* Escena */}
              <div className="text-left">
                <label className={labelClass}>Si ya lo imaginaste alguna vez, ¿dónde estabas y qué pasaba?</label>
                <textarea
                  rows={3}
                  value={formData.escena}
                  onChange={(e) => handleInputChange('escena', e.target.value)}
                  placeholder="Contame si tenés alguna imagen o escenario en mente..."
                  className={inputClass()}
                />
              </div>

              {/* Personas */}
              <div className="text-left">
                <label className={labelClass}>¿Hay alguien en esa escena? ¿Quién?</label>
                <textarea
                  rows={2}
                  value={formData.personas}
                  onChange={(e) => handleInputChange('personas', e.target.value)}
                  placeholder="Detallá si hay personas específicas involucradas..."
                  className={inputClass()}
                />
              </div>

              {/* Disponibilidad */}
              <div className="text-left">
                <label className={labelClass}>¿Qué días y horarios te quedan bien para las sesiones?</label>
                <input
                  type="text"
                  value={formData.disponibilidad}
                  onChange={(e) => handleInputChange('disponibilidad', e.target.value)}
                  placeholder="Ej. Lunes y Miércoles por la tarde, de 16 a 19 hs"
                  className={inputClass()}
                />
              </div>
            </div>

            {/* Error Banner */}
            {errors.submit && (
              <div className="text-red-400 text-sm font-light text-left w-full p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                {errors.submit}
              </div>
            )}

            {/* Submit */}
            <div className="pt-2 flex justify-end">
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
                    Enviar registro
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
