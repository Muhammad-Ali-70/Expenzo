/**
 * currency.js — Central currency registry for FinTrack
 *
 * To add a new currency, just append an entry to CURRENCIES and
 * update ACTIVE_CURRENCY. Nothing else in the app needs to change.
 *
 * Fields:
 *  code        ISO 4217 code
 *  symbol      Short symbol shown in UI (prefix)
 *  name        Human-readable name
 *  decimals    How many decimal places to allow (0 = no decimal input)
 *  separator   Thousands separator character
 *  decimalSep  Decimal separator character (only matters when decimals > 0)
 */

export const CURRENCIES = {
  PKR: {
    code: 'PKR',
    symbol: 'Rs',
    name: 'Pakistani Rupee',
    decimals: 0,
    separator: ',',
    decimalSep: '.',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    decimals: 2,
    separator: ',',
    decimalSep: '.',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimals: 2,
    separator: '.',
    decimalSep: ',',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    decimals: 2,
    separator: ',',
    decimalSep: '.',
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    decimals: 2,
    separator: ',',
    decimalSep: '.',
  },
  SAR: {
    code: 'SAR',
    symbol: '﷼',
    name: 'Saudi Riyal',
    decimals: 2,
    separator: ',',
    decimalSep: '.',
  },
};

/** The currency the whole app currently uses — change this one line to switch */
export const ACTIVE_CURRENCY = CURRENCIES.PKR;

/**
 * formatAmount(raw, currency)
 *
 * Formats a raw numeric string into a display string respecting
 * the currency's decimal and separator rules.
 *
 * @param {string}  raw       - Raw digits from TextInput
 * @param {object}  currency  - A CURRENCIES entry (defaults to ACTIVE_CURRENCY)
 * @returns {string}
 */
export const formatAmount = (raw = '', currency = ACTIVE_CURRENCY) => {
  if (!raw) return '';

  // Strip everything except digits (and decimal sep if allowed)
  let cleaned = raw.replace(/[^0-9]/g, '');

  // Add thousands separators
  cleaned = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, currency.separator);

  return cleaned;
};

/**
 * sanitiseInput(text, currency)
 *
 * Strips illegal characters from a TextInput value so only valid
 * digits (and one decimal point when allowed) pass through.
 */
export const sanitiseInput = (text = '', currency = ACTIVE_CURRENCY) => {
  if (currency.decimals === 0) {
    // Integers only — strip everything except digits
    return text.replace(/[^0-9]/g, '');
  }

  // Allow one decimal separator
  const escaped = currency.decimalSep.replace('.', '\\.');
  const regex = new RegExp(`[^0-9${escaped}]`, 'g');
  let cleaned = text.replace(regex, '');

  // Prevent multiple decimal separators
  const parts = cleaned.split(currency.decimalSep);
  if (parts.length > 2) {
    cleaned = parts[0] + currency.decimalSep + parts.slice(1).join('');
  }

  // Clamp decimal places
  if (parts[1] !== undefined) {
    cleaned =
      parts[0] + currency.decimalSep + parts[1].slice(0, currency.decimals);
  }

  return cleaned;
};
