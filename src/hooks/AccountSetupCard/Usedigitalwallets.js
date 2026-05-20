import { useState, useCallback } from 'react';

/**
 * useDigitalWallets
 * Manages the list of digital wallet apps added during onboarding.
 * Each entry: { id, appId, label, color, initials, balance }
 *
 * accounts[0] is always the primary wallet app.
 */
export const useDigitalWallets = () => {
  const [accounts, setAccounts] = useState([]);
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const usedIds = accounts.map(a => a.appId);

  const _makeEntry = app => ({
    id: `wallet-${app.id}`,
    appId: app.id,
    label: app.label,
    color: app.color,
    initials: app.initials,
    balance: '',
  });

  const setPrimaryWallet = useCallback(app => {
    setAccounts(prev => {
      if (prev[0]?.appId === app.id) return prev;
      const rest = prev.filter(a => a.appId !== app.id);
      return [_makeEntry(app), ...rest];
    });
  }, []);

  const addExtraWallet = useCallback(app => {
    setAccounts(prev => {
      if (prev.find(a => a.appId === app.id)) return prev;
      return [...prev, _makeEntry(app)];
    });
  }, []);

  const removeWallet = useCallback(appId => {
    setAccounts(prev => prev.filter(a => a.appId !== appId));
  }, []);

  const updateBalance = useCallback((appId, balance) => {
    setAccounts(prev =>
      prev.map(a => (a.appId === appId ? { ...a, balance } : a)),
    );
  }, []);

  return {
    accounts,
    primaryAccount: accounts[0] ?? null,
    extraAccounts: accounts.slice(1),
    usedIds,
    primaryModalVisible,
    setPrimaryModalVisible,
    addModalVisible,
    setAddModalVisible,
    setPrimaryWallet,
    addExtraWallet,
    removeWallet,
    updateBalance,
  };
};
