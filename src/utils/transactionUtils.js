import { getCategoryMeta, CATEGORIES } from '../constants/theme/accountMeta';

export const CATEGORY_LABEL = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c.label]),
);

export const formatTime = ts =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const formatDateTime = ts => {
  const d = new Date(ts);
  return (
    d.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' · ' +
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
};

const dayKey = ts => {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const dayLabel = ts => {
  const d = new Date(ts);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const same = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  if (same(d, now)) return 'Today';
  if (same(d, yesterday)) return 'Yesterday';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

/**
 * Converts raw WatermelonDB transaction records into grouped day sections.
 * Each transaction is mapped to the shape RecentActivityItem expects.
 *
 * @param {object[]} transactions  - raw WatermelonDB records
 * @param {object}   opts
 * @param {string}   opts.search   - free-text filter
 * @param {string}   opts.category - category id filter
 * @param {string}   opts.acId     - account id filter
 * @param {string}   opts.type     - 'expense' | 'income' | null
 * @param {object[]} opts.accounts - account records for label lookup
 */
export const groupTransactions = (
  transactions,
  {
    search = '',
    category = null,
    acId = null,
    type = null,
    accounts = [],
  } = {},
) => {
  // Build a quick id → account map
  const accountMap = Object.fromEntries(accounts.map(a => [a.id, a]));

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

  if (category) filtered = filtered.filter(t => t.category === category);
  if (acId) filtered = filtered.filter(t => t.accountId === acId);
  if (type) filtered = filtered.filter(t => t.type === type);

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

    const meta = getCategoryMeta(t.category);
    const categoryLabel = CATEGORY_LABEL[t.category] ?? t.category;
    const account = accountMap[t.accountId] ?? null;

    buckets[key].transactions.push({
      id: t.id,
      iconName: meta.iconName,
      iconBg: meta.iconBg,
      iconColor: meta.iconColor,
      title: t.description?.trim() || categoryLabel,
      subtitle: `${categoryLabel} · ${formatTime(t.date)}`,
      amount: t.type === 'expense' ? -t.amount : t.amount,
      // account tag
      accountLabel: account?.label ?? null,
      accountType: account?.type ?? null,
      // full raw data for detail modal
      raw: {
        id: t.id,
        type: t.type,
        amount: t.amount,
        category: t.category,
        categoryLabel,
        description: t.description ?? '',
        note: t.note ?? '',
        date: t.date,
        accountId: t.accountId,
        accountLabel: account?.label ?? '—',
        accountType: account?.type ?? '—',
      },
    });

    buckets[key].total += t.type === 'expense' ? -t.amount : t.amount;
  });

  return Object.values(buckets);
};
