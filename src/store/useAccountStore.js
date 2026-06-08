import { create } from 'zustand';
import apiClient from '../services/apiClient';

const useAccountStore = create((set, get) => ({
  accounts: [],
  loading: false,
  error: null,

  fetchAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get('/accounts');
      set({ accounts: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  clearAccounts: () => set({ accounts: [], loading: false, error: null }),
}));

export default useAccountStore;
