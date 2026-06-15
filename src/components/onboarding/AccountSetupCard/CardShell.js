import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../../constants/responsive';
import { borderRadius, shadowPrimary } from '../../../constants/globalstyle';
import { useThemeColors } from '@hooks/useThemeColors';

const CardShell = ({ isActive, onPress, style, children, footer }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {children}
      {footer ?? null}
    </TouchableOpacity>
  );
};

export const CardRow = ({ children, style }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={[styles.row, style]}>{children}</View>;
};

export const CardInfo = ({ children }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles.info}>{children}</View>;
};

export const CardRight = ({ children }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles.rightCol}>{children}</View>;
};

export const CardDivider = () => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles.divider} />;
};

export const CardFooter = ({ children }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles.footer}>{children}</View>;
};

const createStyles = t => StyleSheet.create({
  card: {
    backgroundColor: t.surfacePrimary,
    borderRadius: borderRadius.lg,
    marginHorizontal: wp(5),
    marginBottom: hp(1.5),
    borderWidth: 1.5,
    borderColor: t.outlineVariant,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
  info: {
    flex: 1,
    gap: hp(0.4),
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: hp(0.6),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: t.outlineVariant,
    marginHorizontal: wp(4),
  },
  footer: {
    backgroundColor: t.surfacePrimary,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    gap: hp(0.5),
  },
});

export default CardShell;
