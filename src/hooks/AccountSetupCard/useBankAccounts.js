import { useState, useCallback } from 'react';

/**
 * Manages the list of bank accounts the user adds during onboarding.
 * Each entry: { id, bankId, label, color, initials, balance }
 */
export const useBankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // IDs already claimed so the picker can grey them out
  const usedIds = accounts.map(a => a.bankId);

  const setPrimaryBank = useCallback(bank => {
    setAccounts(prev => {
      // If already in list as primary (index 0), do nothing
      if (prev[0]?.bankId === bank.id) return prev;
      // Remove if it exists elsewhere then prepend
      const rest = prev.filter(a => a.bankId !== bank.id);
      return [
        {
          id: `bank-${bank.id}`,
          bankId: bank.id,
          label: bank.label,
          color: bank.color,
          initials: bank.initials,
          balance: '',
        },
        ...rest,
      ];
    });
  }, []);

  const addExtraBank = useCallback(bank => {
    setAccounts(prev => {
      if (prev.find(a => a.bankId === bank.id)) return prev; // no dupes
      return [
        ...prev,
        {
          id: `bank-${bank.id}`,
          bankId: bank.id,
          label: bank.label,
          color: bank.color,
          initials: bank.initials,
          balance: '',
        },
      ];
    });
  }, []);

  const removeBank = useCallback(bankId => {
    setAccounts(prev => prev.filter(a => a.bankId !== bankId));
  }, []);

  const updateBalance = useCallback((bankId, balance) => {
    setAccounts(prev =>
      prev.map(a => (a.bankId === bankId ? { ...a, balance } : a)),
    );
  }, []);

  const primaryAccount = accounts[0] ?? null;
  const extraAccounts = accounts.slice(1);

  return {
    accounts,
    primaryAccount,
    extraAccounts,
    usedIds,
    primaryModalVisible,
    setPrimaryModalVisible,
    addModalVisible,
    setAddModalVisible,
    setPrimaryBank,
    addExtraBank,
    removeBank,
    updateBalance,
  };
};
