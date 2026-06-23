// ─── Light Theme ───────────────────────────────────────────────────────────
export const lightTheme = {
  // Backgrounds
  background: '#F1F5F9',
  surfacePrimary: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  surfaceContainer: '#E5EEFF',
  surfaceContainerLow: '#EFF4FF',

  // Primary (Green)
  primary: '#006c49',
  primaryContainer: '#10B981',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#00422b',

  gradientPrimary: '#10B981',

  // Secondary (Blue)
  secondary: '#0058be',
  secondaryContainer: '#2170e4',
  onSecondary: '#FFFFFF',

  // Text
  textMain: '#0F172A',
  textMuted: '#64748B',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#3c4a42',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  errorContainer: '#ffdad6',

  // Account colors
  walletCash: '#10B981',
  bankAccount: '#3B82F6',
  savings: '#8B5CF6',

  // Borders
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',
  outlinePrimary: '#EFF5FB',

  // Kept for backward compat
  white: '#FFFFFF',
  black: '#000000',

  insightBackground: '#E1E0FF',
  insightBorder: '#9699FF',
  insightText: '#2F2EBE',
};

// ─── Dark Theme ────────────────────────────────────────────────────────────
export const darkTheme = {
  // Backgrounds
  background: '#0F172A',
  surfacePrimary: '#1E293B',
  surfaceSecondary: '#334155',
  surfaceContainer: '#1E293B',
  surfaceContainerLow: '#1E293B',

  // Primary (Green)
  primary: '#10B981',
  primaryContainer: '#065F46',
  onPrimary: '#0F172A',
  onPrimaryContainer: '#10B981',

  gradientPrimary: '#34D399',

  // Secondary (Blue)
  secondary: '#60A5FA',
  secondaryContainer: '#1D4ED8',
  onSecondary: '#0F172A',

  // Text
  textMain: '#F1F5F9',
  textMuted: '#94A3B8',
  onSurface: '#F8FAFC',
  onSurfaceVariant: '#CBD5E1',

  // Semantic
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  errorContainer: '#7F1D1D',

  // Account colors
  walletCash: '#34D399',
  bankAccount: '#60A5FA',
  savings: '#A78BFA',

  // Borders
  outline: '#475569',
  outlineVariant: '#334155',
  outlinePrimary: '#1E293B',

  // Kept for backward compat
  white: '#F1F5F9',
  black: '#0F172A',

  insightBackground: '#2E2E5E',
  insightBorder: '#4F51C2',
  insightText: '#818CF8',
};

/**
 * Get the active color theme object.
 * @param {('light' | 'dark')} theme - The active theme name.
 * @returns {Object} The color palette for the given theme.
 */
export const getColors = theme => {
  'worklet';
  return theme === 'dark' ? darkTheme : lightTheme;
};

// ─── Legacy default export (light theme for backward compat) ────────────────
const colors = lightTheme;
export default colors;

// ─── Gradients ─────────────────────────────────────────────────────────────
export const getGradients = theme => {
  const c = getColors(theme);
  return {
    primary: [c.primary, c.gradientPrimary],
  };
};

// Available themes
export const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};
