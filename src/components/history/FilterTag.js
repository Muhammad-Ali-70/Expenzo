import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';

const FilterTag = ({ label, icon: Icon, active = false, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.pill, active && styles.pillActive]}
  >
    {Icon && (
      <Icon
        size={wp(3.8)}
        color={active ? colors.onPrimary : colors.textMuted}
        strokeWidth={1.8}
      />
    )}
    <Label
      type="bodyXs"
      weight="semiBold"
      color={active ? 'onPrimary' : 'textMuted'}
    >
      {label}
    </Label>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfacePrimary,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default FilterTag;
