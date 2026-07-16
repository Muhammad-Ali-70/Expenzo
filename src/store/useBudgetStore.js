import { create } from 'zustand';
import { getCurrentBudgetApi, getBudgetApi, saveBudgetApi } from '../services/budgetService';

const useBudgetStore = create((set) => ({
  currentBudget: null,
  loading: false,
  error: null,

  fetchCurrentBudget: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getCurrentBudgetApi();
      set({ currentBudget: data, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Failed to load budget', loading: false });
    }
  },

  fetchBudget: async ({ month, year }) => {
    set({ loading: true, error: null });
    try {
      const data = await getBudgetApi({ month, year });
      set({ currentBudget: data, loading: false });
    } catch (err) {
      set({ error: err?.message || 'Failed to load budget', loading: false });
    }
  },

  saveBudget: async (budgetData) => {
    set({ loading: true, error: null });
    try {
      await saveBudgetApi(budgetData);
      await set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ error: err?.message || 'Failed to save budget', loading: false });
      return { success: false, message: err?.message || 'Failed to save budget' };
    }
  },

  clearBudget: () => set({ currentBudget: null, error: null }),
}));

export default useBudgetStore;
