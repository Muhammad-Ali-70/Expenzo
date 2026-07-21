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

export const INCOME_CATEGORIES = [
  {
    id: 'salary',
    label: 'Salary',
    iconName: 'work',
    iconBg: '#F0F9FF',
    iconColor: '#0284C7',
  },
  {
    id: 'freelance',
    label: 'Freelance',
    iconName: 'briefcase',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
  },
  {
    id: 'gift',
    label: 'Gift',
    iconName: 'gift',
    iconBg: '#FDF2F8',
    iconColor: '#9D174D',
  },
  {
    id: 'family',
    label: 'Family',
    iconName: 'home',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
  },
  {
    id: 'friend',
    label: 'Friend',
    iconName: 'dollar',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
  },
  {
    id: 'investment',
    label: 'Investment',
    iconName: 'investment',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
  },
  {
    id: 'refund',
    label: 'Refund',
    iconName: 'card',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
  },
  {
    id: 'rental',
    label: 'Rental',
    iconName: 'home',
    iconBg: '#FFF3E6',
    iconColor: '#F97316',
  },
  {
    id: 'other',
    label: 'Other',
    iconName: 'wallet',
    iconBg: '#F1F5F9',
    iconColor: '#94A3B8',
  },
];

export const INCOME_CATEGORY_META = Object.fromEntries(
  INCOME_CATEGORIES.map(c => [
    c.id,
    { iconName: c.iconName, iconBg: c.iconBg, iconColor: c.iconColor },
  ]),
);

export const getIncomeCategoryMeta = id =>
  INCOME_CATEGORY_META[id] ?? {
    iconName: 'dollar',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
  };

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

// ─── Custom category registry ────────────────────────────────────────────────
// Populated at runtime from the backend via registerCustomCategories(). Keeping
// it here lets the existing meta/label resolvers stay custom-aware without every
// call site needing to know about custom categories. Keyed by category _id.
let CUSTOM_CATEGORY_META = {};
let CUSTOM_CATEGORY_LABEL = {};

// Built-in label lookup across both expense and income categories.
const BUILTIN_CATEGORY_LABEL = Object.fromEntries(
  [...CATEGORIES, ...INCOME_CATEGORIES].map(c => [c.id, c.label]),
);

export const registerCustomCategories = (list = []) => {
  CUSTOM_CATEGORY_META = {};
  CUSTOM_CATEGORY_LABEL = {};
  list.forEach(c => {
    const id = c._id ?? c.id;
    if (!id) return;
    CUSTOM_CATEGORY_META[id] = {
      iconName: c.iconName,
      iconBg: c.iconBg,
      iconColor: c.iconColor,
    };
    CUSTOM_CATEGORY_LABEL[id] = c.name;
  });
};

export const getCategoryMeta = id =>
  CATEGORY_META[id] ?? CUSTOM_CATEGORY_META[id] ?? FALLBACK_CATEGORY;

export const getCategoryLabel = id =>
  BUILTIN_CATEGORY_LABEL[id] ?? CUSTOM_CATEGORY_LABEL[id] ?? id;

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
  {
    id: 'hbl',
    label: 'HBL',
    initials: 'HB',
    color: '#006847',
    imageUri: require('../../assets/images/banks/HBL-logo.png'),
  },
  {
    id: 'ubl',
    label: 'UBL',
    initials: 'UB',
    color: '#003087',
    imageUri: require('../../assets/images/banks/UBL-Bank-Logo.png'),
  },
  {
    id: 'meezan',
    label: 'Meezan',
    initials: 'MB',
    color: '#1B5E20',
    imageUri: require('../../assets/images/banks/meezan-bank-logo.png'),
  },
  {
    id: 'allied',
    label: 'Allied',
    initials: 'AB',
    color: '#B71C1C',
    imageUri: require('../../assets/images/banks/allied-bank-limited-logo.png'),
  },
  {
    id: 'mcb',
    label: 'MCB',
    initials: 'MC',
    color: '#880E4F',
    imageUri: require('../../assets/images/banks/mcb-logo.png'),
  },
  {
    id: 'bop',
    label: 'Bank of Punjab',
    initials: 'BP',
    color: '#1A237E',
    imageUri: require('../../assets/images/banks/Bank-of-punjab-Logo.png'),
  },
  {
    id: 'habib',
    label: 'Bank Al Habib',
    initials: 'AH',
    color: '#004D40',
    imageUri: require('../../assets/images/banks/bank-al-habib-logo.png'),
  },
  {
    id: 'askari',
    label: 'Askari',
    initials: 'AK',
    color: '#37474F',
    imageUri: require('../../assets/images/banks/Askari-Bank-Logo.png'),
  },
  {
    id: 'faysal',
    label: 'Faysal',
    initials: 'FB',
    color: '#E65100',
    imageUri: require('../../assets/images/banks/faysal-bank-logo.png'),
  },
  {
    id: 'alfalah',
    label: 'Bank Alfalah',
    initials: 'BA',
    color: '#1B3A5C',
    imageUri: require('../../assets/images/banks/bank-alfalah-logo.png'),
  },
  {
    id: 'silk',
    label: 'Silk Bank',
    initials: 'SK',
    color: '#006064',
    imageUri: require('../../assets/images/banks/Silk-Bank-Logo.png'),
  },
  {
    id: 'islami',
    label: 'Bank Islami',
    initials: 'BI',
    color: '#004C29',
    imageUri: require('../../assets/images/banks/bank-islami-logo.png'),
  },
  {
    id: 'khyber',
    label: 'Bank of Khyber',
    initials: 'BK',
    color: '#1A5276',
    imageUri: require('../../assets/images/banks/Bank-Of-Khyber-Logo.png'),
  },
  {
    id: 'js',
    label: 'JS Bank',
    initials: 'JS',
    color: '#E30613',
    imageUri: require('../../assets/images/banks/js-bank-logo.png'),
  },
  {
    id: 'nbp',
    label: 'National Bank',
    initials: 'NB',
    color: '#003366',
    imageUri: require('../../assets/images/banks/national-bank-of-pakistan-logo.png'),
  },
  {
    id: 'soneri',
    label: 'Soneri',
    initials: 'SN',
    color: '#FF6600',
    imageUri: require('../../assets/images/banks/soneri-bank-logo.png'),
  },
  {
    id: 'sindh',
    label: 'Sindh Bank',
    initials: 'SB',
    color: '#8B4513',
    imageUri: require('../../assets/images/banks/Sindh-Bank-Logo.png'),
  },
  {
    id: 'icbc',
    label: 'ICBC',
    initials: 'IC',
    color: '#C41E24',
    imageUri: require('../../assets/images/banks/Icbc-Bank-Logo.png'),
  },
  {
    id: 'other',
    label: 'Other',
    initials: '+ ',
    color: '#94A3B8',
    imageUri: null,
  },
];

// Quick lookup: bank id → { label, initials, color }
export const BANK_META = Object.fromEntries(BANKS.map(b => [b.id, b]));

// ─── Digital wallet list ──────────────────────────────────────────────────────
export const DIGITAL_WALLETS = [
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    initials: 'EP',
    color: '#00A651',
    imageUri: require('../../assets/images/wallets/Easypaisa-logo.png'),
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    initials: 'JC',
    color: '#C8202F',
    imageUri: require('../../assets/images/wallets/new-Jazzcash-logo.png'),
  },
  {
    id: 'nayapay',
    label: 'NayaPay',
    initials: 'NP',
    color: '#6C3CE1',
    imageUri: require('../../assets/images/wallets/nayapay-logo.png'),
  },
  {
    id: 'sadapay',
    label: 'SadaPay',
    initials: 'SP',
    color: '#1A1A1A',
    imageUri: require('../../assets/images/wallets/Sadapay-Logo.png'),
  },
  {
    id: 'upaisa',
    label: 'Upaisa',
    initials: 'UP',
    color: '#F7941D',
    imageUri: require('../../assets/images/wallets/Upaisa-Logo.png'),
  },
  {
    id: 'raast',
    label: 'Raast',
    initials: 'RA',
    color: '#00558B',
    imageUri: require('../../assets/images/wallets/Raast-Logo.png'),
  },
  {
    id: 'oraan',
    label: 'Oraan',
    initials: 'OR',
    color: '#9B2335',
    imageUri: require('../../assets/images/wallets/Oraan-Logo.png'),
  },
  {
    id: 'other',
    label: 'Other',
    initials: '+ ',
    color: '#94A3B8',
    imageUri: null,
  },
];

export const DIGITAL_WALLET_META = Object.fromEntries(
  DIGITAL_WALLETS.map(w => [w.id, w]),
);
