import { ImageResponse } from 'next/og';

export const alt = 'Learn with Umar — Technical Education & Documentation Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Inner Card Container */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid #EAEAEA',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAFAFA',
            padding: '48px',
          }}
        >
          {/* Brand Logo Box with exact </> icon */}
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '24px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            <svg
              width="54"
              height="54"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 8 2 12 6 16" />
              <line x1="14.5" y1="4" x2="9.5" y2="20" />
              <polyline points="18 16 22 12 18 8" />
            </svg>
          </div>

          {/* Platform Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#000000',
              marginBottom: '10px',
            }}
          >
            Learn with Umar
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              fontWeight: 500,
              color: '#555555',
              textAlign: 'center',
              maxWidth: '820px',
              lineHeight: 1.4,
              marginBottom: '28px',
            }}
          >
            Premium Technical Education & Internship Training Platform
          </div>

          {/* Track Badges */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              Full Stack Web Development
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #CCCCCC',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              Digital Marketing Mastery
            </div>
            <div
              style={{
                backgroundColor: '#F0F0F0',
                color: '#333333',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              40 Modules • 380+ Lessons
            </div>
          </div>

          {/* Bottom Attribution */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              fontSize: '13px',
              color: '#888888',
              fontWeight: 600,
            }}
          >
            Developed & Designed by Umar Nazir
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
