export const lightColors = {
  primary: '#000000',
  background: '#FFFFFF',
  surface: '#F8F8F8',
  surfaceHover: '#F2F2F2',
  surfaceGlass: 'rgba(255, 255, 255, 0.85)',
  border: '#EAEAEA',
  borderHover: '#000000',
  borderLight: '#F0F0F0',
  text: '#000000',
  textSecondary: '#555555',
  textMuted: '#888888',
  textInverse: '#FFFFFF',
  cardBg: '#FFFFFF',
  cardBorder: '#EAEAEA',
  codeBg: '#0F0F0F',
  codeBorder: '#222222',
  codeText: '#E6E6E6',
  accent: '#000000',
  accentLight: '#F5F5F5',
  success: '#10B981',
  successBg: '#ECFDF5',
  warning: '#F59E0B',
  warningBg: '#FFFBEB',
  info: '#3B82F6',
  infoBg: '#EFF6FF',
  tagBg: '#F3F4F6',
  navbarGlass: 'rgba(255, 255, 255, 0.88)',
  navbarBorder: 'rgba(230, 230, 235, 0.85)',
};

export const darkColors = {
  primary: '#FFFFFF',
  background: '#000000',
  surface: '#161616',
  surfaceHover: '#222222',
  surfaceGlass: 'rgba(18, 18, 18, 0.88)',
  border: '#282828',
  borderHover: '#FFFFFF',
  borderLight: '#1F1F1F',
  text: '#FFFFFF',
  textSecondary: '#FFFFFF',
  textMuted: '#A1A1AA',
  textInverse: '#000000',
  cardBg: '#121212',
  cardBorder: '#282828',
  codeBg: '#0A0A0A',
  codeBorder: '#282828',
  codeText: '#FFFFFF',
  accent: '#FFFFFF',
  accentLight: '#1E1E1E',
  success: '#10B981',
  successBg: 'rgba(16, 185, 129, 0.15)',
  warning: '#F59E0B',
  warningBg: 'rgba(245, 158, 11, 0.15)',
  info: '#60A5FA',
  infoBg: 'rgba(59, 130, 246, 0.15)',
  tagBg: '#222222',
  navbarGlass: 'rgba(14, 14, 14, 0.88)',
  navbarBorder: 'rgba(45, 45, 50, 0.85)',
};

const sharedTheme = {
  space: [
    '0px',
    '4px',
    '6px',
    '8px',
    '12px',
    '16px',
    '20px',
    '24px',
    '32px',
    '40px',
    '48px',
    '64px',
    '80px',
  ],
  fontSizes: [
    '10px',
    '11px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '18px',
    '20px',
    '22px',
    '26px',
    '32px',
    '38px',
  ],
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    none: 1,
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
  fonts: {
    sans: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    numbers: "'Cabinet Grotesk', 'Clash Display', 'Space Grotesk', 'Satoshi', sans-serif",
    display: "'Cabinet Grotesk', 'Clash Display', 'Space Grotesk', 'Satoshi', sans-serif",
  },
  radii: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
  breakpoints: ['640px', '768px', '1024px', '1280px', '1536px'],
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    slow: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export const lightTheme = {
  ...sharedTheme,
  mode: 'light' as const,
  colors: lightColors,
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
    lg: '0 8px 30px 0 rgba(0, 0, 0, 0.08)',
    xl: '0 16px 40px -4px rgba(0, 0, 0, 0.1)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
    card: '0 1px 3px rgba(0, 0, 0, 0.02), 0 6px 16px rgba(0, 0, 0, 0.03)',
    cardHover: '0 12px 32px -4px rgba(0, 0, 0, 0.08)',
  },
};

export const darkTheme = {
  ...sharedTheme,
  mode: 'dark' as const,
  colors: darkColors,
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.6)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.7)',
    lg: '0 8px 30px 0 rgba(0, 0, 0, 0.8)',
    xl: '0 16px 40px -4px rgba(0, 0, 0, 0.9)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
    card: '0 1px 3px rgba(0, 0, 0, 0.7), 0 6px 16px rgba(0, 0, 0, 0.6)',
    cardHover: '0 12px 32px -4px rgba(0, 0, 0, 0.9)',
  },
};

export type ThemeMode = 'light' | 'dark';
export type Theme = {
  mode: ThemeMode;
  colors: typeof lightColors;
  space: string[];
  fontSizes: string[];
  fontWeights: typeof sharedTheme.fontWeights;
  lineHeights: typeof sharedTheme.lineHeights;
  fonts: typeof sharedTheme.fonts;
  radii: typeof sharedTheme.radii;
  breakpoints: string[];
  transitions: typeof sharedTheme.transitions;
  shadows: typeof lightTheme.shadows;
};

export const theme: Theme = lightTheme;
