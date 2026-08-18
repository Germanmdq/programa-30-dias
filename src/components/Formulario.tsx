import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Check, Loader2 } from 'lucide-react';

type Datos = {
  nombre: string;
  email: string;
  whatsapp: string;
  deseo: string;
  escena: string;
  personas: string;
  disponibilidad: string;
};

const vacio: Datos = {
  nombre: '',
  email: '',
  whatsapp: '',
  deseo: '',
  escena: '',
  personas: '',
  disponibilidad: '',
};

const ordenCampos: (keyof Datos)[] = [
  'nombre',
  'email',
  'whatsapp',
  'deseo',
  'escena',
  'personas',
  'disponibilidad',
];

const descriptores: Record<
  keyof Datos,
  {
    label: string;
    tipo: 'text' | 'email' | 'area' | 'phone';
    ayuda?: string;
  }
> = {
  nombre: { label: 'Nombre y apellido', tipo: 'text' },
  email: { label: 'Email', tipo: 'email' },
  whatsapp: { label: 'WhatsApp', tipo: 'phone' },
  deseo: {
    label: '¿Qué querés que ya esté resuelto?',
    tipo: 'area',
    ayuda: 'Escribilo como si ya hubiera pasado.',
  },
  escena: {
    label: 'Si ya lo imaginaste alguna vez, ¿dónde estabas y qué pasaba?',
    tipo: 'area',
    ayuda: 'No hace falta que esté claro. Con lo que recuerdes alcanza.',
  },
  personas: {
    label: '¿Hay alguien en esa escena? ¿Quién?',
    tipo: 'area',
  },
  disponibilidad: {
    label: '¿Qué días y horarios te quedan bien para las sesiones?',
    tipo: 'text',
  },
};

export function Formulario() {
  const [datos, setDatos] = useState<Datos>(vacio);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof Datos, v: string) => setDatos((d) => ({ ...d, [k]: v }));

  const enviar = async () => {
    if (!datos.nombre || !datos.email || !datos.whatsapp || !datos.deseo) {
      setError('Completá nombre, email, WhatsApp y qué querés que ya esté resuelto.');
      return;
    }
    setError('');
    setEnviando(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...datos,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!res.ok) throw new Error('fallo');
      setListo(true);
    } catch {
      setError('No se pudo enviar. Probá de nuevo en un momento.');
    } finally {
      setEnviando(false);
    }
  };

  if (listo) {
    return (
      <main className="flex min-h-screen items-center px-6 md:px-12 lg:px-20 bg-sala">
        <div className="mx-auto max-w-xl">
          <Check className="h-7 w-7 text-ambar" strokeWidth={2.5} />
          <h1 className="mt-6 t-titulo text-luz">
            Listo. Ya tengo tu escena.
          </h1>
          <p className="mt-6 t-cuerpo">
            Te escribo por WhatsApp para coordinar la primera sesión. A partir de
            ahí son 21 días hasta la entrega.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-24 md:px-12 md:py-32 lg:px-20 bg-sala">
      <div className="mx-auto max-w-xl">
        <span className="t-rotulo block mb-6">Control de la Imagen</span>
        <h1 className="t-titulo text-luz">
          Contame qué querés habitar.
        </h1>
        <p className="mt-6 t-cuerpo">
          Con esto arranco. El resto lo encontramos juntos en las sesiones.
        </p>

        <div className="mt-14 flex flex-col gap-9">
          {ordenCampos.map((key) => {
            const desc = descriptores[key];
            return (
              <label key={key} className="block">
                <span className="block text-[0.9375rem] font-medium text-luz">{desc.label}</span>
                {desc.ayuda && (
                  <span className="mt-1.5 block text-[0.8125rem] text-luz-baja leading-normal">
                    {desc.ayuda}
                  </span>
                )}
                {desc.tipo === 'area' && (
                  <textarea
                    rows={3}
                    value={datos[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="mt-3 w-full resize-none rounded-lg border border-borde bg-luz/[0.04] px-4 py-3.5 text-[0.9375rem] text-luz transition-all duration-200 outline-none focus:border-ambar/50 focus:bg-luz/[0.06]"
                  />
                )}
                {desc.tipo === 'phone' && (
                  <div className="mt-3">
                    <PhoneInput
                      defaultCountry="ar"
                      value={datos.whatsapp}
                      onChange={(v) => set('whatsapp', v)}
                    />
                  </div>
                )}
                {(desc.tipo === 'text' || desc.tipo === 'email') && (
                  <input
                    type={desc.tipo}
                    value={datos[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="mt-3 w-full rounded-lg border border-borde bg-luz/[0.04] px-4 py-3.5 text-[0.9375rem] text-luz transition-all duration-200 outline-none focus:border-ambar/50 focus:bg-luz/[0.06]"
                  />
                )}
              </label>
            );
          })}
        </div>

        {error && <p className="mt-8 text-[0.9375rem] text-ambar font-medium">{error}</p>}

        <button
          onClick={enviar}
          disabled={enviando}
          className="mt-12 inline-flex items-center justify-center gap-2.5 rounded-full bg-luz text-sala px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.01em] transition-opacity duration-300 hover:opacity-90 disabled:opacity-50 cursor-pointer w-full md:w-auto"
        >
          {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
          {enviando ? 'Enviando' : 'Enviar'}
        </button>
      </div>
    </main>
  );
}
