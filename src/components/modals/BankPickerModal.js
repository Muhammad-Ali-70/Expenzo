import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import FloatingModal from '../ui/FloatingModal';

export const BANKS = [
  { id: 'hbl', label: 'HBL', initials: 'HB', color: '#006847' },
  { id: 'ubl', label: 'UBL', initials: 'UB', color: '#003087' },
  { id: 'meezan', label: 'Meezan', initials: 'MB', color: '#1B5E20' },
  { id: 'allied', label: 'Allied', initials: 'AB', color: '#B71C1C' },
  { id: 'mcb', label: 'MCB', initials: 'MC', color: '#880E4F' },
  { id: 'bop', label: 'Bank of Punjab', initials: 'BP', color: '#1A237E' },
  { id: 'habib', label: 'Habib Metro', initials: 'HM', color: '#004D40' },
  { id: 'askari', label: 'Askari', initials: 'AK', color: '#37474F' },
  { id: 'faysal', label: 'Faysal', initials: 'FB', color: '#E65100' },
  { id: 'summit', label: 'Summit', initials: 'SB', color: '#4A148C' },
  { id: 'silk', label: 'Silk Bank', initials: 'SK', color: '#006064' },
  { id: 'other', label: 'Other', initials: '+ ', color: colors.textMuted },
];

const BankTile = ({ item, active, disabled, onPress }) => (
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
 * BankPickerModal
 * @param {string[]} usedIds  — bank IDs already added; they render greyed-out
 */
const BankPickerModal = ({
  visible,
  activeId,
  usedIds = [],
  onSelect,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const filtered = BANKS.filter(b =>
    b.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = item => {
    onSelect(item);
    onClose();
    setQuery('');
  };

  return (
    <FloatingModal visible={visible} onClose={onClose} title="Select Your Bank">
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search bank…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={filtered.length > 8}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <BankTile
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
  searchWrap: {
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.1),
  },
  search: {
    fontSize: 13,
    color: colors.textMain,
    padding: 0,
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

export default BankPickerModal;
