import colors from '../colors';

export const ACCOUNT_CONFIG = [
  {
    id: 'walletCash',
    accountType: 'wallet',
    iconName: 'wallet',
    iconColor: '#FFFFFF',
    iconBg: colors.walletCash,
    name: 'Wallet Cash',
    description: 'Physical cash on hand — money in your pocket or at home.',
  },
  {
    id: 'bankBalance',
    accountType: 'bank',
    iconName: 'bank',
    iconColor: '#FFFFFF',
    iconBg: colors.bankAccount,
    name: 'Bank Account',
    description: 'Add your bank accounts and set a balance for each one.',
  },
  {
    id: 'dailyPay',
    accountType: 'dailypay',
    iconName: 'dollar',
    iconColor: '#FFFFFF',
    iconBg: colors.savings,
    name: 'Daily Pay',
    description:
      'Money in a payment app you use for everyday transfers — like NayaPay or Easypaisa.',
  },
];
