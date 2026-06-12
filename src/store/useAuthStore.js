import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage, mmkvStorage } from '../services/storage';
import { signupApi, loginApi, getMeApi } from '../services/authService';
import useAccountStore from './useAccountStore';

const withLoading = async (set, fn) => {
  set({ isLoading: true, error: null });
  try {
    const result = await fn();
    set({ isLoading: false });
    return result;
  } catch (err) {
    set({ error: err.message, isLoading: false });
    return { success: false, message: err.message };
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────────
      user: null,
      token: null,
      isLoading: false,
      error: null,
      rememberMe: true,

      // ── Actions ────────────────────────────────────────────────────────────

      // No fetchAccounts here — user has no accounts yet at signup time.
      // Accounts are created during onboarding; boot-time fetch covers returning users.
      signup: ({ name, email, password }) =>
        withLoading(set, async () => {
          const { token, user } = await signupApi({ name, email, password });
          storage.set('token', token);
          set({ token, user });
          return { success: true };
        }),

      // fetchAccounts after login — user's accounts already exist on the server.
      login: ({ email, password, rememberMe = true }) =>
        withLoading(set, async () => {
          const { token, user } = await loginApi({ email, password });
          storage.set('token', token);
          set({ token, user, rememberMe });
          await useAccountStore.getState().fetchAccounts();
          return { success: true };
        }),

      // Call this after seedAccounts/createAccount succeeds on the onboarding screen
      // so the navigator re-renders without needing another /me fetch
      setOnboarded: () =>
        set(state => ({
          user: state.user ? { ...state.user, isOnboarded: true } : state.user,
        })),

      fetchMe: () =>
        withLoading(set, async () => {
          const user = await getMeApi();
          set({ user });
        }),

      logout: () => {
        storage.remove('token');
        // Clear accounts on logout so stale data isn't shown on next login
        useAccountStore.getState().clearAccounts();
        set({ user: null, token: null, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'expenzo-auth-store',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: state => {
        const partial = { rememberMe: state.rememberMe };
        if (state.rememberMe) {
          partial.token = state.token;
          partial.user = state.user;
        }
        return partial;
      },
    },
  ),
);

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectUser = state => state.user;
export const selectToken = state => state.token;
export const selectIsAuthenticated = state => !!state.token;
export const selectIsOnboarded = state => !!state.user?.isOnboarded;
export const selectAuthLoading = state => state.isLoading;
export const selectAuthError = state => state.error;

export default useAuthStore;
