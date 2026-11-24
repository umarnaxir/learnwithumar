'use client';

import React, { createContext, useContext, useMemo, useCallback, useSyncExternalStore } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme, ThemeMode } from '@/styles/theme';

interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'learnwithumar-theme';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('learnwithumar-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('learnwithumar-theme-change', callback);
  };
}

function getSnapshot(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getServerSnapshot(): ThemeMode {
  return 'light';
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setThemeMode = useCallback((newMode: ThemeMode) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      document.documentElement.style.colorScheme = newMode;
      window.dispatchEvent(new Event('learnwithumar-theme-change'));
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(mode === 'light' ? 'dark' : 'light');
  }, [mode, setThemeMode]);

  const activeTheme = useMemo<Theme>(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    theme: activeTheme,
    toggleTheme,
    setThemeMode,
    isDark: mode === 'dark',
  }), [mode, activeTheme, toggleTheme, setThemeMode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={activeTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      mode: 'light',
      theme: lightTheme,
      toggleTheme: () => {},
      setThemeMode: () => {},
      isDark: false,
    };
  }
  return context;
}
