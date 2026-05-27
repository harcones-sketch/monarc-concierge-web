import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'MONARC Concierge — Luxury Concierge Madrid | Life, Curated.'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Cinzel 400 — fuente de marca
  const cinzelData = await fetch(
    'https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63nmSS6-VDW4RgQ.woff2'
  ).then(r => r.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1C1A17',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'Cinzel',
        }}
      >
        {/* Líneas doradas top/bottom */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C8A86E, transparent)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C8A86E, transparent)', display: 'flex' }} />

        {/* Líneas laterales decorativas */}
        <div style={{ position: 'absolute', left: 60, top: 60, bottom: 60, width: 1, background: 'rgba(200,168,110,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 60, top: 60, bottom: 60, width: 1, background: 'rgba(200,168,110,0.2)', display: 'flex' }} />

        {/* Diamante decorativo */}
        <div style={{ fontSize: 20, color: '#C8A86E', marginBottom: 32, letterSpacing: 24, display: 'flex', opacity: 0.7 }}>
          ◆ ◆ ◆
        </div>

        {/* MONARC */}
        <div style={{
          fontSize: 112,
          color: '#F5F2EC',
          letterSpacing: 28,
          lineHeight: 1,
          marginBottom: 6,
          display: 'flex',
        }}>
          MONARC
        </div>

        {/* CONCIERGE */}
        <div style={{
          fontSize: 22,
          color: '#C8A86E',
          letterSpacing: 18,
          marginBottom: 44,
          display: 'flex',
        }}>
          CONCIERGE
        </div>

        {/* Separador dorado */}
        <div style={{ width: 100, height: 1, background: '#C8A86E', marginBottom: 40, display: 'flex', opacity: 0.6 }} />

        {/* Tagline */}
        <div style={{
          fontSize: 32,
          color: '#F5F2EC',
          letterSpacing: 6,
          opacity: 0.75,
          marginBottom: 44,
          display: 'flex',
        }}>
          Life, Curated.
        </div>

        {/* Madrid · Jets Privados · Experiencias Exclusivas */}
        <div style={{
          fontSize: 13,
          color: '#C8A86E',
          letterSpacing: 5,
          opacity: 0.55,
          display: 'flex',
        }}>
          MADRID · monarcconcierge.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cinzel', data: cinzelData, style: 'normal', weight: 400 },
      ],
    }
  )
}
