import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Q } from '@nozbe/watermelondb';
import { useEffect, useState } from 'react';
import { groupTransactions } from '../../utils/transactionUtils';
import { useAccounts } from './useAccounts';

export const useTransactions = ({ accountId, month, year } = {}) => {
  const database = useDatabase();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bring in accounts so groupTransactions can attach account labels
  const { accounts } = useAccounts();

  useEffect(() => {
    const collection = database.get('transactions');
    const conditions = [];

    if (accountId) conditions.push(Q.where('account_id', accountId));

    if (month !== undefined && year !== undefined) {
      const start = new Date(year, month, 1).getTime();
      const end = new Date(year, month + 1, 0, 23, 59, 59).getTime();
      conditions.push(Q.where('date', Q.gte(start)));
      conditions.push(Q.where('date', Q.lte(end)));
    }

    const query = collection.query(...conditions, Q.sortBy('date', Q.desc));
    const subscription = query.observe().subscribe(result => {
      setTransactions(result);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [database, accountId, month, year]);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const getGrouped = (opts = {}) =>
    groupTransactions(transactions, { ...opts, accounts });

  return { transactions, loading, totalExpenses, totalIncome, getGrouped };
};
