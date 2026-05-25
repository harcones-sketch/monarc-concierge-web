import { ImageResponse } from 'next/og'

export const size        = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1C1A17',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Corona unicode */}
        <div
          style={{
            color: '#C8A86E',
            fontSize: 32,
            lineHeight: 1,
            marginBottom: 4,
            opacity: 0.85,
          }}
        >
          ♛
        </div>

        {/* M */}
        <div
          style={{
            color: '#C8A86E',
            fontSize: 72,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          M
        </div>

        {/* Línea decorativa */}
        <div
          style={{
            width: 36,
            height: 1,
            background: '#C8A86E',
            marginTop: 10,
            opacity: 0.5,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
