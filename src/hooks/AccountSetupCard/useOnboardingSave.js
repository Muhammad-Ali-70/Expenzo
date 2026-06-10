import { useCallback } from 'react';
import { seedAccountsApi } from '../../services/accountService';

const useOnboardingSave = ({ walletBalance, bankAccounts, walletAccounts }) => {
  const saveAndContinue = useCallback(async () => {
    const accounts = [];

    // Wallet Cash — always one record
    accounts.push({
      type: 'wallet',
      label: 'Wallet Cash',
      color: '#10B981',
      initials: 'WC',
      balance: walletBalance,
      isPrimary: true,
      sortOrder: 0,
    });

    // Bank accounts — one record per bank, first is primary
    bankAccounts.forEach((acct, idx) => {
      accounts.push({
        type: 'bank',
        label: acct.label,
        color: acct.color,
        initials: acct.initials,
        balance: acct.balance,
        isPrimary: idx === 0,
        sortOrder: 10 + idx,
      });
    });

    // Digital wallets — one record per app, first is primary
    walletAccounts.forEach((acct, idx) => {
      accounts.push({
        type: 'digitalWallet',
        label: acct.label,
        color: acct.color,
        initials: acct.initials,
        balance: acct.balance,
        isPrimary: idx === 0,
        sortOrder: 20 + idx,
      });
    });

    await seedAccountsApi({ accounts });
  }, [walletBalance, bankAccounts, walletAccounts]);

  return { saveAndContinue };
};

export default useOnboardingSave;
