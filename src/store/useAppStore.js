import { Appearance } from 'react-native';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../services/storage';

const mmkvStorage = {
  getItem: key => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.delete(key),
};

const useAppStore = create(
  persist(
    set => ({
      // ── Onboarding ─ keyed by Supabase user ID ──────────────────────────────
      onboardingByUser: {},

      setOnboardingComplete: userId =>
        set(state => ({
          onboardingByUser: {
            ...state.onboardingByUser,
            [userId]: true,
          },
        })),

      resetOnboardingForUser: userId =>
        set(state => {
          const next = { ...state.onboardingByUser };
          delete next[userId];
          return {
            onboardingByUser: next,
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear(),
            activeFilter: 'all',
          };
        }),

      resetOnboarding: () =>
        set({
          onboardingByUser: {},
          selectedMonth: new Date().getMonth(),
          selectedYear: new Date().getFullYear(),
          activeFilter: 'all',
          currency: 'PKR',
        }),

      // ── UI / Filters ────────────────────────────────────────────────────────
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      setSelectedMonth: (month, year) =>
        set({ selectedMonth: month, selectedYear: year }),

      activeFilter: 'all',
      setActiveFilter: filter => set({ activeFilter: filter }),

      currency: 'PKR',
      setCurrency: currency => set({ currency }),

      // ── Theme ───────────────────────────────────────────────────────────────
      // On first launch, read system appearance preference; persist preserves user choice
      theme: Appearance.getColorScheme() || 'light',
      setTheme: theme => set({ theme }),
      toggleTheme: () =>
        set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),

    {
      name: 'expenzo-app-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => ({
        onboardingByUser: state.onboardingByUser,
        currency: state.currency,
        theme: state.theme,
      }),
    },
  ),
);

// ── Selectors (use these everywhere instead of raw state) ──────────────────

/** Returns true only if THIS user has completed onboarding on this device. */
export const selectIsOnboarded = userId => state =>
  userId ? state.onboardingByUser[userId] ?? false : false;

export default useAppStore;
