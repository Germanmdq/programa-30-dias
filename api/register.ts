import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    nombre,
    email,
    whatsapp,
    creenciasPersonales,
    amorActual,
    dineroActual,
    saludActual,
    amorDeseado,
    dineroDeseado,
    saludDeseado,
    metasAdicionales,
    horarioManana,
    horarioMediodia,
    horarioTarde,
    horarioNoche,
  } = req.body;

  // Basic validation
  if (
    !nombre ||
    !email ||
    !whatsapp ||
    !creenciasPersonales ||
    !horarioManana ||
    !horarioMediodia ||
    !horarioTarde ||
    !horarioNoche
  ) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
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

    // 2. Insert/Upsert user data in "alumnos" table
    const { error: dbError } = await supabase.from('alumnos').upsert({
      id: userId,
      nombre,
      email,
      whatsapp,
      creencias_personales: creenciasPersonales,
      amor_actual: amorActual,
      dinero_actual: dineroActual,
      salud_actual: saludActual,
      amor_deseado: amorDeseado,
      dinero_deseado: dineroDeseado,
      salud_deseado: saludDeseado,
      metas_adicionales: metasAdicionales,
      horario_manana: horarioManana,
      horario_mediodia: horarioMediodia,
      horario_tarde: horarioTarde,
      horario_noche: horarioNoche,
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
        from: 'Germán González <contacto@30dias.click>',
        to: email,
        subject: 'Ya estás adentro — Accedé a tu programa de 30 días',
        html: `
          <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #222;">
            <h1 style="font-size: 24px; font-weight: 300; margin-bottom: 24px; text-align: center;">Tu acompañamiento de 30 días ha comenzado</h1>
            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Hola ${nombre},</p>
            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">Ya estás registrado en el programa de 30 días de acompañamiento individual. Para ingresar a tu panel de control personal, hacé click en el siguiente botón:</p>
            <div style="text-align: center; margin-bottom: 40px;">
              <a href="${magicLink}" style="background-color: #fff; color: #000; text-decoration: none; padding: 16px 32px; border-radius: 30px; font-weight: bold; display: inline-block; letter-spacing: 0.5px;">Ingresar al Panel</a>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center; line-height: 1.4;">Si el botón no funciona, podés copiar y pegar este enlace en tu navegador:<br><a href="${magicLink}" style="color: #888; word-break: break-all;">${magicLink}</a></p>
          </div>
        `,
      });

      // Email to Germán
      await resend.emails.send({
        from: 'Programa 30 Días <contacto@30dias.click>',
        to: 'germangonzalezmdq@gmail.com',
        subject: `Nuevo alumno registrado — ${nombre}`,
        html: `
          <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #222;">
            <h1 style="font-size: 24px; font-weight: 300; margin-bottom: 24px; border-bottom: 1px solid #222; pb-4;">Nuevo registro de alumno</h1>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #ccc; margin-bottom: 24px;"><strong>WhatsApp:</strong> ${whatsapp}</p>
            
            <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 24px;" />
            
            <h2 style="font-size: 18px; font-weight: 400; color: #fff; margin-bottom: 16px;">Horarios de Meditación</h2>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Mañana:</strong> ${horarioManana} hs</p>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Mediodía:</strong> ${horarioMediodia} hs</p>
            <p style="color: #ccc; margin-bottom: 8px;"><strong>Tarde:</strong> ${horarioTarde} hs</p>
            <p style="color: #ccc; margin-bottom: 24px;"><strong>Noche:</strong> ${horarioNoche} hs</p>
            
            <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 24px;" />
            
            <h2 style="font-size: 18px; font-weight: 400; color: #fff; margin-bottom: 16px;">Etapa 1: Quién sos hoy</h2>
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Creencias sobre sí mismo/a:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${creenciasPersonales}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Situación Amor:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${amorActual || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Situación Dinero:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${dineroActual || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Situación Salud:</strong></p>
            <p style="color: #fff; margin-bottom: 24px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${saludActual || 'No especificado'}</p>
            
            <hr style="border: 0; border-top: 1px solid #222; margin-bottom: 24px;" />
            
            <h2 style="font-size: 18px; font-weight: 400; color: #fff; margin-bottom: 16px;">Etapa 2: Qué quiere obtener</h2>
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Escena ideal Amor:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${amorDeseado || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Escena ideal Dinero:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${dineroDeseado || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Escena ideal Salud:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${saludDeseado || 'No especificado'}</p>
            
            <p style="color: #aaa; margin-bottom: 4px; font-size: 14px;"><strong>Metas/Comentarios:</strong></p>
            <p style="color: #fff; margin-bottom: 16px; white-space: pre-wrap; font-size: 15px; font-weight: 300;">${metasAdicionales || 'Ninguno'}</p>
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
