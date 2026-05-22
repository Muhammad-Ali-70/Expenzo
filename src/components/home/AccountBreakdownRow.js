import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import CurrencyView from '../common/CurrencyView';
import PaymentIcon from '../common/Paymenticon';
import { getAccountTypeMeta } from '../../constants/theme/accountMeta';
import AccountGroupModal from '../modals/home/AccountGroupModal';

// The three buckets we always show, in order
const BUCKETS = [
  { type: 'wallet', label: 'Wallet' },
  { type: 'bank', label: 'Bank' },
  { type: 'digitalWallet', label: 'Digital' },
];

const AccountCard = ({ type, label, total, onPress }) => {
  const meta = getAccountTypeMeta(type);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.card}
    >
      <PaymentIcon
        name={meta.iconName}
        backgroundColor={meta.iconBg}
        color={meta.iconColor}
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
        amount={total}
        type="bodySmall"
        weight="bold"
        color="textMain"
      />
    </TouchableOpacity>
  );
};

const AccountBreakdownRow = ({ accounts = [] }) => {
  const [activeType, setActiveType] = useState(null);

  // Group accounts by type, compute total per bucket
  const byType = type => accounts.filter(a => a.type === type);
  const totalFor = type =>
    byType(type).reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const modalAccounts = activeType ? byType(activeType) : [];

  return (
    <>
      <View style={styles.row}>
        {BUCKETS.map(bucket => (
          <AccountCard
            key={bucket.type}
            type={bucket.type}
            label={bucket.label}
            total={totalFor(bucket.type)}
            onPress={() => setActiveType(bucket.type)}
          />
        ))}
      </View>

      <AccountGroupModal
        visible={!!activeType}
        type={activeType}
        accounts={modalAccounts}
        onClose={() => setActiveType(null)}
      />
    </>
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
