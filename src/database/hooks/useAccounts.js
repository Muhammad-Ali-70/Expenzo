import { useEffect, useState } from 'react';
import useAccountStore from '../../store/useAccountStore';

export const useAccounts = (type = null) => {
  const storeAccounts = useAccountStore(s => s.accounts);
  const fetchAccounts = useAccountStore(s => s.fetchAccounts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storeAccounts.length === 0) {
      fetchAccounts().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const accounts = type
    ? storeAccounts.filter(a => a.type === type)
    : storeAccounts;

  const totalBalance = storeAccounts.reduce(
    (sum, a) => sum + (a.balance ?? 0),
    0,
  );

  const primaryAccount =
    storeAccounts.find(a => a.type === 'wallet' && a.isPrimary) ??
    storeAccounts.find(a => a.isPrimary) ??
    storeAccounts[0] ??
    null;

  return { accounts, loading, totalBalance, primaryAccount };
};
