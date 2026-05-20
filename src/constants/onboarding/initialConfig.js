import colors from '../colors';

export const ACCOUNT_CONFIG = [
  {
    id: 'walletCash',
    accountType: 'wallet',
    iconName: 'Banknote',
    iconColor: '#FFFFFF',
    iconBg: colors.walletCash,
    name: 'Wallet Cash',
    description: 'Physical cash on hand.',
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
    id: 'digitalWallet',
    accountType: 'digitalWallet',
    iconName: 'wallet',
    iconColor: '#FFFFFF',
    iconBg: colors.savings,
    name: 'Digital Wallet',
    description: 'Money in a payment app you use for everyday transfers.',
  },
];
