import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { wp, hp } from '../../constants/responsive';
import colors from '../../constants/colors';
import { Label, borderRadius } from '../../constants/globalstyle';
import PaymentIcon from '../common/Paymenticon';

/**
 * size variants:
 *  "md"   — horizontal scroll row
 *  "lg"   — full flex box card (PaymentSourcePicker)
 *  "grid" — modal grid, no card background
 */
const SelectableIcon = ({
  iconName,
  iconColor,
  iconBg,
  label,
  active = false,
  onPress,
  size = 'md',
}) => {
  const isLg = size === 'lg';
  const isGrid = size === 'grid';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.base,
        isLg && styles.lg,
        isGrid && styles.grid,
        active && styles.active,
      ]}
    >
      <PaymentIcon
        name={iconName}
        backgroundColor={active ? colors.primary : iconBg}
        color={active ? colors.onPrimary : iconColor}
        containerSize={isLg ? wp(12) : isGrid ? wp(13) : wp(11)}
        size={isLg ? wp(6) : isGrid ? wp(6.5) : wp(5.2)}
      />
      <Label
        type="bodyXs"
        weight={active ? 'semiBold' : 'regular'}
        color={active ? 'primary' : 'textMuted'}
      >
        {label}
      </Label>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    gap: hp(0.8),
    paddingVertical: hp(1),
    // paddingHorizontal: wp(2),
    width: wp(20),
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  lg: {
    flex: 1,
    paddingVertical: hp(2),
    backgroundColor: colors.surfacePrimary,
  },
  grid: {
    width: (wp(100) - wp(6) - wp(9)) / 4,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(1),
  },
  active: {
    borderColor: colors.primary,
  },
});

export default SelectableIcon;
