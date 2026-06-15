import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/responsive';
import { borderRadius } from '../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const PaginationDots = ({ total = 3, active = 0, style }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === active;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isActive ? styles.dotActive : styles.dotInactive,
            ]}
          />
        );
      })}
    </View>
  );
};

const createStyles = t => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(1.5),
    paddingVertical: hp(1.5),
  },
  dot: {
    height: hp(0.8),
    borderRadius: borderRadius.full,
  },
  dotActive: {
    width: wp(6),
    backgroundColor: t.primary,
  },
  dotInactive: {
    width: wp(2),
    backgroundColor: t.outlineVariant,
  },
});

export default PaginationDots;
