export type ThemeName = 'light' | 'dark';
export type ThemePreference = ThemeName | 'system';

export const THEME_STORAGE_KEY = 'agro-mane-theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';
const DARK: ThemeName = 'dark';
const LIGHT: ThemeName = 'light';

export const themeInitScript = `
(function() {
  try {
    const storageKey = '${THEME_STORAGE_KEY}';
    const stored = window.localStorage.getItem(storageKey);
    const mediaQuery = window.matchMedia('${MEDIA_QUERY}');
    const prefersDark = mediaQuery.matches;
    const initial = stored === 'light' || stored === 'dark'
      ? stored
      : prefersDark
        ? 'dark'
        : 'light';

    const root = document.documentElement;
    root.classList.toggle('dark', initial === 'dark');
    root.dataset.theme = initial;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export function getPreferredTheme(
  defaultPreference: ThemePreference = 'system',
): ThemeName {
  if (typeof window === 'undefined')
    return defaultPreference === 'dark' ? DARK : LIGHT;

  let stored: ThemePreference | null = null;
  try {
    stored = window.localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemePreference | null;
  } catch (error) {
    stored = null;
  }

  const mediaQuery = window.matchMedia(MEDIA_QUERY);
  const preference = stored ?? defaultPreference;

  if (preference === 'system') {
    return mediaQuery.matches ? DARK : LIGHT;
  }

  return preference;
}

export function applyTheme(theme: ThemeName) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle(DARK, theme === DARK);
  root.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // armazenamento pode falhar (modo privado), ignorar
  }
}

export function getDocumentTheme(): ThemeName | null {
  if (typeof document === 'undefined') return null;
  const datasetTheme = document.documentElement.dataset.theme;
  if (datasetTheme === DARK || datasetTheme === LIGHT) {
    return datasetTheme;
  }
  return document.documentElement.classList.contains(DARK) ? DARK : LIGHT;
}
