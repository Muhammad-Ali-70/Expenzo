import useAppStore from '@store/useAppStore';

/**
 * Returns true when the active theme is 'dark'.
 * Use this instead of checking `theme.background === '#0F172A'`.
 */
export const useIsDarkMode = () => {
  return useAppStore(state => state.theme) === 'dark';
};

export default useIsDarkMode;
