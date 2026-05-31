import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, phone, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'MONARC Concierge <onboarding@resend.dev>',
      to: ['monarcvipconcierge@gmail.com'],
      replyTo: email,
      subject: `Nueva consulta MONARC — ${service || 'General'} · ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F5F1E8; color: #1C1A17;">
          <div style="border-bottom: 1px solid #C8A86E; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 24px; letter-spacing: 4px; text-transform: uppercase; margin: 0; color: #1C1A17;">MONARC</h1>
            <p style="font-size: 10px; letter-spacing: 3px; color: #C8A86E; margin: 4px 0 0; text-transform: uppercase;">Nueva Consulta — monarcconcierge.com</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 10px; letter-spacing: 2px; color: #6A5E55; text-transform: uppercase; width: 130px;">Nombre</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 14px; color: #1C1A17;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 10px; letter-spacing: 2px; color: #6A5E55; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 14px;"><a href="mailto:${email}" style="color: #B8965A; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 10px; letter-spacing: 2px; color: #6A5E55; text-transform: uppercase;">Teléfono</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 14px; color: #1C1A17;">${phone}</td>
            </tr>` : ''}
            ${service ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 10px; letter-spacing: 2px; color: #6A5E55; text-transform: uppercase;">Servicio</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,168,110,0.15); font-size: 14px; color: #1C1A17;">${service}</td>
            </tr>` : ''}
          </table>

          <div style="background: #EDE8DF; padding: 24px; border-left: 2px solid #C8A86E; margin-bottom: 32px;">
            <p style="font-size: 10px; letter-spacing: 2px; color: #6A5E55; text-transform: uppercase; margin: 0 0 14px;">Mensaje</p>
            <p style="font-size: 14px; line-height: 1.9; margin: 0; color: #3D3530;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="text-align: center; padding: 24px 0; border-top: 1px solid rgba(200,168,110,0.2);">
            <a href="mailto:${email}?subject=Re:%20Tu%20consulta%20MONARC"
               style="display: inline-block; background: #1C1A17; color: #F5F2EC; padding: 14px 36px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; text-decoration: none;">
              Responder →
            </a>
          </div>

          <p style="font-size: 10px; color: #A09588; text-align: center; margin-top: 28px; letter-spacing: 2px; text-transform: uppercase;">
            MONARC Concierge · Madrid · monarcconcierge.com
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
