'use client';

import { createGlobalStyle } from 'styled-components';

// Fonts are loaded with <link> tags in app/layout.tsx. Importing remote
// stylesheets inside createGlobalStyle triggers styled-components' CSSOM
// warning in production, so keep @import out of this stylesheet.
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 14.5px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    height: 100%;
    overflow-x: clip;
    max-width: 100%;
  }

  body {
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    overflow-x: clip;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* Prevent text and container overflow on small mobile viewports */
  p, h1, h2, h3, h4, h5, h6, span, a, li {
    overflow-wrap: break-word;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    box-sizing: border-box;
    max-width: 100%;
  }

  code, pre, kbd {
    font-family: ${({ theme }) => theme.fonts.mono};
    max-width: 100%;
  }

  ::selection {
    background-color: #000000;
    color: #FFFFFF;
  }

  /* Custom subtle scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #D9D9D9;
    border-radius: 9999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #999999;
  }
`;
