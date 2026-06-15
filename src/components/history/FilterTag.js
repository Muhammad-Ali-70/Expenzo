import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import { Label, borderRadius } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const FilterTag = ({ label, icon: Icon, active = false, onPress }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.pill, active && styles.pillActive]}
  >
    {Icon && (
      <Icon
        size={wp(3.8)}
        color={active ? theme.onPrimary : theme.textMuted}
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
};

const createStyles = t => StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: borderRadius.full,
    backgroundColor: t.surfacePrimary,
    borderWidth: 1,
    borderColor: t.outlineVariant,
  },
  pillActive: {
    backgroundColor: t.primary,
    borderColor: t.primary,
  },
});

export default FilterTag;
