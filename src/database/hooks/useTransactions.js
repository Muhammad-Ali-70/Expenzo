import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Q } from '@nozbe/watermelondb';
import { useEffect, useState } from 'react';

const CATEGORY_ICON = {
  food: { iconName: 'food', iconBg: '#FFF3E6', iconColor: '#F97316' },
  transport: { iconName: 'car', iconBg: '#F1F5F9', iconColor: '#64748B' },
  shopping: { iconName: 'shopping', iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  health: { iconName: 'health', iconBg: '#FFF0F0', iconColor: '#EF4444' },
  work: { iconName: 'work', iconBg: '#E6FBF4', iconColor: '#10B981' },
  home: { iconName: 'home', iconBg: '#F5F3FF', iconColor: '#8B5CF6' },
  phone: { iconName: 'phone', iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  other: { iconName: 'other', iconBg: '#F1F5F9', iconColor: '#94A3B8' },
};

const CATEGORY_LABEL = {
  food: 'Food & Drinks',
  transport: 'Transport',
  shopping: 'Shopping',
  health: 'Health',
  work: 'Work',
  home: 'Home',
  phone: 'Phone',
  other: 'Other',
};

const fallbackIcon = {
  iconName: 'other',
  iconBg: '#F1F5F9',
  iconColor: '#94A3B8',
};

const formatTime = ts => {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const dayKey = ts => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const dayLabel = ts => {
  const d = new Date(ts);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const useTransactions = ({ accountId, month, year } = {}) => {
  const database = useDatabase();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getGrouped = ({
    search = '',
    category = null,
    accountId: acId = null,
  } = {}) => {
    let filtered = transactions;

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.description?.toLowerCase().includes(q) ||
          t.note?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q),
      );
    }

    if (category) {
      filtered = filtered.filter(t => t.category === category);
    }

    if (acId) {
      filtered = filtered.filter(t => t.accountId === acId);
    }

    const buckets = {};
    filtered.forEach(t => {
      const key = dayKey(t.date);
      if (!buckets[key]) {
        buckets[key] = {
          key,
          label: dayLabel(t.date),
          transactions: [],
          total: 0,
        };
      }
      const icon = CATEGORY_ICON[t.category] ?? fallbackIcon;
      const categoryLabel = CATEGORY_LABEL[t.category] || t.category;

      buckets[key].transactions.push({
        id: t.id,
        iconName: icon.iconName,
        iconBg: icon.iconBg,
        iconColor: icon.iconColor,
        title: t.description?.trim() || categoryLabel,
        subtitle: `${categoryLabel} • ${formatTime(t.date)}`,
        amount: t.type === 'expense' ? -t.amount : t.amount,
      });
      buckets[key].total += t.type === 'expense' ? -t.amount : t.amount;
    });

    return Object.values(buckets);
  };

  return { transactions, loading, totalExpenses, totalIncome, getGrouped };
};
