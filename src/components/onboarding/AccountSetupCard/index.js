import React from 'react';
import WalletCard from './WalletCard';
import BankCard from './BankCard';
import DailyPayCard from './DailyPayCard';

const AccountSetupCard = ({ accountType, ...props }) => {
  switch (accountType) {
    case 'bank':
      return <BankCard {...props} />;
    case 'digitalWallet':
      return <DailyPayCard {...props} />;
    case 'wallet':
      return <WalletCard {...props} />;
    default:
      return <WalletCard {...props} />;
  }
};

export default AccountSetupCard;
