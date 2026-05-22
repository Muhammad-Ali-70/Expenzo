import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAppStore = create(
  persist(
    set => ({
      // ── Onboarding — keyed by Supabase user ID ──────────────────────────────
      // Shape: { [userId]: true }
      // This ensures each account has its own onboarding state on this device.
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

      // Hard reset — clears ALL users (used by danger zone / dev tools)
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
    }),

    {
      name: 'expenzo-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        onboardingByUser: state.onboardingByUser,
        currency: state.currency,
      }),
    },
  ),
);

// ── Selectors (use these everywhere instead of raw state) ────────────────────

/** Returns true only if THIS user has completed onboarding on this device. */
export const selectIsOnboarded = userId => state =>
  userId ? state.onboardingByUser[userId] ?? false : false;

export default useAppStore;
