// ─── Category definitions ─────────────────────────────────────────────────────
// id must match what's stored in transactions.category
export const CATEGORIES = [
  {
    id: 'food',
    label: 'Food',
    iconName: 'food',
    iconBg: '#FFF3E6',
    iconColor: '#F97316',
  },
  {
    id: 'transport',
    label: 'Transport',
    iconName: 'car',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    id: 'rent',
    label: 'Rent',
    iconName: 'home',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    iconName: 'shopping',
    iconBg: '#FFF2FA',
    iconColor: '#DB2777',
  },
  {
    id: 'health',
    label: 'Health',
    iconName: 'health',
    iconBg: '#FFF1F2',
    iconColor: '#F43F5E',
  },
  {
    id: 'education',
    label: 'Education',
    iconName: 'education',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
  },
  {
    id: 'coffee',
    label: 'Coffee',
    iconName: 'coffee',
    iconBg: '#FDF6EC',
    iconColor: '#92400E',
  },
  {
    id: 'travel',
    label: 'Travel',
    iconName: 'travel',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    id: 'utilities',
    label: 'Utilities',
    iconName: 'utilities',
    iconBg: '#FFFBEB',
    iconColor: '#D97706',
  },
  {
    id: 'gift',
    label: 'Gift',
    iconName: 'gift',
    iconBg: '#FDF2F8',
    iconColor: '#9D174D',
  },
  {
    id: 'investment',
    label: 'Investment',
    iconName: 'investment',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
  },
  {
    id: 'work',
    label: 'Work',
    iconName: 'work',
    iconBg: '#F0F9FF',
    iconColor: '#0284C7',
  },
  {
    id: 'income',
    label: 'Income',
    iconName: 'dollar',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
  },
  {
    id: 'other',
    label: 'Other',
    iconName: 'wallet',
    iconBg: '#F1F5F9',
    iconColor: '#94A3B8',
  },
];

// Quick lookup: category id → { iconName, iconBg, iconColor }
export const CATEGORY_META = Object.fromEntries(
  CATEGORIES.map(c => [
    c.id,
    { iconName: c.iconName, iconBg: c.iconBg, iconColor: c.iconColor },
  ]),
);

const FALLBACK_CATEGORY = {
  iconName: 'wallet',
  iconBg: '#F1F5F9',
  iconColor: '#94A3B8',
};

export const getCategoryMeta = id => CATEGORY_META[id] ?? FALLBACK_CATEGORY;

// ─── Account type icon/color definitions ─────────────────────────────────────
// Used in PaymentSourcePicker, PaymentSourceModal, useTransactions
export const ACCOUNT_TYPE_META = {
  wallet: {
    iconName: 'wallet',
    iconBg: '#E6FBF4',
    iconColor: '#10B981',
    label: 'Wallet',
  },
  bank: {
    iconName: 'bank',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    label: 'Bank Account',
  },
  digitalWallet: {
    iconName: 'dollar',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
    label: 'Digital Wallet',
  },
};

export const getAccountTypeMeta = type =>
  ACCOUNT_TYPE_META[type] ?? ACCOUNT_TYPE_META.wallet;

// ─── Bank list ────────────────────────────────────────────────────────────────
export const BANKS = [
  { id: 'hbl', label: 'HBL', initials: 'HB', color: '#006847' },
  { id: 'ubl', label: 'UBL', initials: 'UB', color: '#003087' },
  { id: 'meezan', label: 'Meezan', initials: 'MB', color: '#1B5E20' },
  { id: 'allied', label: 'Allied', initials: 'AB', color: '#B71C1C' },
  { id: 'mcb', label: 'MCB', initials: 'MC', color: '#880E4F' },
  { id: 'bop', label: 'Bank of Punjab', initials: 'BP', color: '#1A237E' },
  { id: 'habib', label: 'Habib Metro', initials: 'HM', color: '#004D40' },
  { id: 'askari', label: 'Askari', initials: 'AK', color: '#37474F' },
  { id: 'faysal', label: 'Faysal', initials: 'FB', color: '#E65100' },
  { id: 'summit', label: 'Summit', initials: 'SB', color: '#4A148C' },
  { id: 'silk', label: 'Silk Bank', initials: 'SK', color: '#006064' },
  { id: 'other', label: 'Other', initials: '+ ', color: '#94A3B8' },
];

// Quick lookup: bank id → { label, initials, color }
export const BANK_META = Object.fromEntries(BANKS.map(b => [b.id, b]));

// ─── Digital wallet list ──────────────────────────────────────────────────────
export const DIGITAL_WALLETS = [
  { id: 'easypaisa', label: 'Easypaisa', initials: 'EP', color: '#00A651' },
  { id: 'jazzcash', label: 'JazzCash', initials: 'JC', color: '#C8202F' },
  { id: 'nayapay', label: 'NayaPay', initials: 'NP', color: '#6C3CE1' },
  { id: 'sadapay', label: 'SadaPay', initials: 'SP', color: '#1A1A1A' },
  { id: 'upaisa', label: 'Upaisa', initials: 'UP', color: '#F7941D' },
  { id: 'raast', label: 'Raast', initials: 'RA', color: '#00558B' },
  { id: 'oraan', label: 'Oraan', initials: 'OR', color: '#9B2335' },
  { id: 'other', label: 'Other', initials: '+ ', color: '#94A3B8' },
];

export const DIGITAL_WALLET_META = Object.fromEntries(
  DIGITAL_WALLETS.map(w => [w.id, w]),
);
