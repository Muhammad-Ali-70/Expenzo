import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import FloatingModal from '../ui/FloatingModal';

export const DIGITAL_WALLETS = [
  { id: 'easypaisa', label: 'Easypaisa', initials: 'EP', color: '#00A651' },
  { id: 'jazzcash', label: 'JazzCash', initials: 'JC', color: '#C8202F' },
  { id: 'nayapay', label: 'NayaPay', initials: 'NP', color: '#6C3CE1' },
  { id: 'sadapay', label: 'SadaPay', initials: 'SP', color: '#1A1A1A' },
  { id: 'upaisa', label: 'Upaisa', initials: 'UP', color: '#F7941D' },
  { id: 'raast', label: 'Raast', initials: 'RA', color: '#00558B' },
  { id: 'oraan', label: 'Oraan', initials: 'OR', color: '#9B2335' },
  { id: 'other', label: 'Other', initials: '+ ', color: colors.textMuted },
];

const WalletTile = ({ item, active, disabled, onPress }) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onPress}
    activeOpacity={disabled ? 1 : 0.75}
    style={[
      styles.tile,
      active && styles.tileActive,
      disabled && styles.tileDisabled,
    ]}
  >
    <View style={[styles.avatar, { backgroundColor: item.color + '22' }]}>
      <Label
        type="bodyXs"
        weight="bold"
        style={{ color: disabled ? colors.textMuted : item.color }}
      >
        {item.initials}
      </Label>
    </View>
    <Label
      type="bodyXs"
      weight={active ? 'semiBold' : 'regular'}
      color={active ? 'primary' : disabled ? 'textDisabled' : 'textMuted'}
      style={styles.tileLabel}
      numberOfLines={2}
    >
      {item.label}
    </Label>
  </TouchableOpacity>
);

/**
 * DigitalWalletPickerModal
 * @param {string[]} usedIds — app IDs already added; rendered greyed-out
 */
const DigitalWalletPickerModal = ({
  visible,
  activeId,
  usedIds = [],
  onSelect,
  onClose,
}) => {
  const handleSelect = item => {
    onSelect(item);
    onClose();
  };

  return (
    <FloatingModal
      visible={visible}
      onClose={onClose}
      title="Select Payment App"
    >
      <Label
        type="bodyXs"
        weight="regular"
        color="textMuted"
        style={styles.hint}
      >
        Choose an app you use for daily payments or transfers.
      </Label>

      <FlatList
        data={DIGITAL_WALLETS}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <WalletTile
            item={item}
            active={activeId === item.id}
            disabled={usedIds.includes(item.id)}
            onPress={() => handleSelect(item)}
          />
        )}
      />
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  hint: {
    paddingHorizontal: wp(5),
    marginBottom: hp(1.5),
    lineHeight: 17,
  },
  grid: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(1),
    gap: hp(0.5),
  },
  row: {
    justifyContent: 'space-between',
  },
  tile: {
    width: (wp(100) - wp(10) - wp(9)) / 4,
    alignItems: 'center',
    gap: hp(0.8),
    paddingVertical: hp(1.5),
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  tileActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },
  tileDisabled: {
    opacity: 0.4,
  },
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default DigitalWalletPickerModal;
