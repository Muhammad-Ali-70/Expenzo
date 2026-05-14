import React from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import PaymentIcon from '../common/Paymenticon';

const AccountCard = ({ iconName, iconColor, iconBg, label, amount }) => (
  <View style={styles.card}>
    <PaymentIcon
      name={iconName}
      backgroundColor={iconBg}
      color={iconColor}
      containerSize={wp(10)}
      size={wp(5)}
    />
    <Label
      type="bodyXs"
      weight="regular"
      color="textMuted"
      style={styles.label}
    >
      {label}
    </Label>
    <CurrencyView
      amount={amount}
      type="bodySmall"
      weight="bold"
      color="textMain"
    />
  </View>
);

const ACCOUNTS = [
  {
    id: 'wallet',
    iconName: 'wallet',
    iconBg: '#E6FBF4',
    iconColor: colors.walletCash,
    label: 'Wallet',
  },
  {
    id: 'bank',
    iconName: 'bank',
    iconBg: '#EFF6FF',
    iconColor: colors.bankAccount,
    label: 'Bank',
  },
  {
    id: 'savings',
    iconName: 'savings',
    iconBg: '#F5F3FF',
    iconColor: colors.savings,
    label: 'Savings',
  },
];

const AccountBreakdownRow = ({
  walletBalance = 0,
  bankBalance = 0,
  savingsBalance = 0,
}) => {
  const amounts = {
    wallet: walletBalance,
    bank: bankBalance,
    savings: savingsBalance,
  };

  return (
    <View style={styles.row}>
      {ACCOUNTS.map(acc => (
        <AccountCard key={acc.id} {...acc} amount={amounts[acc.id]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginTop: hp(2),
    gap: wp(3),
  },
  card: {
    flex: 1,
    backgroundColor: colors.surfacePrimary,
    borderRadius: borderRadius.lg,
    paddingVertical: hp(1.8),
    alignItems: 'center',
    gap: hp(0.7),
  },
  label: {
    marginTop: hp(0.2),
  },
});

export default AccountBreakdownRow;
