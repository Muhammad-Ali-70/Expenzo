import { useCallback } from 'react';
import AccountRepository from '../../database/repositories/AccountRepository';

/**
 * Collects account data from onboarding cards and persists to WatermelonDB.
 *
 * Usage in OnboardingScreen:
 *   const { saveAndContinue } = useOnboardingSave({ walletBalance, bankAccounts, walletAccounts });
 */
const useOnboardingSave = ({ walletBalance, bankAccounts, walletAccounts }) => {
  const saveAndContinue = useCallback(async () => {
    const records = [];

    // Wallet Cash — always one record
    records.push({
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
      records.push({
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
      records.push({
        type: 'digitalWallet',
        label: acct.label,
        color: acct.color,
        initials: acct.initials,
        balance: acct.balance,
        isPrimary: idx === 0,
        sortOrder: 20 + idx,
      });
    });

    await AccountRepository.seedFromOnboarding(records);
  }, [walletBalance, bankAccounts, walletAccounts]);

  return { saveAndContinue };
};

export default useOnboardingSave;
