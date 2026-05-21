import React from 'react';
import { View, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import { Label } from '../../constants/globalstyle';
import BottomSheet from '../ui/BottomSheet';
import SelectableIcon from '../ui/SelectableIcon';
import { useAccounts } from '../../database/hooks/useAccounts';

const TYPE_ICON = {
  wallet: { iconName: 'wallet', iconBg: '#E6FBF4', iconColor: '#10B981' },
  bank: { iconName: 'bank', iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  digitalWallet: {
    iconName: 'digital',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
  },
};

const TYPE_LABEL = {
  wallet: 'WALLET',
  bank: 'BANK ACCOUNTS',
  digitalWallet: 'DIGITAL WALLETS',
};

const PaymentSourceModal = ({ visible, activeId, onSelect, onClose }) => {
  const { accounts } = useAccounts();

  const handleSelect = id => {
    onSelect(id);
    onClose();
  };

  // Group by type, preserve insertion order: wallet → bank → digitalWallet
  const groups = ['wallet', 'bank', 'digitalWallet']
    .map(type => ({
      type,
      items: accounts.filter(a => a.type === type),
    }))
    .filter(g => g.items.length > 0);

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Payment Source">
      {groups.map(group => (
        <View key={group.type}>
          <Label
            type="bodyXs"
            weight="semiBold"
            color="textMuted"
            style={styles.sectionLabel}
          >
            {TYPE_LABEL[group.type]}
          </Label>

          <View style={styles.sourcesRow}>
            {group.items.map(account => {
              const icon = TYPE_ICON[account.type];
              return (
                <SelectableIcon
                  key={account.id}
                  iconName={icon.iconName}
                  iconBg={icon.iconBg}
                  iconColor={icon.iconColor}
                  label={account.label}
                  active={activeId === account.id}
                  onPress={() => handleSelect(account.id)}
                  size="grid"
                />
              );
            })}
          </View>
        </View>
      ))}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sectionLabel: {
    paddingHorizontal: wp(5),
    marginBottom: hp(1),
    letterSpacing: 0.6,
  },
  sourcesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    gap: wp(2),
  },
});

export default PaymentSourceModal;
