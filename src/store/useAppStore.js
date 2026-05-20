import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAppStore = create(
  persist(
    set => ({
      // ── Onboarding ─────────────────────────────
      hasCompletedOnboarding: false,

      setOnboardingComplete: () => set({ hasCompletedOnboarding: true }),

      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          selectedMonth: new Date().getMonth(),
          selectedYear: new Date().getFullYear(),
          activeFilter: 'all',
          currency: 'PKR',
        }),

      // ── UI / Filters ───────────────────────────
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
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        currency: state.currency,
      }),
    },
  ),
);

export default useAppStore;
