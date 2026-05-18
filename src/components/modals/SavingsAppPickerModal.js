import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import FloatingModal from '../ui/FloatingModal';

const APPS = [
  { id: 'easypaisa', label: 'Easypaisa', initials: 'EP', color: '#00A651' },
  { id: 'jazzcash', label: 'JazzCash', initials: 'JC', color: '#C8202F' },
  { id: 'nayapay', label: 'NayaPay', initials: 'NP', color: '#6C3CE1' },
  { id: 'sadapay', label: 'SadaPay', initials: 'SP', color: '#1A1A1A' },
  { id: 'upaisa', label: 'Upaisa', initials: 'UP', color: '#F7941D' },
  { id: 'raast', label: 'Raast', initials: 'RA', color: '#00558B' },
  { id: 'none', label: 'None / Skip', initials: '–', color: colors.textMuted },
];

const AppTile = ({ item, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.tile, active && styles.tileActive]}
  >
    <View style={[styles.avatar, { backgroundColor: item.color + '22' }]}>
      <Label type="bodyXs" weight="bold" style={{ color: item.color }}>
        {item.initials}
      </Label>
    </View>
    <Label
      type="bodyXs"
      weight={active ? 'semiBold' : 'regular'}
      color={active ? 'primary' : 'textMuted'}
      style={styles.label}
      numberOfLines={2}
    >
      {item.label}
    </Label>
  </TouchableOpacity>
);

const SavingsAppPickerModal = ({ visible, activeId, onSelect, onClose }) => {
  const handleSelect = item => {
    onSelect(item);
    onClose();
  };

  return (
    <FloatingModal
      visible={visible}
      onClose={onClose}
      title="Payment App (Optional)"
    >
      <Label
        type="bodyXs"
        weight="regular"
        color="textMuted"
        style={styles.hint}
      >
        Link a payment app you use for daily transfers or savings.
      </Label>
      <View style={styles.grid}>
        {APPS.map(item => (
          <AppTile
            key={item.id}
            item={item}
            active={activeId === item.id}
            onPress={() => handleSelect(item)}
          />
        ))}
      </View>
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  hint: {
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    lineHeight: 17,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp(3),
    gap: hp(0.5),
  },
  tile: {
    width: (wp(90) - wp(6) - wp(4.5)) / 4,
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
  avatar: {
    width: wp(11),
    height: wp(11),
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default SavingsAppPickerModal;
