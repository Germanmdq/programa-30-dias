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
  } = req.body;

  // Basic validation
  if (!nombre || !email || !whatsapp || !deseo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';
  const resendApiKey = process.env.RESEND_API_KEY || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Supabase credentials are not configured in environment variables' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // 1. Create user in Supabase Auth using admin client
    let userId = '';
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { nombre },
    });

    if (authError) {
      // Check if user already exists
      if (authError.message.includes('already exists') || authError.status === 422) {
        const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) {
          throw new Error(`Failed to list users on conflict: ${listError.message}`);
        }
        const existingUser = listData.users.find(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        );
        if (!existingUser) {
          throw new Error(`Auth user conflict: ${authError.message}`);
        }
        userId = existingUser.id;
      } else {
        throw authError;
      }
    } else {
      userId = authData.user.id;
    }

    // 2. Insert/upsert into alumnos table
    const { error: dbError } = await supabase.from('alumnos').upsert({
      id: userId,
      nombre,
      email,
      whatsapp,
      deseo,
      escena,
      personas,
      disponibilidad,
    });

    if (dbError) {
      throw dbError;
    }

    // 3. Generate Magic Link for passwordless authentication
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: 'https://30dias.click/dashboard',
      },
    });

    if (linkError) {
      throw linkError;
    }

    const magicLink = linkData.properties.action_link;

    // 4. Send emails via Resend if API key is configured
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Email to student
      await resend.emails.send({
        from: 'Control de la Imagen <contacto@30dias.click>',
        to: email,
        subject: 'Tu escena de Control de la Imagen ha comenzado',
        html: `
          <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #222;">
            <h1 style="font-size: 24px; font-weight: 300; margin-bottom: 24px; text-align: center; color: #FF6B00;">Diseño en tres dimensiones</h1>
            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Hola ${nombre},</p>
            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Ya recibimos tu registro para comenzar a diseñar tu escena en tres dimensiones. Me pondré en contacto con vos para coordinar nuestra primera sesión. Si querés ingresar a tu panel de control personal, hacé click en el siguiente botón:</p>
            <div style="text-align: center; margin-bottom: 40px;">
              <a href="${magicLink}" style="background-color: #FF6B00; color: #000; text-decoration: none; padding: 16px 32px; border-radius: 30px; font-weight: bold; display: inline-block; letter-spacing: 0.5px;">Ingresar al Panel</a>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center; line-height: 1.4;">Si el botón no funciona, podés copiar y pegar este enlace en tu navegador:<br><a href="${magicLink}" style="color: #888; word-break: break-all;">${magicLink}</a></p>
          </div>
        `,
      });

      // Email to Germán
      await resend.emails.send({
        from: 'Control de la Imagen <contacto@30dias.click>',
        to: 'germangonzalezmdq@gmail.com',
        subject: `Nuevo registro de Control de la Imagen — ${nombre}`,
        html: `
          <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #222;">
            <h1 style="font-size: 24px; font-weight: 300; margin-bottom: 24px; border-bottom: 1px solid #222; padding-bottom: 16px; color: #FF6B00;">Nuevo registro de Control de la Imagen</h1>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #ccc; margin-bottom: 24px;"><strong>WhatsApp:</strong> ${whatsapp}</p>
            
            <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 24px;" />
            
            <h2 style="font-size: 18px; font-weight: 400; color: #fff; margin-bottom: 16px;">Datos del formulario</h2>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>¿Qué querés que ya esté resuelto?:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${deseo}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Si ya lo imaginaste alguna vez, ¿dónde estabas y qué pasaba?:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${escena || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>¿Hay alguien en esa escena? ¿Quién?:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${personas || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Disponibilidad para sesiones:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${disponibilidad || 'No especificado'}</p>
          </div>
        `,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Registration handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
