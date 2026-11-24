'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { AppThemeProvider } from '@/context/ThemeContext';
import { GlobalStyle } from './GlobalStyle';
import { shouldForwardProp } from '@/components/ui/primitives';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <AppThemeProvider>
          <GlobalStyle />
          {children}
        </AppThemeProvider>
      </StyleSheetManager>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance} shouldForwardProp={shouldForwardProp}>
      <AppThemeProvider>
        <GlobalStyle />
        {children}
      </AppThemeProvider>
    </StyleSheetManager>
  );
}
