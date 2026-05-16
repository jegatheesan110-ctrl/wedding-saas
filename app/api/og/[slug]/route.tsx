import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = decodeURIComponent(params.slug)
    const invitation = await prisma.invitation.findUnique({
      where: { slug }
    })

    return new ImageResponse(
      (
        <div style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #8b0000, #cc0000)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Gold border */}
          <div style={{
            position: 'absolute',
            top: '15px', left: '15px',
            right: '15px', bottom: '15px',
            border: '1px solid rgba(212,175,55,0.5)',
            display: 'flex',
          }} />

          {/* Gold vertical line */}
          <div style={{
            position: 'absolute',
            top: '0', bottom: '0',
            left: '50%',
            width: '1px',
            background: 'rgba(212,175,55,0.4)',
            display: 'flex',
          }} />

          {/* Content */}
          <div style={{
            color: '#d4af37',
            fontSize: '14px',
            letterSpacing: '4px',
            marginBottom: '12px',
            display: 'flex',
          }}>
            திருமண அழைப்பிதழ்
          </div>

          <div style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {invitation?.brideName || 'மணமகள்'}
          </div>

          <div style={{
            color: '#d4af37',
            fontSize: '20px',
            margin: '8px 0',
            display: 'flex',
          }}>
            &
          </div>

          <div style={{
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0 20px',
            display: 'flex',
          }}>
            {invitation?.groomName || 'மணமகன்'}
          </div>

          {/* Tap to view */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            color: '#d4af37',
            fontSize: '13px',
            letterSpacing: '2px',
            display: 'flex',
          }}>
            TAP TO VIEW 💌
          </div>
        </div>
      ),
      { width: 400, height: 400 }
    )
  } catch (error) {
    return new ImageResponse(
      (
        <div style={{
          width: '400px',
          height: '400px',
          background: '#8b0000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4af37',
          fontSize: '24px',
        }}>
          திருமண அழைப்பிதழ் 💌
        </div>
      ),
      { width: 400, height: 400 }
    )
  }
}
