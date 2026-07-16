import { useState, useEffect, useCallback, useRef } from 'react';
import { getTransactionsApi } from '../../services/transactionService';
import { groupTransactions } from '../../utils/transactionUtils';

/**
 * Drop-in replacement for the WatermelonDB useTransactions hook.
 * Fetches from the backend API with pagination and search support.
 */
export const useTransactions = ({ 
  accountId, 
  month, 
  year,
  dateFrom,
  dateTo,
  minAmount,
  maxAmount
} = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  const fetchTransactions = useCallback(
    async ({ page = 1, append = false } = {}) => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const data = await getTransactionsApi({
          accountId,
          month,
          year,
          dateFrom,
          dateTo,
          minAmount,
          maxAmount,
          page,
          limit: 20,
        });

        setTransactions(prev =>
          append ? [...prev, ...data.transactions] : data.transactions,
        );
        setPagination(data.pagination);
        hasMoreRef.current = data.pagination.hasNextPage;
        pageRef.current = page;
        setError(null);
      } catch (err) {
        setError(err.message ?? 'Failed to load transactions');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [accountId, month, year, dateFrom, dateTo, minAmount, maxAmount],
  );

  // Initial load and when filters change
  useEffect(() => {
    pageRef.current = 1;
    hasMoreRef.current = true;
    fetchTransactions({ page: 1, append: false });
  }, [fetchTransactions]);

  // Called by FlashList onEndReached
  const fetchNextPage = useCallback(() => {
    if (!hasMoreRef.current || loadingMore || loading) return;
    fetchTransactions({ page: pageRef.current + 1, append: true });
  }, [fetchTransactions, loadingMore, loading]);

  const refresh = useCallback(() => {
    pageRef.current = 1;
    hasMoreRef.current = true;
    fetchTransactions({ page: 1, append: false });
  }, [fetchTransactions]);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // groupTransactions handles local search/filter on already-fetched data
  const getGrouped = useCallback(
    (opts = {}) => groupTransactions(transactions, opts),
    [transactions],
  );

  return {
    transactions,
    loading,
    loadingMore,
    pagination,
    error,
    totalExpenses,
    totalIncome,
    getGrouped,
    fetchNextPage,
    refresh,
  };
};
