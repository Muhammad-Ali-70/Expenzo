import useAppStore from '@store/useAppStore';
import { getColors } from '@constants/colors';

/**
 * Returns the active color theme object based on the Zustand store.
 * Use this in any component to get theme-aware colors.
 */
export const useThemeColors = () => {
  const theme = useAppStore(state => state.theme);
  return getColors(theme);
};
