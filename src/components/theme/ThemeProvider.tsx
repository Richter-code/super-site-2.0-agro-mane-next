'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  applyTheme,
  getDocumentTheme,
  getPreferredTheme,
  type ThemeName,
  type ThemePreference,
} from '@/lib/design-system/theme';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
  isMounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  defaultPreference?: ThemePreference;
};

export function ThemeProvider({
  children,
  defaultPreference = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const detected = getDocumentTheme();
    if (detected) return detected;
    return defaultPreference === 'dark' ? 'dark' : 'light';
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const preferred = getPreferredTheme(defaultPreference);
    setThemeState(preferred);
    applyTheme(preferred);
    setIsMounted(true);
  }, [defaultPreference]);

  const setTheme = useCallback((value: ThemeName) => {
    setThemeState(value);
    applyTheme(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isMounted,
    }),
    [theme, isMounted, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
