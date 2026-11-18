'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,550,500,400&f[]=cabinet-grotesk@800,700,600,500&f[]=clash-display@700,600,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

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
  }

  body {
    min-height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.sans};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
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
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  code, pre, kbd {
    font-family: ${({ theme }) => theme.fonts.mono};
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
