import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

declare var process: any;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    nombre,
    email,
    whatsapp,
    deseo,
    escena,
    personas,
    disponibilidad,
    timezone,
  } = req.body;

  if (!nombre || !email || !whatsapp || !deseo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error: dbError } = await supabase.from('escenas').insert([
      {
        nombre,
        email,
        whatsapp,
        deseo,
        escena,
        personas,
        disponibilidad,
        timezone,
      },
    ]);

    if (dbError) {
      console.error('Supabase error:', dbError);
      return res.status(500).json({ error: 'No se pudo guardar' });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: `Control de la Imagen — ${nombre}`,
      html: `
        <h2>Nueva escena</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Zona horaria:</strong> ${timezone || '—'}</p>
        <hr />
        <p><strong>Qué quiere que ya esté resuelto:</strong><br>${deseo || '—'}</p>
        <p><strong>Escena que ya imaginó:</strong><br>${escena || '—'}</p>
        <p><strong>Personas en la escena:</strong><br>${personas || '—'}</p>
        <p><strong>Disponibilidad:</strong><br>${disponibilidad || '—'}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
