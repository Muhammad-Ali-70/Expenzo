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
import useAccountStore from '../../store/useAccountStore';
import { getAccountTypeMeta } from '../../constants/theme/accountMeta';
import colors from '../../constants/colors';

const PaymentSourcePicker = ({ activeId, onSelect, onSeeAll }) => {
  const accounts = useAccountStore(s => s.accounts);
  const loading = useAccountStore(s => s.loading);

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
          const meta = getAccountTypeMeta(account.type);
          return (
            <SelectableIcon
              key={account._id}
              iconName={meta.iconName}
              iconBg={meta.iconBg}
              iconColor={meta.iconColor}
              label={account.label}
              active={activeId === account._id}
              onPress={() => onSelect(account._id)}
              size="lg"
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginHorizontal: wp(5), gap: hp(1.2) },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', gap: wp(3) },
});

export default PaymentSourcePicker;
