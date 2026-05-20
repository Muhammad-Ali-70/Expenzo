import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Q } from '@nozbe/watermelondb';
import { useEffect, useState } from 'react';

export const useAccounts = (type = null) => {
  const database = useDatabase();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collection = database.get('accounts');
    const query = type
      ? collection.query(Q.where('type', type), Q.sortBy('sort_order', Q.asc))
      : collection.query(Q.sortBy('sort_order', Q.asc));

    const subscription = query.observe().subscribe(result => {
      setAccounts(result);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [database, type]);

  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance ?? 0), 0);

  return { accounts, loading, totalBalance };
};
