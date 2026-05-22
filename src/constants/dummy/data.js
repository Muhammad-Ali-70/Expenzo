// Single source of truth is constants/theme/accountMeta.js
// This file re-exports so existing imports don't break.
export { CATEGORIES, BANKS, DIGITAL_WALLETS } from '../theme/accountMeta';

// SOURCES kept for any component still referencing it directly
// (PaymentSourcePicker + PaymentSourceModal now use real DB accounts,
//  but CategoryModal still reads CATEGORIES above)
export { ACCOUNT_TYPE_META as SOURCES } from '../theme/accountMeta';
