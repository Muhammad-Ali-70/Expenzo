import { BANK_META, DIGITAL_WALLET_META, getAccountTypeMeta } from '../constants/theme/accountMeta';

/**
 * Resolves display metadata for an account.
 * When sourceId is known (e.g. 'hbl', 'easypaisa'), returns the bank/app
 * meta including imageUri. Falls back to account-type-based meta.
 */
export const getAccountMeta = (type, sourceId) => {
  if (sourceId) {
    let cleanSourceId = sourceId;
    if (sourceId.startsWith('bank-')) {
      cleanSourceId = sourceId.replace('bank-', '');
    } else if (sourceId.startsWith('wallet-')) {
      cleanSourceId = sourceId.replace('wallet-', '');
    }
    
    const meta =
      type === 'bank'
        ? BANK_META[cleanSourceId]
        : type === 'digitalWallet'
        ? DIGITAL_WALLET_META[cleanSourceId]
        : null;

    if (meta) {
      return {
        imageUri: meta.imageUri ?? null,
        initials: meta.initials,
        color: meta.color,
      };
    }
  }

  const fallback = getAccountTypeMeta(type);
  return {
    imageUri: null,
    initials: null,
    color: fallback.iconColor,
  };
};
