import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import SelectableIcon from '../ui/SelectableIcon';
import { useAccounts } from '../../database/hooks/useAccounts';
import colors from '../../constants/colors';

// Maps account type → icon config so SelectableIcon still gets what it needs
const TYPE_ICON = {
  wallet: { iconName: 'wallet', iconBg: '#E6FBF4', iconColor: '#10B981' },
  bank: { iconName: 'bank', iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  digitalWallet: {
    iconName: 'digital',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
  },
};

const PaymentSourcePicker = ({ activeId, onSelect, onSeeAll }) => {
  const { accounts, loading } = useAccounts();

  // Show max 3 in the quick row — wallet first, then by sort_order
  const quickAccounts = [
    ...accounts.filter(a => a.type === 'wallet'),
    ...accounts.filter(a => a.type !== 'wallet'),
  ].slice(0, 3);

  if (loading) {
    return (
      <View style={styles.section}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Label type="bodyMedium" weight="semiBold" color="textMain">
          Payment Source
        </Label>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Label type="bodySmall" weight="semiBold" color="primary">
            See All
          </Label>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {quickAccounts.map(account => {
          const icon = TYPE_ICON[account.type] ?? TYPE_ICON.wallet;
          return (
            <SelectableIcon
              key={account.id}
              iconName={icon.iconName}
              iconBg={icon.iconBg}
              iconColor={icon.iconColor}
              label={account.label}
              active={activeId === account.id}
              onPress={() => onSelect(account.id)}
              size="lg"
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: wp(5),
    gap: hp(1.2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: wp(3),
  },
});

export default PaymentSourcePicker;
