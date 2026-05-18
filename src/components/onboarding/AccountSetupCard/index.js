import React from 'react';
import BankCard from './BankCard';
import DailyPayCard from './DailyPayCard';
import WalletCard from './WalletCard';

/**
 * AccountSetupCard — thin router.
 * Picks the right card component based on `accountType`.
 * All props are forwarded as-is so the parent (OnboardingScreen) stays clean.
 */
const AccountSetupCard = ({ accountType, ...props }) => {
  switch (accountType) {
    case 'bank':
      return <BankCard {...props} />;
    case 'dailypay':
      return <DailyPayCard {...props} />;
    case 'wallet':
    default:
      return <WalletCard {...props} />;
  }
};

export default AccountSetupCard;
