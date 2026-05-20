import { useState, useCallback } from 'react';

export const useBankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [primaryModalVisible, setPrimaryModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const usedIds = accounts.map(a => a.bankId);

  const _makeEntry = bank => ({
    id: `bank-${bank.id}`,
    bankId: bank.id,
    label: bank.label,
    color: bank.color,
    initials: bank.initials,
    balance: '',
  });

  const setPrimaryBank = useCallback(bank => {
    setAccounts(prev => {
      if (prev[0]?.bankId === bank.id) return prev;
      const rest = prev.filter(a => a.bankId !== bank.id);
      return [_makeEntry(bank), ...rest];
    });
  }, []);

  const addExtraBank = useCallback(bank => {
    setAccounts(prev => {
      if (prev.find(a => a.bankId === bank.id)) return prev;
      return [...prev, _makeEntry(bank)];
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

  return {
    accounts,
    primaryAccount: accounts[0] ?? null,
    extraAccounts: accounts.slice(1),
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
